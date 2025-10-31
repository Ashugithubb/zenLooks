import { Box } from "@mui/material";


export default function OpeningHours() {
    return (
        <>
            <Box sx={{ backgroundColor: "#0A132E", position:"relative"}}>
                <Box sx={{ padding: "70px 0 70px 0px", display: "flex", justifyContent: "space-around" }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <img
                            src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/hero-time-icon.png"
                            style={{ width: "90px", height: "90px", objectFit: "contain" }}
                        />

                        <Box >
                            <h4 style={{ color: "white" }}>Opening Hours</h4>
                            <p style={{ color: "#FFFFFF99", margin: "0px" }}>Monday - Saturday : 9am - 9pm</p>
                            <p style={{ color: "#FFFFFF99", margin: "0px" }}>Sunday: 10am - 8pm</p></Box>
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/hero-team.png" />
                            <Box style={{ color: "white" }}><h4>Expert Team</h4>
                                <p style={{ color: "#FFFFFF99" }}>Dedicated & active Members</p></Box></Box>
                    </Box>
                </Box>
            </Box>
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", top:"112%", left:"40%",zIndex:50,position:"absolute"}}><img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/hero-flower-shape.png"/></Box>
        </>
    )
}