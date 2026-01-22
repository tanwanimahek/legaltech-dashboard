"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verifyOtp } from "@/lib/auth";
import { isValidOtp } from "@/utils/validators";


export default function OtpVerificationPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    setError("");

    if (!isValidOtp(otp)) {
    setError("OTP must be 6 digits");
    return;
  }

    // if (!/^\d{6}$/.test(otp)) {
    //   setError("OTP must be 6 digits");
    //   return;
    // }

    const res = verifyOtp(otp);
    if (!res.success) {
      setError(res.message || "OTP verification failed");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">OTP Verification</h1>

        <Input
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button className="w-full" onClick={handleVerify}>
          Verify OTP
        </Button>
      </div>
    </div>
  );
}
