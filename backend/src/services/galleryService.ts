import { prisma } from '../database/prisma'

export const galleryService = {
  async listGalleryItems(category?: string, search?: string) {
    return await prisma.galleryItem.findMany({
      where: {
        ...(category && { category }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { tags: { has: search } },
          ],
        }),
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        visualConfig: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  },

  async getGalleryItem(id: string) {
    const item = await prisma.galleryItem.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        visualConfig: true,
      },
    })

    if (!item) throw new Error('Item não encontrado')

    // Incrementar view count
    await prisma.galleryItem.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    })

    return item
  },

  async incrementUseCount(id: string) {
    await prisma.galleryItem.update({
      where: { id },
      data: { useCount: { increment: 1 } },
    })
  },
}
