/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = (seconds: number)=> {
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve(true)
    },seconds * 1000)
  });
};



export const toggleTodo = async(id:string, complete:boolean): Promise<Todo>=>{

  await sleep(3);
  const todo = await prisma.todo.findFirst({where: {id}})

  if(!todo){
    throw `Todo con id ${id} no encontrado`
  }

  const updateTodo = await prisma.todo.update({
    where: {id},
    data: {
      complete
    }
  })

  revalidatePath('/dashboard/server-todos')

  return updateTodo

}

export const addTodo = async(description: string)=>{
  try {
    const todos = await prisma.todo.create({data: {description}});

    revalidatePath("/dashboard/server-todos");
    
    return todos;
  } catch (e) {
    
    return {
      message: 'Error creando todo'
    }
  }
}

export const deleteCompleted = async (): Promise<
  void | {messaje: string} 
> => {
  try {
    const todos = await prisma.todo.findMany({where: {complete: true}});
    if (todos.length === 0) {
      return {messaje: "No hay registros completados"};
    }

    const todo = await prisma.todo.deleteMany({where: {complete: true}});

    revalidatePath("/dashboard/server-todos");
    return {
      messaje: `Se ${
        todo.count === 1
          ? "elimino un registro completado"
          : "eliminaron " + todo.count + " registros completados"
      } `,
    };
  } catch (error) {
    return {messaje: 'hubo un error'};
  }
};

export const getSeed = async (): Promise<{message: string}> => {
  try {
    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
      data: [
        {description: "Piedra del alma", complete: true},
        {description: "Piedra del poder"},
        {description: "Piedra del tiempo"},
        {description: "Piedra del espacio"},
        {description: "Piedra del realidad"},
      ],
    });
    revalidatePath("/dashboard/server-todos");

    return {
      message: "Seed Executed",
    };
  } catch (error) {
    return {message: "hubo un error"};
  }
};