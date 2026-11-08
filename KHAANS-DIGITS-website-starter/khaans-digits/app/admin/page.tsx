
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
type Order = {
  id: string;
  user_id: string;
  order_type: string;
  order_title: string;
  status: string;
  payment_status: string;
  budget: string | null;
  created_at: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function loadOrders() {
    setLoading(true);
    setError("");

    const { data: { user }, error: authError } =
      await supabase.auth.getUser();

    if (authError || !user) {
      router.replace("/login");
      return;
    }

    if (
      user.email?.toLowerCase() !== "ibraheemimran938@gmail.com" ||
      user.app_metadata?.role !== "admin"
    ) {
      setError("Access denied. Owner account only.");
      setLoading(false);
      return;
    }

    const { data, error: dbError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (dbError) {
      setError(dbError.message);
    } else {
      setOrders((data || []) as Order[]);
    }

    setLoading(false);
  }

  async function updateOrder(
    id: string,
    field: "status" | "payment_status",
    value: string
  ) {
    const { error } = await supabase
      .from("orders")
      .update({ [field]: value })
      .eq("id", id);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    setOrders((previous) =>
      previous.map((order) =>
        order.id === id ? { ...order, [field]: value } : order
      )
    );
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const completed = orders.filter(
    (o) => o.status === "Completed"
  ).length;

  const pending = orders.filter(
    (o) => o.status !== "Completed"
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050a08] text-white flex items-center justify-center">
        Loading Owner Dashboard...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#050a08] text-white flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-red-400">
            Access Error
          </h1>
          <p className="mt-4 text-gray-300">{error}</p>
          <button
            onClick={logout}
            className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 font-bold text-black"
          >
            Logout
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050a08] text-white">
      <header className="border-b border-emerald-900 p-5">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-black">
            KHAANS <span className="text-emerald-400">DIGITS</span>
            <span className="block text-xs text-gray-400 font-normal mt-1">
              OWNER CONTROL PANEL
            </span>
          </h1>

          <button
            onClick={logout}
            className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2 text-red-300"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-5 md:p-10">
        <div className="mb-8">
          <p className="text-emerald-400 text-sm tracking-widest">
            ADMINISTRATION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Welcome, Owner!
          </h2>
          <p className="text-gray-400 mt-2">
            i68512635@gmail.com
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { title: "Total Orders", value: orders.length },
            { title: "Pending Orders", value: pending },
            { title: "Completed Orders", value: completed },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-emerald-900 bg-[#0b1510] p-6"
            >
              <p className="text-gray-400">{item.title}</p>
              <h3 className="text-4xl font-black text-emerald-400 mt-3">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">All Customer Orders</h2>
          <button
            onClick={loadOrders}
            className="rounded-lg border border-emerald-500 px-4 py-2 text-emerald-400"
          >
            Refresh ↻
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-white/10 p-10 text-center">
            <p className="text-2xl">📦</p>
            <h3 className="text-xl font-bold mt-3">No Orders Yet</h3>
            <p className="text-gray-400 mt-2">
              Customer orders saved in Supabase will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-emerald-900 bg-[#0b1510] p-5 md:p-7"
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">
                      {order.order_title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                      Order ID: {order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Customer ID: {order.user_id}
                    </p>
                    <p className="text-sm text-gray-400">
                      Type: {order.order_type}
                    </p>
                    <p className="text-sm text-gray-400">
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    {order.budget || "Budget not specified"}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Order Status
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrder(order.id, "status", e.target.value)
                      }
                      className="w-full rounded-lg bg-[#06100a] border border-emerald-900 p-3 text-white"
                    >
                      <option>New Order</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Payment Status
                    </label>
                    <select
                      value={order.payment_status}
                      onChange={(e) =>
                        updateOrder(order.id, "payment_status", e.target.value)
                      }
                      className="w-full rounded-lg bg-[#06100a] border border-emerald-900 p-3 text-white"
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>Partially Paid</option>
                      <option>Refunded</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
