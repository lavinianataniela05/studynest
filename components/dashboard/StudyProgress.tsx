// components/dashboard/StudyProgress.tsx
// Adjust the import path below to the correct relative path for your project structure
import { Card } from '../UI/Card';

export function StudyProgress() {
  // This would later fetch data from Firebase
  const weeklyGoal = 20; // hours
  const completed = 12; // hours
  
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">Study Progress</h3>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Weekly Goal: {weeklyGoal}h</span>
            <span>{completed}h completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${(completed / weeklyGoal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
}