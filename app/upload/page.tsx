"use client"
import React, { useState } from 'react'
import { Upload, Link, Image, FileText, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        productUrl: '',
        imageUrl: '',
        category: '',
        tags: [] as string[]
      });
      const [isUploading, setIsUploading] = useState(false);
      const [uploadSuccess, setUploadSuccess] = useState(false);
      const [dragActive, setDragActive] = useState(false);
      const router = useRouter();
    
      const categories = [
        'DeFi', 'NFT', 'Gaming', 'Social', 'Productivity', 'Analytics', 'Developer Tools', 'Other'
      ];

      const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleTagInput = (e: any) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
          e.preventDefault();
          const newTag = e.target.value.trim();
          if (!formData.tags.includes(newTag)) {
            setFormData(prev => ({
              ...prev,
              tags: [...prev.tags, newTag]
            }));
          }
          e.target.value = '';
        }
      };
    
      const removeTag = (tagToRemove: any) => {
        setFormData(prev => ({
          ...prev,
          tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
      };
    
      const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
          setDragActive(true);
        } else if (e.type === 'dragleave') {
          setDragActive(false);
        }
      };
    
      const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          // Handle file upload logic here
          console.log('File dropped:', e.dataTransfer.files[0]);
        }
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsUploading(true);
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          setUploadSuccess(true);
          
          // Reset form after success
          setTimeout(() => {
            setFormData({
              name: '',
              description: '',
              productUrl: '',
              imageUrl: '',
              category: '',
              tags: []
            });
            setUploadSuccess(false);
          }, 3000);
        } catch (error) {
          console.error('Upload failed:', error);
        } finally {
          setIsUploading(false);
        }
      };
    
      const isFormValid = formData.name && formData.description && formData.productUrl && formData.category;

      if (uploadSuccess) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Uploaded!</h2>
              <p className="text-gray-600 mb-6">Your project has been successfully added to the marketplace.</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 w-full">
                View Project
              </button>
            </div>
          </div>
        );
      }
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h1 className="text-xl font-bold text-gray-900">Upload Project</h1>
                </div>
                <div className="text-sm text-gray-500">
                  Step 1 of 1
                </div>
              </div>
            </div>
          </div>
    
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Project</h2>
                  <p className="text-gray-600">Upload your project to get valuable feedback from the community</p>
                </div>
    
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your project name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
    
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your project and its key features"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>
    
                  {/* Project URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project URL *
                    </label>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        name="productUrl"
                        value={formData.productUrl}
                        onChange={handleInputChange}
                        placeholder="https://yourproduct.com"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
    
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Image/Logo
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag & drop your image here, or{' '}
                        <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                          browse
                        </button>
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <div className="mt-3">
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="Or paste image URL"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
    
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
    
                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add tags (press Enter)"
                      onKeyPress={handleTagInput}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
    
                  {/* Fee Info */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-amber-800 font-medium text-sm">Upload Fee Required</p>
                      <p className="text-amber-700 text-sm mt-1">
                        A small fee of 0.001 ETH is required to upload your project to prevent spam and maintain quality.
                      </p>
                    </div>
                  </div>
    
                  {/* Submit Button */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid || isUploading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          Upload Project
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
}
