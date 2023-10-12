'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function phos({lastphos, setLastphos, onSuggestionChange }) {
    const [prevphos, setPrevphos] = useState(10)
    const [diffphos, setDiffphos] = useState('')
    const [sugphos, setSugphos] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastphos = (event) =>{
        setLastphos(event.target.value)
    }

    const InputPrevphos = (event) =>{
        setPrevphos(event.target.value)
    }

    const OutputSugphos = (lastphos, prevphos) => {
        const phosdiff = lastphos - prevphos
        if (phosdiff > 0) {
            setDiffphos(`ค่า Phosphate เพิ่มขึ้น ${phosdiff}`)
        } else if (phosdiff === 0){
            setDiffphos('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffphos(`ค่า Phosphate ลดลง ${Math.abs(phosdiff)}`)
        }
        if (lastphos > 4.5) {
            const rec = 'CaCO3 (350) 1x3'
            setSugphos(rec)
            onSuggestionChange(rec)
        } else {
            const rec = ''
            setSugphos(rec)
            onSuggestionChange(rec)
        }
    }

    useEffect(() => {
        OutputSugphos(lastphos, prevphos)
    }, [lastphos, prevphos])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>PO4 ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastphos' name='lastphos' onChange={InputLastphos}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>PO4 ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevphos' name='prevphos' onChange={InputPrevphos}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง PO4</Form.Label>
                    <Form.Control type='text' placeholder={diffphos} id='diffphos' name='diffphos' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={sugphos} id='sugphos' name='sugphos' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(sugphos)
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