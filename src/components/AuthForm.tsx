import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import type { Session, AuthError } from "@supabase/supabase-js";

export default function AuthForm() {
  const [step, setStep] = useState<"input" | "otp" | "forgot" | "success">("input");
  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  // Handle email/phone input and send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: input.includes("@") ? input : undefined,
        phone: !input.includes("@") ? input : undefined,
      });
      if (error) throw error;
      setStep("otp");
    } catch (err) {
      const e = err as AuthError;
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      let verifyParams;
      if (input.includes("@")) {
        verifyParams = {
          email: input,
          token: otp,
          type: "magiclink" as const,
        };
      } else {
        verifyParams = {
          phone: input,
          token: otp,
          type: "sms" as const,
        };
      }
      const { data, error } = await supabase.auth.verifyOtp(verifyParams);
      if (error) throw error;
      setSession(data.session);
      setStep("success");
    } catch (err) {
      const e = err as AuthError;
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (err) {
      const e = err as AuthError;
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(input);
      if (error) throw error;
      setStep("forgot");
    } catch (err) {
      const e = err as AuthError;
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded shadow">
      {step === "input" && (
        <>
          <h2 className="text-xl font-bold mb-4">Sign In / Sign Up</h2>
          <input
            type="text"
            placeholder="Email or Phone"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <Button onClick={handleSendOtp} disabled={loading || !input} className="w-full mb-2">Send OTP</Button>
          <Button onClick={() => handleSocialLogin("google")} disabled={loading} className="w-full mb-2">Continue with Google</Button>
          <Button onClick={() => handleSocialLogin("facebook")} disabled={loading} className="w-full mb-2">Continue with Facebook</Button>
          <Button variant="link" onClick={handleForgotPassword} disabled={loading || !input} className="w-full">Forgot Password?</Button>
        </>
      )}
      {step === "otp" && (
        <>
          <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <Button onClick={handleVerifyOtp} disabled={loading || !otp} className="w-full">Verify OTP</Button>
        </>
      )}
      {step === "forgot" && (
        <>
          <h2 className="text-xl font-bold mb-4">Password Reset Email Sent</h2>
          <p className="mb-4">Check your inbox for a reset link.</p>
          <Button onClick={() => setStep("input")}>Back to Login</Button>
        </>
      )}
      {step === "success" && (
        <>
          <h2 className="text-xl font-bold mb-4">Authenticated!</h2>
          <p className="mb-4">You are now signed in.</p>
        </>
      )}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
