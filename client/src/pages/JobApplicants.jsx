import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function JobApplicants() {
  const { jobId } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const { isLoading, data } = useQuery({
    queryKey: ["applicants", jobId],
    queryFn: async () => {
      const response = await fetch(API_URL + "/applicants?jobId=" + jobId, {
        method: "GET",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "Content-Type": "application/json",
        },
      });

      const data = response.json();
      return data;
    },
  });

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <div>There are no applicants for this job yet.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job applicants</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {data.map(({ user }) => (
          <div key={user.id} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/05.png" alt="Avatar" />
              <AvatarFallback>{getInitials(user.fullname)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {user.fullname}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
