"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar/navabar";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { bookServiceThunk } from "../redux/thunk/book.service.thunk";
import { resetBooking } from "../redux/slice/add.booking.slice";

export default function PaymentSuccess() {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.b00king);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <h1>Payment Successful</h1>
        <p>Thank you for your payment.</p>
      </div>
    </>
  );
}
