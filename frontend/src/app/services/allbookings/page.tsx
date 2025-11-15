"use client"
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import SearchComponent from "@/components/bookings/search";
import GenderSelectComponent from "@/components/bookings/category";
import Navbar from "@/components/navbar/navabar";
import TimeSelector from "@/components/bookings/slot";
import { Dayjs } from "dayjs";
import DateRangeFilter from "@/components/bookings/date.filter/date";
import BookingCard from "@/components/bookings/booking.card/booking-cards";
import { Typography, Card, CardContent, Box, Stack, Pagination, CircularProgress } from "@mui/material";
import UnavailableSlotForm from "@/components/unavilable-slots/unavilable.slots";
import Grid from "@mui/material/Grid";
import style from "./page.module.css"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/pr0tectecR0utes/pr0tected";

interface FilterValues {
  search: string;
  category: string;
  slot: Dayjs | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const FiltersComponent = () => {

  const role = useAppSelector((state) => state.login.auth?.role)
  const router = useRouter()
 
  const bookings = useAppSelector((state) => state.allBooking.bookings) ?? [];
  const { total, page, limit } = useAppSelector((state) => state.allBooking);
  const dispatch = useAppDispatch();

  const { control, watch, setValue } = useForm<FilterValues>({
    defaultValues: {
      search: "",
      category: "",
      slot: null,
      startDate: null,
      endDate: null,
    },
  });

  const watchedValues = watch();

  const filterValues = React.useMemo(() => watchedValues, [JSON.stringify(watchedValues)]);
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {

    if (filterValues.search && filterValues.search.trim().length === 0) return;

    const formattedFilters = {
      page: currentPage,
      limit: 3,
      search: filterValues.search?.trim() || undefined,
      category: filterValues.category || undefined,
      slot: filterValues.slot ? filterValues.slot.format("HH:mm") : undefined,
      startDate: filterValues.startDate ? filterValues.startDate.toISOString() : undefined,
      endDate: filterValues.endDate ? filterValues.endDate.toISOString() : undefined,
    };

    const fetchBookings = async () => {
      try {
        const res = await dispatch(getAllBookings(formattedFilters));
        if (res.meta.requestStatus === "rejected") {
          localStorage.clear();
          toast.error(res.payload || "seesion Expired");
          return;
        }

      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Something went wrong while fetching bookings");
      }

    };
    fetchBookings()
  }, [filterValues, dispatch, currentPage]);


  const [open, setOpen] = useState(false);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const { loading } = useAppSelector((state) => state.allBooking);
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);


  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "center" },
            gap: { xs: 0, sm: 1, md: 0 },
            mx: { xs: 2, sm: 5, md: 10 },
            mt: { xs: 13, sm: 10, md: 12 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontSize={{ xs: 24, sm: 30, md: 40 }}
              fontWeight={700}
              color="#eea84f"
            >
              Salon Bookings
            </Typography>
            <Typography
              variant="caption"
              fontSize={{ xs: 13, sm: 15, md: 17 }}
              fontWeight={300}
              color="#99838f"
            >
              Manage and track all your appointments
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              width: { xs: "auto", sm: "auto", md: "auto" },
              mt: { xs: 2, md: 0 },
            }}
          >
            <UnavailableSlotForm />
          </Box>
        </Box>


        <Box sx={{ mt: 3, px: 7 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#fafafa",
              mb: 4,
            }}
          >
            <CardContent >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ textAlign: "center", mb: 3 }}
              >
                Bookings Filter
              </Typography>

              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={2}
                className={style.filter}
              >
                <Box>
                  <Controller
                    name="search"
                    control={control}
                    render={({ field }) => (
                      <SearchComponent {...field} placeholder="Search bookings..." />
                    )}
                  />
                </Box>

                <Box

                >
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <GenderSelectComponent {...field} placeholder="Select Gender" />
                    )}
                  />
                </Box>

                <Box

                >
                  <Controller
                    name="slot"
                    control={control}
                    render={({ field }) => (
                      <TimeSelector {...field} label="Select Time" />
                    )}
                  />
                </Box>

                <Box

                >
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DateRangeFilter
                        startDate={field.value}
                        endDate={filterValues.endDate}
                        onStartChange={field.onChange}
                        onEndChange={(val) => setValue("endDate", val)}
                      />
                    )}
                  />
                </Box>
              </Box>

            </CardContent>
          </Card>

          {loading ? (<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>) : bookings.length === 0 ? (
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              sx={{ mt: 8 }}
            >
              No Booking Found
            </Typography>
          ) : (
            <Box
              display="flex"
              flexWrap="wrap"
              gap={2.5}
              justifyContent="center"
            >
              {bookings.map((b: any) => (
                <Box
                  key={b.bookingId}
                  flexBasis={{ xs: "100%", sm: "68%", md: "31%" }}
                  flexGrow={1}
                  display="flex"
                  justifyContent="center"
                >
                  <BookingCard booking={b} />
                </Box>
              ))}
            </Box>


          )}
        </Box>


        {!loading && total > limit && (
          <Stack spacing={1} alignItems="center" sx={{ pb: 5, marginTop: "30px" }}>
            <Pagination
              count={Math.ceil(total / limit)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        )}
      </>
    </ProtectedRoute>
  );
};

export default FiltersComponent;
