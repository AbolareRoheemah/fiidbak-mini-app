import { abi } from "../utils/abi";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useCallback, useEffect, useState } from "react";
import { simulateContract } from '@wagmi/core';
import { config } from "../wagmi";
import { BaseError, ContractFunctionRevertedError, parseEther } from "viem";
import { toast } from 'sonner';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export enum ContractError {
  InsufficientFee = 'Insufficient fee',
  AlreadyReviewed = 'Already reviewed',
  ProductNotActive = 'Product not active',
  NotAuthorized = 'Not authorized',
  NoRewardsToСlaim = 'No rewards to claim',
  FeedbackDoesNotExist = 'Feedback does not exist'
}

// ===== READ HOOKS =====

// Get all products
export function useGetAllProducts() {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getAllProducts',
  });
}

// Get specific product
export function useGetProduct(productId?: number) {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getProduct',
    args: productId ? [BigInt(productId)] : undefined,
    query: {
      enabled: !!productId
    }
  });
}

// Get user's products
export function useGetUserProducts(userAddress?: `0x${string}`) {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getUserProducts',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress
    }
  });
}

// Get product feedbacks
export function useGetProductFeedbacks(productId?: number) {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getProductFeedbacks',
    args: productId ? [BigInt(productId)] : undefined,
    query: {
      enabled: !!productId
    }
  });
}

// Get pending feedbacks for product owner
export function useGetPendingFeedbacks(ownerAddress?: `0x${string}`) {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getPendingFeedbacks',
    args: ownerAddress ? [ownerAddress] : undefined,
    query: {
      enabled: !!ownerAddress
    }
  });
}

// Get user's pending rewards
export function useGetPendingRewards(userAddress?: `0x${string}`) {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getPendingRewards',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress
    }
  });
}

// Get reward pool status
export function useGetRewardPoolStatus() {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getRewardPoolStatus',
  });
}

// Get product creation fee
export function useGetProductCreationFee() {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'productCreationFee',
  });
}

// Get feedback reward amount
export function useGetFeedbackReward() {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'feedbackReward',
  });
}

// Check if user has reviewed a product
export function useHasReviewed(userAddress?: `0x${string}`, productId?: number) {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'hasReviewed',
    args: userAddress && productId ? [userAddress, BigInt(productId)] : undefined,
    query: {
      enabled: !!(userAddress && productId)
    }
  });
}

// Get feedback status
export function useGetFeedbackStatus(feedbackId?: number) {
  return useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getFeedbackStatus',
    args: feedbackId ? [BigInt(feedbackId)] : undefined,
    query: {
      enabled: !!feedbackId
    }
  });
}

// ===== WRITE HOOKS =====

// Create Product Hook
export function useCreateProduct() {
    console.log("got inn here")
  const { data: writeData, writeContract, error: writeError, isPending: isCreateLoading } = useWriteContract();
  const { 
    isSuccess: isCreateSuccess,
    error: confirmError
  } = useWaitForTransactionReceipt({ 
    hash: writeData 
  });

  const createProduct = useCallback(async (
    name: string, 
    description: string, 
    imageUrl: string, 
    productUrl: string,
    feeAmount: string
  ) => {
    try {
      await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'createProduct',
        args: [name, description, imageUrl, productUrl],
        value: parseEther(feeAmount),
      });

      writeContract({
        abi,
        address: contractAddress,
        functionName: 'createProduct',
        args: [name, description, imageUrl, productUrl],
        value: parseEther(feeAmount),
      });
    } catch (error) {
      const errorMessage = parseContractError(error);
      toast.error(errorMessage);
    }
  }, [writeContract]);

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Product created successfully!");
    }
    if (writeError || confirmError) {
      toast.error(parseContractError(writeError || confirmError));
    }
  }, [writeError, confirmError, isCreateSuccess]);

  return {
    createProduct,
    isCreateLoading,
    isCreateSuccess,
    error: writeError || confirmError,
    hash: writeData,
  };
}

