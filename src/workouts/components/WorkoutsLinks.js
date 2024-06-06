import '../styles/blocks/WorkoutsLinks.scss';
import { WorkoutsLink } from './WorkoutsLink';

export const WorkoutsLinks = () => {
  const workoutsLinks = [
    { title: 'Workouts', to: '/workouts' },
    { title: 'Exercises', to: '/workouts-exercises' },
    { title: 'Reminders', to: '/workouts-reminders' },
    { title: 'Media', to: '/workouts-media' },
  ];
  return (
    <section className="WorkoutsLinks">
      <ul className="WorkoutsLinks_list">
        {workoutsLinks.map(({ title, to }) => (
          <WorkoutsLink key={title} title={title} to={to} />
        ))}
      </ul>
    </section>
  );
};