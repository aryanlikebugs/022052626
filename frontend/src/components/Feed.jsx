import { MessageSquare } from 'lucide-react';

export default function Feed({ posts }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold">Latest Posts</h2>
      </div>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={post.userAvatar}
                alt={post.userName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{post.userName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex items-center gap-2 text-gray-500">
              <MessageSquare className="w-5 h-5" />
              <span>{post.commentCount} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}