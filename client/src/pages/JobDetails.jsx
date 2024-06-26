import Example from "@/components/Example";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/Loading";
import { API_URL } from "@/lib/constants";
import { formatPriceForints } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import JobApplicants from "./JobApplicants";

export default function JobDetails() {
  const { jobId } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const role = useSelector((state) => state.auth.role);

  const { isLoading, data: job } = useQuery({
    queryKey: ["job", jobId],
    queryFn: async () => {
      const response = await fetch(API_URL + "/jobs/" + jobId);
      const data = response.json();
      return data;
    },
  });

  const applyMutation = useMutation({
    mutationFn: () => {
      let parsed = parseInt(jobId);
      return fetch(API_URL + "/applicants", {
        method: "POST",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId: parsed }),
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      toast.success("You applied for the job!", {
        description: `${company} - ${position}`,
      });
    },
  });

  if (isLoading | !job) {
    return <Loading />;
  }

  const {
    position,
    company,
    salaryFrom,
    salaryTo,
    city,
    type,
    homeOffice,
    id,
    description,
  } = job;

  function handleApply() {
    applyMutation.mutate();
  }

  return (
    <div className="flex justify-center">
      <div className="my-8 mx-16 w-3/4 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Job Details
            </h3>
            {role === "jobseeker" && (
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Like the job? Apply now!
              </p>
            )}
          </div>
          {role === "jobseeker" && (
            <Button onClick={() => handleApply()}>Apply now!</Button>
          )}
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Company name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {company}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Application for
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {position}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">About</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Salary expectation
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formatPriceForints(salaryFrom)} -{" "}
                {formatPriceForints(salaryTo)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Type</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {type}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Location</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {city}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Home Office</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {homeOffice ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {role === "company" && (
        <div className="my-8 mx-16 w-3/4 overflow-hidden">
          <JobApplicants/>
        </div>
      )}
    </div>
  );
}
