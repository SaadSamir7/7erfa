interface MongoDocument {
    _id: string;
    __v?: number;
}

interface BaseUser extends MongoDocument {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    city: string;
    role: "worker" | "customer";
    token?: string;
    image?: string;
    imageUpdatedAt?: number;
    active?: boolean;
    emailVerified?: Date | null;
}

export interface CustomerUser extends BaseUser {
    role: "customer";
}

export interface WorkerUser extends BaseUser {
    role: "worker";
    ratingsAverage?: number;
    ratingsQuantity?: number;
    skill?: string;
    yearsOfExperience?: number;
    hourlyRate?: number;
    bio?: string;
}

export type IUser = CustomerUser | WorkerUser;

export interface ILoginResponse {
    status: "success" | "fail" | "error";
    massage?: string;
    token?: string;
    data?: { user: IUser };
}

export interface WorkersResponse {
    status: "success" | "fail" | "error";
    results: number;
    data: {
        data: WorkerUser[];
    };
}
