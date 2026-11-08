
"use client";

import { useState } from "react";

export default function WebsiteOrderPage() {
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    brand: "",
    websiteType: "",
    pages: "",
    reference: "",
    theme: "",
    requirements: "",
    budget: "",
    deadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `NEW 3D WEBSITE ORDER

Name: ${form.name}
WhatsApp: ${form.whatsapp}
Email: ${form.email}
Business: ${form.brand}
Website Type: ${form.websiteType}
Required Pages: ${form.pages}
Reference: ${form.reference}
Design Theme: ${form.theme}
Requirements: ${form.requirements}
Budget: ${form.budget}
Deadline: ${form.deadline}`;

    window.open(
      `https://wa.me/923449531512?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const fields = [
    { label: "Your Name", name: "name", type: "text" },
    { label: "WhatsApp Number", name: "whatsapp", type: "tel" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Business / Brand Name", name: "brand", type: "text" },
    { label: "Reference Website Link", name: "reference", type: "url" },
    { label: "Budget", name: "budget", type: "text" },
    { label: "Preferred Deadline", name: "deadline", type: "date" },
  ];

  return (
    <main className="min-h-screen bg-[#06110f] px-5 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.35em] text-emerald-400">
          KHAANS DIGITS
        </p>

        <h1 className="mb-3 text-center text-4xl font-bold md:text-5xl">
          3D Website Order Form
        </h1>

        <p className="mb-10 text-center text-gray-400">
          Tell us about your dream website. Let's create something extraordinary.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 shadow-2xl md:p-10"
        >
          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-sm text-gray-300">
                {field.label}
              </label>
              <input
                required={["name", "whatsapp", "email", "brand"].includes(field.name)}
                type={field.type}
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
              />
            </div>
          ))}

          <div>
            <label className="mb-2 block text-sm text-gray-300">Website Type</label>
            <select required name="websiteType" value={form.websiteType} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#10201c] px-4 py-3 text-white">
              <option value="">Select website type</option>
              <option>Business Website</option>
              <option>E-Commerce Website</option>
              <option>Portfolio Website</option>
              <option>Landing Page</option>
              <option>Custom 3D Website</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Required Pages</label>
            <input name="pages" value={form.pages} onChange={handleChange}
              placeholder="e.g. Home, About, Services, Contact"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-emerald-400" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Preferred Design / Theme</label>
            <select name="theme" value={form.theme} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#10201c] px-4 py-3 text-white">
              <option value="">Choose a design style</option>
              <option>Luxury & Premium</option>
              <option>Futuristic 3D</option>
              <option>Minimal & Modern</option>
              <option>Dark & Elegant</option>
              <option>Colorful & Creative</option>
              <option>Not Sure — Recommend Me</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Special Requirements</label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange}
              rows={5} placeholder="Describe your website idea and features..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-emerald-400" />
          </div>

          <button type="submit"
            className="w-full rounded-xl bg-emerald-400 py-4 font-bold text-black transition hover:bg-emerald-300">
            Submit Website Order via WhatsApp →
          </button>

          <p className="text-center text-xs text-gray-500">
            Your order details will open in WhatsApp for you to send.
          </p>
        </form>
      </div>
    </main>
  );
}
