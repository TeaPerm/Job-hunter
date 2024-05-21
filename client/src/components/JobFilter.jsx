import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

export function JobFilter({
  setMinSalary,
  setMaxSalary,
  setWorkType,
  setLocation,
  setHomeOffice,
}) {
  const form = useForm({
    defaultValues: {
      minSalary: "",
      maxSalary: "",
      workType: "",
      location: "",
      homeOffice: false,
    },
  });


  const { register, handleSubmit, setValue } = form;

  function onSubmit(values) {
    console.log(values);
    const { minSalary, maxSalary, workType, location, homeOffice } = values;
    setMinSalary(parseInt(minSalary));
    setWorkType(workType);
    setLocation(location);
    setMaxSalary(parseInt(maxSalary));
    setHomeOffice(homeOffice)
  }

  return (
    <Popover className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="filterForm"
        className="space-y-8"
      >
        <PopoverTrigger asChild>
          <Button variant="outline" className="shadow-md">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-120">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filter</h4>
              <p className="text-sm text-muted-foreground">
                Filter jobs by these categories.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="minSalary">Minimum salary</Label>
                <Input
                  id="minSalary"
                  placeholder="100000"
                  className="col-span-2 h-8"
                  {...register("minSalary")}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxSalary">Maximum salary</Label>
                <Input
                  id="maxSalary"
                  placeholder="400000"
                  className="col-span-2 h-8"
                  {...register("maxSalary")}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <Label>Work Type</Label>
                <Select
                  className="h-8 w-full"
                  onValueChange={(value) => setValue("workType", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Work type</SelectLabel>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Budapest"
                  className="col-span-2 h-8"
                  {...register("location")}
                />
              </div>
              <div className="flex justify-between items-center space-x-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="homeOffice"
                    checked={form.watch("homeOffice")}
                    onCheckedChange={(isChecked) => {
                      setValue("homeOffice", isChecked);
                    }}
                  />
                  <label
                    htmlFor="homeOffice"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Home Office
                  </label>
                </div>
                <Button type="submit" form="filterForm">
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </form>
    </Popover>
  );
}
