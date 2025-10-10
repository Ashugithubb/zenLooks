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
import { useAppDispatch } from '@/app/redux/hook/hook';
import { deleteServiceThunk, editService } from '@/app/redux/thunk/service.thunk';
import { toast } from 'react-toastify';
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
 const handleEdit = async () => {
  
      // try {
      //   const res = await dispatch(editService({},prop.serviceId));
      //   if (res.meta.requestStatus === "fulfilled") {
      //     toast.success("Service deleted successfully!");
      //   }

      // } catch (err: any) {
      //   toast.error(err || "Failed to delete service");
      // }
    
  };
  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="160"
        image={prop.imageUrl}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            opacity: 0.9,
          },
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {prop.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {prop.description}
        </Typography>
        <Typography variant="h3" sx={{ color: 'text.secondary' }}>
          <CurrencyRupeeIcon />{prop.price}
        </Typography>
      </CardContent>
      {prop.discount != 0 && <Typography>discount:{prop.discount}% off</Typography>}
      <CardActions  sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={handleDelete} sx={{ color: "red" }}><DeleteIcon /></IconButton>
        <IconButton onClick={handleEdit}><EditIcon /></IconButton>
        <Button variant='contained' size="small">Book Now</Button>
      </CardActions>
    </Card>
  );
}
