import { Box, Typography } from "@mui/material";
import style from "./service.module.css"
import MyImageBelowCard from "./service.card";
export default function ServiceSection() {
    return (
        <>

            <Box sx={{ backgroundColor: "#0A132E", height: "1032px", width: "100%" }}>
                <Box sx={{ padding: "73px 0px 100px", display: "flex", flexDirection: "column", gap: "100px" }}>

                    <Box sx={{display:"flex", flexDirection:"column",gap:3}}> <Typography sx={{ color: "orange", textAlign: "center" }}>Our Services</Typography>
                        <h2 style={{ color: "white", fontWeight: "bolder", fontSize: "22x", textAlign: "center" }}>
                            Experience the Art of Relaxation with
                            Our Exclusive Spa Services</h2></Box>
                    <Box sx={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                        <MyImageBelowCard logo={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-icon1.png"} title={" Revitalize Facial"} description={"This is some descriptive text. Dramatic explotite to contunially cultivate"} duration={30} serviceimagelink={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-img1.png"} />
                        <MyImageBelowCard logo={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-icon1.png"} title={" Revitalize Facial"} description={"This is some descriptive text. Dramatic explotite to contunially cultivate"} duration={30} serviceimagelink={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-img1.png"} />
                        <MyImageBelowCard logo={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-icon1.png"} title={" Revitalize Facial"} description={"This is some descriptive text. Dramatic explotite to contunially cultivate"} duration={30} serviceimagelink={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-img1.png"} />
                    </Box></Box>
            </Box>



        </>
    )
}