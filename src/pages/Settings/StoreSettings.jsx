import React from "react";
import StoreSettings from "../../components/settings/StoreSettings";
import DeliveryCompaniesEditor from "../../components/settings/DeliveryCompaniesEditor";

export default function StoreSettingsPage() {
  return (
    <div className="space-y-6">
      <StoreSettings />
      <DeliveryCompaniesEditor />
    </div>
  );
}
