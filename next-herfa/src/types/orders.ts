export interface IOrder {
    id: string;
    _id: string;
    worker: {
        id: string;
        name: string;
    };
    customer: {
        id: string;
        name: string;
    };
    service: string;
    details: string;
    status: "pending" | "in progress" | "completed" | "canceled";
    createdAt: string;
    updatedAt: string;
}

export interface IOrdersResponse {
    status: "success" | "fail" | "error";
    message?: string;
    results: number;
    data: {
        orders: IOrder[];
    };
}

export interface IOrderResponse {
    status: "success" | "fail" | "error";
    message?: string;
    data: {
        order: IOrder;
    };
}
