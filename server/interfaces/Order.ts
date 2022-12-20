import { z } from "zod";

export const orderSchema = z.object({
    _id: z.any().optional(),
    items: z.array(z.object({
        product: z.string(
            {
                required_error: 'product is required.',
                invalid_type_error: 'product must be a string.'
            }
        ).length(24, {
            message: 'product must be a valid id.'
        }),
        quantity: z.number({
            required_error: 'quantity is required.',
            invalid_type_error: 'quantity must be a number.'
        }).min(1, {
            message: 'quantity must be greater than 0.'
        })
    })),
    user: z.string().optional(),
    payment: z.object({
        type: z.enum(['credit', 'debit', 'pix'], {
            required_error: 'type is required.',
            invalid_type_error: 'type must be a string.'
        }),
        card: z.object({
            number: z.string({
                required_error: 'number is required.',
                invalid_type_error: 'number must be a string.'
            }).length(16, {
                message: 'number must be a valid card number.'
            }).optional(),
            name: z.string({
                required_error: 'name is required.',
                invalid_type_error: 'name must be a string.'
            }).optional(),
            expiration: z.string().refine((value) => {
                const [month, year] = value.split('/');
                const expirationTime = new Date(`01-${month}-${year}`).getTime();
                const currentTime = new Date().getTime();
                return expirationTime > currentTime;
            }, {
                message: 'expiration must be a valid expiration date.'
            }).optional(),
            cvv: z.string({
                required_error: 'cvv is required.',
                invalid_type_error: 'cvv must be a string.'
            }).length(3, {
                message: 'cvv must be a valid cvv.'
            }).optional(),
            status: z.enum(['approved', 'refused']).optional()
        }).optional(),
        status: z.enum(['pending', 'paid', 'refunded', 'cancelled'], {
            required_error: 'status is required.',
            invalid_type_error: 'status must be a string.'
        }),
        coupom: z.string().optional(),
        total: z.number().optional(),
        finalPrice: z.number().optional(),
    }, {
        required_error: 'payment is required.',
        invalid_type_error: 'payment must be an object.'
    }),
    createdAt: z.date().optional()
});

type Order = z.infer<typeof orderSchema>;

export default Order;
