'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { canRegisterUser, isStrongPassword, loginRateLimitExceeded, users } from '../lib/marketplace';

type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  membership: 'Free Plan' | 'Pro Seller' | 'Premium Seller';
  roles: string[];
  emailVerified: boolean;
};

type AuthContextValue = {
  user: AuthUser | null;
  failedAttempts: number;
  register: (payload: { firstName: string; lastName: string; email: string; password: string; nationalId: string; phone: string }) => string;
  login: (email: string, password: string, captchaToken: string) => string;
  logout: () => void;
  recoverPassword: (email: string) => string;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function hashPasswordBcryptStyle(password: string) {
  return `$2b$12$${btoa(password).slice(0, 20)}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    failedAttempts,
    register: ({ firstName, lastName, email, password, nationalId, phone }) => {
      if (!isStrongPassword(password)) return 'Weak password.';
      if (!canRegisterUser({ email, nationalId, phone })) return 'Duplicate account or invalid identity.';
      hashPasswordBcryptStyle(password);
      setUser({
        id: `u-${Date.now()}`,
        firstName,
        lastName,
        email,
        membership: 'Free Plan',
        roles: ['buyer', 'seller'],
        emailVerified: false
      });
      localStorage.setItem('zentro_pending_email_verification', email);
      return 'Registered. Verify your email before activation.';
    },
    login: (email, password, captchaToken) => {
      if (loginRateLimitExceeded(failedAttempts)) return 'Rate limited. Try later.';
      if (captchaToken.length < 10) return 'Captcha required.';
      if (!password) return 'Password required.';
      const found = users.find((u) => u.email === email);
      if (!found) {
        setFailedAttempts((n) => n + 1);
        return 'Invalid credentials.';
      }
      setFailedAttempts(0);
      const token = `jwt.${btoa(email)}.${Date.now()}`;
      localStorage.setItem('zentro_auth_token', token);
      setUser({
        id: found.id,
        firstName: found.firstName,
        lastName: found.lastName,
        email: found.email,
        membership: 'Pro Seller',
        roles: found.roles,
        emailVerified: found.emailVerified
      });
      return 'Logged in.';
    },
    logout: () => {
      localStorage.removeItem('zentro_auth_token');
      setUser(null);
    },
    recoverPassword: (email) => {
      if (!email.includes('@')) return 'Invalid email.';
      return 'Password recovery link sent (mock).';
    }
  }), [failedAttempts, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
