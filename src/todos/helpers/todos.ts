import { Todo } from "@prisma/client";

const sleep = (seconds: number):Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve(true)
    },seconds * 1000)
  });
};



export const updateTodo = async (id:string, complete:boolean):Promise<Todo>=>{
  await sleep(0)
  const body = {complete}

  const dbTodo = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

  return dbTodo

}

export const createTodo = async (description: string):Promise<Todo>=>{

  const body = {description}

  const dbTodo = await fetch(`/api/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

  return dbTodo

}

export const deleteCompleteTodo = async () =>{
  const todos = await fetch(`/api/todos`, {
    method: "DELETE",
  }).then(res => res.json());

  return todos
}