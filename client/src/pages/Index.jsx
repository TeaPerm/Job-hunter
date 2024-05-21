import { API_URL } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import JobsTable from "@/components/JobsTable";
import { JobFilter } from "@/components/JobFilter";
import { Searchbar } from "@/components/Searchbar";
import Loading from "@/components/Loading";

const Index = () => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [homeOffice, setHomeOffice] = useState("");

  const observerElem = useRef(null);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["jobs", searchQuery, salaryFrom, salaryTo, type, city, homeOffice],
      queryFn: async ({ pageParam = 0 }) => {
        let url = `${API_URL}/jobs?$limit=10&$skip=${pageParam}`;

        if (searchQuery) {
          url += `&company[$like]=%${searchQuery}%`;
        }

        if (salaryFrom) {
          url += `&salaryFrom[$gte]=${salaryFrom}`;
        }
        if (salaryTo) {
          url += `&salaryTo[$lte]=${salaryTo}`;
        }

        if (type) {
          url += `&type=${type}`;
        }

        if (city) {
          url += `&city=${city}`;
        }
        
        if (homeOffice !== "") {
          url += `&homeOffice=${homeOffice}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        return data;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || !lastPage.data) return undefined;
        const morePagesExist = lastPage.data.length === 10;
        if (!morePagesExist) return undefined;
        return allPages.length * 10;
      },
    });

  useEffect(() => {
    if (!observerElem.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(observerElem.current);
    return () => observer.disconnect();
  }, [observerElem.current, hasNextPage]);

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
          <JobFilter setMinSalary={setSalaryFrom} setMaxSalary={setSalaryTo} setLocation={setCity} setWorkType={setType} setHomeOffice={setHomeOffice} />
        </div>
      </div>
      {data.pages[0]?.total === 0 ? (
        <div>No jobs found.</div>
      ) : (
        <>
          {data.pages.map((page, index) => (
            <JobsTable key={index} jobs={page.data} />
          ))}
          <div ref={observerElem} className="loading">
            {isFetchingNextPage ? <Loading /> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
