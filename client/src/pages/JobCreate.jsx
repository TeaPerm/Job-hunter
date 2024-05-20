import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

export function JobCreate() {
  const formSchema = z.object({
    company: z.string().min(2, {
      message: "Company name must be at least 2 characters.",
    }),
    position: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    homeOffice: z.boolean(),
    type: z.enum(["full-time", "part-time", "internship"]),
    salaryFrom: z.coerce.number().int().positive(),
    salaryTo: z.coerce.number().int().positive(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      description: "",
      city: "",
      type: "",
      homeOffice: false,
      salaryFrom: [200_000],
      salaryTo: [400_000],
    },
  });

  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const createJobMutation = useMutation({
    mutationFn: (data) => {
      return fetch(API_URL + "/jobs", {
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
    onSuccess: async (res) => {
      const response = await res.json();
      navigate(`/jobs/${response.id}`);
    },
  });
  function onSubmit(data) {
    console.log(data);
    createJobMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Create a new job!
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button size="sm">Save job</Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          Product Details
                        </CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="LetsGo KFT."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="position"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Position</FormLabel>
                                  <FormControl>
                                    <Input placeholder="10x dev." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Everything from automation, caching, project management, backend dev, sales enforcer, baker, fighter."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Job type</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem className=" gap-4">
                                <FormControl>
                                  <Select
                                    className="h-8 w-full"
                                    {...field}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Types</SelectLabel>
                                        <SelectItem value="full-time">
                                          Full-time
                                        </SelectItem>
                                        <SelectItem value="part-time">
                                          Part-time
                                        </SelectItem>
                                        <SelectItem value="internship">
                                          Internship
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage className="" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>City</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Budafkinpest" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="homeOffice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="mr-2">
                                Home office
                              </FormLabel>
                              <FormControl>
                                <Checkbox
                                  value={field.value}
                                  onCheckedChange={field.onChange}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Minimum and Maximum salary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="salaryFrom"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormLabel className="w-32">Salary from</FormLabel>
                          <FormControl>
                            <Slider
                              {...field}
                              min={100_000}
                              max={1_000_000}
                              value={field.value}
                              onValueChange={field.onChange}
                            />
                          </FormControl>
                          <FormControl className="w-32 mx-2">
                            <Input
                              value={field.value}
                              onChange={(e) => {
                                const value = e.target.value;
                                form.setValue(
                                  "salaryFrom",
                                  value ? [parseInt(value)] : []
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salaryTo"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormLabel className="w-32">Salary to</FormLabel>
                          <FormControl>
                            <Slider
                              {...field}
                              min={100_000}
                              max={1_000_000}
                              value={field.value}
                              onValueChange={field.onChange}
                            />
                          </FormControl>
                          <FormControl className="w-32 mx-2">
                            <Input
                              value={field.value}
                              onChange={(e) => {
                                const value = e.target.value;
                                form.setValue(
                                  "salaryTo",
                                  value ? [parseInt(value)] : []
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button size="sm" type="submit">
                    Save job
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </form>
    </Form>
  );
}
