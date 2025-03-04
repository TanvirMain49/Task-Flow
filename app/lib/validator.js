import { z } from "zod";

export const projectSchema = z.object({
    name: z
        .string()
        .min(1, "Project Name is required")
        .max(100, "Project must be 100 character or less"),
    key: z
        .string()
        .min(3, "Project key must be at least 2 character")
        .max(10, "Project key must be 10 character or less"),
    description: z
        .string()
        .max(500, "Project description must be 500 character or less")
        .optional(),
})