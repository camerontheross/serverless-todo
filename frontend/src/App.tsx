import './App.css'
import { TodoList } from './components/TodoList.tsx'
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
          <TodoList status="PENDING"></TodoList>
          <TodoList status="DOING"></TodoList>
          <TodoList status="DONE"></TodoList>
        </Stack>
      </Container>

    </div>

  )
}
