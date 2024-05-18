import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
} from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";
import { formatExperiences } from "@/lib/utils";
import { useSelector } from "react-redux";

export default function AddExperienceCard() {
  const formSchema = z.object({
    experiences: z.array(
      z.object({
        company: z.string().min(2, {
          message: "Company name must be at least 2 characters.",
        }),
        title: z.string().min(2, {
          message: "Title must be at least 2 characters.",
        }),
        fromYear: z.coerce.number().int().positive(),
        toYear: z.coerce.number().int().positive(),
      })
    ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiences: [
        {
          company: "",
          title: "",
          fromYear: null,
          toYear: null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const accessToken = useSelector((state) => state.auth.accessToken);

  const experienceMutation = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return fetch(API_URL + "/experiences", {
        method: "POST",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  function onSubmit({ experiences }) {
    experienceMutation.mutate(formatExperiences(experiences));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-[100px]">From year</TableHead>
                  <TableHead className="w-[100px]">To year</TableHead>
                  <TableHead className=""></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell className="p-2">
                      <FormItem>
                        <FormControl>
                          <Input
                            {...form.register(`experiences.${index}.company`)}
                            placeholder="LetsGo KFT."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </TableCell>
                    <TableCell className="p-2">
                      <FormItem>
                        <FormControl>
                          <Input
                            {...form.register(`experiences.${index}.title`)}
                            placeholder="Software developer"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </TableCell>
                    <TableCell className="p-2">
                      <FormItem>
                        <FormControl>
                          <Input
                            {...form.register(`experiences.${index}.fromYear`)}
                            type="number"
                            placeholder="2019"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </TableCell>
                    <TableCell className="p-2">
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            {...form.register(`experiences.${index}.toYear`)}
                            placeholder="2022"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </TableCell>
                    <TableCell
                      className="cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Button onClick={() => append({})} size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add experience
            </Button>
          </CardFooter>
        </Card>
        <div className="flex justify-end pt-4 pr-2">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
