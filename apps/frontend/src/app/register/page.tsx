'use client';

import { useState } from 'react';
import { canRegisterUser, isStrongPassword, isValidNationalId, validateCaptcha } from '../../lib/marketplace';

export default function RegisterPage() {
  const [result, setResult] = useState<string>('');

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Registro seguro de cuenta</h1>
      <form
        className="mt-4 grid grid-cols-1 gap-3 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const nationalId = String(form.get('nationalId'));
          const email = String(form.get('email'));
          const phone = String(form.get('phone'));
          const password = String(form.get('password'));
          const captchaToken = String(form.get('captchaToken'));

          if (!validateCaptcha(captchaToken)) {
            setResult('CAPTCHA inválido. Reintenta para continuar.');
            return;
          }
          if (!isValidNationalId(nationalId)) {
            setResult('Formato de documento inválido. Use formato CC-12345678');
            return;
          }
          if (!isStrongPassword(password)) {
            setResult('Password débil. Requiere 10+ caracteres, mayúscula, minúscula, número y símbolo.');
            return;
          }

          const allowed = canRegisterUser({ nationalId, email, phone });
          setResult(allowed ? 'Cuenta válida. Se requiere verificación de email (y SMS opcional).' : 'Cuenta duplicada o inválida.');
        }}
      >
        <input name="firstName" required placeholder="First name" className="rounded border p-2" />
        <input name="lastName" required placeholder="Last name" className="rounded border p-2" />
        <input name="nationalId" required placeholder="Identity document (AR-12345678)" className="rounded border p-2" />
        <input name="phone" required placeholder="Phone" className="rounded border p-2" />
        <input name="email" type="email" required placeholder="Email" className="rounded border p-2" />
        <input name="password" type="password" required placeholder="Strong password" className="rounded border p-2" />
        <input name="address" required placeholder="Full address" className="rounded border p-2" />
        <input name="city" required placeholder="City" className="rounded border p-2" />
        <input name="country" required placeholder="Country" className="rounded border p-2" />
        <input name="captchaToken" required placeholder="CAPTCHA token (mock)" className="rounded border p-2" />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Create account</button>
      </form>
      {result ? <p className="mt-3 rounded bg-slate-100 p-3 text-sm">{result}</p> : null}
    </main>
  );
}
