import { Box } from "@mui/material";
import style from "./opening.module.css";

export default function OpeningHours() {
  return (
    <>
      <Box className={style.openingContainer}>
        <Box className={style.openingContent}>
          <Box className={style.infoBox}>
            <img
              src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/hero-time-icon.png"
              className={style.icon}
              alt="Time Icon"
            />
            <Box>
              <h4 className={style.heading}>Opening Hours</h4>
              <p className={style.text}>Monday - Saturday : 9am - 9pm</p>
              <p className={style.text}>Sunday: 10am - 9pm</p>
            </Box>
          </Box>

          <Box className={style.infoBox}>
            <img
              src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/hero-team.png"
              className={style.icon}
              alt="Team Icon"
            />
            <Box>
              <h4 className={style.heading}>Expert Team</h4>
              <p className={style.text}>Dedicated & active Members</p>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box className={style.flowerShape}>
        <img
          src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/hero-flower-shape.png"
          alt="Flower Shape"
        />
      </Box> */}
    </>
  );
}
