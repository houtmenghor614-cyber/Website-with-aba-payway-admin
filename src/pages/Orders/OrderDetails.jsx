import React from "react";
import { useParams } from "react-router-dom";
import OrderDetails from "../../components/orders/OrderDetails";

export default function OrderDetailsPage() {
  const { id } = useParams();
  return <OrderDetails orderId={id} />;
}
