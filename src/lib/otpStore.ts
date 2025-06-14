// lib/otpStore.ts
import { writeFileSync, readFileSync, existsSync } from "fs";

const otpFile = "otp.json";

type OTPRecord = {
  email: string;
  otp: string;
  expiresAt: number;
};

const getOtps = (): OTPRecord[] => {
  if (!existsSync(otpFile)) return [];
  return JSON.parse(readFileSync(otpFile, "utf-8"));
};

export const saveOtp = (email: string, otp: string) => {
  const records = getOtps().filter((r) => r.email !== email); // remove old entry
  records.push({ email, otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 min
  writeFileSync(otpFile, JSON.stringify(records));
};

export const getOtp = (email: string) => {
  return getOtps().find((r) => r.email === email);
};

export const deleteOtp = (email: string) => {
  const remaining = getOtps().filter((r) => r.email !== email);
  writeFileSync(otpFile, JSON.stringify(remaining));
};
