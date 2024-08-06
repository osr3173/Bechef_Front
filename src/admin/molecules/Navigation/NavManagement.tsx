import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../atom/Navigation/NavLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const NavManagement = () => {
  const navigate = useNavigate();

  const goMainPage = () => {
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 shadow-lg relative h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Link to="/admin/inventory" className="flex items-center">
              <Logo
                LogoName="BeChef"
                className="text-white text-2xl font-bold hover:text-blue-200 transition-colors duration-300"
              />
            </Link>
          </div>
          <span className="text-white text-xl font-semibold">
            관리자 페이지
          </span>
          <div className="absolute right-5">
            <FontAwesomeIcon
              onClick={goMainPage}
              className="text-2xl text-skipDB cursor-pointer"
              icon={faHouse}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavManagement;
