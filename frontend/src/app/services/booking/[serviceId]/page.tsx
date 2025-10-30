"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import Navbar from "@/components/navbar/navabar";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    Paper,
    TextField,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { bookServiceThunk } from "@/app/redux/thunk/book.service.thunk";
import { toast, ToastContainer } from "react-toastify";
import { getUnavailableSlots } from "@/app/redux/thunk/slots/unavailable.slot.thunk";
import PaymentSystem from "@/app/paymentSystem/page";
import { setBookingDetails } from "@/app/redux/slice/add.booking.slice";

export default function Bookings() {
    const param = useParams();
    const id = Number(param.serviceId);
    const service = useAppSelector((state) => state.service.servicelist?.services);
    const clickedService = service?.find((s) => s.serviceId === id);

    const [selectedSlot, setSelectedSlot] = useState<Dayjs | null>(null);
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(dayjs());
    const [error, setError] = useState<string>("");
    const [pay, setPay] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const slots = useAppSelector((state) => state.unavailableSlot.slots);



    useEffect(() => {
        dispatch(getUnavailableSlots());
    }, [dispatch]);


    useEffect(() => {
        if (bookingDate && selectedSlot && mobileNumber.length === 10) {
            dispatch(
                setBookingDetails({
                    serviceId: id,
                    date: bookingDate.toISOString(),
                    slot: selectedSlot.format("HH:mm"),
                    phoneNo: mobileNumber,
                })
            );
        }
    }, [bookingDate, selectedSlot, mobileNumber, id, dispatch]);


    const disabledRanges = slots
        .filter((slot) => bookingDate && dayjs(slot.date).isSame(bookingDate, "day"))
        .map((slot) => ({
            start: dayjs(`${slot.date}T${slot.start_time}`),
            end: dayjs(`${slot.date}T${slot.end_time}`),
        }));


    const isTimeDisabled = (time: Dayjs) => {
        return disabledRanges.some(
            (range) => (time.isSame(range.start) || time.isAfter(range.start)) && time.isBefore(range.end)
        );
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
            if (value.length === 10) setError("");
        }
    };

    const handleBookNow = async () => {
        setPay(true);
        if (!bookingDate) return setError("Please select a booking date.");
        if (!selectedSlot) return setError("Please select a time.");
        if (mobileNumber.length !== 10) return setError("Enter a valid 10-digit mobile number.");
        if (isTimeDisabled(selectedSlot)) {
            setPay(false);
            return toast.error("Selected time is unavailable. Please choose another time.");
        }

        try {
            const res = await dispatch(
                bookServiceThunk({
                    serviceId: id,
                    date: bookingDate.toISOString(),
                    slot: selectedSlot.format("HH:mm"),
                    phoneNo: mobileNumber,
                    paymentStatus: 'Pending'
                })
            );

            if (res.meta.requestStatus === "fulfilled") {
                toast.success("Booking successful! See you soon.");
                setTimeout(() => router.push("/services/mybookings"), 3000);
            } else {
                toast.error(res.payload || "Booking failed");
            }
        } catch (err) {
            toast.error("Booking failed");
        }
    };

    if (!clickedService) {
        return (
            <>
                <Navbar />
                <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
                    Service not found.
                </Typography>
            </>
        );
    }

    const amount = clickedService.price - (clickedService.price * clickedService.discount) / 100;

    const shouldDisableTime = (timeValue: Dayjs, view: string) => {
        if (!bookingDate) return false;
        const testTime = dayjs(bookingDate)
            .hour(timeValue.hour())
            .minute(timeValue.minute());
        return isTimeDisabled(testTime);
    };


    return (
        <>
            <Navbar />
            <ToastContainer />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", mt: 5, px: 3 }}>
                <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, width: "90%", maxWidth: 900, boxShadow: 4, borderRadius: 4 }}>
                    <CardMedia
                        component="img"
                        image={clickedService.imageUrl}
                        alt={clickedService.title}
                        sx={{ width: { xs: "100%", md: "45%" }, height: 300, borderRadius: "16px 0 0 16px", objectFit: "cover" }}
                    />
                    <CardContent sx={{ flex: 1, p: 4 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {clickedService.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={2}>
                            {clickedService.description}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <CurrencyRupeeIcon fontSize="small" />
                            <Typography variant="h6" sx={{ ml: 0.5 }}>
                                {clickedService.price}
                            </Typography>
                            {clickedService.discount > 0 && (
                                <Typography variant="body2" color="green" sx={{ ml: 2, fontWeight: "bold" }}>
                                    {clickedService.discount}% OFF
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                {clickedService.time} minutes
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                            Category: <strong style={{ color: "#1976d2" }}>{clickedService.category}</strong>
                        </Typography>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Select Booking Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={bookingDate}
                                    minDate={dayjs()}
                                    onChange={(newDate) => setBookingDate(newDate)}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Select Time
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    value={selectedSlot}
                                    onChange={(newTime) => {
                                        if (newTime && !isTimeDisabled(newTime)) setSelectedSlot(newTime);
                                        else {
                                            toast.error("This Time slot is Booked");
                                            setSelectedSlot(null)
                                        };
                                    }}
                                    minutesStep={5}
                                    // minTime={
                                    //     bookingDate && dayjs(bookingDate).isSame(dayjs(), "day")
                                    //         ? dayjs()
                                    //         : dayjs("00:00", "HH:mm")
                                    // } 
                                    minTime={dayjs("09:00", "HH:mm")}   // restrict start time
                                    maxTime={dayjs("21:00", "HH:mm")}
                                    ampm={false}
                                    slotProps={{ textField: { fullWidth: true } }}
                                    shouldDisableTime={shouldDisableTime}
                                />
                            </LocalizationProvider>
                        </Box>

                        {disabledRanges.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" color="error" gutterBottom>
                                    Unavailable Slots:
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {disabledRanges.map((range, index) => (
                                        <Paper
                                            key={index}
                                            sx={{
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: 1,
                                                backgroundColor: "#f5f5f5",
                                                color: "#d32f2f",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            {range.start.format("HH:mm")} - {range.end.format("HH:mm")}
                                        </Paper>
                                    ))}
                                </Box>
                            </Box>
                        )}


                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Enter Mobile Number
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter 10-digit mobile number"
                                value={mobileNumber}
                                onChange={handleMobileChange}
                                inputProps={{ maxLength: 10 }}
                                error={!!error && mobileNumber.length !== 10}
                                helperText={error && mobileNumber.length !== 10 ? error : ""}
                            />
                        </Box>


                        {selectedSlot && bookingDate && (
                            <Paper elevation={2} sx={{ p: 2, mt: 3, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Billing Summary
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                    <Typography variant="body2">Service Charge</Typography>
                                    <Typography variant="body2">₹{clickedService.price}</Typography>
                                </Box>
                                {clickedService.discount > 0 && (
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="body2">Discount</Typography>
                                        <Typography variant="body2" color="green">
                                            -₹{((clickedService.price * clickedService.discount) / 100).toFixed(2)}
                                        </Typography>
                                    </Box>
                                )}
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        Total
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        ₹{amount.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Paper>
                        )}


                        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                disabled={!selectedSlot || !bookingDate || mobileNumber.length !== 10 || pay}
                                onClick={handleBookNow}
                            >
                                On Site Payment
                            </Button>

                            {selectedSlot && bookingDate && mobileNumber.length === 10 && (
                                <PaymentSystem amount={amount} />
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
