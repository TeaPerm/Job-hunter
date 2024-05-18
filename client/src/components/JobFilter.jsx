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

export function JobFilter() {
  return (
    <Popover className="">
      <PopoverTrigger asChild>
        <Button variant="outline" className="shadow-md">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-120">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Minimum wage</Label>
              <Input
                id="width"
                placeholder="100000"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Maximum wage</Label>
              <Input
                id="maxWidth"
                placeholder="400000"
                className="col-span-2 h-8"
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <Label>Work Type</Label>

              <Select className="h-8 w-full">
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
              <Label htmlFor="maxHeight">Location</Label>
              <Input
                id="maxHeight"
                placeholder="Budapest"
                className="col-span-2 h-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="homeOffice" />
              <label
                htmlFor="homeOffice"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Home Office
              </label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
