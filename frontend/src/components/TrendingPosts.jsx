import { TrendingUp as Trending } from 'lucide-react';

export default function TrendingPosts({ posts }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Trending className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold">Trending Posts</h2>
      </div>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
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
              <p className="text-gray-700">{post.content}</p>
              <div className="mt-4 flex items-center gap-2 text-blue-500">
                <span className="font-semibold">{post.commentCount}</span>
                <span>comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}