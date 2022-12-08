export default interface Order {
    _id: string;
    user: string;
    products: string[];
    total: number;
    status: string;
    createdAt: Date;
}