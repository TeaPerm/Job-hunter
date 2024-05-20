import { Badge } from "./ui/badge";
import { Eye } from "lucide-react";
import { capitalizeFirstLetter, formatPriceForints } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";
import { useSelector } from "react-redux";

export default function OffersList({ jobs }) {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const queryClient = useQueryClient();

  const deleteJobMutation = useMutation({
    mutationFn: (id) => {
      return fetch(API_URL + "/jobs/" + id, {
        method: "DELETE",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "Content-Type": "application/json",
        },
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Succesfully deleted job!");
    },
  });

  function handleDelete(id) {
    deleteJobMutation.mutate(id);
  }

  function handleEdit(id) {
    navigate(`/jobs/${id}/edit`);
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {jobs.map((job) => (
        <li
          key={job.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3 justify-between">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {job.position}
                  {job.homeOffice ? (
                    <Badge className="ml-2 w-fit">Home Office</Badge>
                  ) : (
                    ""
                  )}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleEdit(job.id)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="mt-1 truncate text-sm flex gap-2 items-center text-gray-500">
                {capitalizeFirstLetter(job.type)}
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                {formatPriceForints(job.salaryFrom)} -{" "}
                {formatPriceForints(job.salaryTo)}
              </p>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <Link
                  to={`/jobs/${job.id}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Checkout job
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
