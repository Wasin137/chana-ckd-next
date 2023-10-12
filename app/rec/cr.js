'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function cr({ onSuggestionChange }) {
    const [lastcr, setLastcr] = useState(0.7)
    const [prevcr, setPrevcr] = useState(0.7)
    const [diffcr, setDiffcr] = useState('')
    const [sugcr, setsugcr] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastcr = (event) =>{
        setLastcr(event.target.value)
    }

    const InputPrevcr = (event) =>{
        setPrevcr(event.target.value)
    }

    const Outputsugcr = (lastcr, prevcr) => {
        if (lastcr > prevcr) {
            const crdiff = (lastcr-prevcr)/prevcr
            setDiffcr(`ค่า Cr ลดลง ${(crdiff*100).toFixed(2)}%`)
            if (crdiff > 0.3){
                const rec = 'ลด ACEI/ARB'
                setsugcr(rec)
                onSuggestionChange(rec)
            } else {
                const rec = ''
                setsugcr(rec)
                onSuggestionChange(rec)
            }
        } else if (lastcr <= prevcr && sugcr != ''){
            const rec = ''
            setsugcr(rec)
            onSuggestionChange(rec)
            setDiffcr('')
        }
    }

    useEffect(() => {
        Outputsugcr(lastcr, prevcr)
    }, [lastcr, prevcr])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>Cr ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastcr' name='lastcr' onChange={InputLastcr}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>Cr ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevcr' name='prevcr' onChange={InputPrevcr}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง Cr</Form.Label>
                    <Form.Control type='text' placeholder={diffcr} id='diffcr' name='diffcr' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={sugcr} id='sugcr' name='sugcr' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(sugcr)
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
