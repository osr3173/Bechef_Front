// 이름
export const validateName = (name: string) => {
  if (!name) {
    return "이름을 입력하세요.";
  } else {
    return "";
  }
};

// 아이디 유효성검사
export const validateId = (id: string) => {
  const idRegex = /^[a-zA-Z0-9]+$/; // 특수문자 불가
  if (!id) {
    return "아이디를 입력하세요.";
  } else if (!idRegex.test(id)) {
    return "아이디는 영문자와 숫자만 가능합니다.";
  } else {
    return "";
  }
};

// 비밀번호 유효성검사
export const validatePwd = (Pwd: string) => {
  const pwdRegex = /^[a-zA-Z0-9]{8,16}$/; // 8-16자리, 특수문자 불가
  if (!Pwd) {
    return "비밀번호를 입력하세요.";
  } else if (!pwdRegex.test(Pwd)) {
    return "비밀번호는 8-16자리의 영문자와 숫자로 입력하세요.";
  } else {
    return "";
  }
};

// 비밀번호 재확인검사
export const validateConfirmPwd = (Pwd: string, confirmPwd: string) => {
  if (!confirmPwd) {
    return "비밀번호를 확인하세요.";
  } else if (Pwd !== confirmPwd) {
    return "비밀번호가 일치하지 않습니다.";
  } else {
    return "";
  }
};

// 이메일 유효성검사
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "이메일을 입력하세요.";
  } else if (!emailRegex.test(email)) {
    return "유효한 이메일 주소를 입력하세요.";
  } else {
    return "";
  }
};

// 전화번호 유효성검사
export const validatePhone = (phone: string) => {
  const phoneReg = /^(010\d{4}\d{4}|011[6|7|8|9]\d{3,4}\d{4})$/;
  if (!phone) {
    return "전화번호를 입력하세요.";
  } else if (!phoneReg.test(phone)) {
    return "유효한 전화번호를 입력하세요.";
  } else {
    return "";
  }
};

// 주소 유효성검사
export const validateaddress = (address: string) => {
  if (!address) {
    return "주소를 입력하세요.";
  } else {
    return "";
  }
};
