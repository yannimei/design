import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure this path is correct

function GradientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

  // Function to update target position based on mouse movement
  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setTargetPosition({ x, y });
  };

  useEffect(() => {
    let frameId;

    // Function to smoothly transition the gradient center to the target position
    const updatePosition = () => {
      // Interpolate between the current position and the target position
      const x = mousePosition.x + (targetPosition.x - mousePosition.x) * 0.1; // Adjust the 0.1 factor to control the speed
      const y = mousePosition.y + (targetPosition.y - mousePosition.y) * 0.1; // Same here

      setMousePosition({ x, y });

      // Continue the animation
      frameId = requestAnimationFrame(updatePosition);
    };

    // Start the animation
    frameId = requestAnimationFrame(updatePosition);

    // Clean up the animation frame listener when the component unmounts or the effect re-runs
    return () => cancelAnimationFrame(frameId);
  }, [targetPosition]); // Effect depends on targetPosition

  const gradientStyle = {
    height: '100vh',
    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--color-start) 30%, var(--color-end) 100%)`
  };

  return (
    <div className="gradientBackground" style={gradientStyle} onMouseMove={handleMouseMove}>
      {/* Content here */}
    </div>
  );
}

export default GradientBackground;
