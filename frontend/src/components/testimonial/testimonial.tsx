"use client";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import style from "./testimonial.module.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
export default function Testinomial() {
    const testimonials = [
        {
            text: " Experience elevated wellness through thoughtfully curated experiences and mindful attention to detail. Seamlessly blend modern comfort with timeless relaxation techniques designed to refresh body and spirit. Inspire deeper balance through harmonious environments and intuitive care that prioritizes personal rejuvenation. Discover a sanctuary where calm meets sophistication and every moment feels intentionally crafted for your well-being.",
            name: "Jakulin Farnandez",
            role: "Co-Founder"
        },
        {
            text: "A peaceful retreat that blends luxury with genuine care. Every visit feels restorative and uplifting, offering a calm escape from the rush of daily life. From the warm welcome at the door to the thoughtful attention during each treatment, the atmosphere promotes deep relaxation and emotional ease. Each session feels personalized, with soothing aromas, gentle music, and skilled hands that melt away stress and leave the body refreshed.",
            name: "Sofia Mitchell",
            role: "Client"
        },
        {
            text: "The ambiance is exceptional and the staff goes above and beyond to make every visit feel special. From the moment you arrive, there is a calming warmth in the air, supported by thoughtful design, soothing aromas, and genuine hospitality. Every detail reflects a deep commitment to comfort and care, creating an atmosphere where stress slowly dissolves. Treatments are personalized with sincere attention and gentle professionalism, leaving you feeling balanced, renewed, and deeply cared for.",
            name: "Emma Stone",
            role: "Wellness Enthusiast"
        }
    ];
    return (
        <>
            <Box className={style.mainBox} >
                <Box className={style.left}>
                    <img
                        src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/08/shape2.png"
                        className={style.shapeA}
                    />

                    <Image
                        src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/teasti-shape1.png"
                        alt="Decorative shape"
                        width={155}
                        height={166}
                        className={style.shapeB}
                    />
                </Box>

                <Box className={style.middle} >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}

                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        pagination={{ clickable: true, }}
                        breakpoints={{
                            768: { slidesPerView: 1 }
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        style={{ width: "100%", padding: "20px 0" }}
                    >

                        {testimonials.map((t, index) => (
                            <Box className={style.testimonial }>
                            <SwiperSlide key={index} >
                                <img src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/teasti-quote.png" style={{ marginLeft: "45%" }} />

                                <p className={style.p}>{t.text}</p>
                                <h4 className={style.juklin}>{t.name}</h4>
                                <p style={{ textAlign: "center", color: "#acacac", fontWeight: 600 }}>
                                    {t.role}
                                </p>
                            </SwiperSlide></Box>
                        ))}

                    </Swiper>

                </Box>

                <Box className={style.right}>
                    <img
                        src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/teasti-shape2.png"
                        className={style.shapeC}
                    />

                    <img
                        src="https://aonetheme.com/spaclubwp/wp-content/uploads/2024/09/leaf.png"
                        className={style.leafShape}
                    />
                </Box>
            </Box>
        </>
    )
}