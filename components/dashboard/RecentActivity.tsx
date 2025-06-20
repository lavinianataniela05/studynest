// components/dashboard/RecentActivity.tsx
import { BookText, MessageSquare, Clock } from 'lucide-react';
import { Card } from '../UI/Card';

export function RecentActivity() {
  // Sample data - would fetch from Firebase
  const activities = [
    { id: 1, type: 'study', title: 'Completed Math session', time: '2 hours ago', icon: <BookText className="w-4 h-4" /> },
    { id: 2, type: 'discussion', title: 'Posted in Calculus group', time: '4 hours ago', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 3, type: 'study', title: 'Started Physics revision', time: 'Yesterday', icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <ul className="mt-4 space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-full mr-3 mt-0.5">
                {activity.icon}
              </div>
              <div>
                <p className="text-sm text-gray-700">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}