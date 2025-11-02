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
                "./hair-wash.jpg"
              }
            />

            <MyImageBelowCard
              logo={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-icon1.png"
              }
              title={"Relaxing Massage"}
              description={
                "This is some descriptive text. Dramatic explotite to contunially cultivate"
              }
              duration={45}
              serviceimagelink={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-img1.png"
              }
            />

            <MyImageBelowCard
              logo={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-icon1.png"
              }
              title={"Aromatherapy"}
              description={
                "This is some descriptive text. Dramatic explotite to contunially cultivate"
              }
              duration={60}
              serviceimagelink={
                "https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/service-img1.png"
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
