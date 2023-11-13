'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

import Alb from './alb'

export default function Cal({lastcal, setLastcal, onSuggestionChange, fucal, setFucal }) {
    const [sugcal, setSugcal] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    // Alb
    const [corcal, setCorCal] = useState('')

    const InputLastcal = (event) =>{
        setLastcal(event.target.value)
    }
    const OutputSugCal = useCallback((lastcal, corcal) => {
        if (lastcal && corcal) {
            if (corcal < 9) {
                const rec = 'CaCO3 (1000) 1x1'
                setSugcal(rec)
                onSuggestionChange(rec)
                setFucal(3)
            } else {
                const rec = ''
                setSugcal(rec)
                onSuggestionChange(rec)
                setFucal('')
            }
        } else if (lastcal){
            if (lastcal < 9) {
                const rec = 'CaCO3 (1000) 1x1'
                setSugcal(rec)
                onSuggestionChange(rec)
                setFucal(3)
            } else {
                const rec = ''
                setSugcal(rec)
                onSuggestionChange(rec)
                setFucal('')
            }
        }
    }, [setSugcal, onSuggestionChange, setFucal]);

    useEffect(() => {
        OutputSugCal(lastcal, corcal)
    }, [lastcal, corcal,OutputSugCal])

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
                        <InputGroup.Text>Ca</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastcal' name='lastcal' style={{ background:'#FFF7E3'}} onChange={InputLastcal} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={sugcal} id='sugcal' name='sugcal' style={{ background:'white'}} readOnly disabled/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(sugcal);
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
            <Alb corcal={corcal} setCorCal={setCorCal} lastcal={lastcal}/>
        </>
    )
}