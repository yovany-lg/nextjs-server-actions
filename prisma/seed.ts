import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const products = [
  {
    name: 'Oranges',
    price: 100,
    description: 'Delicius orange',
    image: 'https://images.pexels.com/photos/693795/pexels-photo-693795.jpeg?cs=srgb&dl=pexels-rp-photography-693795.jpg&fm=jpg&w=1280&h=819',
  },
  {
    name: 'Apples',
    price: 200,
    description: 'Delicius apple for you',
    image: 'https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?cs=srgb&dl=pexels-mareefe-672101.jpg&fm=jpg&w=1280&h=853',
  },
  {
    name: 'Bananas',
    price: 300,
    description: 'This is banana',
    image: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?cs=srgb&dl=pexels-vanessa-loring-5966630.jpg&fm=jpg&w=1280&h=854',
  },
  {
    name: 'Peaches',
    price: 250,
    description: 'Delicius peaches',
    image: 'https://images.pexels.com/photos/4397924/pexels-photo-4397924.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4397924.jpg&fm=jpg&w=1280&h=853',
  },
  {
    name: 'Mangoes',
    price: 500,
    description: 'A bag of mangoes',
    image: 'https://images.pexels.com/photos/13495149/pexels-photo-13495149.jpeg?cs=srgb&dl=pexels-susan-flores-13495149.jpg&fm=jpg&w=1280&h=851',
  },
]

async function main() {
  for(const product of products) {
    await prisma.product.upsert({
      create: product,
      update: product,
      where: {
        name: product.name
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })