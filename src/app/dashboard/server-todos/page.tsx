export const dynamic = 'force-dynamic'
export const revalidate = 0


import prisma from "@/lib/prisma";
import { NewTodoActions, TodosGridActions } from "@/todos/indext";


export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};

export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({orderBy: {description: "asc"}}); 
  return (
    <div className="flex flex-col ">
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodoActions/>

      </div>
      <TodosGridActions todos={todos} />
    </div>
  );
}