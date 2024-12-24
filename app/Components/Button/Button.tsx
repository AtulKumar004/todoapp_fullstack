"use client";
import React from "react";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  className?: string;
  
  type?: "button" | "submit" | "reset";
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  background?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({ 
  icon, 
  className,
  name, 
  type = "button",
  padding,
  borderRad,
  fw,
  fs,
  background,
  onClick,
  children 
}: Props) => {
  return (
    <button
      type={type }
      onClick={onClick}
      style={{ padding, borderRadius: borderRad, fontWeight: fw, fontSize: fs, background }}
      className={`inline items-flex-end gap-2 cursor-pointer  rounded-md ${className}`}
    >
      {icon}
      {name || children}
    </button>
  );
};

export default Button;
