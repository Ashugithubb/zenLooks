
import { serviceSchema } from '@/components/service/schema/service.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';
interface otpSchema {
    id:number,
    otp?:string
}

export const sendOtpThunk = createAsyncThunk(
    'add/otp',
    async (data: otpSchema, thunkAPI) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/service-delivered',
                data,
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const verifyOtpThunk = createAsyncThunk(
    'add/service',
    async (data: otpSchema, thunkAPI) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/service-delivered/verify',
                data,
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);