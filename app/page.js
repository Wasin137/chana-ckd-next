import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'

import Welcome from './Welcome'

export default function Home() {
    return (
      <Container className='p-2'>
        <Welcome />
      </Container>
    )
}
