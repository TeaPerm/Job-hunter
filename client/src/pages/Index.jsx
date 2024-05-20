import Example from "@/components/Example";
import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import JobsTable from "@/components/JobsTable";
import { JobFilter } from "@/components/JobFilter";
import { Searchbar } from "@/components/Searchbar";
import Loading from "@/components/Loading";

const Index = () => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["jobs", searchQuery],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/jobs${
          searchQuery ? `?company[$like]=%${searchQuery}%` : ""
        }`
      );
      const data = response.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-8 py-4">
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2">
          <Searchbar
            search={search}
            setSearch={setSearch}
            setSearchQuery={setSearchQuery}
          />
          <JobFilter />
        </div>
      </div>
      {data.total === 0 ? (
        <div>No jobs found.</div>
      ) : (
        <JobsTable jobs={data.data} />
      )}
    </div>
  );
};

export default Index;
