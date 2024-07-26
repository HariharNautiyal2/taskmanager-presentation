import React, { useContext, useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./home.scss";
import { useProjects } from "../../hooks/use-projects";
import { useTasks } from "../../hooks/use-tasks";
import { AuthContext } from "../../context/AuthContext";
import dayjs from "dayjs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carousel1 from "../../img/carousel1.jpg";
import carousel2 from "../../img/carousel2.jpg";
import carousel3 from "../../img/carousel3.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, lime } from '@mui/material/colors';

const Home = () => {
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'day'), dayjs()]);
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: purple,
      secondary:lime
    },
  });

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
  };

  const myRef = useRef(null);

  useEffect(() => {
    // Assuming you have some text to match against
    const searchText = 'MUI X Missing license key';
    const elements = myRef.current.querySelectorAll('*');
    for (const element of elements) {
      if (element.textContent.trim() === searchText) {
        element.style.display = 'none';
        break;
      }
    }
  }, []);

  const { currentUser } = useContext(AuthContext);
  const { projects } = useProjects();
  const { tasks } = useTasks({});

  const [recentProjects, setRecentProjects] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (projects) {
      const sortedProjects = [...projects].sort((a, b) => new Date(b.lastOpened) - new Date(a.lastOpened));
      setRecentProjects(sortedProjects.slice(0, 4));

      const allDeadlines = tasks
        .map(task => ({
          date: new Date(task.deadline),
          project: projects.find(proj => proj.id === task.projectId)
        }))
        .filter(deadline => deadline.project) // Ensure project exists
        .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by closest deadline
        .slice(0, 4); // Take top 4 closest deadlines

      setDeadlines(allDeadlines);
    }
  }, [projects, tasks]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const deadlineDates = deadlines.map(deadline => dayjs(deadline.date).format('YYYY-MM-DD'));
      const currentDate = dayjs(date).format('YYYY-MM-DD');

      if (deadlineDates.includes(currentDate)) {
        return <div className="dot"></div>;
      }
    }
  };

  return (
    <div className="home flex-col h-screen w-full p-10 space-y-3">
      <div className="w-full flex flex-grow h-4/6 space-x-3">
        <div className="blur-card rounded-xl flex flex-col  p-5 w-5/12 h-full">
          <h1 className="text-2xl font-bold text-white">Up Coming Deadlines</h1>
          <div className="flex flex-col w-full">
            {deadlines.map((deadline, index) => (
              <div className="w-full  border-blur flex flex-row p-3 text-white" key={index}>

                <div className="w-8/12 flex flex-col">
                  <span className="text-md text-wrap">{deadline.project.name}</span>
                  <span className="text-sm text-slate-400">{dayjs(deadline.date).format('MMMM D, YYYY')}</span>
                </div>
                <div className="w-4/12">
                  <Button variant="outlined" fullWidth>View</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="blur-card p-5 rounded-xl h-full w-7/12">
          <h1 className="text-2xl font-bold text-white">Calender</h1>
          <div ref={myRef} className="p-3 w-full h-fit flex flex-row items-center justify-center pt-2 text-white">
            <ThemeProvider theme={darkTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangeCalendar
                  startText="Start Date"
                  endText="End Date"
                  value={dateRange}
                  onChange={handleDateChange}
                  renderDay={(date, dateRange, DayComponentProps) => {
                    const isSelected =
                      date.isAfter(dateRange[0]) && date.isBefore(dateRange[1]);

                    return (
                      <div
                        {...DayComponentProps}
                        style={{
                          ...DayComponentProps.style,
                          backgroundColor: isSelected ? 'rgba(0, 188, 212, 0.5)' : undefined,
                          borderRadius: '50%',
                        }}
                      >
                        {date.date()}
                      </div>
                    );
                  }}
                />
              </LocalizationProvider>
            </ThemeProvider>

          </div>
        </div>
      </div>
      <div className="w-full h-1/2 flex flex-grow space-x-3">
        <div className="blur-card p-5 rounded-xl h-full w-4/12 space-y-2">
          <h1 className="text-2xl font-bold text-white">Recent Projects</h1>
          <div className="flex items-center justify-start overflow-x-auto flex-row">
            {recentProjects.map(project => (
              <div className="flex flex-col p-3 rounded-xl bg-black/30" key={project.id}>
                <h3 className="text-white font-bold">{project.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{project.description}</p>

                <Button variant="outlined" onClick={() => {
                  navigate(`/projects/${project.pid}`);
                }} >View</Button>
              </div>
            ))}
          </div>
        </div>
        <div className="blur-card p-5 rounded-xl h-full w-4/12 object-cover">
        <Carousel autoPlay infiniteLoop showThumbs={false} showIndicators={true}>
              <div>
                <img src={carousel1} alt="Sponsor 1" />
              </div>
              <div>
                <img src={carousel2} alt="Sponsor 2" />
              </div>
              <div>
                <img src={carousel3} alt="Sponsor 3" />
              </div>
            </Carousel>
        </div>
        <div className="blur-card p-5 rounded-xl h-full w-4/12 object-cover">
        <Carousel autoPlay infiniteLoop showThumbs={false} showIndicators={true}>
              <div>
                <img src={carousel1} alt="Sponsor 1" />
              </div>
              <div>
                <img src={carousel2} alt="Sponsor 2" />
              </div>
              <div>
                <img src={carousel3} alt="Sponsor 3" />
              </div>
            </Carousel>
        </div>
      </div>

    </div>
  );
};

export default Home;
