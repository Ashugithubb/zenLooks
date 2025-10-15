"use client"
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { bookServiceThunk } from "../redux/thunk/book.service.thunk";
import { resetBooking } from "../redux/slice/add.booking.slice";
declare global {
  interface Window {
    Razorpay: any;
  }
}
interface paymentProp {
  amount: number
}

export default function PaymentSystem({ amount }: paymentProp) {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.b00king);
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const payNow = async () => {
    if (!amount) return alert("Please Select Booking Slots First");

    try {

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: "receipt#1",
          notes: {},
        }),
      });

      const order = await response.json();


      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ZenLook",
        description: "Test Transaction",
        order_id: order.id,
        callback_url: "/api/verify-payment",
        prefill: {
          name: "Ashutosh Kumar",
          email: "itsray650@gmail.com",
          contact: "9878719602",
        },
        theme: {
          color: "#F37254",
        },
        handler: function (response: any) {
          fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "ok") {
                const bookAndClear = async () => {
                  if (
                    booking.serviceId &&
                    booking.date &&
                    booking.slot &&
                    booking.phoneNo
                  ) {
                    console.log("how many times");
                    const res = await dispatch(
                      bookServiceThunk({
                        serviceId: booking.serviceId,
                        date: booking.date,
                        slot: booking.slot,
                        phoneNo: booking.phoneNo,
                        paymentStatus: "Paid"
                      })
                    );
                    if (res.meta.requestStatus === "fulfilled") {
                      dispatch(resetBooking());
                    }
                  }
                };
                bookAndClear();
                setTimeout(() => {
                  window.location.href = "/payment-success";
                }, 3000)
              } else {
                alert("Payment verification failed");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error verifying payment");
            });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating order");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          payNow();
        }}
      >
        <Button
          variant="outlined"
          size="large"
          type="submit"
          disabled={
            !amount
          }
        >
          Pay Online
        </Button>

      </form>
    </div>
  );
}