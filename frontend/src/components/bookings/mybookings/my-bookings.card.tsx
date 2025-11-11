"use client"
import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Booking } from "@/app/redux/slice/booking.slice";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { cancelBookingThunk } from "@/app/redux/thunk/cancel.booking.thunk";
import { toast } from "react-toastify";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import { useRouter } from "next/navigation";
import style from "./mybooking.module.css";
interface BookingCardProps {
  booking: Booking;
}

const SingleBookingCard = ({ booking }: BookingCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const bookingDateTime = new Date(`${booking.date}T${booking.slot}`);


  const gracePeriodMs = (booking?.service?.time + 5) * 60 * 1000;
  const bookingEndTime = new Date(bookingDateTime.getTime() + gracePeriodMs);

  const isExpired = bookingEndTime.getTime() < new Date().getTime();

  const handelCancelClicked = async (id: number) => {
    const confirmCancel = confirm(
      "Are you sure you want to cancel the booking? Payments (if made) are non-refundable."
    );
    if (!confirmCancel) return;

    const res = await dispatch(cancelBookingThunk(id));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Your booking was cancelled successfully!");
      dispatch(getAllBookings({}));
    } else {
      toast.error(res.payload || "Unable to cancel booking");
    }
  };

  return (
    <Card  className={style.card}sx={{ maxWidth: 400, height: "auto", margin: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",maxHeight:"auto !important" }}>
      <Box>
        <CardMedia
          component="img"
          height="180"
          image={booking.service?.imageUrl ?? ""}
          alt={booking.service?.title ?? "Service image"}
        />
        <CardContent>
          <Typography variant="h6">{booking?.service?.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {booking?.service?.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            Price:
            {booking?.service?.discount ? (
              <>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#888",
                  }}
                >
                  <CurrencyRupeeIcon fontSize="small" />
                  {booking?.service?.price}
                </span>
                <span style={{ color: "green", fontWeight: 600 }}>
                  <CurrencyRupeeIcon fontSize="small" />
                  {(
                    booking?.service?.price -
                    (booking?.service?.price * booking?.service?.discount) / 100
                  ).toFixed(2)}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: 600 }}>
                <CurrencyRupeeIcon fontSize="small" />
                {booking?.service?.price}
              </span>
            )}
          </Typography>


          <Typography variant="subtitle2">
            Duration: {booking?.service?.time} mins | Category: {booking?.service?.category}
          </Typography>
          <hr />
          <Typography variant="body1">
            <strong>Booking Date:</strong> {booking?.date}
          </Typography>
          <Typography variant="body1">
            <strong>Slot:</strong> {booking?.slot}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {booking?.phoneNo}
          </Typography>
          <Typography variant="body1">
            <strong>Booked At:</strong>{" "}
            {new Date(booking?.bookedAt).toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <strong>Payment:</strong> {booking?.paymentStatus === 'Pending' ? (" Cash") : booking?.paymentStatus}
          </Typography>
        </CardContent>
      </Box>


      <CardActions sx={{ justifyContent: "center", pb: 2 }}>


        {booking.bookingStatus === "Completed" ? (
          <Typography variant="body1"
            sx={{
              color: "green",
              fontWeight: "bold",
            }}>
            Booking Completed
          </Typography>
        ) : isExpired ? (
          <Typography
            variant="body1"
            sx={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            Booking Expired
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={() => handelCancelClicked(booking?.bookingId)}
          >
            Cancel Booking
          </Button>
        )}

      </CardActions>
    </Card>
  );
};

export default SingleBookingCard;
