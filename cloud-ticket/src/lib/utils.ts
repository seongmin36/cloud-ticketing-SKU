// 이메일 검증
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 이름 검증
export const validateName = (name: string): boolean => {
  return name.trim().length > 0;
};
