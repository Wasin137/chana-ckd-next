'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function co2({lastco2, setLastco2, onSuggestionChange }) {
    const [prevco2, setPrevco2] = useState(25)
    const [diffco2, setDiffco2] = useState('')
    const [sugco2, setSugco2] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastco2 = (event) =>{
        setLastco2(event.target.value)
    }

    const InputPrevco2 = (event) =>{
        setPrevco2(event.target.value)
    }

    const OutputSugco2 = (lastco2, prevco2) => {
        const co2diff = lastco2 - prevco2
        if (co2diff > 0) {
            setDiffco2(`ค่า CO2 เพิ่มขึ้น ${co2diff}`)
        } else if (co2diff === 0){
            setDiffco2('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffco2(`ค่า CO2 ลดลง ${Math.abs(co2diff)}`)
        }
        if (lastco2 < 22) {
            const rec = `Sodamint ${22-lastco2} tab`
            setSugco2(rec)
            onSuggestionChange(rec)
        } else {
            const rec = ''
            setSugco2(rec)
            onSuggestionChange(rec)
        }
    }

    useEffect(() => {
        OutputSugco2(lastco2, prevco2)
    }, [lastco2, prevco2])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>CO2 ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastco2' name='lastco2' onChange={InputLastco2}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>Co2 ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevco2' name='prevco2' onChange={InputPrevco2}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง CO2</Form.Label>
                    <Form.Control type='text' placeholder={diffco2} id='diffco2' name='diffco2' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={sugco2} id='sugco2' name='sugco2' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(sugco2)
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
