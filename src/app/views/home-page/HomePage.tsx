import HomePageCard from './home-page-card/HomePageCard';
import ProjectChart from './project-chart/ProjectChart';
import { cardsData } from './mockCards';
import LastTasks from './last-tasks/LastTasks';
import TodayTasks from './today-tasks/TodayTasks';

function HomePage() {
  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between h-full">
          <div className="flex flex-col w-full max-w-74 gap-4">
            {cardsData.map((card, index) => (
              <HomePageCard key={index}
                card={card} />
            ))}
          </div>
          <ProjectChart />
        </div>
        <LastTasks />
        <TodayTasks />
      </div>
    </div>
  );
}

export default HomePage;
