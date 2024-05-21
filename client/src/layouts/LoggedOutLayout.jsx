import React from "react";
import { BriefcaseBusiness, Package2 } from "lucide-react";
import { Link } from "react-router-dom";

const LoggedOutLayout = ({ children }) => {
  return (
    <main>
      <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="w-full justify-between flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <BriefcaseBusiness className="h-6 w-6" />
            </Link>
            <Link
              to="/"
              className="text-foreground transition-colors hover:text-foreground ml-4"
            > 
              Job Listings
            </Link>
          </div>
          <div className="items-center flex">
            <Link
              to="/login"
              className="text-muted-foreground transition-colors hover:text-foreground mr-4"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
};

export default LoggedOutLayout;
