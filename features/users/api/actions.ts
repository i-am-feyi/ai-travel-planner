import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function createUser(data: User) {
  try {
    const user = prisma.user.create({ data });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });

    return user;
  } catch (error) {
    return error;
  }
}

export async function getUserByClerkId(clerkUserId: string) {
  try {
    if (!clerkUserId) {
      throw new Error("Clerk ID is required!");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkUserId,
      },
    });
    return { user };
  } catch (error) {
    throw new Error("Unable to fetch user with clerkId");
  }
}
