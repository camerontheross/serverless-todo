import { OverlayTrigger, Popover, Button, Card, Row, Col } from 'react-bootstrap';
import type { TodoItem } from "@shared/types"


interface TodoItemCardProps {
  todoItem: TodoItem
}


const defaultTaskDescription: string = "No available description for this task"

const descriptionPopover = (desc?: string) => (
  <Popover>
    <Popover.Header as="h3">DESCRIPTION</Popover.Header>
    <Popover.Body>
      {desc}
    </Popover.Body>
  </Popover>
)


export const TodoItemCard = (props: TodoItemCardProps) => {
  return (
    <Card className="Task-Card">
      <Row>

        <Col>
          <Button variant="dark">{'<'}</Button>
        </Col>

        <Col>

          <OverlayTrigger trigger="hover" overlay={descriptionPopover(props.todoItem.description || defaultTaskDescription)}>
            <div className="Task-Name">{props.todoItem.title}</div>
          </OverlayTrigger>

        </Col>

        <Col>
          <Button variant="dark">{'>'}</Button>
        </Col>

      </Row>

    </Card>
  )
}
