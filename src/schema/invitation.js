import { z } from "zod";

export const createInvitationSchema = z.object({
  projectId: z.string(),
  sender: z.string(),
  receiverEmail: z.string().email(),
});
