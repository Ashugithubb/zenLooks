import { Box } from "@mui/material";
import style from "./about.module.css";

export default function About() {
  return (
    <>
      <Box className={style.aboutContainer}>
        <img
          src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/about-thumb.png"
          className={style.aboutImage}
          alt="About thumbnail"
        />

        <Box id="about" className={style.aboutContent}>
          <p className={style.aboutus}>About Us</p>

          <Box className={style.pursuit}>
            <h3>Pursuit of Perfect Relaxation Crafting Oasis Calm</h3>
          </Box>

          <Box className={style.description}>
            <p>
              Globally morph an expanded array of internal or organic sources main envisioneer
              performance based action into administrate leverage into rather than maintainable spa works
            </p>
          </Box>

          <hr />

          <Box className={style.featuresRow}>
            <Box className={style.featureItem}>
              <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/08/icon1.png" />
              <p>Premium & Modern Herbal Product</p>
            </Box>

            <Box className={style.featureItem}>
              <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/about-icon2.png" />
              <p>Highly Qualified Staffs SPAS Services</p>
            </Box>
          </Box>

          <hr />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/08/check.png"
              alt="check"
              width={18}
              height={18}
            />
            <h5 style={{ margin: 0 }}>Premium & Modern Herbal Product</h5>
          </Box>

        </Box>
      </Box>
    </>
  );
}
