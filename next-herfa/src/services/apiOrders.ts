import { IOrder, IOrderResponse, IOrdersResponse } from "@/types/orders";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getOrders(token: string): Promise<IOrder[]> {
    try {
        const response = await fetch(`${BACKEND_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error(
                `Failed to fetch orders: ${response.status} ${response.statusText}`
            );
            throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const data = (await response.json()) as IOrdersResponse;
        return data.data.orders;
    } catch (error) {
        console.error("Error in getOrders:", error);
        throw error;
    }
}

export async function getOrderById(
    orderId: string,
    token: string
): Promise<IOrder | null> {
    try {
        const response = await fetch(`${BACKEND_URL}/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error(
                `Failed to fetch order ${orderId}: ${response.status} ${response.statusText}`
            );
            throw new Error(`Failed to fetch order: ${response.status}`);
        }

        const data = (await response.json()) as IOrderResponse;
        return data.data.order as IOrder;
    } catch (error) {
        console.error(`Error in getOrderById for order ${orderId}:`, error);
        return null;
    }
}

// export async function makeOrder(data, workerId) {
//   const response = await fetch(`${API_URL}/workers/${workerId}/orders`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
//   return response.json();
// }

// export async function updateOrderStatus(orderId, status) {
//   const response = await fetch(`${API_URL}/orders/${orderId}`, {
//     method: "PATCH",
//     body: JSON.stringify({ status }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.text();
//     console.error("Update order failed:", response.status, errorData);
//     throw new Error(`Failed to update order status: ${response.status}`);
//   }

//   const result = await response.json();
//   return result;
// }

// export async function cancelOrder(orderId) {
//   const response = await fetch(`${API_URL}/orders/${orderId}`, {
//     method: "PATCH",
//     body: JSON.stringify({ status: "canceled" }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to cancel order");
//   }

//   return response.json();
// }
