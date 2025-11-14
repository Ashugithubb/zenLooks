'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Typography, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hook/hook";
import style from "./page.module.css"
import { resetPasswordThunk, sendForgotOtpThunk, verifyEmailOtpThunk } from "@/app/redux/thunk/otp-verification/otp";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { email: "", newPassword: "", confirmPassword: "" }
  });

  const email = watch("email");

  const sendOtp = async () => {
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    const res = await dispatch(sendForgotOtpThunk({ email }));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP sent to email");
      setStep("otp");
    } else toast.error(res.payload as string);
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");

    setLoading(true);
    const res = await dispatch(verifyEmailOtpThunk({ email, otp }));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP verified");
      setStep("password");
    } else toast.error(res.payload as string);
  };

  const updatePassword = async (data: any) => {


    if (data.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }


    if (data.newPassword !== data.confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    const res = await dispatch(resetPasswordThunk({ email, password: data.newPassword }));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Password reset successfully");
      router.push("/login");
    } else toast.error(res.payload as string);
  };

  return (
    <Box className={style.forgotContainer}>
      <Box className={style.forgotCard}>
        <Typography className={style.title}>Forgot Password</Typography>
        <Typography className={style.subtitle}>Reset your password in 3 steps</Typography>

        <form onSubmit={handleSubmit(updatePassword)}>
          <Box className={style.form}>

            {/* STEP 1 - EMAIL */}
            {step === "email" && (
              <>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  className={style.input}
                  {...register("email", { required: true })}
                />
                <Button variant="contained" fullWidth className={style.btn} onClick={sendOtp} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Send OTP"}
                </Button>
              </>
            )}

            {/* STEP 2 - OTP */}
            {step === "otp" && (
              <>
                <TextField
                  label="Enter OTP"
                  fullWidth
                  className={style.input}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button variant="contained" fullWidth className={style.btn} onClick={verifyOtp} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Verify OTP"}
                </Button>

                <Button variant="text" onClick={() => setStep("email")}>
                  Change Email
                </Button>
              </>
            )}


            {step === "password" && (
              <>
                <TextField
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  className={style.input}
                  {...register("newPassword", { required: true })}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                />

                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  className={style.input}
                  {...register("confirmPassword", { required: true })}
                />

                <Button type="submit" variant="contained" fullWidth className={style.btn} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Reset Password"}
                </Button>
              </>
            )}
          </Box>
        </form>

        <Typography className={style.footerText}>
          Remember password? <span onClick={() => router.push("/login")}>Login</span>
        </Typography>
      </Box>

      <ToastContainer />
    </Box>
  );
}
