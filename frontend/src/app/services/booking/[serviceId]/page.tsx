"use client"
import Navbar from "@/components/navbar/navabar";
import { Button, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function Bookings(){
    const param = useParams();

    return(
        <>
        <Navbar/>
        <Typography>{param.serviceId}</Typography>
        <Button variant="contained">Book</Button>
        <Button>Payment</Button>
        </>
    )
}