"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import data from "@/data/db.json";

type User = {
  name: string;
  email: string;
  role: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    setMounted(true);
  }, [router]);

  if (!mounted || !user) return null;

  const stats = data.dashboardStats;

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Welcome, {user.name}</h1>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Cases</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalCases}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Cases</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.pendingCases}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disposed Cases</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.disposedCases}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today’s Hearings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.todayHearings}
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Cases</h2>

        <div className="rounded-md border overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted">
                <th className="p-3 text-left text-sm font-medium">Case ID</th>
                <th className="p-3 text-left text-sm font-medium">Case Title</th>
                <th className="p-3 text-left text-sm font-medium">Court</th>
                <th className="p-3 text-left text-sm font-medium">Status</th>
                <th className="p-3 text-left text-sm font-medium">Next Hearing</th>
              </tr>
            </thead>

            <tbody>
              {data.cases.map((c) => (
                <tr key={c.caseId} className="border-b">
                  <td className="p-3 text-sm font-medium">{c.caseId}</td>
                  <td className="p-3 text-sm">{c.title}</td>
                  <td className="p-3 text-sm">{c.court}</td>
                  <td className="p-3 text-sm">{c.status}</td>
                  <td className="p-3 text-sm">{c.nextHearing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
