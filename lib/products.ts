import prisma from "./db";

export async function getProducts() {
    return await prisma.product.findMany();
}

export async function getProductById(id: number) {
    return await prisma.product.findUnique({
        where: {
            id: id
        }
    });
}