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
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/app/redux/hook/hook';
import { deleteServiceThunk } from '@/app/redux/thunk/service.thunk';
import { toast } from 'react-toastify';
import CreateServiceDialog from '../service/add-service';
import { Service } from '@/app/redux/slice/services.slice';
import { setEditOpen, setServiceId } from '@/app/redux/slice/edit.slice';
import { useRouter } from 'next/navigation';

interface cardProp {
  title: string;
  description: string;
  price: number,
  imageUrl: string,
  discount: number,
  serviceId: number
}

export default function ImgMediaCard(prop: cardProp) {
  const dispatch = useAppDispatch()
  const role = useAppSelector((state) => state.login.auth?.role);
  const services = useAppSelector((state) => state.service.servicelist?.services);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${prop.title}"?`)) {
      try {
        const res = await dispatch(deleteServiceThunk(prop.serviceId));
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Service deleted successfully!");
        }
      } catch (err: any) {
        toast.error(err || "Failed to delete service");
      }
    }
  };
  const router = useRouter()
  const handleEdit = async () => {
    dispatch(setEditOpen(true));
    dispatch(setServiceId(prop.serviceId));
  };

  const handelBook = () => {
    if (role === "User") {
      router.push(`/services/booking/${prop.serviceId}`);
    }
    else if (role === "Admin") {
      toast.error("Admin cannot Book a service");
    }
    else {
      toast.error("Please Login to  Book Services");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }
  const orgPrice = (prop.price - ((prop.discount / 100) * prop.price))

  return (
    <Card
      className={style.card}
      sx={{
        maxWidth: "30%",
        display: "flex",
        flexDirection: "column",
        padding: "16px"
      }}
    >

      <CardMedia
        component="img"
        alt="service image"
        height="160"
        image={prop.imageUrl}
        sx={{
          height: 300,
          width: '100%',
          objectFit: 'cover',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            opacity: 0.9,
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>

        <Typography gutterBottom variant="h5" component="div">
          {prop.title}
        </Typography>
        <Typography variant="body2" className={style.descriptionClamp} sx={{ color: 'text.secondary', }}>
          {prop.description}
        </Typography>
        {prop.discount !== 0 ? (
          <Typography variant="h4" sx={{ color: 'text.secondary', fontWeight: 600, }}>
            <CurrencyRupeeIcon fontSize="small" />
            {orgPrice}
            <Typography
              component="span"
              sx={{
                ml: 1,
                textDecoration: 'line-through',
                color: 'error.main',
                fontSize: '1rem'
              }}
            >
              <CurrencyRupeeIcon fontSize="inherit" />
              {prop.price}
            </Typography>
            <Typography
              component="span"
              sx={{ ml: 1, color: 'success.main', fontWeight: 500 }}
            >
              ({prop.discount}% off)
            </Typography>
          </Typography>
        ) : (
          <Typography variant="h4" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            <CurrencyRupeeIcon fontSize="small" />
            {prop.price}
          </Typography>
        )}


      </CardContent>



      {role != 'Admin' ? (<CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handelBook} variant='contained' size="small" className={style.bookNowBtn}>Book Now</Button>
      </CardActions>) :

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={handleDelete} sx={{ color: "red" }}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          {role != 'Admin' && <Button
            onClick={handelBook}
            variant="contained"
            size="medium"
          >
            Book Now
          </Button>}
        </CardActions>}


    </Card>
  );
}
