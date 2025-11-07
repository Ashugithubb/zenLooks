"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import SingleBookingCard from "@/components/bookings/my-bookings.card";
import Navbar from "@/components/navbar/navabar";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Teachers } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyBookings() {


    const role = useAppSelector((state) => state.login.auth?.role)
    const router = useRouter()
    useEffect(() => {
        if (role === undefined || role === "Admin") {
            router.push("/services");
        }
    }, [role, router]);
    
    const booking = useAppSelector((state) => state.allBooking.bookings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllBookings({}));
    }, [dispatch]);
    const { loading } = useAppSelector((state) => state.allBooking);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [loading]);



    return (
        <>
            <Navbar />
            <Typography sx={{ fontSize: "60px", textAlign: "center", mt: 10, fontWeight: 800 }}>
                All Your Bookings
            </Typography>

            {loading ? (<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>) : booking.length === 0 ? (
                <Typography sx={{ fontSize: "20px", textAlign: "center", mt: 5 }}>
                    No bookings found.
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 3,
                        mt: 3,
                        px: 2,
                        mb: 5
                    }}
                >
                    {booking.map((b: any) => (
                        <SingleBookingCard key={b.bookingId} booking={b} />
                    ))}
                </Box>
            )}
        </>
    );
}



