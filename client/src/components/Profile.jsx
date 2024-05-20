import CompanyProfile from "@/pages/CompanyProfile";
import JobseekerProfile from "@/pages/JobseekerProfile";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "jobseeker") {
    return <JobseekerProfile />;
  }

  if(role === "company"){
    return <CompanyProfile/>
  }
};

export default Profile;
