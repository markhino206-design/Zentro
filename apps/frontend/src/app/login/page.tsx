'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login, failedAttempts } = useAuth();
  const [message, setMessage] = useState('');

  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Login</h1>
      <form
        className="mt-4 space-y-3 rounded-2xl bg-white p-5 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          setMessage(login(String(form.get('email')), String(form.get('password')), String(form.get('captchaToken'))));
        }}
      >
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border p-2" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded border p-2" />
        <input name="captchaToken" required placeholder="CAPTCHA token (mock)" className="w-full rounded border p-2" />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Login</button>
      </form>
      <p className="mt-2 text-sm text-slate-600">Failed attempts: {failedAttempts}</p>
      {message ? <p className="mt-2 text-sm">{message}</p> : null}
      <Link href="/recover" className="mt-2 inline-block text-sm text-blue-600">Recover password</Link>
    </main>
  );
}
