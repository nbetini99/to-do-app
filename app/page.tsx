import MoreIcon from '../public/svg/more.svg';
import CalendarIcon from '../public/svg/calendar.svg';
import CheckIcon from '../public/svg/check.svg';
import dayjs from 'dayjs';

async function upcomingTasks() {
  const res = await fetch(`http://localhost:3000/api/tasks/upcoming`);
  return res.json();
}

export default async function Home() {
  
  const { tasks } = await upcomingTasks();

  return (
    <div className='container my-14 max-w-3xl mx-auto lg:px-6'>
      <header className="task-list-header">
        <h2>Upcoming</h2>
        <button type="button" className='icon-button'>
          <MoreIcon className="w-5 h-5" />
        </button>
      </header>

      <section>
        <header className='section-header'>
          <h4>
            <span>Overdue</span>
          </h4>
        </header>
        {tasks.map((task, idx) => {
        return (
          <div className="task" key={idx}>
            <div className={`task-indicator risk ${task.completed ? 'completed' : 'group/indicator'}`}>
              <CheckIcon className={`w-2 h-2 group-hover/indicator:visible ${task.completed ? '' : 'invisible'}`} />
            </div>
            <div className="task-content">
              <div className={`task-title ${task.completed ? 'completed' : ''}`}>{task.name}</div>
              <p className="task-desc">{task.desc}</p>
              <div className="task-due">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{dayjs(task.duedate).format("MMM D, YYYY")}</span>
              </div>
            </div>
          </div>
        );
      })}
      </section>
    </div>
  )
}
