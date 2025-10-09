import { Box, Button, Typography } from "@mui/material";
import style from "./navbar.module.css";

export default function Navbar() {
  return (
    <Box className={style.navbar}>
      <Typography className={style.logo}>ZenLook</Typography>
      <Box className={style.right}>
        <Typography className={style.link}>Home</Typography>
        <Typography className={style.link}>About</Typography>
        <Typography className={style.link}>Contact</Typography>
         <Typography className={style.link}>Services</Typography>
        <Button variant="contained" className={style.loginBtn}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
