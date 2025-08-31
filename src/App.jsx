import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import About from "./Components/About";
import Services from "./Components/Services";
import Amenities from "./Components/Amenities";
import Testimonial from "./Components/Testimonial";
import Footer from "./Components/Footer";
import { useDispatch } from "react-redux";
import RoomsGrid from "./Components/RoomsGrid";
import ReservationForm from "./Components/ReservationForm";
import ReservationsTable from "./Components/ReservationsTable";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Route, Routes , Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectRoute";
import { fetchRooms } from "./redux/features/roomsSlice";

const HomePage = () => (
  <>
    <Header />
    <About />
    <Services />
    <Amenities />
    <RoomsGrid />
    <Testimonial />
  </>
);

const ServicesPage = () => <Services />;
const AmenitiesPage = () => <Amenities />;
const TestimonialPage = () => <Testimonial />;
const ContactPage = () => (
  <div className="page-container">
    <h1>Contact Us</h1>
    <p>Email: hotel@example.com</p>
    <p>Phone: +91-9876543210</p>
    <p>Address: 123 Beach Road, Goa, India</p>
  </div>
);

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/services" element={<ServicesPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/rooms" element={<RoomsGrid />} />
          <Route
            path="/reserve/:roomId"
            element={
              <ProtectedRoute>
                <ReservationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                <ReservationsTable />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
