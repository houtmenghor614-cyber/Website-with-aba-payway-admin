import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Mail, Phone, Send } from "lucide-react";
import { changeStatus as orderApiChange, getOrder } from "../../api/orderApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItems from "./OrderItems";
import OrderStatusUpdate from "./OrderStatusUpdate";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

export default function OrderDetails({ orderId }) {
  const navigate = useNavigate();
  const { notify } = useAdmin();
  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setOrder(await getOrder(orderId));
    } catch (err) {
      setError(getApiError(err, "Order not found."));
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  React.useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (status, note) => {
    setSaving(true);
    try {
      await orderApiChange(orderId, status, note);
      notify.success(`Order marked ${status}.`);
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading order..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!order) return null;

  const address = order.address;

  return (
    <div>
      <button type="button" onClick={() => navigate("/admin/orders")} className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-500 hover:text-primary-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to orders
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-900">Order #{order.order_number}</h1>
          <p className="text-sm text-ink-500 mt-1">Placed {formatDate(order.created_at)} by {order.user?.full_name || order.user?.email || `user #${order.user_id}`}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="font-display font-bold text-ink-900 mb-3">Customer details</h2>
            <div className="flex flex-wrap items-center gap-3 rounded-xl bg-ink-50 p-3 mb-3">
              <span className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-extrabold">
                {(order.user?.full_name || order.user?.email || "?").slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-ink-800">{order.user?.full_name || "Customer"}</p>
                <p className="text-xs text-ink-400">Customer ID #{order.user_id}</p>
              </div>
            </div>
            <dl className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2.5 rounded-xl border border-ink-100 px-3 py-2.5">
                <Mail className="w-4 h-4 text-ink-400 shrink-0" />
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wide text-ink-400">Email</dt>
                  <dd className="font-bold text-ink-800 truncate">{order.user?.email || "—"}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-ink-100 px-3 py-2.5">
                <Phone className="w-4 h-4 text-ink-400 shrink-0" />
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wide text-ink-400">Phone</dt>
                  <dd className="font-bold text-ink-800">{order.user?.phone || "—"}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-ink-100 px-3 py-2.5">
                <Send className="w-4 h-4 text-ink-400 shrink-0" />
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wide text-ink-400">Telegram</dt>
                  <dd className="font-bold text-ink-800">{order.user?.telegram_chat_id || "Not linked"}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-ink-100 px-3 py-2.5">
                <Calendar className="w-4 h-4 text-ink-400 shrink-0" />
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wide text-ink-400">Registered</dt>
                  <dd className="font-bold text-ink-800">{formatDate(order.user?.created_at)}</dd>
                </div>
              </div>
            </dl>
            {address && (
              <div className="mt-3 rounded-xl bg-ink-50 px-3 py-2.5 text-sm">
                <p className="text-[10px] uppercase tracking-wide text-ink-400 mb-1">Delivery address</p>
                <p className="font-bold text-ink-800">{address.recipient_name} · {address.phone}</p>
                <p className="text-ink-600">
                  {address.address_line}, {address.city}, {address.province}
                  {address.postal_code ? `, ${address.postal_code}` : ""}
                </p>
                {address.note && <p className="text-xs text-ink-400 mt-1">Note: {address.note}</p>}
              </div>
            )}
          </section>
          <section className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="font-display font-bold text-ink-900 mb-2">Items</h2>
            <OrderItems items={order.items || []} />
          </section>
          <section className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="font-display font-bold text-ink-900 mb-2">Payments</h2>
            {(order.payments || []).length === 0 && <p className="text-sm text-ink-400">No payments yet.</p>}
            {order.payments.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center gap-3 border-t border-ink-50 py-2.5 text-sm">
                <span className="font-bold text-ink-800">{p.provider}</span>
                <span className="text-ink-400">{p.transaction_id}</span>
                <span className="ml-auto font-bold text-ink-800">{formatCurrency(p.amount)}</span>
                <OrderStatusBadge status={p.status === "success" ? "paid" : p.status} />
              </div>
            ))}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="font-display font-bold text-ink-900 mb-3">Update status</h2>
            <OrderStatusUpdate current={order.status} onSave={changeStatus} saving={saving} />
          </section>
          <section className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="font-display font-bold text-ink-900 mb-3">Totals</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-ink-500">Subtotal</dt><dd>{formatCurrency(order.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Shipping{order.shipping_company ? ` (${order.shipping_company})` : ""}</dt><dd>{order.shipping_fee ? formatCurrency(order.shipping_fee) : "Free"}</dd></div>
              {order.discount > 0 && <div className="flex justify-between text-emerald-600"><dt>Discount</dt><dd>-{formatCurrency(order.discount)}</dd></div>}
              <div className="border-t border-ink-100 pt-2 flex justify-between items-baseline"><dt className="font-bold">Total</dt><dd className="text-xl font-extrabold text-primary-700">{formatCurrency(order.total)}</dd></div>
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}
