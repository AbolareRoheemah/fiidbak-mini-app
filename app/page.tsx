"use client";
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import React, { useState, useEffect, useRef } from 'react';
import { Star, Plus, TrendingUp, Users, MessageCircle, User, Heart, Eye, ArrowRight } from 'lucide-react';
import ProductCard from "./components/ProductCard";
import StatCard from "./components/StatCard";
import { useRouter } from "next/navigation";

// Import Wallet, WalletDropdown, WalletDropdownDisconnect and ConnectWallet from onchainkit/wallet
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { CustomConnectButton } from "./components/ConnectButton";

export default function App() {
  // const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalFeedback: 0,
    averageRating: 0,
    activeUsers: 0
  });
  const mockProducts = [
    {
      id: 1,
      name: "CryptoTracker Pro",
      description: "Advanced cryptocurrency portfolio tracker with real-time alerts",
      imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=300&h=200&fit=crop",
      productUrl: "https://cryptotracker.pro",
      owner: "0x1234...5678",
      totalRating: 22,
      ratingCount: 5,
      createdAt: Date.now() - 86400000,
      isActive: true
    },
    {
      id: 2,
      name: "NFT Marketplace",
      description: "Decentralized marketplace for unique digital assets",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop",
      productUrl: "https://nftmarket.xyz",
      owner: "0x8765...4321",
      totalRating: 16,
      ratingCount: 4,
      createdAt: Date.now() - 172800000,
      isActive: true
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
      createdAt: Date.now() - 259200000,
      isActive: true
    }
  ];
  const router = useRouter();

  useEffect(() => {
    setProducts(mockProducts);
    setStats({
      totalProducts: mockProducts.length,
      totalFeedback: mockProducts.reduce((sum, p) => sum + p.ratingCount, 0),
      averageRating: 4.2,
      activeUsers: 156
    });
  }, []);

  const getAverageRating = (product: any) => {
    if (product.ratingCount === 0) return 0;
    return (product.totalRating / product.ratingCount).toFixed(1);
  };

  const formatTimeAgo = (timestamp: any) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  // useEffect(() => {
  //   if (!isFrameReady) {
  //     setFrameReady();
  //   }
  // }, [setFrameReady, isFrameReady]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={TrendingUp} title="Total Projects" value={stats.totalProducts} subtitle="Active listings" color="blue" />
          <StatCard icon={MessageCircle} title="Total Feedback" value={stats.totalFeedback} subtitle="Reviews received" color="green" />
          <StatCard icon={Star} title="Average Rating" value={stats.averageRating} subtitle="Out of 5.0" color="yellow" />
          <StatCard icon={Users} title="Active Users" value={stats.activeUsers} subtitle="This month" color="purple" />
        </div>

        {/* how it works */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Earn Rewards</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Browse Products</h3>
                <p className="text-gray-600 text-sm">Explore products shared by the community</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Try & Review</h3>
                <p className="text-gray-600 text-sm">Test products and share honest feedback</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Earn Rewards</h3>
                <p className="text-gray-600 text-sm">Get 0.0001 ETH for each quality review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Projects</h2>
          <p className="text-gray-600 mb-6">Discover and review the latest projects from the community</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} getAverageRating={getAverageRating} formatTimeAgo={formatTimeAgo} />
            ))}
          </div>
          <div className="text-center mt-14 flex justify-center">
            <button 
              onClick={() => router.push("/products")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
