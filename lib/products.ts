import prisma from "./db";

export async function getProducts() {
    return await prisma.product.findMany({
        include: {
            _count: {
                select: { hearts: true }
            }
        }
    });
}

export async function getProductById(id: number) {
    return await prisma.product.findUnique({
        where: {
            id: id
        },
        include: {
            _count: {
                select: { hearts: true }
            }
        }
    });
}