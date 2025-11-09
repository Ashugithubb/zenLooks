
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
                `${process.env.NEXT_PUBLIC_API_URL}/service-delivered`,
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
                `${process.env.NEXT_PUBLIC_API_URL}/service-delivered/verify`,
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


interface emailOtpSchema {
    name?:string
    email:string
    otp?:string
    password?:string
}

export const sendEmailOtpThunk = createAsyncThunk(
    "auth/sendOtp",
    async (data: emailOtpSchema, thunkAPI) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/email-verifiaction`,
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


export const verifyEmailOtpThunk = createAsyncThunk(
   "auth/verifyOtp",
    async (data: emailOtpSchema, thunkAPI) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/email-verifiaction/otp`,
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




export const sendForgotOtpThunk = createAsyncThunk(
    "auth/fsendOtp",
    async (data: emailOtpSchema, thunkAPI) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/email-verifiaction/forgot-password`,
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


export const resetPasswordThunk = createAsyncThunk(
    "auth/reset",
    async (data: emailOtpSchema, thunkAPI) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/user`,
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










