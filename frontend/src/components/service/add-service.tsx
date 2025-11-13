"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Gender, serviceSchema } from './schema/service.schema';
import z from 'zod';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Avatar, Box, MenuItem, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/app/redux/hook/hook';
import { toast, ToastContainer } from 'react-toastify';
import { uploadImage } from '@/app/redux/thunk/upload.image';
import { addService } from '@/app/redux/thunk/add.service';
import { editServiceThunk, getServiceThunk } from '@/app/redux/thunk/service.thunk';
import { Service } from '@/app/redux/slice/services.slice';
import { resetServiceState } from '@/app/redux/slice/edit.slice';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
type ServiceData = z.infer<typeof serviceSchema>;
import style from "./add.module.css"
import { clearUser } from '@/app/redux/slice/login.slice';


export default function CreateServiceDialog() {
    const [open, setOpen] = React.useState(false);
    const allServices = useAppSelector((state) => state.service.servicelist?.services) ?? [];
    const { editOpen, serviceId } = useAppSelector((state) => state.editService);
    const [editService, setService] = React.useState<Service | null>(null);
    const page = useAppSelector((state) => state.service.servicelist?.page)
    const limit = useAppSelector((state) => state.service.servicelist?.limit)

    useEffect(() => {
        if (editOpen) {
            setOpen(true);
            if (serviceId) {
                const found = allServices.find((s: Service) => s.serviceId === serviceId);
                if (found) {
                    setService(found)
                    setAvatarPreview(found.imageUrl);
                }
            }
        }
    }, [editOpen, serviceId]);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category: undefined,
            time: 0,
            discount: 0,
        },
    });

    const handleClickOpen = () => {

        setAvatarPreview(null);
        setAvatarFile(null);
        setAvatarUrl("");
        reset({
            title: "",
            description: "",
            price: 0,
            category: undefined,
            time: 0,
            discount: 0,
        });

        setOpen(true);

        dispatch(resetServiceState());
        setService(null);
    };


    const handleClose = () => {
        setOpen(false);
        dispatch(resetServiceState());
        setService(null);

    };

    useEffect(() => {
        if (editService) {
            const categoryValue =
                editService.category === "Male"
                    ? Gender.MALE
                    : editService.category === "Female"
                        ? Gender.Female
                        : undefined;

            reset({
                title: editService.title,
                description: editService.description,
                price: editService.price,
                category: categoryValue,
                time: editService.time,
                discount: editService.discount,
            });
        }
    }, [editService, reset]);








    const dispatch = useAppDispatch();

    const [avtarUrl, setAvatarUrl] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const [imageUploading, setImageUploading] = useState(false);

    const [disable, setDisable] = useState(false);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageUploading(true);
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/uploadToCloudinary", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        setAvatarUrl(data.url);
        const url = data.url;

        if (url) {
            setAvatarUrl(url);
            setImageUploading(false);
            console.log("Uploaded image URL:", url);
        }
    };

    const onSubmit = async (data: ServiceData) => {
        if (imageUploading) {
            toast.info("Please wait, image is still uploading...");
            return;
        }
        try {

            let res;
            if (editOpen && serviceId) {
                setDisable(true)
                if (avtarUrl.length > 0) {
                    data.imageUrl = avtarUrl
                }
                res = await dispatch(editServiceThunk({ data, id: serviceId }));
                dispatch(getServiceThunk({ page, limit }));
            } else {
                setDisable(true)
                data.imageUrl = avtarUrl;
                res = await dispatch(addService(data));

                if (res.meta.requestStatus == "rejected") {
                    toast.error("Session expired. Please log in again.")

                    setTimeout(() => {
                        localStorage.clear();
                        dispatch(clearUser())
                    }, 3000)

                }
            }

            if (res.meta.requestStatus === 'fulfilled') {
                toast.success(editOpen ? 'Service updated successfully!' : 'Service added successfully!');
                dispatch(getServiceThunk({ page, limit }));

                setTimeout(() => {
                    reset({
                        title: "",
                        description: "",
                        price: 0,
                        category: undefined,
                        time: 0,
                        discount: 0,
                    });


                    setAvatarPreview(null);
                    setAvatarFile(null);
                    setAvatarUrl("");
                    handleClose();
                }, 800);
                setDisable(false);
            } else {
                setDisable(false)
                toast.error(res.payload || 'Something went wrong!');

                if (res.meta.requestStatus == "rejected") {
                    toast.error("Session expired. Please log in again.")

                    setTimeout(() => {
                        localStorage.clear();
                        dispatch(clearUser())
                    }, 3000)

                }
            }
        } catch (err) {
            console.log("3")
            setDisable(false)
            toast.error('An error occurred!');
        }
    };

    return (
        <>
            <Button variant="outlined" className={style.addService} onClick={handleClickOpen}>
               <AddIcon /> Add Services
            </Button>
           
            <Dialog open={open}
                onClose={handleClose}
                className={style.form}
              
            >
                <DialogTitle> Add New Services Details</DialogTitle>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                        {avatarPreview ? (
                            <img src={avatarPreview} height="50px" width="250px" alt="Preview" />
                        ) : null}

                        <Button
                            variant="outlined"
                            component="label"
                            size="small"
                            sx={{
                                border: "none"
                            }}
                        >
                            <AddPhotoAlternateIcon />
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </Button>
                    </Box>
                </Box>
                <DialogContent>
                    <DialogContentText>
                        Add all necessary Details for the Service
                    </DialogContentText>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                width: { xs: "100%", sm: "450px", md: "500px" },
                                paddingTop: "20px",
                            }}
                        >

                            <TextField
                                label="Service Name"
                                {...register("title")}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                fullWidth
                                className={style.title}

                            />

                            <TextField
                                label="Description"
                                {...register("description")}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                multiline
                                rows={3}
                                fullWidth
                                className={style.title}
                            />

                            <TextField
                                label="Price"
                                type="number"
                                inputProps={{ min: 0 }}
                                {...register("price", { valueAsNumber: true })}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                fullWidth
                                className={style.title}
                            />

                            <TextField
                                label="Duration(Minutes)"
                                type="number"
                                inputProps={{ min: 0 }}
                                {...register("time", { valueAsNumber: true })}
                                error={!!errors.time}
                                helperText={errors.time?.message}
                                fullWidth
                                className={style.title}

                            />

                            <TextField
                                label="Discount (%)"
                                type="number"

                                inputProps={{ min: 0, max: 100 }}
                                {...register("discount", { valueAsNumber: true })}
                                error={!!errors.discount}
                                helperText={errors.discount?.message}
                                fullWidth
                                className={style.title}
                            />

                            <TextField
                                select
                                label="Category"
                                {...register("category")}
                                value={watch("category") || ""}
                                error={!!errors.category}
                                helperText={errors.category?.message}
                                fullWidth
                                className={style.title}
                                sx={{zIndex:105}}

                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </TextField>

                            <Box className={style.button} >
                                <Button
                                    onClick={handleClose}
                                    variant="outlined"
                                    sx={{
                                        borderColor: "#9CA3AF",
                                        color: "#9CA3AF",
                                        "&:hover": {
                                            borderColor: "#6B7280",
                                            color: "#6B7280"
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                                {serviceId ? (
                                    <Button
                                        disabled={disable}
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#eea84f",
                                            "&:hover": { backgroundColor: "#d9652f" }
                                        }}
                                    >
                                        Update
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={disable}
                                        sx={{
                                            backgroundColor: "#eea84f",
                                            "&:hover": { backgroundColor: "#d9652f" }
                                        }}
                                    >
                                        Submit
                                    </Button>
                                )}

                            </Box>
                        </Box>
                    </form>


                </DialogContent>




            </Dialog>
        </>
    );
}
