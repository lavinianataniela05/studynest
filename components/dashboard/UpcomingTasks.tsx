// components/dashboard/UpcomingTasks.tsx
import { CheckCircle } from 'lucide-react';
import { Card } from '../UI/Card';

export function UpcomingTasks() {
  // Sample data - would fetch from Firebase
  const tasks = [
    { id: 1, title: 'Math assignment', due: 'Today', completed: false },
    { id: 2, title: 'Literature review', due: 'Tomorrow', completed: false },
    { id: 3, title: 'Science project', due: 'Friday', completed: true },
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h3>
        <ul className="mt-4 space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center">
              <CheckCircle
                className={`w-5 h-5 mr-3 ${task.completed ? 'text-green-500' : 'text-gray-300'}`}
              />
              <div>
                <p className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-500">Due {task.due}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}