// Submit Feedback Hook
export function useSubmitFeedback() {
  const { data: writeData, writeContract, error: writeError, isPending: isSubmitLoading } = useWriteContract();
  const { 
    isSuccess: isSubmitSuccess,
    error: confirmError
  } = useWaitForTransactionReceipt({ 
    hash: writeData 
  });

  const submitFeedback = useCallback(async (
    productId: number,
    comment: string,
    rating: number
  ) => {
    try {
      await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'submitFeedback',
        args: [BigInt(productId), comment, rating],
      });

      writeContract({
        abi,
        address: contractAddress,
        functionName: 'submitFeedback',
        args: [BigInt(productId), comment, rating],
      });
    } catch (error) {
      const errorMessage = parseContractError(error);
      toast.error(errorMessage);
    }
  }, [writeContract]);

  useEffect(() => {
    if (isSubmitSuccess) {
      toast.success("Feedback submitted successfully!");
    }
    if (writeError || confirmError) {
      toast.error(parseContractError(writeError || confirmError));
    }
  }, [writeError, confirmError, isSubmitSuccess]);

  return {
    submitFeedback,
    isSubmitLoading,
    isSubmitSuccess,
    error: writeError || confirmError,
    hash: writeData,
  };
}

// Approve Feedback Hook
export function useApproveFeedback() {
  const { data: writeData, writeContract, error: writeError, isPending: isApproveLoading } = useWriteContract();
  const { 
    isSuccess: isApproveSuccess,
    error: confirmError
  } = useWaitForTransactionReceipt({ 
    hash: writeData 
  });

  const approveFeedback = useCallback(async (feedbackId: number) => {
    try {
      await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'approveFeedback',
        args: [BigInt(feedbackId)],
      });

      writeContract({
        abi,
        address: contractAddress,
        functionName: 'approveFeedback',
        args: [BigInt(feedbackId)],
      });
    } catch (error) {
      const errorMessage = parseContractError(error);
      toast.error(errorMessage);
    }
  }, [writeContract]);

  useEffect(() => {
    if (isApproveSuccess) {
      toast.success("Feedback approved successfully!");
    }
    if (writeError || confirmError) {
      toast.error(parseContractError(writeError || confirmError));
    }
  }, [writeError, confirmError, isApproveSuccess]);

  return {
    approveFeedback,
    isApproveLoading,
    isApproveSuccess,
    error: writeError || confirmError,
    hash: writeData,
  };
}

// Reject Feedback Hook
export function useRejectFeedback() {
  const { data: writeData, writeContract, error: writeError, isPending: isRejectLoading } = useWriteContract();
  const { 
    isSuccess: isRejectSuccess,
    error: confirmError
  } = useWaitForTransactionReceipt({ 
    hash: writeData 
  });

  const rejectFeedback = useCallback(async (feedbackId: number, reason: string) => {
    try {
      await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'rejectFeedback',
        args: [BigInt(feedbackId), reason],
      });

      writeContract({
        abi,
        address: contractAddress,
        functionName: 'rejectFeedback',
        args: [BigInt(feedbackId), reason],
      });
    } catch (error) {
      const errorMessage = parseContractError(error);
      toast.error(errorMessage);
    }
  }, [writeContract]);

  useEffect(() => {
    if (isRejectSuccess) {
      toast.success("Feedback rejected successfully!");
    }
    if (writeError || confirmError) {
      toast.error(parseContractError(writeError || confirmError));
    }
  }, [writeError, confirmError, isRejectSuccess]);

  return {
    rejectFeedback,
    isRejectLoading,
    isRejectSuccess,
    error: writeError || confirmError,
    hash: writeData,
  };
}

// Claim Rewards Hook
export function useClaimRewards() {
  const { data: writeData, writeContract, error: writeError, isPending: isClaimLoading } = useWriteContract();
  const { 
    isSuccess: isClaimSuccess,
    error: confirmError
  } = useWaitForTransactionReceipt({ 
    hash: writeData 
  });

  const claimRewards = useCallback(async () => {
    try {
      await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'claimRewards',
        args: [],
      });

      writeContract({
        abi,
        address: contractAddress,
        functionName: 'claimRewards',
        args: [],
      });
    } catch (error) {
      const errorMessage = parseContractError(error);
      toast.error(errorMessage);
    }
  }, [writeContract]);

  useEffect(() => {
    if (isClaimSuccess) {
      toast.success("Rewards claimed successfully!");
    }
    if (writeError || confirmError) {
      toast.error(parseContractError(writeError || confirmError));
    }
  }, [writeError, confirmError, isClaimSuccess]);

  return {
    claimRewards,
    isClaimLoading,
    isClaimSuccess,
    error: writeError || confirmError,
    hash: writeData,
  };
}

