const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${VITE_API_URL}/api/v1`;

export async function getOrders() {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await response.json();
  return data.data.orders;
}

export async function makeOrder(data, workerId) {
  const response = await fetch(`${API_URL}/workers/${workerId}/orders`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
}

export async function updateOrderStatus(orderId, status) {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Update order failed:", response.status, errorData);
    throw new Error(`Failed to update order status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function cancelOrder(orderId) {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "canceled" }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to cancel order");
  }

  return response.json();
}
