import z from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(3, "Name must be more than 3 characters."),
  description: z.string().optional(),
  //startingDate: z.date(),
  deadline: z.date(),
});

export const editProjectSchema = z.object({
  projectId: z.string().min(1),
  userId: z.string(),
  name: z.string({ required_error: "Project name is required" }),
  description: z.string().optional(),
  //startingDate: z.date(),
  deadline: z.date()
})/*.superRefine((data, ctx) => {
  if (data.startingDate && data.deadline && data.startingDate >= data.deadline) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Starting date must be earlier than the deadline",
      path: ["startingDate"],
    });
  }
});*/
