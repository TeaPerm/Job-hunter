import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPriceForints } from "@/lib/utils";

import React from "react";
import { useNavigate } from "react-router-dom";

const JobsTableRow = ({ job }) => {
  const {
    position,
    company,
    salaryFrom,
    salaryTo,
    city,
    type,
    homeOffice,
    id,
  } = job;

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/jobs/${id}`);
  };

  return (
    <TableRow
      className="hover:bg-primary/20 cursor-pointer"
      onClick={handleRowClick}
    >
      <TableCell>
        <div className="font-medium">{position}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {company}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{city}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {homeOffice ? (
          <Badge className="text-xs" variant="secondary">
            Home office
          </Badge>
        ) : (
          ""
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="font-medium">
          {formatPriceForints(salaryFrom)} - {formatPriceForints(salaryTo)}
        </div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {type}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default JobsTableRow;
