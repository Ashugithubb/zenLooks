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
    CircularProgress,
    InputAdornment,
    Container,
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

import EventIcon from '@mui/icons-material/Event';
import SearchIcon from "@mui/icons-material/Search";
export default function Services() {
    const role = useAppSelector((state) => state.login.auth?.role);
    const { loading } = useAppSelector((state) => state.service);
    const { total = 0, page = 1, limit = 3, services = [], } =
        useAppSelector((state) => state.service.servicelist) ?? {};
    const dispatch = useAppDispatch();
    const router = useRouter();


    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        const trimmedSearch = searchTerm.trim();
        if (trimmedSearch.length > 0 || searchTerm === "") {
            dispatch(getServiceThunk({ page: currentPage, limit: 6, search: trimmedSearch || undefined }));
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
        router.push("/services/allbookings");
    };


    return (
        <>

            <Navbar />
            <Typography className={style.seeAll} sx={{ textAlign: "center", mt: 3, fontSize: "60px", fontWeight: "700", color: "black", marginTop: "6%" }}>
                Our Services
            </Typography>

       
                <Container  className={style.container}sx={{padding:"0px 28px" }}>
                    <Box className={style.mainBOX}
                        sx={{
                            mb:3,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "30px",
                        }}
                    >
                        <Box className={style.searchBox}>
                            <TextField
                                placeholder="Search services..."
                                variant="outlined"
                                size="small"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className={style.searchField}
                                sx={{
                                    width: "500px",
                                    backgroundColor: "#fff",
                                    borderRadius: "50px",
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "50px",
                                        paddingLeft: "8px",
                                        "& fieldset": {
                                            borderColor: "#e0e0e0",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#f68043",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#f68043",
                                        },
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "8px 12px 8px 0",
                                    },
                                    '& .MuiInputBase-root': {
                                        paddingLeft: 0,  
                                    },
                                    '& .MuiInputAdornment-root': {
                                        marginRight: '-10px', 
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: "#6e6e6e", ml: 1, }} />
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </Box>




                        {role === "Admin" ? (
                            <>

                                <CreateServiceDialog />
                                <Button
                                    onClick={handleAllBookings}
                                    variant="contained"
                                    className={style.allBooking}
                                    sx={{ top: -2, marginLeft: "-20px" }}
                                >
                                    <EventIcon sx={{ marginRight: "6px" }} /> All Bookings
                                </Button></>

                        ) : (role == "User") ? (
                            <Button
                                className={style.myBooking}
                                onClick={() => router.push("/services/mybookings")}
                                variant="contained"
                            >
                                <EventIcon sx={{ marginRight: "6px" }} /> My Bookings
                            </Button>

                        ) : (<></>)}

                    </Box>


                    <Box
                        className={style.cardBox}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 5,
                            justifyContent: "flex-start",
                            alignItems: "center",
                            minHeight: "300px",

                        }}
                    >
                        {loading ? (<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center",marginLeft:"50%" }}>
                            <CircularProgress />
                        </Box>) : services?.length === 0 ? (
                            <Typography sx={{ mt: 5 , ml:"50%"}}>No Services found</Typography>
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

                </Container>
                {!loading && total > limit && (
                    <Stack spacing={2} alignItems="center" sx={{ pb: 5,mt:3 }}>
                        <Pagination
                            count={Math.ceil(total / limit)}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "black",
                                },
                                "& .MuiPaginationItem-root.Mui-selected": {
                                    backgroundColor: "#e59b68",
                                    color: "white",
                                },
                                "& .MuiPaginationItem-root:hover": {
                                    backgroundColor: "#f2c19a",
                                },
                            }}
                        />
                    </Stack>

                )}
          
        </>
    );

}