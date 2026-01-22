"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidEmail, isRoleSelected } from "@/utils/validators";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

const ROLES = ["judge", "advocate", "police", "clerk"] as const;
type Role = (typeof ROLES)[number];

const isRole = (val: string): val is Role => {
  return (ROLES as readonly string[]).includes(val);
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (!isRoleSelected(role)) {
      setError("Please select role");
      return;
    }

    if (!isRole(role)) {
      setError("Please select a valid role");
      return;
    }

    const res = login(email.trim(), password, role);

    if (!res.success) {
      setError(res.message || "Login failed");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Select onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Login as" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="judge">Judge</SelectItem>
              <SelectItem value="advocate">Advocate</SelectItem>
              <SelectItem value="police">Police</SelectItem>
              <SelectItem value="clerk">Clerk</SelectItem>
            </SelectContent>
          </Select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
