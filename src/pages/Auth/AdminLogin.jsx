import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getApiError } from "../../api/axios";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import { LOGO_URL } from "../../utils/constants";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (f) => (e) => {
    setError("");
    setForm((p) => ({ ...p, [f]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Enter your email and password.");
      return;
    }
    setBusy(true);
    try {
      await login(form);
      const next = new URLSearchParams(location.search).get("next");
      navigate(next || "/admin");
    } catch (err) {
      if (err?.code === "NOT_ADMIN") setError("This account is not an administrator.");
      else setError(getApiError(err, "Login failed."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ink-100">
      <div className="hidden lg:block relative">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/login-background.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900/90 via-primary-900/80 to-ink-900/90" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <img src={LOGO_URL} alt="Admin" className="h-9 w-auto" />
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-tight">
              Run your t-shirt shop from anywhere.
            </h1>
            <p className="mt-3 text-white/70 max-w-sm">
              Orders, payments, KHQR auto-check and Telegram alerts - all in one
              dashboard.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Administrator access only
            </div>
          </div>
          <p className="text-xs text-white/50">&copy; {new Date().getFullYear()} T-Shirt Cambodia</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <img src={LOGO_URL} alt="Admin" className="lg:hidden h-9 mx-auto mb-6" />
          <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-extrabold text-ink-900">Admin sign in</h2>
                <p className="text-sm text-ink-400">Use your administrator account</p>
              </div>
            </div>

            {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

            <form onSubmit={submit} className="space-y-4">
              <Input label="Email" type="email" icon={Mail} value={form.email} onChange={change("email")} placeholder="admin@tshirtcambodia.com" />
              <div>
                <Input label="Password" type="password" icon={KeyRound} value={form.password} onChange={change("password")} placeholder="••••••••" />
                <p className="mt-1.5 text-xs text-ink-400">Default seed: admin@tshirtcambodia.com / admin1234</p>
              </div>
              <Button type="submit" full size="lg" loading={busy} icon={Lock}>
                Sign in to dashboard
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
