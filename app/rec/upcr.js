'use client'
import React, { useState } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'

export default function upcr({ lastupcr, setLastupcr}) {
    const [prevupcr, setPrevupcr] = useState(100)

    const InputLastupcr = (event) =>{
        setLastupcr(event.target.value)
    }

    const InputPrevupcr = (event) =>{
        setPrevupcr(event.target.value)
    }
    return (
        <>
            <Row className='d-flex justify-content-start align-items-center mt-2'>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>UPCR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastupcr' name='lastupcr' onChange={InputLastupcr}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>UPCR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevupcr' name='prevupcr' onChange={InputPrevupcr}/>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
}
