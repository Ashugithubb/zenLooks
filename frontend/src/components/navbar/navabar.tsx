import { Box, Button, Typography } from "@mui/material";
import style from "./navbar.module.css"
export default function Navbar() {
    return (
        <>
            <Box className = {style.navbar}>
                <Typography>ZenAura</Typography>
                <Box className={style.right}>
                    <Typography>Home</Typography>
                    <Typography>About</Typography>
                    <Typography>Contact</Typography>
                    <Button>Login</Button></Box>
            </Box>
        </>
    )
}