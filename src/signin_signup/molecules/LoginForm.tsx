import React, { useState } from "react";
import Button from "../atom/Button";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { LOGIN_POST } from "../../Urls/URLList";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/sign-up");
  };
  const goMainPage = () => {
    navigate("/");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:8080/bechef/member/login"
        LOGIN_POST(),
        { id, pwd }
      );
      const apiResponse = response.data;
      console.log("API Response:", apiResponse);

      if (apiResponse.status === "SUCCESS") {
        const jwtToken = apiResponse.data.token; // 변경된 부분: token으로 키 이름 변경

        if (jwtToken) {
          localStorage.setItem("jwt-token", jwtToken);

          // JWT 토큰 디코딩
          const decodedToken: any = jwtDecode(jwtToken);
          console.log("Decoded Token:", decodedToken);

          // 'role' 클레임에서 역할 정보 추출 (백엔드 구현에 따라 다를 수 있음)
          const userRole = decodedToken.role;

          if (userRole === "ADMIN") {
            navigate("/admin/inventory");
          } else if (userRole === "USER") {
            goMainPage();
          } else {
            console.error("알 수 없는 사용자 역할:", userRole);
            goMainPage();
          }

          alert("로그인 성공");
        } else {
          console.error("토큰 정보가 없습니다.");
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        console.error("로그인 실패: ", apiResponse.message);
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error: any) {
      console.error("로그인 실패: ", error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex-col bg-npLG p-8 rounded-lg shadow-lg w-px400 h-px500 w-full h-full mt-2">
        <div>
          <FontAwesomeIcon
            onClick={goMainPage}
            className="text-2xl text-skipDB cursor-pointer"
            icon={faHouse}
          />
        </div>
        <h1 className="text-center pb-5 text-2xl font-bold mb-6 text-skipDB mt-px30">
          로그인
        </h1>
        <FormField
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
        <FormField
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="비밀번호"
        />
        <div className="flex justify-center">
          <Button text="로그인" onClick={handleLogin} />
        </div>
        <div className="text-center mt-4">
          <span className="mr-2">계정이 없으신가요?</span>
          <button
            type="button"
            onClick={goToSignUp}
            className="text-skipMB hover:underline"
          >
            회원가입
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
