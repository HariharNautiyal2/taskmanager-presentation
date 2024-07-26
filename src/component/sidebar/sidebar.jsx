import "./sidebar.scss";
import { Link, useParams } from "react-router-dom";
import sidebarLogo from "../../img/sidebar.jpg";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = () => {
  const { projectId } = useParams();

  return (
    <div className="sidebar">
      <div className="content">
        <ul>
          <Link to={`/projects/${projectId}`} style={{ textDecoration: "none" }}>
            <li>
              <span><AssignmentIcon/></span><span>Task Board</span>
            </li>
          </Link>
          <Link to={`/projects/${projectId}/timeline`} style={{ textDecoration: "none" }}>
            <li>
            <span><ViewTimelineIcon/></span><span>Timeline</span>
            </li>
          </Link>
          <Link to={`/projects/${projectId}/calendar`} style={{ textDecoration: "none" }}>
            <li>
            <span><CalendarMonthIcon/></span><span>Calendar</span>
            </li>
          </Link>
          <Link
            to={`/projects/${projectId}/members`}
            style={{ textDecoration: "none" }}
          >
            <li>
            <span><PeopleIcon/></span><span>Members</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
