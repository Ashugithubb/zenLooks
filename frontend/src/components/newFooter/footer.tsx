
import { Box, Link, Typography } from "@mui/material"
import style from "./footer.module.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
export default function Footer() {
    return (
        <>
            <Box className={style.footer}>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "20px 0"
                }}>
                    <Box sx={{ display: "flex" }}>
                        <img
                            src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/footer-shape1.png"
                            style={{ width: "auto", height: "auto", maxWidth: "100%" }}
                            alt=""
                        />
                    </Box>

                    <Box sx={{ display: "flex" }}>
                        <img
                            src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/footer-shape2.png"
                            style={{ width: "auto", height: "auto", maxWidth: "100%", marginRight: "-30px", marginTop: "-120px", zIndex: 2 }}
                            alt=""
                        />
                    </Box>
                </Box>


                <Box className={style.footerBox}>
                    <Box className={style.first} sx={{ color: "white" }}>
                        <Typography className={style.zenLook}>ZenLook</Typography>
                        <p className={style.des} >
                            Dramatically exploit premium procedures before emerging to cultivate
                        </p>

                        <Box sx={{ display: "flex", gap: 2 }}><img src={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/call-icon.png"} style={{ width: "28px", height: "28px" }} /><p style={{ fontSize: "18px", fontWeight: 700 }}>+123 (4567) 890</p></Box>
                        <Box className={style.social}>
                            <a href="https://instagram.com" target="_blank"><InstagramIcon sx={{ color: "white" }} /></a>
                            <a href="https://facebook.com" target="_blank"><FacebookOutlinedIcon sx={{ backgroundColor: "blACK", color: "WHITE" }} /></a>
                            <a href="https://twitter.com" target="_blank"><img src="./twitter-x-logo-png_seeklogo-492396 (1).png" height={"30px"} width={"30px"} /></a>
                            <a href="https://twitter.com" target="_blank"><img src="./69cb8fbc8de12644eb9dd67bae58ce68.jpg" height={"30px"} width={"30px"} /></a>


                        </Box>
                    </Box>




                    <Box className={style.second}>
                        <h3>Company</h3>

                        <Link href="/" className={style.link}>About Us</Link>
                        <Link href="/#about" className={style.link}>Our Services</Link>
                        <Link href="/#footer" className={style.link}>Meet the Team</Link>
                        <Link href="/services" className={style.link}>Our Works</Link>
                        <Link href="/services" className={style.link}>Latest Blog</Link>
                    </Box>




                    <Box className={style.second}  >
                        <h3>Services</h3>
                        <Link href="/" className={style.link}>Oil Massage</Link>
                        <Link href="/#about" className={style.link}>Skin Protection </Link>
                        <Link href="/#footer" className={style.link}>Body Massage</Link>
                        <Link href="/services" className={style.link}>Revitalize Facial</Link>
                        <Link href="/services" className={style.link}>Therapy</Link>

                    </Box>

                    <Box className={style.third}>
                        <h3>Working Hrs</h3>

                        <p>Monday – Thursday: 10:00 AM – 5:00 PM</p>
                        <p>Saturday: 10:00 AM – 5:00 PM</p>
                        <p>Sunday: 10:00 AM – 5:00 PM</p>
                        <p>Off Day: 2:00 PM – 5:00 PM</p>


                    </Box>
                </Box>
           

            </Box>
        </>
    )
}