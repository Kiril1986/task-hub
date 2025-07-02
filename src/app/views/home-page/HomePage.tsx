import HomePageCard from './home-page-card/HomePageCard';
import ProjectChart from './project-chart/ProjectChart';
import { cardsData } from './mockCards';
import LastTasks from './last-tasks/LastTasks';
import TodayTasks from './today-tasks/TodayTasks';

function HomePage() {
  return (
    <div className="mt-[24px]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex gap-[16px] w-full h-full">
          <div className="flex flex-col w-full max-w-[296px] gap-[16px]">
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