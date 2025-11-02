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
import style from "./page.module.css"
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
            <Box sx={{
                textAlign: "center", mt: 8, py: 6,
                background: "linear-gradient(180deg, #fffaf3, #ffffff)",
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: "#1a1a1a",
                        letterSpacing: "0.5px",
                        fontFamily: "'Playfair Display', serif",
                    }}
                >
                    Book Your{" "}
                    <Box
                        component="span"
                        sx={{
                            background: "linear-gradient(90deg, #c5a446, #e6cf95)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Luxe
                    </Box>{" "}
                    Experience
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "#6b6b6b",
                        mt: 1,
                        fontFamily: "'Poppins', sans-serif",

                    }}
                >
                    Reserve your appointment with our expert stylists and transform your look today
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 10,
                    px: 3,

                }}
            >
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        width: "95%",
                        maxWidth: 950,
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        borderRadius: 5,
                        overflow: "hidden",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                        },
                        background: "linear-gradient(135deg, #ffffff, #f7f9fc)",
                    }}
                >
                    {/* Image Section */}
                    <CardMedia
                        component="img"
                        image={clickedService.imageUrl}
                        alt={clickedService.title}
                        sx={{
                            width: { xs: "100%", md: "45%" },
                            height: { xs: 250, md: "auto" },
                            objectFit: "cover",
                            transition: "transform 0.4s ease",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                    />

                    {/* Content Section */}
                    <CardContent sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            gutterBottom
                            sx={{
                                color: "#1e293b",
                                letterSpacing: "0.5px",
                            }}
                        >
                            {clickedService.title}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" mb={2} sx={{ lineHeight: 1.6 }}>
                            {clickedService.description}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* Price Section */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <CurrencyRupeeIcon fontSize="small" color="primary" />
                            <Typography variant="h6" sx={{ ml: 0.5, color: "#0f172a" }}>
                                {clickedService.price}
                            </Typography>
                            {clickedService.discount > 0 && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ml: 2,
                                        fontWeight: "bold",
                                        color: "#16a34a",
                                        backgroundColor: "rgba(22,163,74,0.1)",
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                    }}
                                >
                                    {clickedService.discount}% OFF
                                </Typography>
                            )}
                        </Box>

                        {/* Time Section */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                {clickedService.time} minutes
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                            Category:{" "}
                            <strong style={{ color: "#1976d2" }}>{clickedService.category}</strong>
                        </Typography>

                        {/* Date Picker */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Select Booking Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={bookingDate}
                                    minDate={dayjs()}
                                    onChange={(newDate) => setBookingDate(newDate)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            sx: {
                                                backgroundColor: "#fff",
                                                borderRadius: 2,
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>

                        {/* Time Picker */}
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
                                            setSelectedSlot(null);
                                        }
                                    }}
                                    minutesStep={5}
                                    minTime={dayjs("09:00", "HH:mm")}
                                    maxTime={dayjs("21:00", "HH:mm")}
                                    ampm={false}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            sx: { backgroundColor: "#fff", borderRadius: 2 },
                                        },
                                    }}
                                    shouldDisableTime={shouldDisableTime}
                                />
                            </LocalizationProvider>
                        </Box>

                        {/* Disabled Slots */}
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
                                                backgroundColor: "#fee2e2",
                                                color: "#b91c1c",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            {range.start.format("HH:mm")} - {range.end.format("HH:mm")}
                                        </Paper>
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* Mobile Number */}
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
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        </Box>

                        {/* Billing Summary */}
                        {selectedSlot && bookingDate && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    mt: 3,
                                    borderRadius: 3,
                                    backgroundColor: "#f8fafc",
                                }}
                            >
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

                        {/* Buttons */}
                        <Box  className={style.buttonBox} sx={{ mt: 4, display: "flex",justifyContent: "space-between", flexWrap: "wrap" }}>
                            <Button
                                variant="contained"
                                size="large"
                                disabled={!selectedSlot || !bookingDate || mobileNumber.length !== 10 || pay}
                                onClick={handleBookNow}
                                sx={{
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.2,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    backgroundColor: "#d9a521", // gold shade
                                    boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
                                    "&:hover": {
                                        backgroundColor: "#b5891b", // darker gold on hover
                                        boxShadow: "0 6px 18px rgba(25, 118, 210, 0.4)",
                                    },
                                }}
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
