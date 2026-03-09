'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function RecoverPage() {
  const { recoverPassword } = useAuth();
  const [message, setMessage] = useState('');

  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Recover password</h1>
      <form
        className="mt-4 space-y-3 rounded-2xl bg-white p-5 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          setMessage(recoverPassword(String(form.get('email'))));
        }}
      >
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border p-2" />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Send recovery link</button>
      </form>
      {message ? <p className="mt-2 text-sm">{message}</p> : null}
    </main>
  );
}
