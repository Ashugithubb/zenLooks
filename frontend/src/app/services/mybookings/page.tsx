"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import SingleBookingCard from "@/components/bookings/mybookings/my-bookings.card";
import Navbar from "@/components/navbar/navabar";
import Footer from "@/components/newFooter/footer";
import { Box, CircularProgress, Typography, Pagination, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "../../../components/bookings/mybookings/mybooking.module.css";
import ProtectedRoute from "@/app/redux/protectedRoutes/protectedRoute";

export default function MyBookings() {
    const role = useAppSelector((state) => state.login.auth?.role);
    const router = useRouter();

    useEffect(() => {
        if (role === undefined || role === "Admin") {
            router.replace("/services");
        }
    }, [role, router]);

    const booking = useAppSelector((state) => state.allBooking.bookings);
    const { total, page, limit } = useAppSelector((state) => state.allBooking);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getAllBookings({ page: currentPage, limit: 3 }));
    }, [dispatch, currentPage, limit]);

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

    const totalPages = Math.ceil(total / limit) || 1;

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <Typography
                className={style.allBookings}
                sx={{ fontSize: "60px", textAlign: "center", mt: 10, fontWeight: 800 }}
            >
                All Your Bookings
            </Typography>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </Box>
            ) : booking.length === 0 ? (
                <Typography sx={{ fontSize: "20px", textAlign: "center", mt: 5 }}>
                    No bookings found.
                </Typography>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",

                            paddingLeft: "128px",
                            paddingRight: "128px",
                            gap: 3,
                            mt: 3,
                            mb: 5,
                        }}
                        className={style.allCardBox}
                    >
                        {booking.map((b: any) => (
                            <SingleBookingCard key={b.bookingId} booking={b} />
                        ))}
                    </Box>




                    {!loading && total > limit && (
                        <Stack spacing={1} alignItems="center" sx={{ pb: 5, }}>
                            <Pagination
                                count={Math.ceil(total / limit)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Stack>
                    )}
                </>
            )}

        </ProtectedRoute >

    );
}
