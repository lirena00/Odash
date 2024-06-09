import { useSettings } from "@/contexts/SettingsContext";
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { MinusIcon } from "@/components/Icons/MinusIcon";

export const TodoDimensions = {
  x: 0,
  y: 0,
  w: 7,
  h: 14,
  minW: 4,
  minH: 2,
  maxW: 7,
  maxH: 14,
};

export const TodoPreview = () => {
  const { settings } = useSettings();
  const theme = settings.theme;

  return (
    <div
      className={`widget w-full h-full max-h-96 overflow-y-auto space-y-2 rounded-md p-2 ${
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light"
          : "bg-accent text-solid-text"
      } `}
    >
      <div className="flex justify-between items-center">
        <span className="text-2xl">Todo</span>
      </div>
      <form className="flex gap-2 w-full">
        <input
          className="w-full rounded-md bg-white/50 outline-none px-2"
          placeholder="Add a todo"
        />
        <button type="submit" className="bg-white/50 rounded-md p-2">
          <PlusIcon />
        </button>
      </form>
      <div className="flex flex-col gap-2 max-h-min overflow-y-auto">
        <div className="text-white/70">No todos added yet.</div>
      </div>
    </div>
  );
};

interface TodoProps {
  id: string;
  todos: { text: string; completed: boolean }[];
  title: string;
  onUpdate: (
    id: string,
    title: string,
    todos: { text: string; completed: boolean }[]
  ) => void;
}

const Todo: React.FC<TodoProps> = ({
  id,
  todos: initialTodos,
  title,
  onUpdate,
}) => {
  const { settings } = useSettings();
  const theme = settings.theme;

  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [todoTitle, setTodoTitle] = useState(title);

  useEffect(() => {
    onUpdate(id, todoTitle, todos);
  }, [todos, todoTitle, id, onUpdate]);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodo.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  return (
    <div
      className={`widget w-full h-full max-h-96 overflow-y-auto space-y-2 rounded-md p-2 ${
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light"
          : "bg-accent text-solid-text"
      } `}
    >
      <div className="flex justify-between items-center">
        <input
          value={todoTitle}
          onChange={handleTitleChange}
          className="text-2xl w-fit bg-transparent outline-none border-none max-w-[85%]"
        />
      </div>
      <form onSubmit={handleAddTodo} className="flex gap-2 w-full">
        <input
          className="w-full rounded-md bg-white/50 outline-none px-2"
          placeholder="Add a todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" className="bg-white/50 rounded-md p-2">
          <PlusIcon />
        </button>
      </form>
      <div className="flex flex-col gap-2 max-h-min overflow-y-auto">
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div
              key={index}
              className="flex gap-2 justify-between items-center"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(index)}
                className="p-2 rounded-md w-5 h-5"
              />
              <div className={`w-full ${todo.completed ? "line-through" : ""}`}>
                {todo.text}
              </div>
              <button
                onClick={() => handleDeleteTodo(index)}
                className="bg-white/50 rounded-md p-2"
              >
                <MinusIcon />
              </button>
            </div>
          ))
        ) : (
          <div className="text-white/70">No todos added yet.</div>
        )}
      </div>
    </div>
  );
};

export default Todo;
