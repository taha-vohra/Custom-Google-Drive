import z from 'zod';
import { ZUser } from '../user/user.types';

export const ZCredentials = ZUser.pick({
    email: true,
    password: true
})

export type Credentials = z.infer<typeof ZCredentials>;

export const ZCreateUser = ZUser.pick({
    email: true,
    name: true,
})
export type CreateUser = z.infer<typeof ZCreateUser>;

export const ZChangePassWord = z.object({
    id: z.string().optional(),
    oldPassword: z.string().nonempty(),
    newPassword: z.string().nonempty()
})
export type ChangePassWord = z.infer<typeof ZChangePassWord>;

export type Payload = {
    id: string,
    role_id: string
}