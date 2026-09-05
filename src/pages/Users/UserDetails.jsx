import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import UserDetails from "../../components/users/UserDetails";
import UserForm from "../../components/users/UserForm";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getAdminUsers, toggleUserActive } from "../../api/adminApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useAdmin();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      const { items } = await getAdminUsers({ page_size: 100, search: "" });
      const found = (items || []).find((u) => Number(u.id) === Number(id));
      if (!found) throw new Error("not found");
      setUser(found);
    } catch (err) {
      setError(getApiError(err, "User not found."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggle = async () => {
    setBusy(true);
    try {
      const updated = await toggleUserActive(user.id);
      setUser(updated);
      notify.success(updated.is_active ? "Account enabled." : "Account disabled.");
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Loader full text="Loading customer..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <button type="button" onClick={() => navigate("/admin/users")} className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-500 hover:text-primary-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to customers
      </button>
      <div className="mb-4">
        <UserForm user={user} />
      </div>
      <UserDetails user={user} onToggle={toggle} busy={busy} />
    </div>
  );
}
