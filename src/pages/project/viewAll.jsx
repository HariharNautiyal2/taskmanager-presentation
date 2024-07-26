import "./project.scss";
import CreateProjectModal from "./components/create-project-modal";

import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../utils/constants";
import { useProjects } from "../../hooks/use-projects";
import { Button } from "@mui/material";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EditProjectModal from "./components/edit-project-modal";

const ViewAllProjects = () => {
  const {
    projectsLoading,
    projects,
    isDeletingProject,
    mutateProjectDeletion,
  } = useProjects();

  function changeValidDateFormat({seconds,nanoseconds}) {
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
    return date;
  } 

  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-5">
      <div className="h-full w-full">
        <div className="flex flex-row items-center justify-center w-full overflow-hidden">
          <div className="w-1/2 h-full flex flex-row items-center justify-start">
            <h1 className="font-black text-black text-2xl">Projects</h1>
          </div>
          <div className="w-1/2 h-full flex flex-row items-center justify-end">
            <CreateProjectModal />
          </div>
        </div>
        <br />
        <div className="content w-full overflow-hidden">
          <DataGrid
            loading={projectsLoading}
            rows={projects ?? []}
            className="w-full overflow-x-hidden relative"
            columns={[
              { field: "pid", headerName: "Project ID", width: 120 },
              { field: "name", headerName: "Project Name", width: 200 },
              { field: "description", headerName: "Description", width: 300 },
              {
                field: "startingDate",
                headerName: "Starting Date",
                width: 150,
                renderCell: ({ value }) => (
                  <div>{dayjs(changeValidDateFormat(value)).format(DATE_FORMAT)}</div>
                ),
              },
              {
                field: "deadline",
                headerName: "Deadline Date",
                width: 150,
                renderCell: ({ value }) => (
                  <div>{dayjs(value).format(DATE_FORMAT)}</div>
                ),
              },
              {
                field: "actions",
                headerName: "Actions",
                width: 300,
                renderCell: ({ row }) => (
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="text"
                      color="warning"
                      onClick={() => {
                        navigate(`/projects/${row.pid}`);
                      }}
                      startIcon={<RemoveRedEye />}
                    >
                      View
                    </Button>
                    <EditProjectModal project={row} />
                    <Button
                      color="error"
                      disabled={isDeletingProject}
                      startIcon={<Delete />}
                      onClick={() => {
                        mutateProjectDeletion(row.pid);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAllProjects;
