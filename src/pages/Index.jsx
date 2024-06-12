import React, { useRef, useEffect, useState } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { FaEraser, FaPaintBrush } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const startDrawing = ({ nativeEvent }) => {
      const { offsetX, offsetY } = nativeEvent;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    };

    const finishDrawing = () => {
      context.closePath();
      setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = nativeEvent;
      context.lineTo(offsetX, offsetY);
      context.strokeStyle = isErasing ? "#FFFFFF" : color;
      context.lineWidth = isErasing ? 20 : 5;
      context.stroke();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", finishDrawing);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", finishDrawing);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [color, isDrawing, isErasing]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <VStack position="absolute" top={4} left={4} spacing={4}>
        <HStack>
          {colors.map((c) => (
            <Button
              key={c}
              backgroundColor={c}
              width="40px"
              height="40px"
              onClick={() => {
                setColor(c);
                setIsErasing(false);
              }}
            />
          ))}
        </HStack>
        <Button
          leftIcon={<FaPaintBrush />}
          onClick={() => setIsErasing(false)}
        >
          Draw
        </Button>
        <Button
          leftIcon={<FaEraser />}
          onClick={() => setIsErasing(true)}
        >
          Erase
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;