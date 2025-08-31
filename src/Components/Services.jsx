import React from "react";
export default function Services(){
  const cards = [
    {h:"Basic Facilities", lines:["Reception / Front Desk","Room Service","House Keeping","Wi‑Fi & Parking"]},
    {h:"Room Amenities", lines:["Comfortable Bedding","Bedroom & Pool","TV and AC","Mini Bar"]},
    {h:"Dining Options", lines:["Restaurant & Cafe","Bar & Lounge","Canteen","Room Service"]},
    {h:"Special Features", lines:["Custom Rooms","Cricket Ground","Gym"]},
  ];
  return (
    <section className="section" id="services">
      <small>Facilities</small>
      <h2>Our Best <span>Services</span></h2>
      <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
        {cards.map((c,i)=> (
          <div className="card" key={i}>
            <h3>{c.h}</h3>
            {c.lines.map((l,idx)=>(<p key={idx}>- {l}</p>))}
          </div>
        ))}
      </div>
    </section>
  );
}