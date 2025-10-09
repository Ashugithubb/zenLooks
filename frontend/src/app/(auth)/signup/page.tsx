'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Link as MuiLink,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';
import { signupSchema } from './schema/user.schema';
import { useAppDispatch } from '@/app/redux/hook/hook';
// import { signupUser } from '@/app/redux/thunk/signup.user';
import style from './page.module.css'


type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName:'',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: SignupFormData) => {
        // const res = await dispatch(signupUser(data));
        // if (res.meta.requestStatus === 'fulfilled') {
        //     toast.success("Signup successful!");
        //     router.push('/login');
        // } else {
        //     toast.error(res.payload || "Signup failed");
        // }
    };

    return (
        <>
            <ToastContainer />
             <Box className={style.signupContainer}>
      <Box className={style.signupCard}>
        <Typography className={style.title}>Create Account</Typography>
        <Typography className={style.subtitle}>
          Join ZenLook and experience premium salon care
        </Typography>

        <Box className={style.form}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            className={style.input}
          />
          <TextField
            label="Email"
            type="email"
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
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            className={style.input}
          />
          <Button variant="contained" fullWidth className={style.btn}>
            Sign Up
          </Button>
        </Box>

        <Typography className={style.footerText}>
          Already have an account? <span>Login</span>
        </Typography>
      </Box>
    </Box>
            {/* <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="#f5f5f5"
            >
                <Paper elevation={3} sx={{ padding: 4, width: 450 }}>
                    <Typography variant="h5" gutterBottom>
                        Sign Up
                    </Typography>


                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        <TextField
                            label="first Name"
                            {...register('firstName')}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            fullWidth
                            margin="normal"
                        />
                    
                     <TextField
                            label="last Name"
                            {...register('lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            fullWidth
                            margin="normal"
                        />


                        <TextField
                            label="Email"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            fullWidth
                            margin="normal"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            {...register('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            fullWidth
                            margin="normal"
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Sign Up
                        </Button>

                        <Box mt={2} textAlign="center">
                            <Typography variant="body2">
                                Already have an account?{' '}
                                <MuiLink component={Link} href="/login" underline="hover">
                                    Log In
                                </MuiLink>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Box> */}
        </>
    );
}