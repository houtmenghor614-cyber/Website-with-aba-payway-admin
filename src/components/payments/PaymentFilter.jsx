import React from "react";
import { Search } from "lucide-react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { paymentStatusList } from "../../data/paymentStatus";

export default function PaymentFilter({ value = {}, onApply, onManualCheck }) {
  const [status, setStatus] = React.useState(value.status || "");
  const [tx, setTx] = React.useState("");

  const apply = (e) => {
    e.preventDefault();
    onApply({ status: status || undefined });
  };

  const manual = (e) => {
    e.preventDefault();
    if (tx.trim()) onManualCheck(tx.trim());
  };

  return (
    <div className="space-y-3">
      <form onSubmit={apply} className="flex flex-wrap items-end gap-3">
        <div className="w-48">
          <Select label="Status" placeholder="All statuses" value={status} onChange={(e) => setStatus(e.target.value)} options={paymentStatusList()} />
        </div>
        <Button type="submit" size="sm">Apply</Button>
      </form>
      <form onSubmit={manual} className="flex flex-wrap items-end gap-3 border-t border-ink-100 pt-3">
        <div className="w-72">
          <Input label="Manual gateway check" icon={Search} value={tx} onChange={(e) => setTx(e.target.value)} placeholder="QR_1710500000" />
        </div>
        <Button type="submit" size="sm" variant="outline">Check transaction</Button>
      </form>
    </div>
  );
}
