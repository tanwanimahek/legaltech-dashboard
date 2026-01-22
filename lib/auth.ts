import data from "@/data/db.json";

type Role = "judge" | "advocate" | "police" | "clerk";

export function login(email: string, password: string, role: Role) {
  const user = data.users.find(
    (u) =>
       u.email === email && 
       u.password === password &&
       u.role === role
  );

  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  localStorage.setItem("user", JSON.stringify(user));

  return { success: true, user };
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Mock OTP (always valid: 123456)
export function verifyOTP(otp: string) {
  return otp === "123456";
}

export function generateMockOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

export function savePendingSignup(user: any, otp: string) {
  localStorage.setItem("pendingUser", JSON.stringify(user));
  localStorage.setItem("pendingOtp", otp);
}

export function verifyOtp(enteredOtp: string) {
  const savedOtp = localStorage.getItem("pendingOtp");
  if (!savedOtp) return { success: false, message: "OTP expired. Signup again." };

  if (enteredOtp !== savedOtp) {
    return { success: false, message: "Incorrect OTP" };
  }

  // OTP matched -> log in pending user
  const pendingUser = localStorage.getItem("pendingUser");
  if (!pendingUser) return { success: false, message: "No pending signup found" };

  localStorage.setItem("user", pendingUser);
  localStorage.removeItem("pendingUser");
  localStorage.removeItem("pendingOtp");

  return { success: true };
}
