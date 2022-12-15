import { z } from "zod";

export const coupomSchema = z.object({
    _id: z.any().optional(),
    code: z.string({
        required_error: 'code is required.',
        invalid_type_error: 'code must be a string.'
    }).min(3, {
        message: 'code must be at least 3 characters.'
    }),
    status: z.boolean({
        required_error: 'status is required.',
        invalid_type_error: 'status must be a boolean.'
    }),
    usages: z.number({
        required_error: 'usages is required.',
        invalid_type_error: 'usages must be a number.'
    }).optional(),
    expires: z.object({
        type: z.enum(['date', 'quantity', 'infinity'], {
            required_error: 'type is required.',
            invalid_type_error: 'type must be a string.'
        }),
        value: z.any().optional()
    }),
    discount: z.object({
        type: z.enum(['percentage', 'amount'], {
            required_error: 'type is required.',
            invalid_type_error: 'type must be a string.'
        }),
        value: z.number(
            {
                required_error: 'value is required.',
                invalid_type_error: 'value must be a number.'
            }
        )
    }),
    createdAt: z.date().optional()
});

type Coupom = z.infer<typeof coupomSchema>;

export default Coupom;
