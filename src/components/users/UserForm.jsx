import React from "react";
import { Info } from "lucide-react";

/** Customers manage their own profile in the storefront.
    Admins can enable/disable accounts and view details. */
export default function UserForm({ user }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-sky-50 border border-sky-100 p-4 text-sm text-sky-800">
      <Info className="w-5 h-5 shrink-0" />
      <p>
        Account details for <b>{user?.full_name || user?.email || "this customer"}</b>{" "}
        are managed by the customer from the storefront. From here you can
        review their profile and enable or disable the account.
      </p>
    </div>
  );
}
