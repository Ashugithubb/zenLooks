import React, { useState, ChangeEvent, FormEvent } from 'react';
import { serviceSchema } from './schema/service.schema';
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
import { useAppDispatch } from '@/app/redux/hook/hook';
import { toast } from 'react-toastify';
import { uploadImage } from '@/app/redux/thunk/upload.image';
import { addService } from '@/app/redux/thunk/add.service';
import { getServiceThunk } from '@/app/redux/thunk/service.thunk';
interface CreateServiceDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ServiceData) => void;
}
type ServiceData = z.infer<typeof serviceSchema>;

export default function CreateServiceDialog() {
    const [open, setOpen] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ServiceData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            category: 'Male',
        },
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useAppDispatch();

    const [avtarUrl, setAvatarUrl] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
            const res = await dispatch(uploadImage(file));
            setAvatarUrl(res.payload)
        }
    };

    const onSubmit = async (data: ServiceData) => {
        data.imageUrl = avtarUrl;

        console.log(data);
        const res = await dispatch(addService(data));
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Service added successfully!");
            dispatch(getServiceThunk({}))
            handleClose()

        } else {
            toast.error(res.payload || "Failed");
        }

    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Services<AddIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Add New Services Details</DialogTitle>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                        <img src={avatarPreview || ''} height={"50px"} width={"250px"} />
                        <Button
                            variant="outlined"
                            component="label"
                            size="small"
                            sx={{
                                minWidth: 0,
                                position: "absolute",

                                bottom: 0,
                                right: 20,
                                marginTop: "500%",

                                padding: "4px",
                                borderRadius: "50%",
                                backgroundColor: "white",
                            }}
                        >
                            <EditIcon />
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
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "500px", paddingTop: "20px" }}>
                            <TextField
                                label="Title"
                                {...register("title")}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                fullWidth
                            />

                            <TextField
                                label="Description"
                                {...register("description")}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                multiline
                                rows={3}
                                fullWidth
                            />

                            <TextField
                                label="Price"
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                fullWidth
                            />

                            <TextField
                                label="Time (minutes)"
                                type="number"
                                {...register("time", { valueAsNumber: true })}
                                error={!!errors.time}
                                helperText={errors.time?.message}
                                fullWidth
                            />

                            <TextField
                                label="Discount (%)"
                                type="number"
                                {...register("discount", { valueAsNumber: true })}
                                error={!!errors.discount}
                                helperText={errors.discount?.message}
                                fullWidth
                            />

                            <TextField
                                select
                                label="Category"
                                {...register("category")}
                                error={!!errors.category}
                                helperText={errors.category?.message}
                                fullWidth
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </TextField>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" variant="contained">
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </form>


                </DialogContent>




            </Dialog>
        </>
    );
}