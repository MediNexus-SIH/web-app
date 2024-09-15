import React from "react";

interface AvatarProps {
  initials: string;
  backgroundColor: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  initials,
  backgroundColor,
  size = 36,
}) => {
  const style = {
    backgroundColor,
    width: size,
    height: size,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: size / 2.5,
    fontWeight: "bold",
    color: "white",
    overflow: "hidden",
  };

  return <div style={style}>{initials}</div>;
};

export default Avatar;
