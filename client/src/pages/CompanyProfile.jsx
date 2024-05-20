import Example from "@/components/Example";
import Loading from "@/components/Loading";
import OffersList from "@/components/OffersList";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate()

  const { isLoading, data } = useQuery({
    queryKey: ["jobs", userId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/jobs?${`userId=${userId}`}`);
      const data = response.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="border-b mx-4 border-gray-200 py-4 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Job Postings
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Button onClick={() => navigate("/jobs/create") }>Create new job</Button>
        </div>
      </div>
      <div className="flex items-center py-8 justify-center">
        {data.total === 0 ? (
          <div>No jobs found.</div>
        ) : (
          <OffersList jobs={data.data} />
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
