 "use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const WA = "923449531512";

export default function OrderPage() {
  const [kind, setKind] = useState("Wishes Card");
  const [form, setForm] = useState<any>({
    name: "", phone: "", email: "", brand: "", websiteType: "",
    pages: "", reference: "", theme: "", requirements: "", budget: "",
    deadline: "", occasion: "Birthday", recipient: "", message: "",
    design: "", deliveryDate: ""
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function submit(e: any) {
    e.preventDefault();
    if (isSubmitting) return;

    const msg =
      `KHAANS DIGITS ORDER\n` +
      `Service: ${kind}\n` +
      `Name: ${form.name}\n` +
      `WhatsApp: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Details: ${JSON.stringify(form, null, 2)}`;

    // Open WhatsApp immediately during the user's click, before awaiting
    // the database request, so the browser is less likely to block the tab.
    const whatsappUrl = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    const whatsappTab = window.open(whatsappUrl, "_blank");

    setIsSubmitting(true);
    setStatus("Your WhatsApp order message is opening. Saving your request online...");

    try {
      if (!supabase) {
        setStatus(
          whatsappTab
            ? "WhatsApp opened with your order details. Online saving is not configured yet (missing Supabase environment variables)."
            : "Online saving is not configured, and your browser blocked the WhatsApp window. Please allow pop-ups and try again."
        );
        return;
      }

      const payload = {
        service_type: kind,
        customer_name: form.name,
        whatsapp: form.phone,
        email: form.email,
        details: form
      };

      const { error } = await supabase.from("orders").insert(payload);

      if (error) {
        console.error("Order save failed:", error);
        setStatus(
          `WhatsApp ${whatsappTab ? "opened" : "could not open"} with your order details, but online saving failed: ${error.message}. ` +
          "Please check the Supabase setup or contact us on WhatsApp."
        );
        return;
      }

      setStatus(
        whatsappTab
          ? "Your order was saved online successfully, and WhatsApp opened with your order details. Please press Send in WhatsApp to notify us."
          : "Your order was saved online successfully, but your browser blocked WhatsApp. Please allow pop-ups and contact us on WhatsApp."
      );
    } catch (err: any) {
      console.error("Order submission error:", err);
      setStatus(
        `WhatsApp ${whatsappTab ? "opened" : "could not open"}, but an unexpected online-saving error occurred: ${err?.message || "Unknown error"}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="form-page">
      <nav className="nav wrap">
        <Link className="brand" href="/"><b>KHAANS DIGITS</b></Link>
        <Link href="/">← Back home</Link>
      </nav>

      <section className="form-shell">
        <div className="eyebrow">START A PROJECT</div>
        <h1>Let’s make it <em>personal.</em></h1>
        <p>Share a few details. We’ll contact you on WhatsApp to discuss your requirements and pricing. No advance payment is requested through this form.</p>

        <div className="switch">
          <button type="button" className={kind === "Wishes Card" ? "active" : ""} onClick={() => setKind("Wishes Card")}>Wishes Card</button>
          <button type="button" className={kind === "3D Website" ? "active" : ""} onClick={() => setKind("3D Website")}>3D Website</button>
        </div>

        <form onSubmit={submit}>
          <div className="fields">
            {["name", "phone", "email"].map((f) => (
              <label key={f}>
                {f === "name" ? "Customer name" : f === "phone" ? "WhatsApp number" : "Email address"}
                <input
                  required
                  type={f === "email" ? "email" : "text"}
                  name={f}
                  value={form[f]}
                  onChange={change}
                  placeholder={f === "phone" ? "+92..." : ""}
                />
              </label>
            ))}

            {kind === "3D Website" ? (
              <>
                {[
                  ["brand", "Business / brand name"],
                  ["websiteType", "Website type"],
                  ["pages", "Required pages"],
                  ["reference", "Reference website link"],
                  ["theme", "Preferred design / theme"],
                  ["requirements", "Special requirements"],
                  ["budget", "Budget (PKR)"],
                  ["deadline", "Expected deadline"]
                ].map(([f, label]) => (
                  <label key={f}>{label}<input name={f} value={form[f]} onChange={change} /></label>
                ))}
              </>
            ) : (
              <>
                {[
                  ["occasion", "Card occasion"],
                  ["recipient", "Recipient name"],
                  ["message", "Custom message"],
                  ["design", "Preferred design"],
                  ["deliveryDate", "Delivery date"]
                ].map(([f, label]) => (
                  <label key={f}>
                    {label}
                    {f === "message"
                      ? <textarea name={f} value={form[f]} onChange={change} />
                      : <input name={f} value={form[f]} onChange={change} />}
                  </label>
                ))}
                <label>
                  Photo upload (share it on WhatsApp after submitting)
                  <input type="file" accept="image/*" onChange={() => setStatus("Please attach your photo in WhatsApp after opening it.")} />
                </label>
              </>
            )}
          </div>

          <button className="button primary submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send Order Request →"}
          </button>
          <p className="form-note" role="status" aria-live="polite">{status}</p>
        </form>
      </section>
    </main>
  );
}
