import React, { useState } from "react";
import { requestOtp, verifyOtp } from "../api/otpService";

function OtpLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [message, setMessage] = useState("");

  const handleRequestOtp = async () => {
    const res = await requestOtp(email);
    setMessage(res.message || res.error);
    if (res.status === "ok") setStep("otp");
  };

  const handleVerifyOtp = async () => {
    const res = await verifyOtp(email, otp);
    setMessage(res.message || res.error);
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>OTP Login</h2>

      {step === "email" && (
        <>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleRequestOtp}>Send OTP</button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default OtpLogin;
