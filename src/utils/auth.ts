import CryptoJS from 'crypto-js';

const ADMIN_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'; // admin

export const validatePassword = (password: string): boolean => {
  const hashedPassword = CryptoJS.SHA256(password).toString();
  return hashedPassword === ADMIN_HASH;
};

export const getAuthToken = (): string | null => {
  return sessionStorage.getItem('auth_token');
};

export const setAuthToken = (token: string): void => {
  sessionStorage.setItem('auth_token', token);
};

export const clearAuthToken = (): void => {
  sessionStorage.removeItem('auth_token');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};