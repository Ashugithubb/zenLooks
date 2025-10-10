"use client"
import Navbar from "@/components/navbar/navabar";
import ServiceCard from "@/components/service-card/card";
import { Box, Button, colors, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import CreateServiceDialog from "@/components/service/add-service";
import { useEffect, useState } from "react";
import { deleteServiceThunk, getServiceThunk } from "../redux/thunk/service.thunk";
import { toast } from "react-toastify";
export default function Services() {
    const role = useAppSelector((state) => state.login.auth?.role);
    const { total, page, limit, services } = useAppSelector((state) => state.service.servicelist) ?? {};
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getServiceThunk({}))
    },[dispatch])

    return (
        <>
            <Navbar />

            <Typography sx={{ textAlign: "center" }} variant="h3">See all our Services</Typography>
            <Box sx={{ paddingBottom: "50px", display: "flex", justifyContent: "space-between" }}>
                {role === 'Admin' && <div>
                    <CreateServiceDialog />
                </div>}
                {role === 'Admin' ? (<Button variant="contained">All Bookings</Button>) : <Button variant="contained">My Bookings</Button>}
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-evenly" }}>
                {services?.length == 0 ? (<Typography>No Services found</Typography>) : services?.map((s) => (<ServiceCard key={s.serviceId} serviceId={s.serviceId} title={s.title} description={s.description} price={s.price} discount={s.discount} imageUrl={s.imageUrl} />))}
            </Box>
        </>
    )
}