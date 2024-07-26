import { Chip } from "@mui/material";

export default function Status({ status}) {
  return (
    <Chip
      className="text-sm"
      size="small"
      label={status}
      color={
        status === "Done"
          ? "success"
          : status === "In Progress"
          ? "warning"
          : status === "Stuck"
          ? "error"
          : "default"
      }
    />
  );
}