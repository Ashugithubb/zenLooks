"use client";
import Navbar from "@/components/navbar/navabar";
import ServiceCard from "@/components/service-card/card";
import {
    Box,
    Button,
    Typography,
    TextField,
    Pagination,
    Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import CreateServiceDialog from "@/components/service/add-service";
import { useEffect, useState } from "react";
import { deleteServiceThunk, getServiceThunk } from "../redux/thunk/service.thunk";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import style from './page.module.css'
import Cookies from "js-cookie";
import { clearUser } from "../redux/slice/login.slice";

export default function Services() {
    const role = useAppSelector((state) => state.login.auth?.role);
    const { total = 0, page = 1, limit = 3, services = [] } =
        useAppSelector((state) => state.service.servicelist) ?? {};
    const dispatch = useAppDispatch();
    const router = useRouter();


    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        const trimmedSearch = searchTerm.trim();


        if (trimmedSearch.length > 0 || searchTerm === "") {
            dispatch(getServiceThunk({ page: currentPage, limit, search: trimmedSearch || undefined }));
        }
    }, [dispatch, currentPage, searchTerm]);



    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleAllBookings = () => {
        // const token = Cookies.get("access_token");

        // if (token) {
        router.push("/services/allbookings");
        // }
        // else {
        //     dispatch(clearUser());
        //     toast.error("Login again!");

        // }

    };



    return (
        <>
            <Navbar />
            <Typography sx={{ textAlign: "center", mt: 3 }} variant="h3">
                See all our Services
            </Typography>

            <Box
                sx={{
                    paddingY: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <Box className={style.searchBox}>
                    <TextField
                        label="Search services..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={style.searchField}
                        sx={{
                            width: "250px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "30px",
                                transition: "all 0.3s ease",

                            },
                        }}
                    /></Box>

                <Box sx={{ display: "flex", gap: 2, paddingLeft: "40px" }}>
                    {role === "Admin" && <CreateServiceDialog />}
                    {role === "Admin" ? (
                        <Button
                            onClick={handleAllBookings}
                            variant="contained"
                        >
                            All Bookings
                        </Button>
                    ) : (
                        <Button className={style.myBooking} onClick={() => router.push("/services/mybookings")} variant="contained">My Bookings</Button>
                    )}
                </Box>
            </Box>


            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    justifyContent: "space-evenly",
                    minHeight: "300px",
                    padding: "30px",
                }}
            >
                {services?.length === 0 ? (
                    <Typography sx={{ mt: 5 }}>No Services found</Typography>
                ) : (
                    services.map((s) => (
                        <ServiceCard
                            key={s.serviceId}
                            serviceId={s.serviceId}
                            title={s.title}
                            description={s.description}
                            price={s.price}
                            discount={s.discount}
                            imageUrl={s.imageUrl}
                        />
                    ))
                )}
            </Box>


            {total > limit && (
                <Stack spacing={2} alignItems="center" sx={{ pb: 5 }}>
                    <Pagination
                        count={Math.ceil(total / limit)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>
            )}
        </>
    );

}