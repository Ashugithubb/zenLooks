interface propValue{
    logo:string,
    title:string,
    description:string,
    duration:number,
    serviceimagelink:string
}

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import style from "./service.module.css"


function MyImageBelowCard(prop:propValue) {
    return (
        <Card
            sx={{
                backgroundColor: "rgb(25, 35, 63)",
                width: "396px",
                height: "561px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
        >

            <Box className={style.card} sx={{ flexGrow: 1 }}>
                <Box className={style.logo} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "22px" }}>
                    <img
                        src={prop.logo}
                        style={{ width: "67px" }}
                    />
                </Box>


                <CardContent className={style.content}>
                    <Typography gutterBottom variant="h5" sx={{ color: "white", margin: "28px", fontWeight: 900 }}>
                     { prop.title}
                    </Typography>
                    <Typography className={style.description} variant="body2" sx={{ color: "#FFFFFF99", fontSize: "16px" }}>
                        { prop.description}
                    </Typography>

 
                </CardContent>

            </Box>
           <Box className={style.duration}>{prop.duration}MIN</Box>
            <CardMedia
                component="img"
                height="160"
                image={prop.serviceimagelink}
                alt="Service"
                sx={{
                    marginTop: "auto",
                    position: "relative",
                    zIndex: 3
                }}
            />
        </Card>


    );
}

export default MyImageBelowCard;