import { Box, Link, Typography } from "@mui/material"
import style from "./footer.module.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

export default function Footer() {
    return (
        <>
            <Box className={style.footer} id="footer">

                <Box className={style.topRow}>
                    <Box className={style.footerImgBox}>
                        <img
                            src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/footer-shape1.png"
                            className={style.footerImg1}
                            alt=""
                        />
                    </Box>

                    <Box className={style.footerImgBox}>
                        <img
                            src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/footer-shape2.png"
                            className={style.footerImg2}
                            alt=""
                        />
                    </Box>
                </Box>

                <Box className={style.footerBox}>
                    <Box className={style.first}>
                        <Typography className={style.zenLook}>ZenLook</Typography>
                        <p className={style.des}>
                            Dramatically exploit premium procedures before emerging to cultivate
                        </p>

                        <Box className={style.callBox}>
                            <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/call-icon.png" className={style.callIcon} />
                            <p className={style.callText}>+123 (4567) 890</p>
                        </Box>

                        <Box className={style.social}>
                            <a href="https://instagram.com" target="_blank"><InstagramIcon className={style.iconWhite} /></a>
                            <a href="https://facebook.com" target="_blank"><FacebookOutlinedIcon className={style.fbIcon} /></a>
                            <a href="https://twitter.com" target="_blank"><img src="./twitter-x-logo-png_seeklogo-492396 (1).png" className={style.socialImg} /></a>
                            <a href="https://twitter.com" target="_blank"><img src="./69cb8fbc8de12644eb9dd67bae58ce68.jpg" className={style.socialImg} /></a>
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

                    <Box className={style.second}>
                        <h3>Services</h3>
                        <Link href="/"  className={style.link}>Oil Massage</Link>
                        <Link href="/#about" className={style.link}>Skin Protection</Link>
                        <Link href="/#footer" className={style.link}>Body Massage</Link>
                        <Link href="/services" className={style.link}>Revitalize Facial</Link>
                        <Link href="/services" className={style.link}>Therapy</Link>
                    </Box>

                    <Box className={style.third}>
                        <h3>Working Hrs</h3>
                        <p  className={style.third}>Monday – Thursday: 10:00 AM – 5:00 PM</p>
                        <p  className={style.third}>Saturday: 10:00 AM – 5:00 PM</p>
                        <p  className={style.third}>Sunday: 10:00 AM – 5:00 PM</p>
                        <p  className={style.third}>Off Day: 2:00 PM – 5:00 PM</p>
                    </Box>
                </Box>

            </Box>
        </>
    )
}
