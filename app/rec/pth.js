'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Pth({lastpth, setLastpth, onSuggestionChange, fupth, setFupth }) {
    const [sugpth, setSugpth] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastpth = (event) =>{
        setLastpth(event.target.value)
    }

    const OutputSugpth = useCallback((lastpth) => {
        if (lastpth) {
            if (lastpth > 150) {
                const rec = 'Vit D3 1x1 วันเว้นวัน'
                setSugpth(rec)
                onSuggestionChange(rec)
                setFupth(12)
            } else {
                const rec = ''
                setSugpth(rec)
                onSuggestionChange(rec)
                setFupth('')
            }
        }
    }, [setSugpth, onSuggestionChange, setFupth])

    useEffect(() => {
        OutputSugpth(lastpth)
    }, [lastpth, OutputSugpth])

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
                        <InputGroup.Text>PTH</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastpth' name='lastpth' style={{ background:'#FFF7E3'}} onChange={InputLastpth} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={sugpth} id='sugpth' name='sugpth' style={{ background:'white'}} readOnly disabled/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(sugpth);
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
