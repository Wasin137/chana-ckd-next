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
            <Row className='d-flex justify-content-start align-items-center mt-lg-2 mt-3'>
                <Col xs={6} lg={4}>
                    <InputGroup>
                        <InputGroup.Text>FBS</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastfbs' name='lastfbs' style={{ background:'#FFF7E3'}} onChange={InputLastfbs} min={0}/>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
}
