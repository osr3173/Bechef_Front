import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../atom/Button/Button";
import Logo from "../../atom/Logo/Logo";
import DropdownMenu from "../../atom/DropdownMenu/DropdownMenu";

const HeaderSection = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    setIsLoggedIn(!!token);
  }, []);

  const navigateLogin = () => {
    navigate("/sign-in");
  };


  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-between items-center p-2 bg-skipDB text-white">
      <div className="w-36 justify-center items-center">
        <Logo url="https://i.ibb.co/98s8n03/Logo.png" />
      </div>
      <div className="p-3">
        {isLoggedIn ? (
          <DropdownMenu onLogout={handleLogout} />
        ) : (
          <Button onClick={navigateLogin} text="Login" className="" />
        )}
      </div>
    </div>
  );
};

export default HeaderSection;
