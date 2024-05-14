import Example from "@/components/Example";
import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import JobsTable from "@/components/JobsTable";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { JobFilter } from "@/components/JobFilter";

const Index = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await fetch(API_URL + "/jobs");
      const data = response.json();
      return data;
    },
  });
  
  return (
      <div className="px-8 py-4">
        <div>
            Search for jobs: 
            <JobFilter/>
        </div>
      {!isLoading &&
      <JobsTable jobs={data.data} />
      }
    </div>
  );
};

export default Index;
