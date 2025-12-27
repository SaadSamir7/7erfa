export interface IReview {
    id: string;
    _id: string;
    review: string;
    rating: number;
    worker: string;
    createdAt: string;
    customer: {
        id: string;
        name: string;
        city: string;
        image: string;
    };
}

export interface IReviewsResponse {
    status: "success" | "fail" | "error";
    results: number;
    data: {
        data: IReview[];
    };
}
