import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, /* NextRequest */ } from 'next/server'
import { boolean, object, string } from 'yup'

interface Args {
  params: {
    id: string
  }
}

const getTodo = async (id: string):Promise<Todo | null> => {
  return await prisma.todo.findFirst({where: {id}})
}

export async function GET(request: Request, {params}: Args) { 
  const {id} = params
  
  const todo = await getTodo(id)

  if(!todo){
    return NextResponse.json({
      messaje: `No se encontro el todo con el #id: ${id}`,
      data: todo
    }, {status: 404})
  }

  return NextResponse.json({data: todo})
}

const updateSchema = object({
  description: string().optional(),
  complete: boolean().optional()
})

export async function PUT(request: Request, {params}: Args) { 
  const {id} = params
  
  const todo = await getTodo(id)
  if(!todo){
    return NextResponse.json({
      messaje: `No se encontro el todo con el #id: ${id}`,
      data: todo
    }, {status: 404})
  }
  try {
    const {description, complete} = await updateSchema.validate(await request.json())
  
    if(todo.description === description && complete === undefined){
      return NextResponse.json({
        messaje: `La descripcion es igual a la anterior`
      }, {status: 400})
    }
    if(todo.complete === complete && description === todo.description){
      return NextResponse.json({
        messaje: `Complete y description tienen el mismo valor que el anterior`
      }, {status: 400})
    }
    if(todo.complete === complete && description === undefined){
      return NextResponse.json({
        messaje: `El complete tiene el mismo valor que el anterior`
      }, {status: 400})
    }
  
  
    const todoUpdate = await prisma.todo.update({where: 
    {
      id
    },
    data:{
      description,
      complete
    }})
    return NextResponse.json({data:todoUpdate})
    
  } catch (error) {
    return NextResponse.json(error, {status: 400})
    
  }

}