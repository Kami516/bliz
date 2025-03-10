import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create or update a user when they connect their wallet
export const upsertUser = mutation({
  args: {
    clerkId: v.string(),
    walletAddress: v.string(),
    username: v.optional(v.string()),
    chainPreference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    const timestamp = Date.now();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        walletAddress: args.walletAddress,
        username: args.username ?? existingUser.username,
        chainPreference: args.chainPreference ?? existingUser.chainPreference,
        lastLoginAt: timestamp,
      });
      console.log("User updated in database:", args.clerkId);
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      walletAddress: args.walletAddress,
      username: args.username,
      chainPreference: args.chainPreference,
      lastLoginAt: timestamp,
      createdAt: timestamp,
    });
    
    console.log("New user created in database:", args.clerkId);
    return userId;
  },
});

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// Get user by wallet address
export const getUserByWalletAddress = query({
  args: { walletAddress: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_wallet_address", (q) => q.eq("walletAddress", args.walletAddress))
      .first();
  },
});

// Update user's chain preference
export const updateChainPreference = mutation({
  args: {
    clerkId: v.string(),
    chainPreference: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      chainPreference: args.chainPreference,
    });

    return user._id;
  },
});