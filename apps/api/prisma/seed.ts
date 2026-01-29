import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.quiz.count();
  if (count > 0) return;

  await prisma.quiz.create({
    data: {
      title: 'Demo Quiz (Published)',
      published: true,
      blocks: {
        blocks: [
          { id: 'b1', type: 'HEADING', props: { text: 'Welcome to the Demo', level: 1 } },
          { id: 'b2', type: 'QUESTION', props: { prompt: 'Pick one:', kind: 'single', options: ['A', 'B', 'C'] } },
          { id: 'b3', type: 'BUTTON', props: { label: 'Submit', variant: 'submit' } },
          { id: 'b4', type: 'FOOTER', props: { text: 'Thanks for trying it!' } },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: 'Draft Quiz (Not Published)',
      published: false,
      blocks: {
        blocks: [
          { id: 'c1', type: 'HEADING', props: { text: 'Draft Title', level: 2 } },
          { id: 'c2', type: 'QUESTION', props: { prompt: 'Type something:', kind: 'text', options: [] } },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
