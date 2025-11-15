import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Booking } from "@/app/redux/slice/booking.slice";
import axios from "axios";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { sendOtpThunk, verifyOtpThunk } from "@/app/redux/thunk/otp-verification/otp";
import { bookServiceThunk } from "@/app/redux/thunk/book.service.thunk";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import { toast } from "react-toastify";
import style from './booking.module.css'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Alert } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StyleIcon from '@mui/icons-material/Style';
import { formatToIST } from "../formatToIST/formatToIST";

interface BookingCardProps {
  booking: Booking;
}
export default function BookingCard({ booking }: BookingCardProps) {
  const [otp, setOtp] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const bookingDateTime = new Date(`${booking?.date}T${booking?.slot}`);
  const gracePeriodMs = (booking?.service?.time + 5) * 60 * 1000;
  const bookingEndTime = new Date(bookingDateTime.getTime() + gracePeriodMs);
  const isExpired = bookingEndTime.getTime() < new Date().getTime();

  const dispatch = useAppDispatch();
  const handleGenerateOtp = async () => {
    setLoading(true);
    setOtp("");
    try {
      await dispatch(sendOtpThunk({ id: booking.bookingId }));
      setOtpGenerated(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate OTP");
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOtp = async () => {
    setLoading(true);
    if (otp.trim().length == 0) {
      alert("Please Enter Otp");
      setLoading(false);
      return
    }
    const res = await dispatch(verifyOtpThunk({ id: booking?.bookingId, otp }));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getAllBookings({}))
      setOtpVerified(true);
      alert("OTP verified successfully!");
      window.location.reload();
    }
    else {
      toast.error(res.payload || "Invalid OTP");
      setLoading(false);
    }
  };

  const discountedPrice =
    booking?.service?.price -
    (booking?.service?.price * booking?.service?.discount) / 100;



  return (
    <Card className={style.booking}>

      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={booking?.service?.imageUrl ?? ""}
          alt={booking?.service?.title}
          sx={{ borderRadius: "16px 16px 0 0", objectFit: "cover", height: 300 }}
        />
        {booking?.service?.discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#ff4d4f",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "12px",
              px: 1.2,
              py: 0.5,
              fontSize: "0.8rem",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            }}
          >
            {booking?.service?.discount}% off
          </Box>
        )}
      </Box>

      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
          {booking?.service?.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "60px",
          }}
        >
          {booking?.service?.description}
        </Typography>


        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
            ₹{discountedPrice.toFixed(1)}
          </Typography>
          {booking?.service?.discount > 0 && (
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#9e9e9e",
                fontSize: "1rem",
              }}
            >
              ₹{booking?.service?.price}
            </Typography>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary">
          Category: {booking?.service?.category} • Duration:{" "}
          {booking?.service?.time} min
        </Typography>



        {/* Booking Info */}
        <Box>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}><StyleIcon sx={{ fontSize: 18, verticalAlign: "middle" }} /> Booking Details</Typography>
          <Typography variant="body2">Booking ID: {booking?.bookingId}</Typography>
          <Typography variant="body2">Date: {
            booking?.date
              ?.split("-")        // ["2025", "11", "15"]
              .reverse()          // ["15", "11", "2025"]
              .join("-")          // "15-11-2025"
          }
          </Typography>
          <Typography variant="body2">Slot: {booking?.slot}</Typography>
          <Typography variant="body2">
            Booked At: {formatToIST(booking?.bookedAt)}
          </Typography>
          <Typography variant="body2">
            Payment:{" "}
            {booking?.paymentStatus === "Pending" ? "Cash" : booking?.paymentStatus}
          </Typography>
        </Box>



        {/* User Info */}
        <Box>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
            <PersonIcon sx={{ fontSize: 18, verticalAlign: "middle" }} /> User Details
          </Typography>
          <Typography variant="body2">Name: {booking?.user?.name}</Typography>
          <Typography variant="body2">Email: {booking?.user?.email}</Typography>
          <Typography variant="body2">Phone: {booking?.phoneNo}</Typography>
        </Box>

        {/* OTP Section */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          {booking?.bookingStatus === "Completed" ? (
            <Button variant="outlined" color="success" disabled>
              Service Completed
            </Button>
          ) : isExpired ? (
            <Button variant="outlined" color="error" disabled>
              Booking Expired
            </Button>
          ) : booking.deletedAt ? (
            <Box
              sx={{
                backgroundColor: "#ffebee",
                color: "#c62828",

                display: "inline-block",
                padding: "8px 14px",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Canceled at {formatToIST(booking.deletedAt)}
            </Box>


          ) : otpVerified ? (
            <Button variant="outlined" color="success" disabled>
              OTP Verified
            </Button>
          ) : otpGenerated ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                label="Enter OTP"
                type="number"
                value={otp}
                size="small"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 6) {
                    setOtp(value);
                  }
                }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />

              <Button variant="contained" onClick={handleVerifyOtp} disabled={loading} sx={{ backgroundColor: "#ffb703" }}>
                Verify OTP
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOtpGenerated(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={handleGenerateOtp}
              disabled={loading}
              sx={{
                backgroundColor: "#ffb703",
                color: "#fff",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#f48c06" },
              }}
            >
              Generate OTP
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
