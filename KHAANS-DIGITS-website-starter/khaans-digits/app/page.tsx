
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function OrderPageContent() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    occasion: params.get("occasion") || "",
    recipient: "",
    message: "",
    design: "",
    delivery: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const message = `
KHAANS DIGITS - NEW WISHES CARD ORDER

Customer: ${form.name}
WhatsApp: ${form.whatsapp}
Email: ${form.email}
Occasion: ${form.occasion}
Recipient: ${form.recipient}
Message: ${form.message}
Design: ${form.design}
Delivery Date: ${form.delivery}
Photo attached separately: ${photo ? photo.name : "No"}
    `;

    window.open(
      `https://wa.me/923449531512?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main className="order-page">
      <section className="order-container">
        <span className="order-label">KHAANS DIGITS</span>

        <h1>
          Create Your
          <span> Wishes Card.</span>
        </h1>

        <p>
          Let us create something beautiful for your special moment.
        </p>

        <form onSubmit={submit}>
          <label>Customer Name</label>
          <input name="name" required value={form.name} onChange={update} />

          <label>WhatsApp Number</label>
          <input name="whatsapp" required value={form.whatsapp} onChange={update} />

          <label>Email Address</label>
          <input type="email" name="email" required value={form.email} onChange={update} />

          <label>Card Occasion</label>
          <select name="occasion" required value={form.occasion} onChange={update}>
            <option value="">Select occasion</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Love">Love</option>
            <option value="Eid">Eid</option>
            <option value="Wedding">Wedding</option>
            <option value="Congratulations">Congratulations</option>
            <option value="Other">Other</option>
          </select>

          <label>Recipient Name</label>
          <input name="recipient" required value={form.recipient} onChange={update} />

          <label>Custom Message</label>
          <textarea name="message" required value={form.message} onChange={update} rows={4} />

          <label>Preferred Design</label>
          <select name="design" value={form.design} onChange={update}>
            <option value="">Choose design</option>
            <option value="Luxury Green">Luxury Green</option>
            <option value="Romantic">Romantic</option>
            <option value="Elegant Gold">Elegant Gold</option>
            <option value="Minimal">Minimal</option>
            <option value="Custom">Custom</option>
          </select>

          <label>Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />

          <label>Delivery Date</label>
          <input
            type="date"
            name="delivery"
            required
            value={form.delivery}
            onChange={update}
          />

          <button type="submit">
            Send Order on WhatsApp ↗
          </button>
        </form>
      </section>

      <style jsx>{`
        .order-page {
          min-height: 100vh;
          background: #050a08;
          color: white;
          padding: 70px 20px;
        }

        .order-container {
          max-width: 680px;
          margin: auto;
          background: #0b1510;
          padding: 40px;
          border: 1px solid #1b5035;
          border-radius: 22px;
          box-shadow: 0 20px 70px #00e89a12;
        }

        .order-label {
          color: #00e89a;
          letter-spacing: 4px;
        }

        h1 {
          font-size: clamp(36px, 6vw, 55px);
          margin: 20px 0;
        }

        h1 span {
          color: #00e89a;
        }

        p {
          color: #a4b3ac;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        label {
          display: block;
          margin: 20px 0 9px;
          color: #c5d8cc;
          font-size: 14px;
        }

        input, textarea, select {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          background: #06100a;
          border: 1px solid #294735;
          border-radius: 9px;
          color: white;
          font: inherit;
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #00e89a;
        }

        button {
          width: 100%;
          padding: 17px;
          margin-top: 30px;
          background: #00e89a;
          color: #031009;
          border: none;
          border-radius: 9px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background: #7bffc5;
        }

        @media(max-width: 550px) {
          .order-container {
            padding: 24px 18px;
          }
        }
      `}</style>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050a08] text-white flex items-center justify-center">
          Loading Order Form...
        </main>
      }
    >
      <OrderPageContent />
    </Suspense>
  );
}
