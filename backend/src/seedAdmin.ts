import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "./libs/Prisma.js";

const adminRegister = async () => {
  const { ADMIN_FIRSTNAME, ADMIN_LASTNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_FIRSTNAME || !ADMIN_LASTNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      "Missing required env vars: ADMIN_FIRSTNAME, ADMIN_LASTNAME, ADMIN_EMAIL, ADMIN_PASSWORD",
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingUser) {
    if (existingUser.role !== "ADMIN") {
      throw new Error("ADMIN_EMAIL already belongs to a non-admin user.");
    }
    console.log("Admin already exists. Skipping seed.");
    return;
  }

  const password = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await prisma.user.create({
    data: {
      firstName: ADMIN_FIRSTNAME,
      lastName: ADMIN_LASTNAME,
      email: ADMIN_EMAIL,
      password,
      role: "ADMIN",
      verified_At: new Date(),
    },
  });

  console.log("Admin created successfully.");
};

adminRegister()
  .catch((error: unknown) => {
    console.error("Admin seed failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
