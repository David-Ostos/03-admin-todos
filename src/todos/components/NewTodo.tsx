"use client";

import {FormEvent, useState} from "react";
import {IoTrashOutline} from "react-icons/io5";
import * as todosApi from "@/todos/helpers/todos";
import {useRouter} from "next/navigation";
import { addTodo, deleteCompleted, getSeed } from "../actions/todo-actions";

export const NewTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const onSumit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    todosApi.createTodo(description);
    router.refresh();
    setDescription("");
  };

  const deleteAllComplete = async () => {
    await todosApi.deleteCompleteTodo();
    router.refresh();
  };

  return (
    <form onSubmit={onSumit} className="flex w-full">
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 bg-white rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteAllComplete()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Borrar completados</span>
      </button>
    </form>
  );
};

export const NewTodoActions = () => {
  const [description, setDescription] = useState("");

  const onSumit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    await addTodo(description);
    setDescription("");
  };



  return (
    <form onSubmit={onSumit} className="flex w-full">
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 bg-white rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>
      <div className="flex flex-1 ">
        <button className="flex items-center justify-center rounded ml-2 bg-green-500 p-2 text-white hover:bg-green-700 transition-all" onClick={()=> getSeed()}> seed </button>
        
      </div>

      <button
        onClick={async() => await deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Borrar completados</span>
      </button>
    </form>
  );
};