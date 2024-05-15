'use client'
// ColorPicker.js
import React, { useState, useEffect } from 'react';

const ColorPicker = ({ defaultValue, onSelectColor }) => {
  const colors = ['#FF5733', '#FFC300', '#4CAF50', '#2196F3', '#9C27B0', '#FF5722', '#795548', '#607D8B', '#000000'];
  const [selectedColor, setSelectedColor] = useState(defaultValue); // Initialize selected color with defaultValue

  useEffect(() => {
    setSelectedColor(defaultValue); // Update selected color when defaultValue changes
  }, [defaultValue]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <div className="flex justify-between mt-2">
      {colors.map((color, index) => (
        <div
          key={index}
          className="w-8 h-8 rounded-full cursor-pointer"
          style={{ backgroundColor: color, border: selectedColor === color ? '2px solid #000' : 'none' }}
          onClick={() => handleColorClick(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
