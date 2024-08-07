// 이름 유효성 검사
export const validateName = (name: string): string => {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return "이름을 입력하세요.";
  }
  if (trimmedName.length > 10) {
    return "이름은 10글자 이내로 입력하세요.";
  }
  const nameRegex = /^[가-힣a-zA-Z]+$/;
  if (!nameRegex.test(trimmedName)) {
    return "이름은 한글 또는 영문만 사용 가능합니다.";
  }
  return "";
};

// 닉네임 유효성 검사
export const validateNickname = (nickname: string): string => {
  const trimmedNickname = nickname.trim();
  if (!trimmedNickname) {
    return "닉네임을 입력하세요.";
  }
  if (trimmedNickname.length > 5) {
    return "닉네임은 5글자 이내로 입력하세요.";
  }
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
  if (!nicknameRegex.test(trimmedNickname)) {
    return "닉네임은 한글, 영문, 숫자만 사용 가능합니다.";
  }
  return "";
};

// 아이디 유효성 검사
export const validateId = (id: string): string => {
  const idRegex = /^[a-zA-Z0-9]{4,12}$/;
  if (!id) {
    return "아이디를 입력하세요.";
  }
  if (!idRegex.test(id)) {
    return "아이디는 4-12자리의 영문자와 숫자만 가능합니다.";
  }
  return "";
};

// 비밀번호 유효성 검사
export const validatePwd = (pwd: string): string => {
  const pwdRegex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (!pwd) {
    return "비밀번호를 입력하세요.";
  }
  if (!pwdRegex.test(pwd)) {
    return "비밀번호는 8-16자리의 영문자, 숫자, 특수문자를 모두 포함해야 합니다.";
  }
  return "";
};

// 비밀번호 재확인 검사
export const validateConfirmPwd = (pwd: string, confirmPwd: string): string => {
  if (!confirmPwd) {
    return "비밀번호를 확인하세요.";
  }
  if (pwd !== confirmPwd) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return "";
};

// 이메일 유효성 검사
export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "이메일을 입력하세요.";
  }
  if (!emailRegex.test(email)) {
    return "유효한 이메일 주소를 입력하세요.";
  }
  return "";
};

// 전화번호 유효성 검사
export const validatePhone = (phone: string): string => {
  const phoneReg = /^01[016789]\d{8}$/;
  if (!phone) {
    return "전화번호를 입력하세요.";
  }
  if (!phoneReg.test(phone)) {
    return "유효한 전화번호를 입력하세요. (01X-XXXX-XXXX 형식)";
  }
  return "";
};

// 주소 유효성 검사
export const validateAddress = (address: string): string => {
  if (!address.trim()) {
    return "주소를 입력하세요.";
  }
  if (address.length > 100) {
    return "주소는 100자 이내로 입력하세요.";
  }
  return "";
};

export default {};
