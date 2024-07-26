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
    height: 500,
    gantt: {
      trackHeight: 30,
      barHeight: 20,
      barCornerRadius: 4,
      criticalPathEnabled: false, // Hide critical path
      percentCompleteEnabled: false, // Hide percent complete
      innerGridHorizLine: {
        stroke: '#444', // Gridline color
        strokeWidth: 1,
      },
      innerGridVertLine: {
        stroke: '#444', // Gridline color
        strokeWidth: 1,
      },
      labelStyle: {
        color: '#ddd', // Text color
      },
      backgroundColor: '#333', // Chart background color
      colors: ['#4CAF50', '#FFC107', '#FF5722'], // Task bars colors
    },
    // Use dark mode for chart container
    backgroundColor: '#222',
    };
    
  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
};

export default TaskGanttChart;
