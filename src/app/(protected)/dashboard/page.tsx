import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await isAuthenticated();

  if (!session.user) {
    return redirect("/");
  }

  return <div>This is the dashboard {session.user.email}</div>;
};

export default Dashboard;
