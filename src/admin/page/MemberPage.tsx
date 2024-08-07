import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navigation from "../organisms/Navigation/NavigationPage";
import Sidebar from "../organisms/Sidebar/SidebarPage";
import MemberTable from "../organisms/Member/MemberTable";
import { ADMIN_MEMBERS, ADMIN_MEMBERS_DELETE } from "../../Urls/URLList";

export type Member = {
  member_idx: number;
  member_name: string;
  member_id: string;
  member_email: string;
  member_phone: string;
  member_address: string;
};

const MemberPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //관리자의 권한 상태 추가
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    //컴포넌트가 처음으로 마운트 될때 실행되는 코드
    //즉 처음 한번만 실행되고 그 이후 부터는 실행 X
    const token = localStorage.getItem("jwt-token");
    if (token) {
      try {
        //JWT 토큰을 디코딩하여 사용자의 역할(Role)을 확인
        const decodedToken: any = jwtDecode(token);
        //토큰에서 Role을 확인해서 ADMIN인지 아닌지 상태확인
        setIsAdmin(decodedToken.role === "ADMIN");
      } catch (error) {
        console.error("Error decoding token:", error);
        //토큰 디코딩에 실패한 경우 isAdmin 상태를 false로 설정함
        setIsAdmin(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      //만약 역할(role)이 관리자로 확인이 되었다면
      fetchMembers();
      //서버에서 멤버의 리스트를 불러옴
    }
    //isAdmin이 변경될 떄마다 이 useEffect가 실행됨
  }, [isAdmin]);

  const fetchMembers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("jwt-token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get<Member[]>(ADMIN_MEMBERS(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("멤버 데이터:", response.data);
      setMembers(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("인증 오류: 권한이 없거나 토큰이 만료되었습니다.");
          navigate("/login");
        } else if (error.response?.status === 403) {
          setError("접근 권한이 없습니다.");
        } else {
          setError("API 요청 중 오류가 발생했습니다.");
        }
      } else {
        setError("예상치 못한 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (member_idx: number) => {
    if (window.confirm("정말로 이 회원을 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("jwt-token");
        await axios.delete(ADMIN_MEMBERS_DELETE(member_idx), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.member_idx !== member_idx)
        );
        alert("회원이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("회원 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col h-screen bg-gray-100 items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          접근 권한이 없습니다
        </h1>
        <p className="text-gray-600">
          이 페이지는 관리자만 접근할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              회원 정보 관리
            </h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                {isLoading ? (
                  <p>데이터를 불러오는 중...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <MemberTable members={members} onDelete={handleDelete} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MemberPage;
