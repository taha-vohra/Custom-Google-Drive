import { z } from "zod";

export const ZDirectory = z.object({
  id: z.string().optional(),
  name: z.string().nonempty(),
  user_id: z.string().optional(),
  parent_id: z.string().nullable()
})

export type Directory = z.infer<typeof ZDirectory>;

export const ZGetDirs = z.object({
  user_id: z.string().optional(),
  parent_id: z.string().nullable()
})
export type GetDirs = z.infer<typeof ZGetDirs>;