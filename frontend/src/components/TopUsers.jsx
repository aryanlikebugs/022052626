import { Trophy } from 'lucide-react';

export default function TopUsers({ users }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Top Contributors</h2>
      </div>
      <div className="grid gap-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-bold">
                #{index + 1}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-600">{user.postCount} posts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}