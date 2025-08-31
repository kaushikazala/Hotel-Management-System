import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Testimonial(){
  const items = [
    {n:"John Doe", r:"Manager"},
    {n:"Samantha", r:"Sales Manager"},
    {n:"Amrite", r:"Manager"},
  ];
  return (
    <section className="section" id="testimonials">
      <small>Testimonials</small>
      <h2>What Our Clients <span>Says</span></h2>
      <Swiper>
        {items.map((it,idx)=> (
          <SwiperSlide key={idx}>
            <div className="card row">
              <img style={{width:90,height:90,borderRadius:"50%"}} src={`https://i.pravatar.cc/150?img=${idx+12}`} alt="avatar"/>
              <div>
                <h3>{it.n} <span className="badge">{it.r}</span></h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, laudantium repellat expedita modi.</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}