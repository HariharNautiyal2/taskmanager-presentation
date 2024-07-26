// src/components/TaskGanttChart.js
import React from 'react';
import dayjs from 'dayjs';
import { Gantt } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

const convertTimestampToDateString = (timestamp) => {
  // Assuming timestamp is a Firebase Timestamp object
  const date = dayjs(timestamp.seconds * 1000 || timestamp.toMillis());
  return date.format('YYYY-MM-DD');
};
let tasksofinput = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type:'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },

];

const TaskGanttChart = ({ tasks }) => {
    console.log(tasks)
  const ganttTasks = tasks.map(task => ({
    id: task.id,
    name: task.name,
    start: convertTimestampToDateString(task.startDate),
    end: convertTimestampToDateString(task.deadline),
  }));

    return (
        <div className='h-screen w-full flex flex-col'>
      <Gantt
        tasks={tasksofinput}
                viewMode="Day"
                className="w-full h-full"
                
                
      />
    </div>
  );
};

export default TaskGanttChart;
