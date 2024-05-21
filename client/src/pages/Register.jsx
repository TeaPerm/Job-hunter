import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { formatExperienceData } from "@/lib/utils";

const formSchema = z.object({
  fullname: z.string().min(1, { message: "Full name cannot be empty!" }),
  email: z.string().email().min(1, { message: "Email cannot be empty!" }),
  password: z.string().min(1, { message: "Password cannot be empty!" }),
  role: z.enum(["jobseeker", "company"]),
  // experiences: z.string(),
});

export function Register() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      role: "jobseeker",
      // experiences: "",
    },
  });

  const role = form.watch("role");

  const registerMutation = useMutation({
    mutationFn: (data) => {
      return fetch(API_URL + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async (response) => {
      const res = await response.json();
      console.log(res)
      navigate("/login");
    },
  });


  async function onSubmit(values) {
    registerMutation.mutate(values);
    // console.log(formatExperienceData(values.experiences))
    // console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto max-w-sm my-8">
          <CardHeader>
            <CardTitle className="text-xl">Register</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Mike Wazowski" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="job@hunter.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          className="h-8 w-full"
                          {...field}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Roles</SelectLabel>
                              <SelectItem value="company">Company</SelectItem>
                              <SelectItem value="jobseeker">
                                Jobseeker
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {role === "jobseeker" && (
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="experiences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experiences</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-48"
                            placeholder="Halo Haven;Front-end fejlesztő;2021-2022"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
