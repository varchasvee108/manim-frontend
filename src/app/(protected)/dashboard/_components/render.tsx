"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const Render = () => {
  const prompt = "a cool sin and cos wave with explanation";
  const handleClick = async () => {
    try {
      const res = await fetch("/api/manim-code", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" },
      });
      const { script } = await res.json();
      console.log(script);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={handleClick}>Render</Button>
    </div>
  );
};

export default Render;
