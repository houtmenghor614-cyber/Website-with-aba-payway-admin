import React, { useState } from "react";
import { Megaphone } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import { broadcastNotification } from "../../api/notificationApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";
import { useNotifications } from "../../context/NotificationContext";
import formatDateTime from "../../utils/formatDate";

export default function Notifications() {
  const { notify } = useAdmin();
  const { notifications, load } = useNotifications();
  const [form, setForm] = useState({ title: "", body: "", link: "", target: "all" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return setError("Title and message are required.");
    setBusy(true);
    setError("");
    try {
      const res = await broadcastNotification(form);
      notify.success(res?.message || "Notification broadcast sent.");
      setForm({ title: "", body: "", link: "", target: "all" });
      load().catch(() => {});
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader title="Notifications" subtitle="Broadcast updates to customers" />

      <div className="grid lg:grid-cols-5 gap-5">
        <section className="lg:col-span-2 bg-white rounded-2xl border border-ink-100 p-5 h-fit">
          <h3 className="flex items-center gap-2 font-display font-bold text-ink-900 mb-4">
            <Megaphone className="w-4 h-4 text-primary-600" /> New broadcast
          </h3>
          {error && <div className="mb-3"><ErrorMessage message={error} /></div>}
          <form onSubmit={submit} className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Big sale this weekend" />
            <Textarea label="Message" rows={5} value={form.body} onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))} placeholder="Write the announcement..." />
            <Input label="Link (optional)" value={form.link || ""} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="/products" />
            <Select label="Audience" value={form.target} onChange={(e) => setForm((p) => ({ ...p, target: e.target.value }))} options={[{ value: "all", label: "All customers" }, { value: "admins", label: "Admins only" }, { value: "customers", label: "Customers only" }]} />
            <Button type="submit" loading={busy} icon={Megaphone}>Send broadcast</Button>
          </form>
        </section>

        <section className="lg:col-span-3 bg-white rounded-2xl border border-ink-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-100">
            <p className="font-display font-bold text-ink-900">Recent notifications</p>
          </div>
          <div className="divide-y divide-ink-50 max-h-[480px] overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-ink-400">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-ink-800">{n.title}</p>
                    <span className="text-xs text-ink-400">{formatDateTime(n.created_at)}</span>
                  </div>
                  <p className="text-sm text-ink-500 mt-1 line-clamp-2">{n.body}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
