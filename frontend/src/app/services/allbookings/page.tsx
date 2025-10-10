"use client"
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import SearchComponent from "@/components/bookings/search";
import GenderSelectComponent from "@/components/bookings/category";

interface FilterValues {
  search: string;
  gender: string;
}

const FiltersComponent = () => {
  const dispatch = useAppDispatch();

  const { control, watch } = useForm<FilterValues>({
    defaultValues: {
      search: "",
      gender: "",
    },
  });


  const filterValues = watch();


  useEffect(() => {
    dispatch(getAllBookings(filterValues));
  }, [filterValues, dispatch]);

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Controller
        name="search"
        control={control}
        render={({ field }) => <SearchComponent {...field} placeholder="Search bookings..." />}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => <GenderSelectComponent {...field} placeholder="Select Gender" />}
      />
    </div>
  );
};

export default FiltersComponent;
