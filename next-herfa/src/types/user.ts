export interface IUser {
    id: string;
    _id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    city?: string;
    role?: "worker" | "customer";
    image?: string;
    active?: boolean;
    // worker values
    ratingsAverage?: number;
    ratingsQuantity?: number;
    skill?: string;
    yearsOfExperience?: number;
    hourlyRate?: number;
    bio?: string;
    __v?: number;
    emailVerified?: Date | null;
}

export interface ILoginResponse {
    status: "success" | "fail" | "error";
    token: string;
    data: { user: IUser };
}
