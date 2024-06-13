import React, { useRef, useState, useEffect } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './style.css';
import { Draggable } from '@hello-pangea/dnd';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo = ({todo, todos, setTodos, index}: Props) => {
  const[edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)


  const handleDone = (id:number) => {
    setTodos(prev => {
      return prev.map(todo => {
        if(todo.id === id){
          return {...todo, isDone: !todo.isDone}
        }
        return todo
      })
    })
  }
  
  const handleDelete = (id:number) => {
    setTodos(prev => prev.filter(todo => todo.id!==id))
  }

  const handleSubmit = (e:React.FormEvent, id:number) => {
    e.preventDefault()
    setTodos(todos.map(todo => (todo.id === id ? {...todo, todo:editTodo} : todo)))
    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])
  

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form 
            className={`todos_single ${snapshot.isDragging ? "drag": ""}`}
            onSubmit={(e) => handleSubmit(e, todo.id)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {edit ? (
              <input 
                ref={inputRef}
                className="todos_single--text" 
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
            ):(
              todo.isDone ? (
                <s className="todos_single--text">{todo.todo}</s>
              )
                : (
                <span className="todos_single--text">{todo.todo}</span>
              )
            )}
            
            <div>
              <span className="icon" onClick={() =>setEdit(!edit)}>
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(todo.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
              </span>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo