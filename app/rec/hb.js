'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Hb({lasthb, setLasthb, onSuggestionChange, fuhb, setFuhb }) {
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

    const OutputSughb = useCallback((lasthb, prevhb) => {
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
            setFuhb(3)
        } else {
            const rec = ''
            setSughb(rec)
            onSuggestionChange(rec)
            setFuhb('')
        }
    }, [setDiffhb, setSughb, onSuggestionChange, setFuhb])

    useEffect(() => {
        OutputSughb(lasthb, prevhb)
    }, [lasthb, prevhb, OutputSughb])

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
                        <InputGroup.Text>Hb</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lasthb' name='lasthb' onChange={InputLasthb}/>
                    </InputGroup>                
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>Hb</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevhb' name='prevhb' onChange={InputPrevhb}/>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={3}>
                    <Form.Control type='text' placeholder={diffhb} id='diffhb' name='diffhb' readOnly/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={sughb} id='sughb' name='sughb' readOnly/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(sughb);
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
