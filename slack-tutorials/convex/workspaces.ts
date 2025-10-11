import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const generateCode = () => {
  return Array.from({ length: 6 }, () =>
    "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("").toUpperCase();
};

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Use the new recommended method
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }
    // Generate a random join code
    const joinCode = generateCode();
    
    // Insert workspace into the database
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    // Add the creator as an admin member of the workspace
    await ctx.db.insert("members", {
      userId,
      workspaceId,
      role: "admin",
    });
    

    return workspaceId;
  },
});




export const get = query({
  args: {},
  handler: async (ctx) => {

    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
   }
   const members = await ctx.db
   .query("members")
   .withIndex("by_user_id", (q) =>q.eq("userId", userId))
    .collect();

    const workspaceIds = members.map((m) => m.workspaceId);
    const workspaces = [];
   
    for(const workspaceId of workspaceIds){
      const workspace = await ctx.db.get(workspaceId);
      if(workspace){
        workspaces.push(workspace);
      }
    }

    return await workspaces;
  },
});

export const getById = query({
    args: { workspaceId: v.id("workspaces") },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_and_user", (q) =>
                q.eq("workspaceId", args.workspaceId).eq("userId", userId)
            )
            .unique();
        if (!member) {
          return null;
        }

        return await ctx.db.get(args.workspaceId);
    },
}); 
