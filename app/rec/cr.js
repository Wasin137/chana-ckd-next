'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Cr({ lastcr, setLastcr, onSuggestionChange, fucr, setFucr }) {
    const [prevcr, setPrevcr] = useState('')
    const [diffcr, setDiffcr] = useState('')
    const [sugcr, setsugcr] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastcr = (event) =>{
        setLastcr(event.target.value)
    }

    const InputPrevcr = (event) =>{
        setPrevcr(event.target.value)
    }

    const Outputsugcr = useCallback((lastcr, prevcr) => {
        if (lastcr && prevcr) {
            if (lastcr > prevcr) {
                const crdiff = (lastcr-prevcr)/prevcr
                setDiffcr(`เพิ่มขึ้น ${(crdiff*100).toFixed(2)}%`)
                if (crdiff > 0.3){
                    const rec = 'ลด ACEI/ARB'
                    setsugcr(rec)
                    onSuggestionChange(rec)
                    setFucr(1)
                } else {
                    const rec = ''
                    setsugcr(rec)
                    onSuggestionChange(rec)
                    setFucr('')
                }
            } else if (lastcr <= prevcr && sugcr != ''){
                const rec = ''
                setsugcr(rec)
                onSuggestionChange(rec)
                setDiffcr('')
                setFucr('')
            }
        }
    }, [setDiffcr, setsugcr, onSuggestionChange, setFucr, sugcr])

    useEffect(() => {
        Outputsugcr(lastcr, prevcr)
    }, [lastcr, prevcr, Outputsugcr])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, [btnTimeout]);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center mt-lg-2 mt-3'>
                <Col xs={4} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>Cr</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastcr' name='lastcr' style={{ background:'#FFF7E3'}} onChange={InputLastcr} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={4} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>Cr</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevcr' name='prevcr' style={{ background:'#FDEBD0'}} onChange={InputPrevcr} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={4} lg={3} className='py-1 py-lg-0'>
                    <Form.Control type='text' placeholder={diffcr} id='diffcr' name='diffcr' readOnly disabled/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={sugcr} id='sugcr' name='sugcr' style={{ background:'white'}} readOnly disabled/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(sugcr);
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
