import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'jw16151615@gmail.com' },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      schoolId: true,
      school: { select: { id: true, name: true, code: true } },
    },
  });

  if (!user) {
    console.log('User not found');
    return;
  }

  if (!user.schoolId) {
    console.log('User is not assigned to a school');
    return;
  }

  const schoolId = user.schoolId;

  const users = await prisma.user.findMany({
    where: { schoolId },
    select: { email: true, role: true, name: true },
  });

  const teachers = await prisma.teacher.findMany({
    where: { schoolId },
    select: { employeeId: true, user: { select: { email: true, name: true } } },
  });

  console.log(JSON.stringify({ user, users, teachers }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
