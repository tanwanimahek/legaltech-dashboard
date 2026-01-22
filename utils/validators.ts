export type Role = "judge" | "advocate" | "police" | "clerk" | "admin" | "lawyer" | "client";

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPhone = (phone: string) =>
  /^\d{10}$/.test(phone.trim());

export const isValidPassword = (password: string) =>
  password.length >= 8;

export const doPasswordsMatch = (p1: string, p2: string) =>
  p1 === p2;

export const isValidOtp = (otp: string) =>
  /^\d{6}$/.test(otp.trim());

export const isRoleSelected = (role: string) =>
  role.trim().length > 0;
