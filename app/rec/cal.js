'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function cal({lastcal, setLastcal, onSuggestionChange }) {
    const [prevcal, setPrevcal] = useState(10)
    const [diffcal, setDiffcal] = useState('')
    const [sugcal, setSugcal] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastcal = (event) =>{
        setLastcal(event.target.value)
    }

    const InputPrevcal = (event) =>{
        setPrevcal(event.target.value)
    }

    const OutputSugCal = (lastcal, prevcal) => {
        const caldiff = lastcal - prevcal
        if (caldiff > 0) {
            setDiffcal(`ค่า Calcium เพิ่มขึ้น ${caldiff}`)
        } else if (caldiff === 0){
            setDiffcal('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffcal(`ค่า Calcium ลดลง ${Math.abs(caldiff)}`)
        }
        if (lastcal < 9) {
            const rec = 'CaCO3 (1000) 1x1'
            setSugcal(rec)
            onSuggestionChange(rec)
        } else {
            const rec = ''
            setSugcal(rec)
            onSuggestionChange(rec)
        }
    }

    useEffect(() => {
        OutputSugCal(lastcal, prevcal)
    }, [lastcal, prevcal])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>Calcium ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastcal' name='lastcal' onChange={InputLastcal}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>Calcium ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevcal' name='prevcal' onChange={InputPrevcal}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง Calcium</Form.Label>
                    <Form.Control type='text' placeholder={diffcal} id='diffcal' name='diffcal' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={sugcal} id='sugcal' name='sugcal' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(sugcal)
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
