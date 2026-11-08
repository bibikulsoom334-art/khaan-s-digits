"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const supabase = createClient();

  async function go(e: any) {
    e.preventDefault();
    if (!supabase) {
      setMsg("Add Supabase environment variables first.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      setMsg(error.message);
    } else {
      setMsg("Account created successfully!");
    }
  }

  return (
    <main className="form-page">
      <section className="form-shell narrow">
        <Link href="/">Home</Link>
        <h2>Create Account</h2>
        {msg && <p className="error-msg">{msg}</p>}

        <form onSubmit={go}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </main>
  );
}