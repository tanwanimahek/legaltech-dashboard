"use client";

import {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  doPasswordsMatch,
  isRoleSelected,
} from "@/utils/validators";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateMockOtp, savePendingSignup } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError("");

  if (!name.trim()) return setError("Name is required");
  if (!isValidEmail(email)) return setError("Enter a valid email");
  if (!isValidPhone(phone)) return setError("Phone must be 10 digits");
  if (!isValidPassword(password)) return setError("Password must be at least 8 characters");
  if (!doPasswordsMatch(password, confirmPassword)) return setError("Passwords do not match");
  if (!isRoleSelected(role)) return setError("Please select a role");

    const otp = generateMockOtp();

    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      phone,
      role,
      password,
      otp, // just for display/testing
    };

    savePendingSignup(newUser, otp);

    // optional: show OTP in console (for testing)
    console.log("Generated OTP:", otp);

    router.push("/otp-verification");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Sign Up</h1>

        <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="space-y-2">
          <p className="text-sm font-medium">Select Role</p>
          <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="judge" id="judge" />
              <Label htmlFor="judge">Judge</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advocate" id="advocate" />
              <Label htmlFor="advocate">Advocate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="police" id="police" />
              <Label htmlFor="police">Police</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clerk" id="clerk" />
              <Label htmlFor="clerk">Clerk</Label>
            </div>
          </RadioGroup>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button className="w-full" onClick={handleSignup}>
          Generate OTP & Continue
        </Button>
      </div>
    </div>
  );
}
