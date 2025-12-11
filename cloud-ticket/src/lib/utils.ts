// 이메일 검증
export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return emailRegex.test(email);
};

// 이름 검증
export const validateName = (name: string): boolean => {
  return name.trim().length > 0;
};
