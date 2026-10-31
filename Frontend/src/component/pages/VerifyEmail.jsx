
import React, { useEffect, useState } from "react";
import { MailCheck, LoaderPinwheel, ArrowLeft } from "lucide-react";

import sign from "../../assets/signup.png";
import OTPInput from "react-otp-input";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp, Signup } from "../../services/opertions/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");

  const { loading, signupData } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if signup data is missing
  useEffect(() => {
    if (!signupData) {
      navigate("/signup", { replace: true });
    }
  }, [signupData, navigate]);

  // Verify OTP
  const handleOnsubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6 || !signupData) return;

    const {
      firstName,
      lastname,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      Signup(
        firstName,
        lastname,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (signupData?.email) {
      dispatch(sendOtp(signupData.email));
    }
  };

  // Prevent rendering before redirect
  if (!signupData) return null;

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f2e9]">
        <LoaderPinwheel
          size={45}
          className="animate-spin text-[#d65f27]"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f2e9] text-[#202629] lg:flex-row">

      {/* Left Section */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-10 lg:w-1/2 lg:px-12">

        <div className="max-w-md">

          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-[#d65f27]">
            ONE MORE STEP
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Verify Your
          </h1>

          <h2 className="mt-1 font-serif text-4xl italic text-[#d65f27] sm:text-5xl">
            Email
          </h2>

          <p className="mt-6 text-lg font-medium text-gray-600">
            We've sent a 6-digit verification code to
          </p>

          <p className="mt-2 break-all text-lg font-bold text-[#d65f27]">
            {signupData.email}
          </p>

          <p className="mt-3 text-gray-600">
            Enter the code below to continue your
            creative journey with Artify.
          </p>

          <div className="mt-8">
            <img
              src={sign}
              alt="Email verification illustration"
              className="mx-auto w-full max-w-md object-contain"
            />
          </div>

        </div>
      </div>

      {/* Right Section - OTP Form */}
      <div className="flex w-full items-center justify-center px-5 py-12 lg:w-1/2 lg:px-12">

        <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl sm:p-10">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fbe9dc] text-[#d65f27]">
            <MailCheck size={38} strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h2 className="text-center font-serif text-3xl font-semibold sm:text-4xl">
            Check Your Inbox
          </h2>

          <p className="mt-4 text-center leading-relaxed text-gray-600">
            A 6-digit verification code has been sent
            to your email address. Please enter it below
            to verify your account.
          </p>

          {/* OTP Form */}
          <form onSubmit={handleOnsubmit} className="mt-9">

            <div className="flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                shouldAutoFocus
                inputType="tel"
                renderInput={(props) => (
                  <input
                    {...props}
                    className="!h-12 !w-10 rounded-lg border border-gray-300 bg-[#fafafa] text-center text-lg font-semibold text-[#202629] outline-none transition-all focus:border-[#d65f27] focus:ring-2 focus:ring-[#d65f27]/20 sm:!h-14 sm:!w-12"
                  />
                )}
                containerStyle="flex gap-2 sm:gap-3"
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={otp.length !== 6}
              className="mt-8 w-full rounded-lg bg-[#d65f27] py-3.5 font-semibold text-white transition-all duration-200 hover:scale-[0.99] hover:bg-[#bd4e1e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Verify Email
            </button>

          </form>

          {/* Resend OTP */}
          <div className="mt-7 flex flex-col items-center gap-3 text-sm sm:flex-row sm:justify-between">

            <p className="text-gray-600">
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResendOtp}
              className="font-semibold text-[#d65f27] transition-colors hover:text-[#a9431c] hover:underline"
            >
              Resend OTP
            </button>

          </div>

          {/* Back to Signup */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="mt-8 flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#d65f27]"
          >
            <ArrowLeft size={16} />
            Back to Sign Up
          </button>

        </div>
      </div>

    </div>
  );
};

export default VerifyEmail;
