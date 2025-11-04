"use client"
import Carosole from "@/components/carosole/carosole";

import Navbar from "@/components/navbar/navabar";
import ServiceCard from "@/components/service-card/p.card";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import style from '../app/style/page.module.css'
import { useRouter } from "next/navigation";
import OpeningHours from "@/components/Home/opening";
import About from "@/components/Home/About/about";
import OurServices from "@/components/Home/ourservice/service.card";
import ServiceSection from "@/components/Home/ourservice/service.scection";
import WhyToChoose from "@/components/Home/choose.us/choose.section";
import Testinomial from "@/components/testimonial/testimonial";
import Footer from "@/components/newFooter/footer";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div style={{ position: "relative", width: "100%", marginTop: "15px" }}>
        <img
          src="https://haires.like-themes.com/wp-content/uploads/2025/09/SLIDE_01.jpg"
          alt="Hero background"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />

        <div className={style.textBox}>
          <p className={style.tagline}>hair salon</p>

          <h1 className={style.title}>
            RELIABLE <br />
            HAIR CARE <br />

            <span className={style.lastLine}>
              MASTERS
              <img
                src="https://haires.like-themes.com/wp-content/uploads/2025/01/slider-img-1.png"
                className={style.heroIcon}
                alt=""
              />
            </span>
          </h1>


          <button className={style.heroBtn}>READ MORE</button>
        </div>
      </div>

      <OpeningHours />
      <About />
      <WhyToChoose />
      <ServiceSection />

      <Testinomial />

      <Footer />

    </>

  );
}

{/* <Box className={style.servicesSection}>
        <Box className={style.heading}>Our Services</Box>
        <Box className={style.subHeading}>Top 3 Popular Services</Box>
        <Box className={style.description}>
          Discover our most loved treatments, designed to make you look and feel your absolute best.
        </Box>
      </Box> */}

{/* <Box className={style.card}>
        <ServiceCard serviceId={1} title="Hair Wash & Treatment" description="A relaxing hair wash and scalp treatment that cleanses, nourishes, and revitalizes your hair. It promotes a healthy, shiny, and refreshed look while providing a soothing experience. Perfect for preparing your hair for styling or other treatments, ensuring it feels soft, smooth, and rejuvenated, beautiful, and ready to shine." price={500} discount={0} imageUrl="./salon-service.jpg" />
        <ServiceCard serviceId={1} title="Hair Coloring & Styling" description="Transform your look with our expert haircuts and color treatments. Our stylists use premium products and precision techniques to create vibrant, long-lasting results that enhance your natural beauty. Experience healthy, glossy hair that radiates confidence and style, leaving you feeling refreshed, beautiful, and  to shine." price={1150} discount={0} imageUrl="./one.jpg" />
        <ServiceCard serviceId={1} title="Luxury Facial Treatment" description="A premium skincare experience designed to cleanse, exfoliate, and rejuvenate your skin deeply. Using advanced techniques and high-quality products, this facial boosts hydration, restores elasticity, and enhances your natural glow. Enjoy smoother, softer, and more radiant skin with every luxurious and refreshing session." price={650} discount={0} imageUrl="./cream.png" />
      </Box> */}
{/* <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", paddingBottom: "50px" }}>
        <Button onClick={() => router.push("/services")} className={style.viewAllBtn} variant="contained">View All Services</Button></Box> */}