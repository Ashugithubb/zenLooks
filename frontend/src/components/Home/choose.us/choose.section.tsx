import { Box, Typography } from "@mui/material";
import style from './chhose.module.css'
export default function WhyToChoose() {
    return (
        <>
            <Box sx={{ width: "100%", height: "879px", color: "#8B8B8B", padding: "101px 0px", position: "relative", display: "flex", gap: 15, margin: "0px 60px" }}>
                <Box>
                    <Box className={style.smallImage}>
                        <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/08/shape1.png" />
                    </Box>

                    <Box sx={{ marginLeft: "200px", position: "relative", zIndex: 1 }}>
                        <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/08/about-us.png" />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 9, flexDirection: "column" }}>

                    <Box>
                        <p style={{ color: "#f68043" }}>Why Choose Us</p>
                        <h3 style={{ fontSize: "35px", color: "black", fontWeight: "bolder", maxWidth: "600px" }}>Why Our Spa Services Are the
                            Preferred Choice for Mind, Bo
                            and Soul Rejuvenation</h3></Box>




                    <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", gap: "14px", backgroundColor: "#F8F5F0", padding: "22px" }}>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bolder", color: "black" }}>
                            <img
                                src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/check1.png"
                                style={{ width: "18px", height: "18px" }}
                            />
                            Experience Serenity
                        </Typography>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bolder", color: "black" }}>
                            <img
                                src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/check1.png"
                                style={{ width: "18px", height: "18px" }}
                            />
                            Rejuvenation Awaits
                        </Typography>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bolder", color: "black" }}>
                            <img
                                src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/check1.png"
                                style={{ width: "18px", height: "18px" }}
                            />
                            Revitalize Your Senses
                        </Typography>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bolder", color: "black" }}>
                            <img
                                src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/check1.png"
                                style={{ width: "18px", height: "18px" }}
                            />
                            Exclusive Spa Services
                        </Typography>
                    </Box>


                    <Box sx={{ display: "flex", maxWidth: "500px", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex",gap:"16px" }}>
                            <Box> <img src={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/choose-us-icon1.png"} /></Box>

                            <Box>
                                <Typography sx={{ color: "black", fontWeight: "bolder" }} >1200+ </Typography>
                                <Typography sx={{ color: "black", fontWeight: "bolder" }}>Satisfied Customers</Typography></Box>

                        </Box>


                        <Box>
                            <Box sx={{ display: "flex", gap:"16px" }}>
                                <Box><img src={"https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/choose-us-icon2.png"} /></Box>

                                <Box><Typography sx={{ color: "black", fontWeight: "bolder" }}>100% </Typography>
                                    <Typography sx={{ color: "black", fontWeight: "bolder" }}>Satisfied Customers</Typography></Box>

                            </Box>

                        </Box>
                    </Box>

                </Box>

            </Box>


        </>
    )
}