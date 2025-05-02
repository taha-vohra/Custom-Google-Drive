import { z } from "zod";

export const ZFile = z.object({
  id: z.string().optional(),
  name: z.string().nonempty(),
  user_id: z.string().optional(),
  parent_id: z.string().nullable(),
  location: z.string().optional()
})

export type File = z.infer<typeof ZFile>;

export const ZGetFiles = ZFile.pick({ parent_id: true })
export type GetFiles = z.infer<typeof ZGetFiles>;