import { Box, Typography } from "@mui/material";
import style from "./service.module.css";
import MyImageBelowCard from "./service.card";

export default function ServiceSection() {
  return (
    <>
      <Box className={style.serviceSection}>
        <Box className={style.serviceContainer}>
          <Box className={style.header}>
            <Typography className={style.our}>Our Services</Typography>
            <h2 className={style.heading}>
              Experience the Art of Relaxation with Our Exclusive Spa Services
            </h2>
          </Box>

          <Box className={style.cardContainer}>
            <MyImageBelowCard
              logo={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-icon1.png"
              }
              title={"Revitalize Facial"}
              description={
                "This is some descriptive text. Dramatic explotite to contunially cultivate"
              }
              duration={30}
              serviceimagelink={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-img1.png"
              }
            />

            <MyImageBelowCard
              logo={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-icon2.png"
              }
              title={"Relaxing Massage"}
              description={
                "This is some descriptive text. Dramatic explotite to contunially cultivate"
              }
              duration={45}
              serviceimagelink={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/10/service-img2.png"
              }
            />

            <MyImageBelowCard
              logo={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-icon3.png"
              }
              title={"Aromatherapy"}
              description={
                "This is some descriptive text. Dramatic explotite to contunially cultivate"
              }
              duration={60}
              serviceimagelink={
                "https://preview--radiant-salon-view.lovable.app/assets/hair-coloring-DAptfMcB.jpg"
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
