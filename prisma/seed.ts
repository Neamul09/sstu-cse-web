import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import bcrypt from 'bcryptjs';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sstu.edu' },
    update: {},
    create: {
      email: 'admin@sstu.edu',
      name: 'System Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Created Admin');

  // 2. Create Teachers
  const teachersData = [
    { name: 'Dr. Anisur Rahman', email: 'head.cse@sstu.edu', designation: 'Professor & Head' },
    { name: 'Dr. Sabiha Khatun', email: 'sabiha@sstu.edu', designation: 'Associate Professor' },
    { name: 'Engr. Rakib Hasan', email: 'rakib@sstu.edu', designation: 'Assistant Professor' },
  ];

  for (const t of teachersData) {
    await prisma.user.upsert({
      where: { email: t.email },
      update: {},
      create: {
        email: t.email,
        name: t.name,
        password: hashedPassword,
        role: 'TEACHER',
        teacherProfile: {
          create: {
            designation: t.designation,
            officeHours: '10:00 AM - 01:00 PM',
          },
        },
      },
    });
  }
  console.log('✅ Created Teachers');

  // 3. Create Courses
  const coursesData = [
    { code: 'CSE-101', name: 'Introduction to Programming', credits: 3.0, semester: 1 },
    { code: 'CSE-201', name: 'Object Oriented Programming', credits: 3.0, semester: 3 },
    { code: 'CSE-301', name: 'Software Engineering', credits: 3.0, semester: 5 },
    { code: 'CSE-401', name: 'Artificial Intelligence', credits: 3.0, semester: 7 },
  ];

  for (const c of coursesData) {
    await prisma.course.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    });
  }
  console.log('✅ Created Courses');

  // 4. Create Alumni
  const alumniData = [
    { name: 'John Smith', batch: '12th (Batch 18)', company: 'Google', designation: 'Senior Software Engineer', story: 'Successfully led the ML infrastructure team at Google Zurich.' },
    { name: 'Sarah Ahmed', batch: '14th (Batch 20)', company: 'Microsoft', designation: 'Cloud Architect', story: 'Transitioned from campus placements to a high-impact role in Azure.' },
    { name: 'Tanvir Hossain', batch: '15th (Batch 21)', company: 'Shopify', designation: 'Frontend Engineer', story: 'Focusing on building high-performance e-commerce experiences.' },
  ];

  for (const a of alumniData) {
    await prisma.alumni.create({ data: a });
  }
  console.log('✅ Created Alumni');

  // 5. Create Notices
  const noticesData = [
    { title: 'Final Exam Schedule Spring 2026', body: 'The final examinations will commence from June 15th. Detailed routine is available in the office.', category: 'EXAM', authorId: admin.id, pinned: true },
    { title: 'Workshop on Cyber Security', body: 'Join us for a 3-day workshop starting next Monday. Seats are limited.', category: 'EVENT', authorId: admin.id },
    { title: 'Admission Circular 2026-27', body: 'Undergraduate admission applications are now open for the new session.', category: 'ADMISSION', authorId: admin.id },
  ];

  for (const n of noticesData) {
    await prisma.notice.create({ data: n });
  }
  console.log('✅ Created Notices');

  // 6. Create Events
  const eventsData = [
    { title: 'Annual Science Fair 2026', description: 'Showcasing the best innovative projects from the department students.', date: new Date('2026-04-15'), time: '09:00 AM', location: 'Main Plaza' },
    { title: 'SSTU Programming Contest', description: 'Inter-batch competitive programming event to sharpen coding skills.', date: new Date('2026-03-22'), time: '10:00 AM', location: 'Lab 302' },
    { title: 'Tech Talk: Web3 Evolution', description: 'Industry experts sharing insights about the future of the decentralized web.', date: new Date('2026-05-10'), time: '02:00 PM', location: 'Auditorium' },
  ];

  for (const e of eventsData) {
    await prisma.event.create({ data: e });
  }
  console.log('✅ Created Events');

  console.log('🏁 Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
