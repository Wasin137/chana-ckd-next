'use client'
import React, { useState } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'

export default function Fbs({ lastfbs, setLastfbs}) {
    const [prevfbs, setPrevfbs] = useState('')

    const InputLastfbs = (event) =>{
        setLastfbs(event.target.value)
    }

    const InputPrevfbs = (event) =>{
        setPrevfbs(event.target.value)
    }
    return (
        <>
            <Row className='d-flex justify-content-start align-items-center mt-2'>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>FBS</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastfbs' name='lastfbs' onChange={InputLastfbs}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>FBS</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevfbs' name='prevfbs' onChange={InputPrevfbs}/>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
}
