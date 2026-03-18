import { OverlayTrigger, Popover, Button, Card, Row, Col } from 'react-bootstrap';

interface TaskProps {
  title: string;
  desc?: string;
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


export const TaskCard = ({ title, desc }: TaskProps) => {
  console.log(desc)

  return (
    <Card className="Task-Card">
      <Row>

        <Col>
          <Button variant="dark">{'<'}</Button>
        </Col>

        <Col>

          <OverlayTrigger trigger="hover" overlay={descriptionPopover(desc || defaultTaskDescription)}>
            <div className="Task-Name">{title}</div>
          </OverlayTrigger>

        </Col>

        <Col>
          <Button variant="dark">{'>'}</Button>
        </Col>

      </Row>

    </Card>
  )
}
