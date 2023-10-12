'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function gfr({ lastgfr, setLastgfr, onSuggestionChange }) {
    const [prevgfr, setPrevgfr] = useState(100)
    const [diffgfr, setDiffgfr] = useState('')
    const [suggfr, setsuggfr] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastgfr = (event) =>{
        setLastgfr(event.target.value)
    }

    const InputPrevgfr = (event) =>{
        setPrevgfr(event.target.value)
    }

    const OutputSuggfr = (lastgfr, prevgfr) => {
        const diff = lastgfr - prevgfr
        if (diff > 0) {
            setDiffgfr(`ค่า GFR ดีขึ้น ${diff}`)
        } else if (diff === 0){
            setDiffgfr('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffgfr(`ค่า GFR ลดลง ${Math.abs(diff)}`)
        }
        if (lastgfr <= 30) {
            const rec = 'หยุด MFM'
            setsuggfr(rec)
            onSuggestionChange(rec)
        } else if (lastgfr <= 45) {
            const rec = 'ลด MFM เหลือ 1,000 mg/day'
            setsuggfr(rec)
            onSuggestionChange(rec)
        } else {
            const rec = ''
            setsuggfr(rec)
            onSuggestionChange(rec)
        }
    }

    useEffect(() => {
        OutputSuggfr(lastgfr, prevgfr)
    }, [lastgfr, prevgfr])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>eGFR ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastgfr' name='lastgfr' onChange={InputLastgfr}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>eGFR ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevgfr' name='prevgfr' onChange={InputPrevgfr}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง GFR</Form.Label>
                    <Form.Control type='text' placeholder={diffgfr} id='diffgfr' name='diffgfr' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={suggfr} id='suggfr' name='suggfr' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(suggfr)
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