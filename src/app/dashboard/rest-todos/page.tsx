// 
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getuserSessionServer } from "@/auth";
import {prisma} from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/indext";
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};

export default async function RestTodosPage() {
  const user = await getuserSessionServer()

  if(!user){
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: {userId: user?.id },
    orderBy: {description: "asc"},
  });
  
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo/>

      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}