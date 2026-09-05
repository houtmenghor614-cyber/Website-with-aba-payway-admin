import React from "react";
import { RotateCcw } from "lucide-react";
import SearchInput from "../common/SearchInput";
import Select from "../common/Select";
import Button from "../common/Button";
import { orderStatusList } from "../../data/orderStatus";

export default function OrderFilter({ value = {}, onApply }) {
  const [local, setLocal] = React.useState(value);
  const set = (k, v) => setLocal((prev) => ({ ...prev, [k]: v }));

  const apply = (e) => {
    e.preventDefault();
    onApply({ status: local.status || undefined, search: local.search || undefined });
  };

  return (
    <form onSubmit={apply} className="flex flex-wrap items-end gap-3">
      <div className="w-64">
        <SearchInput value={local.search || ""} onChange={(v) => set("search", v)} placeholder="Search order number..." />
      </div>
      <div className="w-44">
        <Select label="Status" placeholder="All statuses" value={local.status || ""} onChange={(e) => set("status", e.target.value)} options={orderStatusList()} />
      </div>
      <Button type="submit" size="sm">Apply</Button>
      {(local.status || local.search) && (
        <Button type="button" variant="ghost" size="sm" icon={RotateCcw} onClick={() => onApply({})}>
          Reset
        </Button>
      )}
    </form>
  );
}
