'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Phos({lastphos, setLastphos, onSuggestionChange, fuphos, setFuphos }) {
    const [sugphos, setSugphos] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastphos = (event) =>{
        setLastphos(event.target.value)
    }

    const OutputSugphos = useCallback((lastphos) => {
        if (lastphos){
            if (lastphos > 4.5) {
                const rec = 'CaCO3 (350) 1x3'
                setSugphos(rec)
                onSuggestionChange(rec)
                setFuphos(3)
            } else {
                const rec = ''
                setSugphos(rec)
                onSuggestionChange(rec)
                setFuphos('')
            }
        }
    }, [setSugphos, onSuggestionChange, setFuphos])

    useEffect(() => {
        OutputSugphos(lastphos)
    }, [lastphos, OutputSugphos])

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
                        <InputGroup.Text>PO4</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastphos' name='lastphos' style={{ background:'#FFF7E3'}} onChange={InputLastphos} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={sugphos} id='sugphos' name='sugphos' style={{ background:'white'}} readOnly disabled/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(sugphos);
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