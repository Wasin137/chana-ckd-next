import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

import Welcome from './Welcome'
import FirstPageComment from './components/FirstPageComment'

export default function Home() {
    return (
      <Container>
        <Row className='p-2 d-flex justify-content-center'>
          <Welcome />
        </Row>
        <Row className='mt-2'>
            <FirstPageComment />
        </Row>
      </Container>
    )
}
