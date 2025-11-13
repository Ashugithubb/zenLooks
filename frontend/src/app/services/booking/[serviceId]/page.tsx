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
        if (mobileNumber.length !== 10) return setError("Enter a valid 10-digit mobile number.")

        try {
            const res = await dispatch(
                bookServiceThunk({
                    serviceId: id,
                    date: bookingDate.format("YYYY-MM-DD"),
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


    //Time Logic
    // function normalize(t: any) {
    //     return t.second(0).millisecond(0);
    // }

    // const disabledRanges = slots
    //     .filter((slot) => bookingDate && dayjs(slot.date).isSame(bookingDate, "day"))
    //     .map((slot) => ({
    //         start: dayjs(`${slot.date}T${slot.start_time}`),
    //         end: dayjs(`${slot.date}T${slot.end_time}`),
    //     }));


    // const isTimeDisabled = (time: any) => {
    //     const serviceDuration = clickedService!.time;

    //     const requestedStart = normalize(time);
    //     const requestedEnd = normalize(time.add(serviceDuration, "minute"));

    //     return disabledRanges.some((range) => {
    //         const rangeStart = normalize(range.start);
    //         const rangeEnd = normalize(range.end);
    //         const noOverlap =
    //             requestedEnd.isSame(rangeStart) || requestedEnd.isBefore(rangeStart) ||
    //             requestedStart.isSame(rangeEnd) || requestedStart.isAfter(rangeEnd);

    //         return !noOverlap;
    //     });
    // };

    // const shouldDisableTime = (timeValue: any) => {
    //     if (!bookingDate) return false;

    //     const serviceDuration = clickedService.time;
    //     const testStart = normalize(dayjs(bookingDate).hour(timeValue.hour()).minute(timeValue.minute()));
    //     const testEnd = normalize(testStart.add(serviceDuration, "minute"));


    //     return disabledRanges.some((range) => {
    //         const rangeStart = normalize(range.start);
    //         const rangeEnd = normalize(range.end);


    //         const overlaps =
    //             testStart.isBefore(rangeEnd) &&
    //             testEnd.isAfter(rangeStart) &&
    //             !testStart.isSame(rangeEnd);

    //         return overlaps;
    //     });
    // };



    const normalize = (time: any) => dayjs(time).second(0).millisecond(0);

    const disabledRanges = slots
        .filter(
            (slot) => bookingDate && dayjs(slot.date).isSame(bookingDate, "day")
        )
        .map((slot) => ({
            start: dayjs(`${slot.date}T${slot.start_time}`),
            end: dayjs(`${slot.date}T${slot.end_time}`),
        }));


    const shouldDisableTime = (timeValue: any, view: "hours" | "minutes" | "seconds") => {
        if (!bookingDate) return false;

        const serviceDuration = clickedService?.time || 0;
        const now = dayjs();

        if (view === "hours" || view === "seconds") return false;

        const testStart = normalize(
            dayjs(bookingDate)
                .hour(timeValue.hour())
                .minute(timeValue.minute())
        );
        const testEnd = normalize(testStart.add(serviceDuration, "minute"));

        if (dayjs(bookingDate).isSame(now, "day") && testStart.isBefore(now)) {
            return true;
        }
        const overlaps = disabledRanges.some(({ start, end }) => {
            const rangeStart = normalize(start);
            const rangeEnd = normalize(end);

            return (
                testStart.isBefore(rangeEnd) &&
                testEnd.isAfter(rangeStart) &&
                !testStart.isSame(rangeEnd)
            );
        });

        return overlaps;
    };



    const filteredRanges = [...disabledRanges]
        // Hide past slots for today
        .filter((range) => {
            const now = dayjs();
            const isToday = range.start.isSame(now, "day");
            return !isToday || range.end.isAfter(now);
        })
        // Sort ascending by start time
        .sort((a, b) => a.start.diff(b.start));


    return (
        <>
            <Navbar />

            <Box
                sx={{
                    textAlign: "center",
                    mt: { xs: 6, sm: 6, md: 8 },
                    py: { xs: 4, sm: 5, md: 6 },
                    background: "linear-gradient(180deg, #fffaf3, #ffffff)",
                    px: { xs: 2, sm: 4 },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: "#1a1a1a",
                        letterSpacing: "0.5px",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: {
                            xs: "1.8rem",
                            sm: "2.4rem",
                            md: "3rem",
                        },
                        lineHeight: { xs: 1.2, sm: 1.3 },
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
                        mt: { xs: 1, sm: 2 },
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        maxWidth: "600px",
                        mx: "auto", // center the text
                        px: { xs: 1, sm: 0 },
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


                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Select Time
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    value={selectedSlot}
                                    onChange={(newTime) => {
                                        if (!newTime) return;

                                        const minuteOptions = [0, 15, 30, 45];

                                        // Check if ALL minutes in this hour are disabled
                                        const allMinutesDisabled = minuteOptions.every((m) => {
                                            const testTime = dayjs(newTime).minute(m);
                                            return shouldDisableTime(testTime, "minutes");
                                        });

                                        if (allMinutesDisabled) {
                                            // If all minutes are disabled for that hour → reset selection
                                            setSelectedSlot(null);
                                            return;
                                        }

                                        // Otherwise, find the first available minute and use it
                                        const firstAvailableMinute = minuteOptions.find((m) => {
                                            const testTime = dayjs(newTime).minute(m);
                                            return !shouldDisableTime(testTime, "minutes");
                                        });

                                        const finalTime = shouldDisableTime(newTime, "minutes")
                                            ? dayjs(newTime).minute(firstAvailableMinute ?? 0)
                                            : newTime;

                                        setSelectedSlot(finalTime);
                                    }}
                                    shouldDisableTime={shouldDisableTime}
                                    minutesStep={15}
                                    minTime={dayjs("09:00", "HH:mm")}
                                    maxTime={dayjs("21:00", "HH:mm")}
                                    ampm={false}
                                />

                            </LocalizationProvider>

                        </Box>

                        {/* Disabled Slots */}
                        {/* {disabledRanges.length > 0 && (
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
                        )} */}


                        {/* {disabledRanges.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" color="error" gutterBottom>
                                    Unavailable Slots:
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {[...disabledRanges]

                                        .filter((range) => {
                                            const now = dayjs();
                                            const isToday = range.start.isSame(now, "day");

                                            return !isToday || range.end.isAfter(now);
                                        })

                                        .sort((a, b) => a.start.diff(b.start))

                                        .map((range, index) => (
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
                        )} */}
                        {filteredRanges.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" color="error" gutterBottom>
                                    Unavailable Slots:
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {filteredRanges.map((range, index) => (
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
                        <Box className={style.buttonBox} sx={{ mt: 4, display: "flex", justifyContent: "space-between", flexWrap: "wrap", mb: 2 }}>
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

                            {!pay && selectedSlot && bookingDate && mobileNumber.length === 10 && (
                                <PaymentSystem amount={amount} />
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>

        </>
    );
}
