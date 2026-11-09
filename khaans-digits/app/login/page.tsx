 "use client";
import Link from "next/link";
import {useState} from "react";
import {supabase} from "@/lib/supabase";
export default function Login(){const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [msg,setMsg]=useState("");
 async function go(e:any){e.preventDefault();if(!supabase){setMsg("Add Supabase environment variables to enable login.");return;}const {error}=await supabase.auth.signInWithPassword({email,password});setMsg(error?error.message:"Signed in. Open the customer dashboard.");if(!error)window.location.href="/dashboard";}
 return <main className="form-page"><section className="form-shell narrow"><Link href="/">← Home</Link><div className="eyebrow">CUSTOMER ACCESS</div><h1>Welcome <em>back.</em></h1><form onSubmit={go}><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="button primary submit">Sign in</button><p>{msg}</p></form><p>New customer? <Link href="/signup">Create an account</Link></p></section></main>}
