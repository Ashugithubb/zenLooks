'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import style from './card.module.css';
import { IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/app/redux/hook/hook';
import { deleteServiceThunk } from '@/app/redux/thunk/service.thunk';
import { toast } from 'react-toastify';
import { setEditOpen, setServiceId } from '@/app/redux/slice/edit.slice';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/app/redux/slice/login.slice';

interface cardProp {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  discount: number;
  serviceId: number;
}

export default function ImgMediaCard(prop: cardProp) {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.login.auth?.role);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${prop.title}"?`)) {
      const res = await dispatch(deleteServiceThunk(prop.serviceId));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Service deleted successfully!");
      } else {
        if (res.meta.requestStatus == "rejected") {
          toast.error("Session expired. Please log in again.")

          setTimeout(() => {
            localStorage.clear();
            dispatch(clearUser())
          }, 3000)

        }
        toast.error("Failed to delete service");
      }
    }
  };

  const handleEdit = () => {
    dispatch(setEditOpen(true));
    dispatch(setServiceId(prop.serviceId));
  };

  const handleBook = () => {
    if (role === "User") router.push(`/services/booking/${prop.serviceId}`);
    else if (role === "Admin") toast.error("Admin cannot Book a service");
    else {
      toast.error("Please Login to Book Services");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  const finalPrice = prop.price - (prop.discount / 100) * prop.price;

  return (
    <Card className={style.card}>
      <Box className={style.imageContainer}>
        <CardMedia
          component="img"
          alt={prop.title}
          image={prop.imageUrl}
          className={style.image}
        />
        {prop.discount !== 0 && (
          <span className={style.discountTag}>{prop.discount}% off</span>
        )}
      </Box>

      <CardContent className={style.cardContent}>
        <Typography variant="h6" className={style.title}>
          {prop.title}
        </Typography>
        <Typography variant="body2" className={style.descriptionClamp}>
          {prop.description}
        </Typography>

        {prop.discount !== 0 ? (
          <Typography className={style.price}>
            ₹{finalPrice.toFixed(1)}{' '}
            <span className={style.oldPrice}>₹{prop.price}</span>
          </Typography>
        ) : (
          <Typography className={style.price}>₹{prop.price}</Typography>
        )}
      </CardContent>

      {role !== 'Admin' ? (
        <CardActions className={style.actions}>
          <Button onClick={handleBook} className={style.bookNowBtn}>
            Book Now
          </Button>
        </CardActions>
      ) : (
        <CardActions className={style.adminActions}>
          <IconButton
            onClick={handleEdit}
            className={style.editBtn}
            title="Edit Service"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleDelete}
            className={style.deleteBtn}
            title="Delete Service"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}

    </Card>
  );
}
