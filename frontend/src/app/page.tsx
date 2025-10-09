import Carosole from "@/components/carosole/carosole";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navabar";
import ServiceCard from "@/components/service-card/card";
import { Box } from "@mui/material";
import Image from "next/image";
import style from '../app/style/page.module.css'
export default function Home() {
  return (
    <>
      <Navbar />
      <Carosole />
      <Box className={style.servicesSection}>
        <Box className={style.heading}>Our Services</Box>
        <Box className={style.subHeading}>Top 3 Popular Services</Box>
        <Box className={style.description}>
          Discover our most loved treatments, designed to make you look and feel your absolute best.
        </Box>
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", padding:"10px" }}>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </Box>
      <Footer />

    </>

  );
}


