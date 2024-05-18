import { AddExperienceModal } from "@/components/AddExperienceModal";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { API_URL } from "@/lib/constants";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";
import { ModifyExperienceModal } from "@/components/ModifyExperienceModal";

const JobseekerProfile = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.userId);
  const queryClient = useQueryClient();


  const { isLoading, data } = useQuery({
    queryKey: ["jobseeker", userId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  const { isLoading: isExperienceLoading, data: experiences } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/experiences`, {
        method: "GET",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: (id) => {
      return fetch(API_URL + "/experiences/"+id, {
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
  });

  function handleDeleteExperience(id){
    deleteExperienceMutation.mutate(id)
    queryClient.invalidateQueries({ queryKey: ["experiences"] });
  }
  
  if (isLoading) {
      return <Loading />;
    }
    
  const { fullname, email, role } = data;

  return (
    <div className="my-8 mx-16 overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            User details
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Your data and experiences in one place.
          </p>
        </div>
        <AddExperienceModal />
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {fullname}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Role</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {capitalizeFirstLetter(role)}
            </dd>
          </div>
        </dl>
      </div>
      <Separator className="" />
      <div className="px-4 pt-6 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Previous experiences
          </h3>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {isExperienceLoading ? (
              <Loading />
            ) : (
              experiences.data.map((experience) => (
                <React.Fragment key={experience.id}>
                  <dt className="text-sm font-medium text-gray-900">
                    {experience.company}
                  </dt>
                  <dd className="mt-1 flex justify-between text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {experience.interval} | {experience.title}
                    <div className="flex gap-2">
                      <ModifyExperienceModal experience={experience}/>
                      <Trash2
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => handleDeleteExperience(experience.id)}
                      />
                    </div>
                  </dd>
                </React.Fragment>
              ))
            )}
          </div>
        </dl>
      </div>
    </div>
  );
};

export default JobseekerProfile;
