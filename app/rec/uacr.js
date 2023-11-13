'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Uacr({lastuacr, setLastuacr, onSuggestionChange, fuuacr, setFuuacr }) {
    const [suguacr, setSuguacr] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastuacr = (event) =>{
        setLastuacr(event.target.value)
    }

    const OutputSuguacr = useCallback((lastuacr) => {
        if (lastuacr) {
            if (lastuacr === '30-300' || lastuacr === '>300') {
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
    }, [setSuguacr, onSuggestionChange, setFuuacr])

    useEffect(() => {
        OutputSuguacr(lastuacr)
    }, [lastuacr, OutputSuguacr])

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
                        <InputGroup.Text>UACR</InputGroup.Text>
                        <Form.Select aria-label='UACR' id='lastuacr' name='lastuacr' style={{ background:'#FFF7E3'}} onChange={InputLastuacr}>
                            <option value=''></option>
                            <option value="30">30</option>
                            <option value="30-300">30-300</option>
                            <option value=">300">&gt;300</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={suguacr} id='suguacr' name='suguacr' style={{ background:'white'}} readOnly disabled/>
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

