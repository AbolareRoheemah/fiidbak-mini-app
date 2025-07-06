"use client"
import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Eye, MessageCircle, ExternalLink, Heart, TrendingUp, Calendar, Grid, List, ChevronDown, SortAsc } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const categories = ['All', 'DeFi', 'NFT', 'Gaming', 'Social', 'Productivity', 'Analytics', 'Developer Tools'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'name', label: 'Name A-Z' }
  ];

  // Extended mock data
  const mockProducts = [
    {
      id: 1,
      name: "CryptoTracker Pro",
      description: "Advanced cryptocurrency portfolio tracker with real-time alerts and comprehensive analytics",
      imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=300&h=200&fit=crop",
      productUrl: "https://cryptotracker.pro",
      owner: "0x1234...5678",
      totalRating: 22,
      ratingCount: 5,
      views: 1250,
      createdAt: Date.now() - 86400000,
      isActive: true,
      category: "DeFi",
      tags: ["crypto", "portfolio", "analytics"]
    },
    {
      id: 2,
      name: "NFT Marketplace",
      description: "Decentralized marketplace for unique digital assets with low fees",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop",
      productUrl: "https://nftmarket.xyz",
      owner: "0x8765...4321",
      totalRating: 16,
      ratingCount: 4,
      views: 890,
      createdAt: Date.now() - 172800000,
      isActive: true,
      category: "NFT",
      tags: ["nft", "marketplace", "art"]
    },
    {
      id: 3,
      name: "DeFi Dashboard",
      description: "Comprehensive DeFi protocol analytics and yield farming tracker",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop",
      productUrl: "https://defidash.io",
      owner: "0x9876...1234",
      totalRating: 28,
      ratingCount: 7,
      views: 2100,
      createdAt: Date.now() - 259200000,
      isActive: true,
      category: "DeFi",
      tags: ["defi", "yield", "analytics"]
    },
    {
      id: 4,
      name: "GameFi Hub",
      description: "Play-to-earn gaming platform with NFT rewards and tournaments",
      imageUrl: "https://images.unsplash.com/photo-1614732414444-096ad5a2c93e?w=300&h=200&fit=crop",
      productUrl: "https://gamefi.hub",
      owner: "0x5432...8765",
      totalRating: 19,
      ratingCount: 6,
      views: 1580,
      createdAt: Date.now() - 345600000,
      isActive: true,
      category: "Gaming",
      tags: ["gaming", "p2e", "nft"]
    },
    {
      id: 5,
      name: "Social Connect",
      description: "Decentralized social network with token-gated communities",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
      productUrl: "https://socialconnect.app",
      owner: "0x2468...1357",
      totalRating: 24,
      ratingCount: 8,
      views: 950,
      createdAt: Date.now() - 432000000,
      isActive: true,
      category: "Social",
      tags: ["social", "community", "tokens"]
    },
    {
      id: 6,
      name: "Task Manager Pro",
      description: "Blockchain-based productivity suite with DAO governance",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      productUrl: "https://taskmanager.pro",
      owner: "0x1357...2468",
      totalRating: 15,
      ratingCount: 4,
      views: 720,
      createdAt: Date.now() - 518400000,
      isActive: true,
      category: "Productivity",
      tags: ["productivity", "dao", "tasks"]
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchQuery, selectedCategory, sortBy, ratingFilter, products]);

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product: {
        name?: string;
        description?: string;
        tags?: string[];
      }) =>
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (Array.isArray(product.tags) && product.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product: any) =>
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseInt(ratingFilter);
      filtered = filtered.filter((product: { ratingCount: number; totalRating: number }) => {
        const avgRating = product.ratingCount > 0 ? product.totalRating / product.ratingCount : 0;
        return avgRating >= minRating;
      });
    }

    // Sort
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt - a.createdAt;
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'rating': {
          const avgA = a.ratingCount > 0 ? a.totalRating / a.ratingCount : 0;
          const avgB = b.ratingCount > 0 ? b.totalRating / b.ratingCount : 0;
          return avgB - avgA;
        }
        case 'reviews':
          return b.ratingCount - a.ratingCount;
        case 'views':
          return b.views - a.views;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.createdAt - a.createdAt;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const getAverageRating = (product: { ratingCount: number; totalRating: number; }) => {
    if (product.ratingCount === 0) return 0;
    return (product.totalRating / product.ratingCount).toFixed(1);
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900">All Products</h1>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {filteredProducts.length} products
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>

            {/* Rating Filter */}
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {(currentProducts as any[]).map((product) => (
                  <ProductCard key={product.id} product={product} getAverageRating={getAverageRating} formatTimeAgo={formatTimeAgo} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {(currentProducts as any[]).map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-xl transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 3 || page === currentPage + 3) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;