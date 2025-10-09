import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import style from './card.module.css';
interface cardProp {
  title: string;
  description: string;
  price: number,
  imageUrl:string,
  discount:number
}
export default function ImgMediaCard(prop: cardProp) {
  return (
    <Card sx={{ maxWidth: 445}}>
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
      {prop.discount!=0 && <Typography>discount:{prop.discount}% off</Typography>}
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant='contained' size="small">Book Now</Button>
      </CardActions>
    </Card>
  );
}
