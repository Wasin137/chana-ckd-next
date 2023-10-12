'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function potassium({ onSuggestionChange }) {
    const [lastk, setLastk] = useState(4)
    const [prevk, setPrevk] = useState(4)
    const [diffk, setDiffk] = useState('')
    const [sugk, setsugk] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastk = (event) =>{
        setLastk(event.target.value)
    }

    const InputPrevk = (event) =>{
        setPrevk(event.target.value)
    }

    const Outputsugk = (lastk, prevk) => {
        const kdiff = lastk - prevk
        if (kdiff > 0) {
            setDiffk(`ค่า Potassium เพิ่มขึ้น ${kdiff}`)
        } else if (kdiff === 0){
            setDiffk('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffk(`ค่า Potassuium ลดลง ${Math.abs(kdiff)}`)
        }
        if (lastk < 3.5) {
            const rec = 'KCL Elixir'
            setsugk(rec)
            onSuggestionChange(rec)
        } else if (lastk > 5.5){
            const rec = 'ลด ACEI/ARB'
            setsugk(rec)
            onSuggestionChange(rec)
        } else {
            const rec = ''
            setsugk(rec)
            onSuggestionChange(rec)
        }
    }

    useEffect(() => {
        Outputsugk(lastk, prevk)
    }, [lastk, prevk])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>Potassium ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastk' name='lastk' onChange={InputLastk}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>Potassium ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevk' name='prevk' onChange={InputPrevk}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง Potassium</Form.Label>
                    <Form.Control type='text' placeholder={diffk} id='diffk' name='diffk' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={sugk} id='sugk' name='sugk' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(sugk)
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