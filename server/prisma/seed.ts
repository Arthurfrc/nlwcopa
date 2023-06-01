import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  const user = await prisma.user.create({
    data: {
      name: 'Arthur Felipe',
      email: 'arturfelipe93@gmail.com',
      avatarUrl: 'https://github.com/arthurfrc.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Exemplo',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data:{
        date: '2022-11-02T12:00:00.201Z',
        firstTeamCountryCode: 'BR',
        secondTeamCountryCode: 'DE',
    }
  })
  await prisma.game.create({
    data:{
        date: '2022-11-04T12:00:00.201Z',
        firstTeamCountryCode: 'AR',
        secondTeamCountryCode: 'MX',

        guesses: {
            create:{
                firstTeamPoints: 1,
                secondTeamPoints: 2,

                participant:{
                    connect:{
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id,
                        }
                    }
                }
            }
        }
    }
  })
}

main()
