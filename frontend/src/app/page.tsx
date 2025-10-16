"use client"
import Carosole from "@/components/carosole/carosole";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navabar";
import ServiceCard from "@/components/service-card/p.card";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import style from '../app/style/page.module.css'
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
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

      <Box className={style.card}>
        <ServiceCard serviceId={1} title="Hair Wash & Scalp Treatment" description="A relaxing hair wash and scalp treatment that cleanses and nourishes the hair, promoting healthy, shiny, and refreshed hair. Perfect for preparing your hair for styling or other treatments while providing a soothing experience" price={500} discount={0} imageUrl="./salon-service.jpg" />
        <ServiceCard serviceId={1} title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-lasting results that enhance your natural beauty and leave your hair looking vibrant, healthy, and full of life" price={1150} discount={0} imageUrl="./image4.jpg" />
        <ServiceCard serviceId={1} title="Luxury Facial Treatment" description="A premium skincare experience designed to deeply cleanse, exfoliate, and rejuvenate your skin, leaving it radiant, hydrated, and refreshed. Our luxury facial treatment combines advanced techniques and high-quality products to nourish your complexion" price={650} discount={0} imageUrl="./cream.png" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", padding: "100px" }}>
        <Button onClick={() => router.push("/services")} className={style.viewAllBtn} variant="contained">View All Services</Button></Box>
      <Footer />

    </>

  );
}

