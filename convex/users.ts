import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create or update a user when they connect their wallet
export const upsertUser = mutation({
  args: {
    walletAddress: v.string(),
    clerkId: v.optional(v.string()), // Opcjonalny, dla kompatybilności wstecznej
    username: v.optional(v.string()),
    chainPreference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Sprawdź czy użytkownik już istnieje
    const existingUserByWallet = await ctx.db
      .query("users")
      .withIndex("by_wallet_address", (q) => q.eq("walletAddress", args.walletAddress))
      .first();

    const timestamp = Date.now();

    if (existingUserByWallet) {
      // Aktualizuj istniejącego użytkownika
      await ctx.db.patch(existingUserByWallet._id, {
        username: args.username ?? existingUserByWallet.username,
        chainPreference: args.chainPreference ?? existingUserByWallet.chainPreference,
        lastLoginAt: timestamp,
        // Opcjonalnie zaktualizuj clerkId jeśli podano
        ...(args.clerkId ? { clerkId: args.clerkId } : {}),
      });
      console.log("User updated in database by wallet:", args.walletAddress);
      return existingUserByWallet._id;
    }

    // Stwórz nowego użytkownika
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId || `wallet-${args.walletAddress.slice(0, 10)}`, // Używamy adresu portfela jako identyfikatora
      walletAddress: args.walletAddress,
      username: args.username || `User-${args.walletAddress.slice(0, 6)}`,
      chainPreference: args.chainPreference,
      lastLoginAt: timestamp,
      createdAt: timestamp,
    });
    
    console.log("New user created in database with wallet:", args.walletAddress);
    return userId;
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

// Get user by Clerk ID (pozostawione dla kompatybilności wstecznej)
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// Update user's chain preference
export const updateChainPreference = mutation({
  args: {
    walletAddress: v.string(),
    chainPreference: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_wallet_address", (q) => q.eq("walletAddress", args.walletAddress))
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