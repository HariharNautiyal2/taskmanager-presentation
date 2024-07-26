// src/components/TaskGanttChart.js
import React from 'react';
import { Chart } from 'react-google-charts';

const TaskGanttChart = ({ tasks }) => {
  // Prepare the data for the Gantt chart
  const data = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'string', label: 'Resource' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ...tasks.map((task) => [
      task.id,
      task.name,
      null,
      new Date(task.start),
      new Date(task.end),
      null,
      0,
      null,
    ]),
  ];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default TaskGanttChart;
