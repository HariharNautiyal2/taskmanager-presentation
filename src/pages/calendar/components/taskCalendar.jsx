import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';

const TaskCalendar = ({ tasks }) => {
  console.log(tasks)
  // Convert tasks to FullCalendar events
  const events = tasks.map(task => ({
    id: task.id,
    title: task.name,
    start: dayjs(task.startDate).format('YYYY-MM-DD'), 
    end: dayjs(task.deadline).format('YYYY-MM-DD') 
  }));

  return (
    <div className='w-full h-1/2 text-white'>
      <FullCalendar 
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        className="text-white"
        events={events}
        eventContent={({ event }) => (
          <div>
            <strong>{event.title}</strong>
            <div>
              <p>{`Start: ${dayjs(event.start).format('MMM D, YYYY')}`}</p>
              <p>{`Deadline: ${dayjs(event.end).format('MMM D, YYYY')}`}</p>
            </div>
          </div>
        )}
        eventClick={(info) => {
          alert(`Clicked on task: ${info.event.title}`);
          // You can also implement additional logic here
        }}
      />
    </div>
  );
};

export default TaskCalendar;
