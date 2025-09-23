"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function updateUserRole(userId: string, role: string) {
  try {
    // Get the client instance first
    const clerk = await clerkClient();

    // Now use the client to update user metadata
    await clerk.users.updateUserMetadata(userId, {
      unsafeMetadata: {
        role: role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating role:", error);
    return { success: false, error };
  }
}
