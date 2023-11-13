'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Hb({lasthb, setLasthb, onSuggestionChange, fuhb, setFuhb }) {
    const [sughb, setSughb] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLasthb = (event) =>{
        setLasthb(event.target.value)
    }

    const OutputSughb = useCallback((lasthb) => {
        if (lasthb) {
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
        }
    }, [setSughb, onSuggestionChange, setFuhb])

    useEffect(() => {
        OutputSughb(lasthb)
    }, [lasthb, OutputSughb])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, [btnTimeout]);

    return (
        <>
            <Row className='d-flex justify-content-between align-items-center mt-lg-2 mt-3'>
                <Col xs={6} lg={4}>
                    <InputGroup>
                        <InputGroup.Text>Hb</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lasthb' name='lasthb' style={{ background:'#FFF7E3'}} onChange={InputLasthb} min={0}/>
                    </InputGroup>                
                </Col>
                <Col xs={6} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={sughb} id='sughb' name='sughb' style={{ background:'white'}} readOnly disabled/>
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
