"use client"
import React, { useState } from 'react';
import { Star, MessageCircle, Award, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: Star,
      title: "Welcome to ProductFeed!",
      description: "Discover amazing products and earn rewards for your valuable feedback",
      action: "Get Started"
    },
    {
      icon: MessageCircle,
      title: "Share Your Thoughts",
      description: "Try products and leave honest reviews to help the community make better decisions",
      action: "Learn More"
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Get 0.0001 ETH for each quality review you submit. Your feedback has real value!",
      action: "Start Exploring"
    }
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentStep.title}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">{currentStep.description}</p>
        
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index <= step ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={() => {
            if (step < steps.length - 1) {
              setStep(step + 1);
            } else {
              // onComplete();
            }
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {currentStep.action}
          <ArrowRight className="w-5 h-5" />
        </button>
        
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full mt-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;