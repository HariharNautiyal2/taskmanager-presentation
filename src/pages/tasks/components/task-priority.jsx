import { Chip } from "@mui/material";

export default function TaskPriority({ priority }) {
  return (
    <Chip
      className="text-sm"
      size="small"
      label={priority}
      color={
        priority === "LOW"
          ? "success"
          : priority === "MEDIUM"
          ? "warning"
          : "error"
      }
    />
  );
}
