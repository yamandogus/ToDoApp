import { PrismaClient, Status, Priority, Roles } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Test User",
  //     username: "testuser",
  //     password: hashedPassword,
  //     role: Roles.USER,
  //   },
  // });

  // Örnek kategoriler
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Backend",
        color: "#4A90E2",
      },
    }),
    prisma.category.create({
      data: {
        name: "Frontend",
        color: "#50E3C2",
      },
    }),
    prisma.category.create({
      data: {
        name: "Database",
        color: "#F5A623",
      },
    }),
  ]);

  // Örnek todolar
  // const todos = await Promise.all([
  //   prisma.todo.create({
  //     data: {
  //       userId: user.id,
  //       title: "Proje toplantısı",
  //       description: "Haftalık proje durum toplantısı",
  //       status: Status.PENDING,
  //       priority: Priority.HIGH,
  //       dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // yarın
  //       categories: {
  //         create: {
  //           categoryId: categories[0].id, // İş kategorisi
  //         },
  //       },
  //     },
  //   }),
  //   prisma.todo.create({
  //     data: {
  //       userId: user.id,
  //       title: "Spor yap",
  //       description: "30 dakika koşu",
  //       status: Status.IN_PROGRESS,
  //       priority: Priority.MEDIUM,
  //       dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 saat sonra
  //       categories: {
  //         create: {
  //           categoryId: categories[1].id, // Kişisel kategorisi
  //         },
  //       },
  //     },
  //   }),
  //   prisma.todo.create({
  //     data: {
  //       userId: user.id,
  //       title: "Market alışverişi",
  //       description: "Süt, ekmek, yumurta",
  //       status: Status.COMPLETED,
  //       priority: Priority.LOW,
  //       dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // dün
  //       categories: {
  //         create: {
  //           categoryId: categories[2].id, // Alışveriş kategorisi
  //         },
  //       },
  //     },
  //   }),
  // ]);

  // Admin kullanıcısı oluştur
  const adminHashedPassword = await bcrypt.hash("yaman192645", 10);
  await prisma.user.upsert({
    where: { username: "yamanAdmin" },
    update: {},
    create: {
      name: "Doğuş",
      username: "yamanAdmin",
      password: adminHashedPassword,
      role: Roles.ADMIN,
    },
  });

  console.log("Seed data başarıyla oluşturuldu!");
  // console.log("Kullanıcı:", user);
  console.log("Kategoriler:", categories);
  // console.log("Todolar:", todos);
  console.log("Admin user created successfully");
}

main()
  .catch((e) => {
    console.error("Seed data oluşturulurken hata:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
