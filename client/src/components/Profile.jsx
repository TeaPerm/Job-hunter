import JobseekerProfile from "@/pages/JobseekerProfile";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "jobseeker") {
    return <JobseekerProfile />;
  }
  
  return <div></div>;
};

export default Profile;
