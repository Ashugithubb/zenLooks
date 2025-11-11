import { Box, Typography } from "@mui/material";
import style from "./chhose.module.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
export default function WhyToChoose() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });
    return (
        <>
            <Box className={style.chooseSection}>
                <Box className={style.imageContainer}>
                    <Box className={style.smallImage}>
                        <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/08/shape1.png" />
                    </Box>

                    <Box className={style.mainImage}>
                        <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/08/about-us.png" />
                    </Box>
                </Box>

                <Box className={style.textContainer}>
                    <Box>
                        <p className={style.subHeading}>Why Choose Us</p>
                        <h3 className={style.mainHeading}>
                            Why Our Spa Services Are the Preferred Choice for Mind, Body, and
                            Soul Rejuvenation
                        </h3>
                    </Box>

                    <Box className={style.featureBox}>
                        <Typography className={style.feature}>
                            <img
                                src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/check1.png"
                            />
                            Experience Serenity
                        </Typography>

                        <Typography className={style.feature}>
                            <img
                                src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/check1.png"
                            />
                            Rejuvenation Awaits
                        </Typography>

                        <Typography className={style.feature}>
                            <img
                                src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/check1.png"
                            />
                             Revitalize Your Senses
                        </Typography>

                        <Typography className={style.feature}>
                            <img
                                src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/check1.png"
                            />
                            Exclusive Spa Services
                        </Typography>
                    </Box>

                    <Box className={style.statsContainer}>
                        <Box className={style.statBox}>
                            <img className={style.tradeImage} src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/choose-us-icon1.png" />
                            <Box>

                                <div ref={ref} style={{ textAlign: "center", }}>
                                    <Typography className={style.number} sx={{ color: "black", fontSize: "30px", fontWeight: 800 }}>
                                        <span style={{ color: "black" }}>
                                            {inView && <CountUp end={1200} duration={2} />}
                                        </span>{" "}
                                        +
                                    </Typography>
                                    <Typography className={style.statSubtitle}>
                                        Satisfied Customers
                                    </Typography>
                                </div>
                            </Box>
                        </Box>

                        <Box className={style.statBox}>
                            <img  className={style.tradeImage} src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/choose-us-icon2.png" />
                            <Box>
                                <Typography className={style.statTitle} sx={{ color: "black", fontSize: "30px", fontWeight: 800 }}>100%</Typography>
                                <Typography className={style.statSubtitle}>
                                    Satisfied Customers
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
