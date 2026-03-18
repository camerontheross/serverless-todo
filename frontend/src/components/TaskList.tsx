import { Card, Container, Stack } from "react-bootstrap"
import { TaskCard } from "./TaskCard"

import { fetchTaskByStatus, type Task } from "../services/taskService"
import { useEffect, useState } from 'react'

interface TaskListProps {
  title: string
}

const mapTaskItems = (tasks: Task[]) => {
  if (tasks.length === 0) {
    return (<>No tasks to complete!</>)
  }
  console.log(tasks)

  return tasks.map(value => <TaskCard title={value.title} desc={value.description}></TaskCard>)

}

export const TaskList = ({ title }: TaskListProps) => {

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchTaskByStatus(title)
        setTasks(data)
      }
      catch (err) {
        setError(`Failed to load tasks.${err}`)
      }
      finally {
        setLoading(false)
      }
    };
    loadData();
  }, [title])


  return (
    <Container>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Body>
          <Stack gap={3}>
            {loading && <p>loading...</p>}
            {error && <p>ERROR, {error}</p>}

            {!loading && !error && mapTaskItems(tasks)}
          </Stack>
        </Card.Body>
      </Card>
    </Container>

  )
}
