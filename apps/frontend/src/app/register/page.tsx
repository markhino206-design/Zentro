'use client';

import { useState } from 'react';
import { isValidNationalId, isStrongPassword, validateCaptcha } from '../../lib/marketplace';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const [result, setResult] = useState<string>('');

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Secure Account Registration</h1>
      <form
        className="mt-4 grid grid-cols-1 gap-3 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const firstName = String(form.get('firstName'));
          const lastName = String(form.get('lastName'));
          const nationalId = String(form.get('nationalId'));
          const phone = String(form.get('phone'));
          const email = String(form.get('email'));
          const password = String(form.get('password'));
          const captchaToken = String(form.get('captchaToken'));

          if (!validateCaptcha(captchaToken)) return setResult('Invalid CAPTCHA.');
          if (!isValidNationalId(nationalId)) return setResult('Invalid identity document format (e.g. AR-12345678).');
          if (!isStrongPassword(password)) return setResult('Weak password.');

          setResult(register({ firstName, lastName, email, password, nationalId, phone }));
        }}
      >
        <input name="firstName" required placeholder="First Name" className="rounded border p-2" />
        <input name="lastName" required placeholder="Last Name" className="rounded border p-2" />
        <input name="nationalId" required placeholder="Identity Document Number" className="rounded border p-2" />
        <input name="phone" required placeholder="Phone Number" className="rounded border p-2" />
        <input name="email" type="email" required placeholder="Email" className="rounded border p-2" />
        <input name="password" type="password" required placeholder="Password" className="rounded border p-2" />
        <input name="address" required placeholder="Full Address" className="rounded border p-2" />
        <input name="city" required placeholder="City" className="rounded border p-2" />
        <input name="country" required placeholder="Country" className="rounded border p-2" />
        <input name="captchaToken" required placeholder="CAPTCHA token (mock)" className="rounded border p-2" />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Create account</button>
      </form>
      {result ? <p className="mt-3 rounded bg-slate-100 p-3 text-sm">{result}</p> : null}
    </main>
  );
}
