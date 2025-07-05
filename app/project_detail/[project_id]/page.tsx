"use client"
import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, MessageCircle, Share2, Heart, Eye, User, ThumbsUp, ChevronDown, Filter, Calendar, Award, X } from 'lucide-react';

// Lucide React does not provide a Modal component. We'll use a simple custom modal.
function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const [product, setProduct] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    comment: ''
  });
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "CryptoTracker Pro",
    description: "Advanced cryptocurrency portfolio tracker with real-time alerts and comprehensive analytics. Track your investments across multiple exchanges and DeFi protocols with ease.",
    imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600&h=400&fit=crop",
    productUrl: "https://cryptotracker.pro",
    owner: "0x1234567890abcdef",
    totalRating: 22,
    ratingCount: 5,
    createdAt: Date.now() - 86400000,
    isActive: true,
    category: "DeFi",
    tags: ["crypto", "portfolio", "analytics", "defi"],
    features: [
      "Real-time price tracking",
      "Portfolio analytics",
      "Price alerts",
      "Multi-exchange support",
      "DeFi protocol integration"
    ]
  };

  // Mock feedback data
  const mockFeedbacks = [
    {
      id: 1,
      productId: 1,
      reviewer: "0x8765432109876543",
      comment: "Excellent product! The interface is intuitive and the real-time tracking is spot on. Love the portfolio analytics feature.",
      rating: 5,
      createdAt: Date.now() - 3600000,
      helpful: 12,
      isVerified: true
    },
    {
      id: 2,
      productId: 1,
      reviewer: "0x9876543210987654",
      comment: "Good overall but could use more customization options for the dashboard. The alerts work perfectly though.",
      rating: 4,
      createdAt: Date.now() - 7200000,
      helpful: 8,
      isVerified: false
    },
    {
      id: 3,
      productId: 1,
      reviewer: "0x1357924680135792",
      comment: "Great tool for tracking DeFi investments. The multi-exchange support is a game changer!",
      rating: 5,
      createdAt: Date.now() - 10800000,
      helpful: 15,
      isVerified: true
    }
  ];

  useEffect(() => {
    setProduct(mockProduct);
    setFeedbacks(mockFeedbacks);
  }, []);

  const getAverageRating = () => {
    if (!product || product.ratingCount === 0) return 0;
    return (product.totalRating / product.ratingCount).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    feedbacks.forEach(feedback => {
      distribution[feedback.rating]++;
    });
    return distribution;
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feedback = {
      id: Date.now(),
      productId: product.id,
      reviewer: "0x" + Math.random().toString(16).substr(2, 16),
      comment: newFeedback.comment,
      rating: newFeedback.rating,
      createdAt: Date.now(),
      helpful: 0,
      isVerified: false
    };
    
    setFeedbacks([feedback, ...feedbacks]);
    setNewFeedback({ rating: 5, comment: '' });
    setShowFeedbackForm(false);
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filterRating === 'all') return true;
    return feedback.rating === parseInt(filterRating);
  });

  const sortedFeedbacks = filteredFeedbacks.sort((a, b) => {
    if (sortBy === 'newest') return b.createdAt - a.createdAt;
    if (sortBy === 'oldest') return a.createdAt - b.createdAt;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-3">{product.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Rating Overview */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        className={`w-5 h-5 ${star <= Math.round(Number(getAverageRating())) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-gray-900">{getAverageRating()}</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">{product.ratingCount}</span> reviews
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 1000) + 500} views</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag: string) => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a 
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Product
                </a>
                <button 
                  type="button"
                  onClick={() => setShowFeedbackForm(true)}
                  className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Leave Feedback
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Community Feedback</h2>
            <div className="flex items-center gap-3">
              <select 
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = getRatingDistribution()[rating as keyof typeof getRatingDistribution];
                const percentage = feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback Form Modal */}
          <Modal open={showFeedbackForm} onClose={() => setShowFeedbackForm(false)}>
            <form onSubmit={handleFeedbackSubmit}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Your Feedback</h3>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewFeedback({...newFeedback, rating: star})}
                        className="p-1"
                      >
                        <Star 
                          className={`w-6 h-6 ${star <= newFeedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <textarea
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                    placeholder="Share your experience with this product..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            </form>
          </Modal>

          {/* Feedback List */}
          <div className="space-y-6">
            {sortedFeedbacks.map(feedback => (
              <div key={feedback.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">
                        {feedback.reviewer.slice(0, 6)}...{feedback.reviewer.slice(-4)}
                      </span>
                      {feedback.isVerified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Verified
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">{formatTimeAgo(feedback.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
                    </div>
                    <p className="text-gray-700 mb-3">{feedback.comment}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Helpful ({feedback.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
