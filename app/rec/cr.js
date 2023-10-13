'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'

export default function cr({ lastcr, setLastcr, onSuggestionChange, fucr, setFucr }) {
    const [prevcr, setPrevcr] = useState(0.5)
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

    const Outputsugcr = (lastcr, prevcr) => {
        if (lastcr > prevcr) {
            const crdiff = (lastcr-prevcr)/prevcr
            setDiffcr(`ค่า Cr ลดลง ${(crdiff*100).toFixed(2)}%`)
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

    useEffect(() => {
        Outputsugcr(lastcr, prevcr)
    }, [lastcr, prevcr])

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
                        <InputGroup.Text>Cr</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastcr' name='lastcr' onChange={InputLastcr}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>Cr</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevcr' name='prevcr' onChange={InputPrevcr}/>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={3}>
                    <Form.Control type='text' placeholder={diffcr} id='diffcr' name='diffcr' readOnly/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={sugcr} id='sugcr' name='sugcr' readOnly/>
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
                                <img 
                                    src={btnDisabled ? "/clipboard-check.svg" : "/clipboard.svg"}
                                    alt="clipboard-icon"
                                    width="16"
                                    height="16"
                                />
                            </div>
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
}
