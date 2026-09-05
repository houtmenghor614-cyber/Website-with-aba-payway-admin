import React from "react";
import StatusBadge from "../common/StatusBadge";

export default function UserStatusBadge({ active }) {
  return (
    <StatusBadge
      label={active ? "Active" : "Disabled"}
      badge={active ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}
    />
  );
}
