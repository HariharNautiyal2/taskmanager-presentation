import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(2, "Task name must be at least 2 characters long"),
  assignedTo: z.string(),
  status: z
    .enum(["Done", "In Progress", "Stuck", "Not Started"])
    .default("Not Started"), // Possible status values
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]), // Possible priority values
  //startingDate: z.date(),
  deadline: z.date(),
  checklist: z.string(),
})/*.superRefine((data, ctx) => {
  if (data.startingDate && data.deadline && data.startingDate >= data.deadline) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Starting date must be earlier than the deadline",
      path: ["startingDate"], 
    });
  }
});*/

export const editTaskSchema = z.object({
  taskId: z.string().min(1),
  name: z.string().min(2, "Task name must be at least 2 characters long"),
  assignedTo: z.string(),
  status: z
    .enum(["Done", "In Progress", "Stuck", "Not Started"])
    .default("Not Started"), // Possible status values
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]), // Possible priority values
  //startingDate: z.date(),
  deadline: z.date(),
  checklist: z.string(),
})/*.superRefine((data, ctx) => {
  if (data.startingDate && data.deadline && data.startingDate >= data.deadline) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Starting date must be earlier than the deadline",
      path: ["startingDate"], 
    });
  }
});*/