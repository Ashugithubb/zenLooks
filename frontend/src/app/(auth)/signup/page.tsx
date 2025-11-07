'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    IconButton,
    InputAdornment,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/redux/hook/hook';
import style from './page.module.css';
import { signupSchema } from './schema/user.schema';
import { sendEmailOtpThunk, verifyEmailOtpThunk } from '@/app/redux/thunk/otp-verification/otp';
import { signupUser } from '@/app/redux/thunk/auth/signup.thunk';

export default function SignupForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
    const [otp, setOtp] = useState('');
    const [disableFields, setDisableFields] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const name = watch('name');
    const email = watch('email');

    /** Step 1 - Send OTP */
    const handleSendOtp = async () => {
        if (!name || !email) {
            toast.error("Please enter name and email first");
            return;
        }

        setLoading(true);
        setDisableFields(true); // disable fields during request

        const res = await dispatch(sendEmailOtpThunk({ name, email }));

        setLoading(false);

        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("OTP sent successfully!");
            setStep('otp');
        } else {
            toast.error(res.payload as string);
            setDisableFields(false); // re-enable if failed
        }
    };

    /** Step 2 - Verify OTP */
    const handleVerifyOtp = async () => {
        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }

        setLoading(true);
        const res = await dispatch(verifyEmailOtpThunk({ email, otp }));
        setLoading(false);

        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Email verified successfully!");
            setStep('password');
        } else {
            toast.error(res.payload as string);
        }
    };

    /** Step 3 - Signup with verified email */
    const onSubmit = async (data: any) => {
        if (step !== 'password') {
            toast.error("Please verify your email first");
            return;
        }

        setLoading(true);
        const res = await dispatch(signupUser(data));
        setLoading(false);

        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Signup successful!");
            router.push('/login');
        } else {
            toast.error(res.payload || "Signup failed");
        }
    };

    return (
        <>
          
            <Box className={style.signupContainer}>
                <Box className={style.signupCard}>
                    <Typography className={style.title}>Create Account</Typography>
                    <Typography className={style.subtitle}>
                        Join ZenLook and experience premium salon care
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box className={style.form}>

                            {/* STEP 1: NAME + EMAIL */}
                            {step === 'email' && (
                                <>
                                    <TextField
                                        label="Full Name"
                                        variant="outlined"
                                        fullWidth
                                        className={style.input}
                                        {...register('name')}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        disabled={disableFields}
                                    />
                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        className={style.input}
                                        {...register('email')}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        disabled={disableFields}
                                    />
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        className={style.btn}
                                        onClick={handleSendOtp}
                                        disabled={loading || disableFields}
                                    >
                                        {loading ? <CircularProgress size={24} /> : "Send OTP"}
                                    </Button>
                                </>
                            )}

                            {/* STEP 2: OTP */}
                            {step === 'otp' && (
                                <>
                                    <TextField
                                        label="Enter OTP"
                                        variant="outlined"
                                        fullWidth
                                        className={style.input}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        className={style.btn}
                                        onClick={handleVerifyOtp}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : "Verify OTP"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setStep('email');
                                            setDisableFields(false);
                                        }}
                                        sx={{
                                            mt: 0,
                                            textTransform: 'none',
                                            color: 'primary.main',
                                            fontWeight: 500,
                                            fontSize: '0.95rem',
                            
                                            '&:hover': {
                                                textDecoration: 'none',
                                                color: 'primary.dark',
                                            },
                                        }}
                                    >
                                         Edit Email
                                    </Button>

                                </>
                            )}

                            {/* STEP 3: PASSWORD FIELDS */}
                            {step === 'password' && (
                                <>
                                    <TextField
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        variant="outlined"
                                        fullWidth
                                        className={style.input}
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
                                        variant="outlined"
                                        fullWidth
                                        className={style.input}
                                        {...register('confirmPassword')}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        className={style.btn}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : "Sign Up"}
                                    </Button>
                                </>
                            )}
                        </Box>
                    </form>

                    <Typography className={style.footerText}>
                        Already have an account? <span onClick={() => router.push("./login")}>Login</span>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
