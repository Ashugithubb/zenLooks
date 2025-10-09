import { Box, Typography, TextField, Button } from "@mui/material";
import style from "./footer.module.css";

export default function Footer() {
  return (
    <Box id="footer" className={style.footer}>
     
      <Box className={style.footerSection}>
        <Typography className={style.logo}>ZenLook</Typography>
        <Typography className={style.desc}>
          Elevating your beauty and confidence with our premium salon
          services. Experience luxury and care like never before.
        </Typography>
      </Box>

      
      <Box className={style.footerSection}>
        <Typography className={style.sectionTitle}>Quick Links</Typography>
        <Typography className={style.link}>Home</Typography>
        <Typography className={style.link}>About</Typography>
        <Typography className={style.link}>Services</Typography>
        <Typography className={style.link}>Contact</Typography>
      </Box>

      
      <Box className={style.footerSection}>
        <Typography className={style.sectionTitle}>Stay Updated</Typography>
        <Typography className={style.desc}>
          Subscribe to get offers and updates directly in your inbox.
        </Typography>
        <Box className={style.newsletter}>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            size="small"
            className={style.input}
          />
          <Button variant="contained" className={style.btn}>
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
