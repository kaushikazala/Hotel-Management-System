import React from "react";
export default function About(){
  return (
    <section className="about section" id="about">
      <div>
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=60" alt="about" />
      </div>
      <div>
        <small>The Royal Hotel</small>
        <h2>Where Elegance Meets <span>Excellence</span></h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla facilis libero placeat ullam, nihil cupiditate quisquam? Qui ab, quisquam culpa, praesentium, consectetur magni voluptatibus quo minus excepturi nostrum optio.</p>
        <div className="row">
          <p>260+ <span className="badge">Awards</span></p>
          <p>250k+ <span className="badge">Visitors</span></p>
          <p>150k+ <span className="badge">Events</span></p>
        </div>
      </div>
    </section>
  );
}