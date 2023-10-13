'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Co2({lastco2, setLastco2, onSuggestionChange, fuco2, setFuco2 }) {
    const [prevco2, setPrevco2] = useState('')
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

    const OutputSugco2 = useCallback((lastco2, prevco2) => {
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
            setFuco2(1)
        } else {
            const rec = ''
            setSugco2(rec)
            onSuggestionChange(rec)
            setFuco2('')
        }
    }, [setDiffco2, setSugco2, onSuggestionChange, setFuco2])

    useEffect(() => {
        OutputSugco2(lastco2, prevco2)
    }, [lastco2, prevco2, OutputSugco2])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, [btnTimeout]);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center mt-2'>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>CO2</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastco2' name='lastco2' onChange={InputLastco2}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>CO2</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevco2' name='prevco2' onChange={InputPrevco2}/>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={3}>
                    <Form.Control type='text' placeholder={diffco2} id='diffco2' name='diffco2' readOnly/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={sugco2} id='sugco2' name='sugco2' readOnly/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(sugco2);
                                        setBtnDisabled(true);
                                        btnTimeout = setTimeout(() => {
                                            setBtnDisabled(false);
                                        }, 1000);
                                    }
                                }}
                            >
                                <Image 
                                    src={btnDisabled ? "/clipboard-check.svg" : "/clipboard.svg"}
                                    alt='clipboard-icon'
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
}
