import React, { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/common/Pagination";
import UserTable from "../../components/users/UserTable";
import useUsers from "../../hooks/useUsers";
import useDebounce from "../../hooks/useDebounce";
import { toggleUserActive } from "../../api/adminApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function Users() {
  const { notify } = useAdmin();
  const { items, total, loading, params, setFilters, setPage, reload } = useUsers();
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 350);
  const [busyId, setBusyId] = useState(null);

  React.useEffect(() => {
    setFilters({ search: debounced || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const toggle = async (user) => {
    setBusyId(user.id);
    try {
      await toggleUserActive(user.id);
      notify.success(user.is_active ? "Account disabled." : "Account enabled.");
      reload();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusyId(null);
    }
  };

  const pages = Math.max(1, Math.ceil(total / (params.page_size || 12)));

  return (
    <div>
      <PageHeader title="Customers" subtitle={`${total} user accounts`} />
      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search email or name..." className="w-72" />
      </div>
      <UserTable users={items} loading={loading} onToggle={toggle} busyId={busyId} />
      <Pagination page={params.page} pages={pages} onPageChange={setPage} className="mt-5" />
    </div>
  );
}
