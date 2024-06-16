// ListAnimation.jsx
import React, { useEffect } from "react";
import "../styles/listanimation.css"; // Import your CSS file
import AOS from "aos"; // Import AOS library
import "aos/dist/aos.css"; // Import AOS CSS

const ListAnimation = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      // Add more configurations as needed
    });
    AOS.refresh(); // Call refresh after initializing AOS
  }, []);

  return (
    <div
      className="list-container"
      style={{ height: "400px", overflowY: "auto" }}
    >
      <h1>List Animation Example</h1>
      <ul className="list">
        <li className="list-item" data-aos="fade-up">
        <h2>Item 1</h2>
          <p>Description for Item 1</p>
        </li>
        <li className="list-item" data-aos="fade-up">
          <h2>Item 1</h2>
          <p>Description for Item 1</p>
        </li>
      </ul>
    </div>
  );
};

export default ListAnimation;
