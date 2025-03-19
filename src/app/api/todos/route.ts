import prisma from '@/lib/prisma'
import { NextResponse, /* NextRequest */ } from 'next/server'
import { boolean, object, string } from 'yup';

export async function GET(request: Request) { 

  const { searchParams } = new URL(request.url)
  const take = +(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if( isNaN(take)){
    return NextResponse.json({messaje: 'Take tiene que ser un numero'}, {status: 400})
  }
  if( isNaN(skip)){
    return NextResponse.json({messaje: 'skip tiene que ser un numero'}, {status: 400})
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip
  })

  return NextResponse.json({
    data: todos
  })
}



const postSchema = object({
  description: string().required(),
  complete: boolean().optional().default(false)
})


export async function POST(request: Request) { 

  try {
    const {description, complete} = await postSchema.validate(await request.json())
    
    const validateTodos = await prisma.todo.findFirst({where: {description}})
    if(validateTodos){

      return NextResponse.json({
        messaje: 'Esta descripcion ya existe'
      },{ status:  400})
    }

    const todos = await prisma.todo.create({data: {description, complete}})
    
    return NextResponse.json({
      todos
    })
  } catch (error) {
    return NextResponse.json(error, {status: 400})
  }
}