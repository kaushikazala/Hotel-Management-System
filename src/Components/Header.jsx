import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Header(){
  return (
    <section className="header section">
      <Swiper>
        {[1,2,3].map((i)=>(
          <SwiperSlide key={i}>
            <div className="header-slide">
              <div className="header-cta">
                <small>Luxury Hotel & Restaurant</small>
                <h2>Enjoy Your <span>Dream</span> Time With <span>Luxury</span> Experience</h2>
                <p>Call Now <span>1234567891</span></p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}