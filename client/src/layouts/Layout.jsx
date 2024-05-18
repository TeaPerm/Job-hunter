import React from "react";
import LoggedOutLayout from "./LoggedOutLayout";
import { useSelector } from "react-redux";
import JobseekerLayout from "./JobseekerLayout";
import CompanyLayout from "./CompanyLayout";

const Layout = ({ children }) => {
  const role = useSelector((state) => state.auth.role);

  if (role === "jobseeker") {
    return <JobseekerLayout>{children}</JobseekerLayout>;
  }

  if (role === "company") {
    return <CompanyLayout>{children}</CompanyLayout>;
  }

  return <LoggedOutLayout>{children}</LoggedOutLayout>;
};

export default Layout;
