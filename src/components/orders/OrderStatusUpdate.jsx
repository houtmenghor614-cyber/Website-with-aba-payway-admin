import React from "react";
import { Send } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import Select from "../common/Select";
import { orderStatusList } from "../../data/orderStatus";

export default function OrderStatusUpdate({ current, onSave, saving = false }) {
  const [status, setStatus] = React.useState(current);
  const [note, setNote] = React.useState("");
  const options = orderStatusList();

  React.useEffect(() => setStatus(current), [current]);

  const submit = (e) => {
    e.preventDefault();
    if (!status) return;
    onSave(status, note.trim());
    setNote("");
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <Select
        label="New status"
        value={status || ""}
        onChange={(e) => setStatus(e.target.value)}
        options={options}
        placeholder="Choose status"
      />
      <Input
        label="Note (optional)"
        placeholder="e.g. shipped via GrabExpress"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button type="submit" loading={saving} icon={Send} size="sm">
        Update status
      </Button>
    </form>
  );
}
