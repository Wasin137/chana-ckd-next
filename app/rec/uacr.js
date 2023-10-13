'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Uacr({lastuacr, setLastuacr, onSuggestionChange, fuuacr, setFuuacr }) {
    const [prevuacr, setPrevuacr] = useState(10)
    const [diffuacr, setDiffuacr] = useState('')
    const [suguacr, setSuguacr] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastuacr = (event) =>{
        setLastuacr(event.target.value)
    }

    const InputPrevuacr = (event) =>{
        setPrevuacr(event.target.value)
    }

    const OutputSuguacr = useCallback((lastuacr, prevuacr) => {
        if (lastuacr && prevuacr) {
            const uacrdiff = lastuacr - prevuacr
            if (uacrdiff > 0) {
                setDiffuacr(`ค่า UACR เพิ่มขึ้น ${uacrdiff}`)
            } else if (uacrdiff === 0){
                setDiffuacr('ไม่มีการเปลี่ยนแปลง')
            } else {
                setDiffuacr(`ค่า UACR ลดลง ${Math.abs(uacrdiff)}`)
            }
        }
        if (lastuacr) {
            if (lastuacr >= 30) {
                const rec = "ให้/เพิ่ม ACEI/ARB"
                setSuguacr(rec)
                onSuggestionChange(rec)
                setFuuacr(1)
            } else {
                const rec = ''
                setSuguacr(rec)
                onSuggestionChange(rec)
                setFuuacr('')
            }
        }
    }, [setDiffuacr, setSuguacr, onSuggestionChange, setFuuacr])

    useEffect(() => {
        OutputSuguacr(lastuacr, prevuacr)
    }, [lastuacr, prevuacr, OutputSuguacr])

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
                        <InputGroup.Text>UACR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastuacr' name='lastuacr' onChange={InputLastuacr}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>UACR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevuacr' name='prevuacr' onChange={InputPrevuacr}/>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={3} className='py-1 py-lg-0'>
                    <Form.Control type='text' placeholder={diffuacr} id='diffuacr' name='diffuacr' readOnly disabled/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={suguacr} id='suguacr' name='suguacr' readOnly/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(suguacr);
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

