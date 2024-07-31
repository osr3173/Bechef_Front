import React, { useState } from "react";
import Button from "../atom/Button";
import axios from "axios";

import {
  validateName,
  validateId,
  validatePwd,
  validateConfirmPwd,
  validateEmail,
  validatePhone,
  validateaddress,
} from "./SignUpCheck";
import FormField from "./FormField";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { REGISTER_POST } from "../../Urls/URLList";

const SignUpForm: React.FC = () => {
  // 각 입력 필드에 대한 상태 관리
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");

  // 각 필드의 에러 메시지를 관리하는 상태
  const [errors, setErrors] = useState({
    name: "",
    id: "",
    pwd: "",
    confirmPwd: "",
    email: "",
    phone: "",
    address: "",
  });

  // 이름 입력 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({ ...prev, name: validateName(value) }));
  };

  // 아이디 입력 핸들러
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setErrors((prev) => ({ ...prev, id: validateId(value) }));
  };

  // 비밀번호 입력 핸들러
  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);
    setErrors((prev) => ({
      ...prev,
      pwd: validatePwd(value),
      // 비밀번호가 변경되면 비밀번호 확인도 다시 검증
      confirmPwd: validateConfirmPwd(value, confirmPwd),
    }));
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPwd(value);
    setErrors((prev) => ({
      ...prev,
      confirmPwd: validateConfirmPwd(pwd, value),
    }));
  };

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  // 전화번호 입력 핸들러
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
  };

  // 주소 입력 핸들러
  const handleAdressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAdress(value);
    setErrors((prev) => ({ ...prev, address: validateaddress(value) }));
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/sign-in");
  };
  const goMainPage = () => {
    navigate("/");
  };

  // 회원가입 제출 핸들러
  const handleSignUp = async () => {
    // 모든 필드의 에러 검사
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      try {
        // 서버에 회원가입 요청
        const response = await axios.post(REGISTER_POST(), {
          name,
          id,
          pwd,
          email,
          phone,
          address,
        });
        console.log("서버 응답:", response.data);
        alert("가입 성공!");
        goToLogin();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Sign-up error", error.response?.data);
          alert(
            `가입 중 오류가 발생했습니다: ${
              error.response?.data?.error || error.message
            }`
          );
        } else {
          console.error("Sign-up error", error);
          alert("가입 중 알 수 없는 오류가 발생했습니다.");
        }
      }
    } else {
      alert("입력 정보를 다시 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-npLG p-4 rounded-lg shadow-lg w-px415  w-full h-fit">
        <div className="text-center pb-4">
          <div className="text-left">
            <FontAwesomeIcon
              onClick={goMainPage}
              className="text-lg text-skipDB cursor-pointer"
              icon={faHouse}
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-skipDB">회원가입</h1>
          <p className="text-gray-600">신선한 요리의 시작, 지금 가입하세요</p>
        </div>
        <FormField
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="이름"
          error={errors.name}
        />
        <FormField
          type="text"
          value={id}
          onChange={handleIdChange}
          placeholder="아이디"
          error={errors.id}
        />
        <FormField
          type="password"
          value={pwd}
          onChange={handlePwdChange}
          placeholder="비밀번호"
          error={errors.pwd}
        />
        <FormField
          type="password"
          value={confirmPwd}
          onChange={handleConfirmPwdChange}
          placeholder="비밀번호 확인"
          error={errors.confirmPwd}
        />
        <FormField
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일"
          error={errors.email}
        />
        <FormField
          type="tel"
          value={phone}
          onChange={handlePhoneNumberChange}
          placeholder="전화번호"
          error={errors.phone}
        />
        <FormField
          type="text"
          value={address}
          onChange={handleAdressChange}
          placeholder="주소"
          error={errors.address}
        />
        <div className="flex justify-center">
          <Button text="가입하기" onClick={handleSignUp} />
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          이미 계정이 있으신가요?{" "}
          <a href="/Sign-in" className="text-skipMB hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
