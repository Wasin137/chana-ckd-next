'use client'
import React from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'

export default function Upcr({ lastupcr, setLastupcr}) {
    const InputLastupcr = (event) =>{
        setLastupcr(event.target.value)
    }
    return (
        <>
            <Row className='d-flex justify-content-start align-items-center mt-lg-2 mt-3'>
                <Col xs={6} lg={4}>
                    <InputGroup>
                        <InputGroup.Text>UPCR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastupcr' name='lastupcr' style={{ background:'#FFF7E3'}} onChange={InputLastupcr} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                </Col>
            </Row>
        </>
    )
}
