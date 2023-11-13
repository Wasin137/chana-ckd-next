'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Potassium({lastk, setLastk, onSuggestionChange, fuk, setFuk }) {
    const [sugk, setsugk] = useState('')
    const [alertk, setAlertK] = useState({background:'white'})
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastk = (event) =>{
        setLastk(event.target.value)
    }

    const Outputsugk = useCallback((lastk) => {
        if (lastk) {
            if (lastk <2.5) {
                const rec = 'ส่ง ER'
                setsugk(rec)
                onSuggestionChange(rec)
                setAlertK({background:'#F6DDCC'})
                setFuk(1)
            } else if (lastk < 3) {
                const rec = 'ส่ง EKG'
                setsugk(rec)
                onSuggestionChange(rec)
                setAlertK({background:'#F6DDCC'})
                setFuk(1)
            } else if (lastk < 3.5) {
                const calrec = (3.5-lastk)/0.3
                const rec = `KCL Elixir 30 ml po q 6-12hr x ${calrec.toFixed(2)}`
                setsugk(rec)
                onSuggestionChange(rec)
                setAlertK({background:'white'})
                setFuk(1)
            } else if (lastk >= 6){
                const rec = 'ส่ง ER'
                setsugk(rec)
                onSuggestionChange(rec)
                setAlertK({background:'#F6DDCC'})
                setFuk(1)
            } else if (lastk > 5){
                const rec = 'ให้ Kalimate 15-30 g'
                setsugk(rec)
                onSuggestionChange(rec)
                setAlertK({background:'white'})
                setFuk(1)
            } else {
                const rec = ''
                setsugk(rec)
                onSuggestionChange(rec)
                setAlertK({background:'white'})
                setFuk('')
            }
        }
    }, [setsugk, onSuggestionChange, setAlertK, setFuk])

    useEffect(() => {
        Outputsugk(lastk)
    }, [lastk, Outputsugk])

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
                        <InputGroup.Text>K</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastk' name='lastk' style={{ background:'#FFF7E3'}} onChange={InputLastk} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={sugk} id='sugk' name='sugk' style={alertk} readOnly disabled/>
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