"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

type CustomerOrder = {
  id: string;
  order_type: string;
  order_title: string;
  status: string;
  payment_status: string;
  budget: string | null;
  created_at: string;
};

export default function CustomerDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [userEmail, setUserEmail] = useState("");
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      setUserEmail(user.email ?? "");

      const { data, error: ordersError } = await supabase
        .from("orders")
        .select(
          "id, order_type, order_title, status, payment_status, budget, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (ordersError) {
        setError(ordersError.message);
      } else {
        setOrders((data ?? []) as CustomerOrder[]);
      }

      setLoading(false);
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function statusColor(status: string) {
    const value = status.toLowerCase();

    if (value.includes("complete")) {
      return "bg-green-500/15 text-green-400 border-green-500/30";
    }

    if (value.includes("cancel")) {
      return "bg-red-500/15 text-red-400 border-red-500/30";
    }

    if (value.includes("payment")) {
      return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
    }

    if (value.includes("progress")) {
      return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    }

    return "bg-purple-500/15 text-purple-300 border-purple-500/30";
  }

  const completedOrders = orders.filter(
    (order) => order.status.toLowerCase() === "completed"
  ).length;

  const pendingOrders = orders.length - completedOrders;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050a08] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin mx-auto mb-5" />
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050a08] text-white">
      {/* Navigation */}
      <header className="border-b border-white/10 bg-[#08110d]/90">
        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-black tracking-wider">
            KHAANS <span className="text-emerald-400">DIGITS</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl border border-red-400/30 text-red-300 hover:bg-red-500/10 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Welcome */}
        <section className="mb-10">
          <p className="text-emerald-400 uppercase tracking-[0.25em] text-xs font-bold mb-3">
            Customer Portal
          </p>

          <h1 className="text-3xl md:text-5xl font-black mb-3">
            Welcome Back!
          </h1>

          <p className="text-gray-400 break-all">{userEmail}</p>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-gray-400 text-sm mb-3">Total Orders</p>
            <h2 className="text-4xl font-black text-emerald-400">
              {orders.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-gray-400 text-sm mb-3">In Progress / Pending</p>
            <h2 className="text-4xl font-black text-yellow-300">
              {pendingOrders}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-gray-400 text-sm mb-3">Completed Orders</p>
            <h2 className="text-4xl font-black text-green-400">
              {completedOrders}
            </h2>
          </div>
        </section>

        {/* New Orders */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <Link
            href="/website-order"
            className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-7 hover:border-emerald-400/60 transition"
          >
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-bold mb-2">Order a 3D Website</h3>
            <p className="text-gray-400 text-sm">
              Start a new website project with KHAANS DIGITS.
            </p>
            <span className="inline-block mt-5 text-emerald-400 font-semibold">
              Place Website Order →
            </span>
          </Link>

          <Link
            href="/order"
            className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-transparent p-7 hover:border-purple-400/60 transition"
          >
            <div className="text-3xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Order a Wishes Card</h3>
            <p className="text-gray-400 text-sm">
              Create a personalised card for your special occasion.
            </p>
            <span className="inline-block mt-5 text-purple-300 font-semibold">
              Create Wishes Card →
            </span>
          </Link>
        </section>

        {/* Orders Table */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold">My Orders</h2>
            <p className="text-gray-400 text-sm mt-1">
              View your project progress and payment status.
            </p>
          </div>

          {error ? (
            <div className="p-6">
              <p className="text-red-400 font-semibold">
                Could not load your orders.
              </p>
              <p className="text-gray-400 text-sm mt-2">{error}</p>
              <p className="text-gray-500 text-xs mt-2">
                Check that the orders table and its columns match the SQL
                instructions.
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
              <p className="text-gray-400 text-sm">
                Your orders will appear here once they have been submitted and
                saved to your account.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-white/[0.04] text-gray-400 text-sm">
                  <tr>
                    <th className="p-4">Order</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Order Status</th>
                    <th className="p-4">Payment</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-white/10 hover:bg-white/[0.03]"
                    >
                      <td className="p-4">
                        <p className="font-semibold">{order.order_title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          #{order.id.slice(0, 8)}
                        </p>
                      </td>

                      <td className="p-4 text-gray-300">
                        {order.order_type}
                      </td>

                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-PK",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full border text-xs ${statusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full border text-xs ${statusColor(
                            order.payment_status
                          )}`}
                        >
                          {order.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Support */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Need Help With Your Order?</h3>
          <p className="text-gray-400 text-sm mb-5">
            Contact our team for project updates or assistance.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-emerald-400 px-6 py-3 text-black font-bold hover:bg-emerald-300 transition"
          >
            Contact Support
          </Link>
        </section>

        <footer className="text-center text-gray-600 text-sm py-10">
          © {new Date().getFullYear()} KHAANS DIGITS. All rights reserved.
        </footer>
      </div>
    </main>
  );
}