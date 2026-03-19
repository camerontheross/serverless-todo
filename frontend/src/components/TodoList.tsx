import { Card, Container, Stack } from "react-bootstrap"
import { TodoItemCard } from "./TodoItemCard"

import { fetchTodoItemsByStatus } from "../services/todoService"
import { useEffect, useState } from 'react'
import type { TodoStatus, TodoItem } from "@shared/types"


interface TodoListProps {
  status: TodoStatus

}

const mapTodoItems = (tasks: TodoItem[]) => {

  if (tasks.length === 0) {
    return (<>No tasks to complete!</>)
  }

  return tasks.map((value: TodoItem) => {
    return <TodoItemCard todoItem={value}></TodoItemCard>
  })
}

export const TodoList = ({ status }: TodoListProps) => {

  const [todoItems, setTodoItems] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchTodoItemsByStatus(status)
        setTodoItems(data)
      }
      catch (err) {
        setError("Failed to load tasks.")
      }
      finally {
        setLoading(false)
      }
    };
    loadData();
  }, [status])


  return (
    <Container>
      <Card>
        <Card.Title>{status}</Card.Title>
        <Card.Body>
          <Stack gap={3}>
            {loading && <p>loading...</p>}
            {error && <p>ERROR, {error}</p>}
            {!loading && !error && mapTodoItems(todoItems)}
          </Stack>
        </Card.Body>
      </Card>
    </Container>

  )
}
