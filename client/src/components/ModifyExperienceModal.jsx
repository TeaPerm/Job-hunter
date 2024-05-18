import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { formatExperiences } from "@/lib/utils";
import { API_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

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

export function ModifyExperienceModal({ experience }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: experience.company,
      title: experience.title,
      fromYear: experience.interval.split("-")[0],
      toYear: experience.interval.split("-")[1],
    },
  });

  const experienceMutation = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return fetch(API_URL + "/experiences/" + experience.id, {
        method: "PATCH",
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
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });

  function onSubmit() {
    const values = form.getValues();
    experienceMutation.mutate(formatExperiences(values));
    console.log(formatExperiences(values));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog>
          <DialogTrigger asChild>
            <Pencil className="w-4 h-4 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modify experience</DialogTitle>
              <DialogDescription>
                Make changes to your experience here. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input id="company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input id="title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fromYear" className="text-right">
                  From year
                </Label>
                <FormField
                  control={form.control}
                  name="fromYear"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input id="fromYear" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="toYear" className="text-right">
                  To year
                </Label>
                <FormField
                  control={form.control}
                  name="toYear"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input id="toYear" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button type="submit" onClick={() => onSubmit()}>Save changes</Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
