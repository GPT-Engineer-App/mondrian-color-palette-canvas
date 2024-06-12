import React, { useRef, useEffect, useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];

const Index = () => {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = (e) => {
      if (e.buttons !== 1) return; // Only draw when mouse is clicked
      context.beginPath();
      context.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
      context.fillStyle = currentColor;
      context.fill();
    };

    canvas.addEventListener("mousemove", draw);
    return () => {
      canvas.removeEventListener("mousemove", draw);
    };
  }, [currentColor]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <HStack position="absolute" top={4} left={4} spacing={4}>
        {colors.map((color) => (
          <Button
            key={color}
            bg={color}
            width="40px"
            height="40px"
            onClick={() => setCurrentColor(color)}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default Index;