"use client"
import React, { useState, useEffect } from 'react';
import { User, Settings, Star, Eye, MessageCircle, TrendingUp, Calendar, Edit3, Trash2, ExternalLink, Plus, Award, BarChart3 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StatCard from '../components/StatCard';
import FeedbackManagement from '../components/FeedbackManagement';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('products');
  const [userProducts, setUserProducts] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<any>({});
  const [userInfo, setUserInfo] = useState<any>({});
  const [pendingFeedbackCount, setPendingFeedbackCount] = useState(2); // Example count

  // Mock user data
  const mockUserInfo = {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    joinDate: Date.now() - 86400000 * 30,
    totalProducts: 3,
    totalReviews: 24,
    averageRating: 4.3,
    profileViews: 1250
  };

  const mockUserProducts = [
    {
      id: 1,
      name: "CryptoTracker Pro",
      description: "Advanced cryptocurrency portfolio tracker with real-time alerts",
      imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=300&h=200&fit=crop",
      productUrl: "https://cryptotracker.pro",
      totalRating: 22,
      ratingCount: 5,
      views: 1250,
      createdAt: Date.now() - 86400000 * 7,
      isActive: true,
      category: "DeFi"
    },
    {
      id: 2,
      name: "NFT Analytics Dashboard",
      description: "Comprehensive NFT collection analytics and floor price tracking",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop",
      productUrl: "https://nftanalytics.xyz",
      totalRating: 35,
      ratingCount: 8,
      views: 890,
      createdAt: Date.now() - 86400000 * 14,
      isActive: true,
      category: "NFT"
    },
    {
      id: 3,
      name: "DeFi Yield Optimizer",
      description: "Automated yield farming strategy optimizer for maximum returns",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop",
      productUrl: "https://defiyield.io",
      totalRating: 28,
      ratingCount: 7,
      views: 2100,
      createdAt: Date.now() - 86400000 * 21,
      isActive: false,
      category: "DeFi"
    }
  ];

  const formatAddress = (address: string) => {
    if (!address || typeof address !== 'string' || address.length < 10) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const getAverageRating = (product: any) => {
    if (product.ratingCount === 0) return 0;
    return (product.totalRating / product.ratingCount).toFixed(1);
  };

  useEffect(() => {
    setUserInfo(mockUserInfo);
    setUserProducts(mockUserProducts);
    setUserStats({
      totalViews: mockUserProducts.reduce((sum, p) => sum + p.views, 0),
      totalFeedback: mockUserProducts.reduce((sum, p) => sum + p.ratingCount, 0),
      averageRating: mockUserProducts.reduce((sum, p) => sum + (p.totalRating / p.ratingCount), 0) / mockUserProducts.length
    });
    // Example: set pending feedback count (could be fetched from API)
    setPendingFeedbackCount(2);
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
            {/* Profile Picture with fun ring effect */}
            <div className="relative mb-4 sm:mb-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-blue-200 animate-pulse-slow">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              {/* Decorative badge */}
              <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-white rounded-full p-1 shadow-md flex items-center justify-center">
                <Award className="w-4 h-4" />
              </span>
            </div>
            {/* Info and stats */}
            <div className="flex-1 w-full flex flex-col gap-2 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 break-all flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-2 justify-center sm:justify-start">
                {formatAddress(userInfo.address)}
              </h2>
              <p className="text-gray-600 mb-2 text-sm sm:text-base flex items-center gap-1 justify-center sm:justify-start">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Member since {formatTimeAgo(userInfo.joinDate)}
              </p>
              <div className="flex flex-col xs:flex-row items-center xs:items-center gap-2 xs:gap-6 justify-center sm:justify-start">
                <div className="flex items-center gap-2 bg-yellow-50 px-2 py-1 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {userStats.averageRating?.toFixed(1) || '0.0'} <span className="hidden xs:inline">Average Rating</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {userStats.totalViews || 0} <span className="hidden xs:inline">Total Views</span>
                  </span>
                </div>
              </div>
            </div>
            {/* Add Product Button, floating on mobile */}
            <div className="w-full sm:w-auto mt-4 sm:mt-0 flex-shrink-0 flex justify-center sm:justify-end">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <Plus className="w-5 h-5" />
                <span className="hidden xs:inline">Add Product</span>
                <span className="inline xs:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={BarChart3}
            title="Total Products"
            value={userInfo.totalProducts || 0}
            subtitle="Active listings"
            color="blue"
          />
          <StatCard 
            icon={MessageCircle}
            title="Total Reviews"
            value={userStats.totalFeedback || 0}
            subtitle="Community feedback"
            color="green"
          />
          <StatCard 
            icon={Eye}
            title="Profile Views"
            value={userInfo.profileViews || 0}
            subtitle="This month"
            color="purple"
          />
          <StatCard 
            icon={Star}
            title="Average Rating"
            value={userStats.averageRating?.toFixed(1) || '0.0'}
            subtitle="Overall score"
            color="yellow"
          />
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Products ({userProducts.length})
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'analytics'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews Received
              </button>
              {/* Add new tab in the tabs navigation */}
              <button
                onClick={() => setActiveTab('feedback-management')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'feedback-management'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Feedback ({pendingFeedbackCount})
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Your Products</h3>
                    <p className="text-gray-600 mt-1">Manage and track your product listings</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Products</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>Sort by Date</option>
                      <option>Sort by Rating</option>
                      <option>Sort by Views</option>
                    </select>
                  </div>
                </div>

                {userProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProducts.map((product) => (
                      <ProductCard key={product.id} product={product} getAverageRating={getAverageRating} formatTimeAgo={formatTimeAgo} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
                    <p className="text-gray-600 mb-6">Start by uploading your first product to get feedback from the community</p>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                      Upload Your First Product
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {/* {activeTab === 'analytics' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Analytics Overview</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Views Over Time</h4>
                    <div className="h-40 bg-white rounded-xl flex items-center justify-center">
                      <p className="text-gray-500">Chart placeholder - Views analytics</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h4>
                    <div className="h-40 bg-white rounded-xl flex items-center justify-center">
                      <p className="text-gray-500">Chart placeholder - Rating analytics</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-200">
                          <th className="pb-3 text-sm font-medium text-gray-600">Product</th>
                          <th className="pb-3 text-sm font-medium text-gray-600">Views</th>
                          <th className="pb-3 text-sm font-medium text-gray-600">Reviews</th>
                          <th className="pb-3 text-sm font-medium text-gray-600">Avg Rating</th>
                          <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-3">
                        {userProducts.map((product) => (
                          <tr key={product.id} className="border-b border-gray-100">
                            <td className="py-3">
                              <div className="flex items-center gap-3">
                                <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                                <span className="font-medium text-gray-900">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-3 text-gray-700">{product.views}</td>
                            <td className="py-3 text-gray-700">{product.ratingCount}</td>
                            <td className="py-3 text-gray-700">{getAverageRating(product)}</td>
                            <td className="py-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                product.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {product.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )} */}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Reviews Received</h3>
                <div className="space-y-6">
                  {/* Sample review items */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">0x8765...4321</span>
                          <span className="text-gray-500 text-sm">reviewed</span>
                          <span className="font-medium text-gray-900">CryptoTracker Pro</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">2 hours ago</span>
                        </div>
                        <p className="text-gray-700">
                          "Excellent product! The interface is intuitive and the real-time tracking is spot on. Love the portfolio analytics feature."
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <p className="text-gray-500">More reviews will appear here as users interact with your products.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Add tab content */}
            {activeTab === 'feedback-management' && (
              <FeedbackManagement />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
