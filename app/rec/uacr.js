'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function uacr({lastuacr, setLastuacr, onSuggestionChange }) {
    const [prevuacr, setPrevuacr] = useState(10)
    const [diffuacr, setDiffuacr] = useState('')
    const [suguacr, setSuguacr] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastuacr = (event) =>{
        setLastuacr(event.target.value)
    }

    const InputPrevuacr = (event) =>{
        setPrevuacr(event.target.value)
    }

    const OutputSuguacr = (lastuacr, prevuacr) => {
        const uacrdiff = lastuacr - prevuacr
        if (uacrdiff > 0) {
            setDiffuacr(`ค่า UACR เพิ่มขึ้น ${uacrdiff}`)
        } else if (uacrdiff === 0){
            setDiffuacr('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffuacr(`ค่า UACR ลดลง ${Math.abs(uacrdiff)}`)
        }
        if (lastuacr >= 30) {
            const rec = "ให้/เพิ่ม ACEI/ARB"
            setSuguacr(rec)
            onSuggestionChange(rec)
        } else {
            const rec = ''
            setSuguacr(rec)
            onSuggestionChange(rec)
        }
    }

    useEffect(() => {
        OutputSuguacr(lastuacr, prevuacr)
    }, [lastuacr, prevuacr])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>UACR ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastuacr' name='lastuacr' onChange={InputLastuacr}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>UACR ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevuacr' name='prevuacr' onChange={InputPrevuacr}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง PO4</Form.Label>
                    <Form.Control type='text' placeholder={diffuacr} id='diffuacr' name='diffuacr' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={suguacr} id='suguacr' name='suguacr' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(suguacr)
                            setBtnDisabled(true)
                            btnTimeout = setTimeout(() => {
                                setBtnDisabled(false);
                            }, 1000)
                        }}>{btnDisabled ? "Copied" : "Copy"}</Button>
                </Col>
            </Row>
        </>
    )
}

