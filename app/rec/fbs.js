'use client'
import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

export default function fbs({ lastfbs, setLastfbs}) {
    const [prevfbs, setPrevfbs] = useState(100)

    const InputLastfbs = (event) =>{
        setLastfbs(event.target.value)
    }

    const InputPrevfbs = (event) =>{
        setPrevfbs(event.target.value)
    }
    return (
        <>
            <Row className='d-flex justify-content-start align-items-center'>
                <Col xs={2}>
                    <Form.Label>FBS ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastfbs' name='lastfbs' onChange={InputLastfbs}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>FBS ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevfbs' name='prevfbs' onChange={InputPrevfbs}/>
                </Col>
            </Row>
        </>
    )
}
