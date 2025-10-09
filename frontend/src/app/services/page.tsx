"use client"
import Navbar from "@/components/navbar/navabar";
import ServiceCard from "@/components/service-card/card";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import CreateServiceDialog from "@/components/service/add-service";
import { useEffect, useState } from "react";
import { getServiceThunk } from "../redux/thunk/service.thunk";
export default function Services() {
    const role = useAppSelector((state) => state.login.auth?.role);
    const { total, page, limit, services } = useAppSelector((state) => state.service.servicelist) ?? {};
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getServiceThunk({}))
    })
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
                {services?.map((s) => (<ServiceCard key={s.serviceId} title={s.title} description={s.description} price={s.price} discount={s.discount} imageUrl={s.imageUrl}/>)
                )}
                {/* <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} />
                <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} />
                <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} />
                <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} />
                <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} />
                <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} />
                <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} />
                <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} />
                <ServiceCard title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={50} /> */}
            </Box>
        </>
    )
}