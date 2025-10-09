'use client'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import {
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/app/redux/hook/hook';
// import { UserInfo } from '@/app/redux/slice/user.slice';
// import { loginUser } from '@/app/redux/slice/auth.slice';
import style from './page.module.css'


export const loginSchema = z.object({
  email: z.string().min(6,{ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const notify = () => toast("Login Successfull!");
  const onSubmit = async (data: LoginFormData) => {
    // const res = await dispatch(loginUser(data));

    // if (res.meta.requestStatus === 'fulfilled') {
    //   toast.success("Login successful!");
    //   router.push('/home');
    // } else {
    //   toast.error(res.payload || "Login failed");
    // }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (

   
     <Box className={style.loginContainer}>
      <Box className={style.loginCard}>
        <Typography className={style.title}>Welcome Back!</Typography>
        <Typography className={style.subtitle}>
          Log in to continue your ZenLook experience
        </Typography>

        <Box className={style.form}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className={style.input}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className={style.input}
          />
          <Button variant="contained" fullWidth className={style.btn}>
            Login
          </Button>
        </Box>

        <Typography className={style.footerText}>
          Don’t have an account? <span>Sign Up</span>
        </Typography>
      </Box>
    </Box>
  );
}