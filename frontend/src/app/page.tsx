import Carosole from "@/components/carosole/carosole";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navabar";
import ServiceCard from "@/components/service-card/card";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carosole />
      Our Services
      Top 3 Popular Services
      Discover our most loved treatments, designed to make you look and feel your absolute best
      <Box sx={{display:"flex",justifyContent:"space-between"}}>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </Box>


    </>

  );
}


