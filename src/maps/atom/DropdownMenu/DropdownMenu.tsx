import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Modal from "../Modal";

interface DropdownMenuProps {
  onLogout: () => void;
}

const DropdownMenu = ({ onLogout }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
    console.log("Logged out");
    alert("로그아웃 되었습니다.");
  };

  const handleMyPage = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button onClick={toggleDropdown} text="Menu" />
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg">
          <>
            <Button
              onClick={handleLogout}
              text="로그아웃"
              className="block text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            />
            <Button
              onClick={handleMyPage}
              text="마이페이지"
              className="block text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            />
          </>
        </div>
      )}
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        onLogout={onLogout}
      />
    </div>
  );
};

export default DropdownMenu;