// Fund Reward Pool Hook
export function useFundRewardPool() {
  const { data: writeData, writeContract, error: writeError, isPending: isFundLoading } = useWriteContract();
  const { 
    isSuccess: isFundSuccess,
    error: confirmError
  } = useWaitForTransactionReceipt({ 
    hash: writeData 
  });

  const fundRewardPool = useCallback(async (amount: string) => {
    try {
      await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: 'fundRewardPool',
        args: [],
        value: parseEther(amount),
      });

      writeContract({
        abi,
        address: contractAddress,
        functionName: 'fundRewardPool',
        args: [],
        value: parseEther(amount),
      });
    } catch (error) {
      const errorMessage = parseContractError(error);
      toast.error(errorMessage);
    }
  }, [writeContract]);

  useEffect(() => {
    if (isFundSuccess) {
      toast.success("Reward pool funded successfully!");
    }
    if (writeError || confirmError) {
      toast.error(parseContractError(writeError || confirmError));
    }
  }, [writeError, confirmError, isFundSuccess]);

  return {
    fundRewardPool,
    isFundLoading,
    isFundSuccess,
    error: writeError || confirmError,
    hash: writeData,
  };
}

// ===== UTILITY HOOKS =====

// Check if user can claim rewards
export function useCanClaimRewards(userAddress?: `0x${string}`) {
  const [canClaim, setCanClaim] = useState(false);
  
  const { data: pendingRewards } = useGetPendingRewards(userAddress);
  
  useEffect(() => {
    if (pendingRewards !== undefined) {
      setCanClaim(Number(pendingRewards) > 0);
    }
  }, [pendingRewards]);

  return canClaim;
}

// Get formatted product rating
type ProductWithRating = {
  ratingCount?: bigint | number | string;
  totalRating?: bigint | number | string;
  [key: string]: any;
};

export function useFormattedProductRating(productId?: number) {
  const { data: product } = useGetProduct(productId);

  const formatRating = useCallback(() => {
    const prod = product as ProductWithRating | undefined;
    const ratingCount = prod?.ratingCount !== undefined ? Number(prod.ratingCount) : 0;
    const totalRating = prod?.totalRating !== undefined ? Number(prod.totalRating) : 0;

    if (!prod || ratingCount === 0) {
      return { average: 0, count: 0 };
    }

    const average = totalRating / ratingCount;
    return {
      average: Number(average.toFixed(1)),
      count: ratingCount
    };
  }, [product]);

  return formatRating();
}

// Error parsing function
function parseContractError(error: unknown): string {
  console.log('Contract error details:', error);
  
  if (error instanceof BaseError) {
    const revertError = error.walk(error => error instanceof ContractFunctionRevertedError)
    if (revertError instanceof ContractFunctionRevertedError) {
      const errorName = getErrorMessage(revertError.data?.errorName ?? '') || (error as { shortMessage: string }).shortMessage;
      return errorName;
    }
  }

  if (error instanceof Error) {
    // Look for custom error names in the error message
    for (const errorType of Object.values(ContractError)) {
      if (error.message.includes(errorType)) {
        return getErrorMessage(errorType);
      }
    }

    // Check for common blockchain errors
    if (error.message.toLowerCase().includes('insufficient funds')) {
      return 'Insufficient funds for gas';
    }
    if (error.message.toLowerCase().includes('gas required exceeds allowance')) {
      return 'Transaction would fail - please check your inputs';
    }
    if (error.message.toLowerCase().includes('user rejected')) {
      return 'Transaction was rejected by user';
    }
  }

  return 'An unexpected error occurred. Please check your inputs and try again.';
}

function getErrorMessage(errorType: string): string {
  const errorMessages: Record<string, string> = {
    InsufficientFee: 'Insufficient fee provided',
    AlreadyReviewed: 'You have already reviewed this product',
    ProductNotActive: 'This product is not active',
    NotAuthorized: 'You are not authorized to perform this action',
    NoRewardsToСlaim: 'No rewards available to claim',
    FeedbackDoesNotExist: 'Feedback does not exist',
    OwnableUnauthorizedAccount: "Only the owner can call this function",
    ReentrancyGuardReentrantCall: "Reentrancy attack detected",
  };

  return errorMessages[errorType] || "";
}