// src/api/otpService.js

// Request OTP
export async function requestOtp(email) {
  const response = await fetch("http://localhost:5000/api/auth/request-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response.json();
}

// Verify OTP
export async function verifyOtp(email, otp) {
  const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return response.json();
}
