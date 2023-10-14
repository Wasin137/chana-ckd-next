import React from 'react'
import Comments from '../components/Comments'
import { Row, Button } from 'react-bootstrap'

export default function page() {
  return (
    <div className='container-fluid container-lg'>
        <Row className='mt-2'>
            <p className='text-center fs-4'>User reviews</p>
        </Row>
        <Row className='justify-content-center'>
                <Button href='/addComment' variant='secondary' style={{width: 'auto'}}>Leave your comment here</Button>
        </Row>
        <Row>
            <Comments />
        </Row>
    </div>
  )
}
