 "use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
const WA = "923449531512";
const supabase = createClient();
export default function OrderPage() {
 const [kind,setKind]=useState("Wishes Card");
 const [form,setForm]=useState<any>({name:"",phone:"",email:"",brand:"",websiteType:"",pages:"",reference:"",theme:"",requirements:"",budget:"",deadline:"",occasion:"Birthday",recipient:"",message:"",design:"",deliveryDate:""});
 const [status,setStatus]=useState("");
 const change=(e:any)=>setForm({...form,[e.target.name]:e.target.value});
 async function submit(e:any){
  e.preventDefault(); setStatus("Submitting your request...");
  const payload={service_type:kind,customer_name:form.name,whatsapp:form.phone,email:form.email,details:form};
  if(supabase){const {error}=await supabase.from("orders").insert(payload);if(error){setStatus("Could not save online yet. Please use WhatsApp below.");return;}}
  else setStatus("Your request is ready. Please send it through WhatsApp.");
  const msg=`KHAANS DIGITS ORDER\nService: ${kind}\nName: ${form.name}\nWhatsApp: ${form.phone}\nEmail: ${form.email}\nDetails: ${JSON.stringify(form,null,2)}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");
 }
 return <main className="form-page"><nav className="nav wrap"><Link className="brand" href="/"><b>KHAANS DIGITS</b></Link><Link href="/">← Back home</Link></nav><section className="form-shell"><div className="eyebrow">START A PROJECT</div><h1>Let’s make it <em>personal.</em></h1><p>Share a few details. We’ll contact you on WhatsApp to discuss your requirements and pricing. No advance payment is requested through this form.</p>
 <div className="switch"><button className={kind==="Wishes Card"?"active":""} onClick={()=>setKind("Wishes Card")}>Wishes Card</button><button className={kind==="3D Website"?"active":""} onClick={()=>setKind("3D Website")}>3D Website</button></div>
 <form onSubmit={submit}><div className="fields">
 {["name","phone","email"].map((f)=><label key={f}>{f==="name"?"Customer name":f==="phone"?"WhatsApp number":"Email address"}<input required name={f} value={form[f]} onChange={change} placeholder={f==="phone"?"+92...":""}/></label>)}
 {kind==="3D Website"?<>{[["brand","Business / brand name"],["websiteType","Website type"],["pages","Required pages"],["reference","Reference website link"],["theme","Preferred design / theme"],["requirements","Special requirements"],["budget","Budget (PKR)"],["deadline","Expected deadline"]].map(([f,l])=><label key={f}>{l}<input name={f} value={form[f]} onChange={change}/></label>)}</>:<>{[["occasion","Card occasion"],["recipient","Recipient name"],["message","Custom message"],["design","Preferred design"],["deliveryDate","Delivery date"]].map(([f,l])=><label key={f}>{l}{f==="message"?<textarea name={f} value={form[f]} onChange={change}/>:<input name={f} value={form[f]} onChange={change}/>}</label>)}<label>Photo upload (share it on WhatsApp after submitting)<input type="file" accept="image/*" onChange={()=>setStatus("Please attach your photo in WhatsApp after opening it.")}/></label></>}
 </div><button className="button primary submit" type="submit">Send Order Request →</button><p className="form-note">{status}</p></form></section></main>;
}