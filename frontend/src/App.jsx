import React, { useEffect, useState } from 'react';
import { fetchTopUsers, fetchTrendingPosts, fetchFeed } from './api';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import { LayoutGrid, TrendingUp, Users } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [topUsers, setTopUsers] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, trending, feed] = await Promise.all([
          fetchTopUsers(),
          fetchTrendingPosts(),
          fetchFeed()
        ]);
        setTopUsers(users);
        setTrendingPosts(trending);
        setFeedPosts(feed);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up polling for feed updates
    const interval = setInterval(() => {
      fetchFeed().then(setFeedPosts);
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'feed', label: 'Feed', icon: LayoutGrid },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'users', label: 'Top Users', icon: Users },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center h-16">
            <h1 className="text-xl font-bold text-blue-600">Social Analytics</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          {activeTab === 'feed' && <Feed posts={feedPosts} />}
          {activeTab === 'trending' && <TrendingPosts posts={trendingPosts} />}
          {activeTab === 'users' && <TopUsers users={topUsers} />}
        </div>
      </main>
    </div>
  );
}

export default App;