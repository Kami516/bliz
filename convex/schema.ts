import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Simple user table with crypto wallet information
  users: defineTable({
    // User identity
    clerkId: v.string(),
    walletAddress: v.string(),
    
    // Basic profile info
    username: v.optional(v.string()),
    
    // Crypto related fields
    chainPreference: v.optional(v.string()), // e.g., "ethereum", "polygon", etc.
    lastLoginAt: v.number(),
    
    // Additional metadata
    createdAt: v.number(),
  })
  .index("by_clerk_id", ["clerkId"])
  .index("by_wallet_address", ["walletAddress"]),
});