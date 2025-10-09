import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetServiceQuery } from "../slice/services.slice";
import qs from 'qs'
import { stat } from 'fs';
import { id } from 'zod/v4/locales';
import axios from "axios";
export const getServiceThunk = createAsyncThunk(
    'contact/getcontact',
    async (query: GetServiceQuery, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3001/services`, {
                withCredentials: true,
                params: query,
                paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
            });
            console.log("services", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch service');
        }
    }
);