import {
  DashboardHeader,
  StatsCards,
  UpcomingTasks,  QuickActions,
} from "@/components/dashboard";

const Dashboard = () => {
  // Dummy data
  const stats = {
    total: 21,
    pending: 5,
    in_progress: 2,
    completed: 12,
    cancelled: 2,
  };

  const recentTodos = [
    {
      id: 1,
      title: "API Dokümantasyonunu Hazırla",
      status: "pending",
      priority: "high",
      due_date: "25 Oca 21:00",
    },
    {
      id: 2,
      title: "React Komponentlerini Oluştur",
      status: "in_progress",
      description: "React Komponentlerini Oluştur",
      priority: "medium",
      due_date: "26 Oca 21:00",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
      <div className="flex-1 space-y-6 lg:space-y-8">
        <DashboardHeader />

        <StatsCards stats={stats} />

        <UpcomingTasks todos={recentTodos} />
      </div>
      <div className="w-full lg:w-80 lg:ml-6 space-y-6">
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
