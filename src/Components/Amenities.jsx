import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Amenities(){
  return (
    <section className="section" id="amenities">
      <small>Luxury Amenities</small>
      <h2>Our Best <span>Amenities</span></h2>
      <Swiper>
        {[{t:"Swimming Pool"},{t:"GYM & Sport"},{t:"Restro & Cafe"}].map((a,idx)=> (
          <SwiperSlide key={idx}>
            <div className="card amenity-card">
              <img src="https://www.hrjohnsonindia.com/assets/images/blog/5-Innovative-Ideas-to-Design-Your-Dream-Swimming-Pool.jpg" alt="amenity" />
              <div>
                <h2>{a.t}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore esse cumque sunt eligendi suscipit nostrum aliquam.</p>
                <button>Book Now</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}