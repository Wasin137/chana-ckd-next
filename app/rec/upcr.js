'use client'
import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

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
            <Row className='d-flex justify-content-start align-items-center'>
                <Col xs={2}>
                    <Form.Label>UPCR ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastupcr' name='lastupcr' onChange={InputLastupcr}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>UPCR ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevupcr' name='prevupcr' onChange={InputPrevupcr}/>
                </Col>
            </Row>
        </>
    )
}
