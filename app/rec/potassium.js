'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function potassium({lastk, setLastk, onSuggestionChange, fuk, setFuk }) {
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
            setFuk(1)
        } else if (lastk > 5.5){
            const rec = 'ลด ACEI/ARB'
            setsugk(rec)
            onSuggestionChange(rec)
            setFuk(1)
        } else {
            const rec = ''
            setsugk(rec)
            onSuggestionChange(rec)
            setFuk('')
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
            <Row className='d-flex justify-content-center align-items-center mt-2'>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>K</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastk' name='lastk' onChange={InputLastk}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>K</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevk' name='prevk' onChange={InputPrevk}/>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={3}>
                    <Form.Control type='text' placeholder={diffk} id='diffk' name='diffk' readOnly/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={sugk} id='sugk' name='sugk' readOnly/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(sugk);
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