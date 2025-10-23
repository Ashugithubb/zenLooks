import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Booking } from "@/app/redux/slice/booking.slice";
import axios from "axios";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { sendOtpThunk, verifyOtpThunk } from "@/app/redux/thunk/otp-verification/otp";
import { bookServiceThunk } from "@/app/redux/thunk/book.service.thunk";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";

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
        try {
            dispatch(sendOtpThunk({ id: booking.bookingId }))
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
        try {
            dispatch(verifyOtpThunk({ id: booking?.bookingId, otp }));
            dispatch(getAllBookings({}))
            setOtpVerified(true);
            alert("OTP verified successfully!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ width: 350, display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
            <CardMedia
                component="img"
                height="180"
                image={booking?.service?.imageUrl ?? ""}
                alt={booking?.service?.title}
                sx={{ borderRadius: 1 }}
            />

            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h6">{booking?.service?.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {booking?.service?.description}
                </Typography>

                <Stack direction="row" spacing={2}>
                    <Typography variant="body2">Price: ₹{booking?.service?.price}</Typography>
                    <Typography variant="body2" color="primary">
                        Discount: {booking?.service?.discount}%
                    </Typography>
                </Stack>
                <Typography variant="body2">Category: {booking?.service?.category}</Typography>
                <Typography variant="body2">Duration: {booking?.service?.time} minutes</Typography>

                <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2">Booking Details</Typography>
                    <Typography variant="body2">Booking ID: {booking?.bookingId}</Typography>
                    <Typography variant="body2">Date: {booking?.date}</Typography>
                    <Typography variant="body2">Slot: {booking?.slot}</Typography>
                    <Typography variant="body2">
                        Booked At: {new Date(booking?.bookedAt).toLocaleString()}
                    </Typography>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2">User Details</Typography>
                    <Typography variant="body2">Name: {booking?.user?.name}</Typography>
                    <Typography variant="body2">Email: {booking?.user?.email}</Typography>
                    <Typography variant="body2">Phone: {booking?.phoneNo}</Typography>
                </Box>

                <Box sx={{ mt: 2, textAlign: "center" }}>
                    {booking?.bookingStatus === "Completed" ? (
                        <Button variant="outlined" color="success" disabled sx={{ fontWeight: "bold" }}>
                            Service Completed
                        </Button>
                    ) : isExpired ? (
                        <Button variant="outlined" color="error" disabled sx={{ fontWeight: "bold" }}>
                            Booking Expired
                        </Button>
                    ) : otpVerified ? (
                        <Button variant="outlined" color="success" disabled sx={{ fontWeight: "bold" }}>
                            OTP Verified
                        </Button>
                    ) : otpGenerated ? (
                        <Box sx={{ display: "flex", gap: 1, flexDirection: "column", alignItems: "center" }}>
                            <TextField
                                label="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                size="small"
                            />
                            <Button variant="contained" onClick={handleVerifyOtp} disabled={loading}>
                                Verify OTP
                            </Button>
                            <Button variant="contained" onClick={() => { setOtpGenerated(false) }} disabled={loading}>
                                Cancel
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Button variant="contained" onClick={handleGenerateOtp} disabled={loading}>
                                Generate OTP
                            </Button>


                        </>

                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
