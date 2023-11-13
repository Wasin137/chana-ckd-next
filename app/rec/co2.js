'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Co2({lastco2, setLastco2, onSuggestionChange, fuco2, setFuco2 }) {
    const [prevco2, setPrevco2] = useState('')
    const [sugco2, setSugco2] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastco2 = (event) =>{
        setLastco2(event.target.value)
    }

    const OutputSugco2 = useCallback((lastco2) => {
        if (lastco2) {
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
        }
    }, [setSugco2, onSuggestionChange, setFuco2])

    useEffect(() => {
        OutputSugco2(lastco2)
    }, [lastco2, OutputSugco2])

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
                        <InputGroup.Text>CO2</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastco2' name='lastco2' style={{ background:'#FFF7E3'}} onChange={InputLastco2} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={sugco2} id='sugco2' name='sugco2' style={{ background:'white'}} readOnly disabled/>
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
