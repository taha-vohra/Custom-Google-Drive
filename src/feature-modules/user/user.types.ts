import z from 'zod';

export const ZUser = z.object({
    id: z.string().uuid().optional(),
    name: z.string().nonempty(),
    email: z.string().email({ message: 'Enter a Valid E-mail' }),
    password: z.string().min(5, { message: 'password must be 5 chars long' }),
    role_id: z.string().optional()
});

export const ZUpdate = ZUser.pick({
    id: true,
    name: true,
    email: true
})

export type User = z.infer<typeof ZUser>;

export const ZPage = z.object({ pageSize: z.coerce.number() })