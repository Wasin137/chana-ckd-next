'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Potassium({lastk, setLastk, onSuggestionChange, fuk, setFuk }) {
    const [prevk, setPrevk] = useState('')
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

    const Outputsugk = useCallback((lastk, prevk) => {
        if (lastk && prevk){
            const kdiff = lastk - prevk
            if (kdiff > 0) {
                setDiffk(`ค่า Potassium เพิ่มขึ้น ${kdiff}`)
            } else if (kdiff === 0){
                setDiffk('ไม่มีการเปลี่ยนแปลง')
            } else {
                setDiffk(`ค่า Potassium ลดลง ${Math.abs(kdiff)}`)
            }
        }
        if (lastk) {
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
    }, [setDiffk, setsugk, onSuggestionChange, setFuk])

    useEffect(() => {
        Outputsugk(lastk, prevk)
    }, [lastk, prevk, Outputsugk])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, [btnTimeout]);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center mt-lg-2 mt-3'>
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
                <Col xs={12} lg={3} className='py-1 py-lg-0'>
                    <Form.Control type='text' placeholder={diffk} id='diffk' name='diffk' readOnly disabled/>
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