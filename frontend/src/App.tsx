import './App.css'
//import { TaskCard } from "./components/TaskCard.tsx"
import { TaskList } from './components/TaskList.tsx'

import { Container, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export const App = () => {
  return (
    <div className="App">

      <header className="App-header">
        <h1>TO DO LIST</h1>

      </header>
      <Container>
        <Stack direction='horizontal'>
          <TaskList title="PENDING"></TaskList>
          <TaskList title="DOING"></TaskList>
          <TaskList title="DONE"></TaskList>
        </Stack>
      </Container>

    </div>

  )
}
