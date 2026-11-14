import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { seedCategories, seedProducts } from "../src/lib/seed-catalog.ts";
import { seedSiteSettings } from "../src/lib/seed-site.ts";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@royalhouse.iq").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be set and at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: seedSiteSettings,
    create: { id: 1, ...seedSiteSettings },
  });

  for (const [index, category] of seedCategories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        blurb: category.blurb,
        description: category.description,
        image: category.image,
        imageAlt: category.imageAlt,
        imagePosition: category.imagePosition,
        sortOrder: index,
      },
      create: {
        slug: category.slug,
        name: category.name,
        blurb: category.blurb,
        description: category.description,
        image: category.image,
        imageAlt: category.imageAlt,
        imagePosition: category.imagePosition,
        sortOrder: index,
      },
    });
  }

  for (const [index, product] of seedProducts.entries()) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        categorySlug: product.category,
        summary: product.summary,
        description: product.description,
        details: [...product.details],
        image: product.image,
        imageAlt: product.imageAlt,
        imagePosition: product.imagePosition,
        featured: product.featured,
        sortOrder: index,
      },
      create: {
        slug: product.slug,
        name: product.name,
        categorySlug: product.category,
        summary: product.summary,
        description: product.description,
        details: [...product.details],
        image: product.image,
        imageAlt: product.imageAlt,
        imagePosition: product.imagePosition,
        featured: product.featured,
        sortOrder: index,
      },
    });
  }

  console.log(`Seeded admin ${email}, ${seedCategories.length} categories, ${seedProducts.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
