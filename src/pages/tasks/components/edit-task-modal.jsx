import { useState, useContext, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTaskSchema } from "../../../schema/task";
import { AuthContext } from "../../../context/AuthContext";
import { useTasks } from "../../../hooks/use-tasks";
import { getProjectMembers } from "../../../queries/project";
import { useParams } from "react-router-dom";
import { Box, Button, Modal, Typography, MenuItem, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

export default function EditTaskModal({ task,members }) {


  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { projectId } = useParams();
  const [name, setName] = useState(task.name);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [deadline, setDeadline] = useState(dayjs(task.deadline));
  const [startDate, setStartDate] = useState(dayjs(new Date(task.startDate.seconds * 1000 +  task.startDate.nanoseconds / 1e6)));
  const [checklist, setChecklist] = useState(task.checklist);
 

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const { editTaskMutation } = useTasks({
    onTaskEditSuccess: () => {
      handleClose();
    },
  });


  const submitData = (event) => {
    event.preventDefault();
    let data = {
      createdBy: currentUser.uid,
      name: name || "",
      startDate: startDate.toDate(),
      deadline: deadline.toDate(),
      projectId,
      priority,
      status,
      checklist,
      assignedTo
    };
    console.log(data)
    editTaskMutation.mutate(data);
  };

  return (
    <>
      <Button onClick={handleOpen} startIcon={<EditIcon />}>
        Edit Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="flex items-center justify-center w-full h-full p-5"
        >
          <div className="card rounded-2xl w-5/12 flex flex-col items-center justify-center p-5">
            <div className="w-full text-xl font-light text-black text-center flex items-center justify-center p-3 mb-4">- Edit Task -</div>
            <form
              onSubmit={submitData}
              className="flex flex-col items-center justify-center w-full space-y-3 font-light px-5"
            >
              <TextField
                label="Task Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="assignedto">Assigned To</InputLabel>
                <Select
                  labelId="assignedto"
                  value={assignedTo}
                  label="Assigned To"
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  {members.map((member) => (
                    <MenuItem key={member.value} value={member.value}>
                      {member.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Stuck">Stuck</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="priorityLabel">Priority</InputLabel>
                <Select
                  labelId="priorityLabel"
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} className="w-full" fullWidth>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} className="w-full" fullWidth />}
                />
                <DatePicker
                  label="Deadline"
                  value={deadline}
                  onChange={(newValue) => setDeadline(newValue)}
                  renderInput={(params) => <TextField {...params} className="w-full" fullWidth />}
                />
              </LocalizationProvider>
              <TextField
                label="Checklist"
                value={checklist}
                onChange={(e) => setChecklist(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Box className="flex flex-row items-center justify-center w-full space-x-5 pt-2">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#582498",
                    "&:hover": { backgroundColor: "#3f196e" },
                  }}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
