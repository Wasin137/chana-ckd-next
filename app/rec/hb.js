'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function hb({lasthb, setLasthb, onSuggestionChange }) {
    const [prevhb, setPrevhb] = useState(10)
    const [diffhb, setDiffhb] = useState('')
    const [sughb, setSughb] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLasthb = (event) =>{
        setLasthb(event.target.value)
    }

    const InputPrevhb = (event) =>{
        setPrevhb(event.target.value)
    }

    const OutputSughb = (lasthb, prevhb) => {
        const hbdiff = lasthb - prevhb
        if (hbdiff > 0) {
            setDiffhb(`ค่า Hb เพิ่มขึ้น ${hbdiff}`)
        } else if (hbdiff === 0){
            setDiffhb('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffhb(`ค่า Hb ลดลง ${Math.abs(hbdiff)}`)
        }
        if (lasthb < 11) {
            const rec = "ให้/เพิ่ม Ferrous+Folic"
            setSughb(rec)
            onSuggestionChange(rec)
        } else {
            const rec = ''
            setSughb(rec)
            onSuggestionChange(rec)
        }
    }

    useEffect(() => {
        OutputSughb(lasthb, prevhb)
    }, [lasthb, prevhb])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>Hb ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lasthb' name='lasthb' onChange={InputLasthb}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>Hb ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevhb' name='prevhb' onChange={InputPrevhb}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง PO4</Form.Label>
                    <Form.Control type='text' placeholder={diffhb} id='diffhb' name='diffhb' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={sughb} id='sughb' name='sughb' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(sughb)
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
