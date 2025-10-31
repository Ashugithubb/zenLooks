import { Box, Typography } from "@mui/material";
import style from "./about.module.css"
export default function About() {
    return (<>
        <Box id="about" sx={{ backgroundColor: "#F8F5F0", padding: "80px 0px 100px 0px", display: "flex" }}>
            <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/about-thumb.png" />

            <Box sx={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: 1 }}>
                <p className={style.aboutus}>About Us</p>
                <Box className={style.pursuit}><h3 style={{ fontSize: "50px", fontWeight: "bolder" }}>Pursuit of Perfect Relaxation
                    Crafting Oasis Calm</h3></Box>
                <Box className={style.description}> <p>Globally morph an expanded array of internal or organic sources main envisioneer
                    performance based action into administrate leverage into rather than maintainable spa works</p>
                </Box>
                <Box>


                </Box>
                <hr></hr>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", gap: 2 }}><img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/08/icon1.png" /><p style={{textAlign:"center", marginTop:"20px"}}>Premium & Modern Harbal Product</p></Box>
                    <Box sx={{ display: "flex", gap: 2 }}><img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/about-icon2.png" /><p style={{textAlign:"center", marginTop:"20px"}}>High Qualified Staff SPA Services</p></Box>
                </Box>
                <hr></hr>
                <h5>Premium & Modern Harbal Product</h5>
            </Box>

        </Box>
    </>)
}