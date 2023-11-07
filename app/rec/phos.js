'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Phos({lastphos, setLastphos, onSuggestionChange, fuphos, setFuphos }) {
    const [prevphos, setPrevphos] = useState(10)
    const [diffphos, setDiffphos] = useState('')
    const [sugphos, setSugphos] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastphos = (event) =>{
        setLastphos(event.target.value)
    }

    const InputPrevphos = (event) =>{
        setPrevphos(event.target.value)
    }

    const OutputSugphos = useCallback((lastphos, prevphos) => {
        if (lastphos && prevphos) {
            const phosdiff = lastphos - prevphos
            if (phosdiff > 0) {
                setDiffphos(`ค่า Phosphate เพิ่มขึ้น ${phosdiff}`)
            } else if (phosdiff === 0){
                setDiffphos('ไม่มีการเปลี่ยนแปลง')
            } else {
                setDiffphos(`ค่า Phosphate ลดลง ${Math.abs(phosdiff)}`)
            }
        }
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
    }, [setDiffphos, setSugphos, onSuggestionChange, setFuphos])

    useEffect(() => {
        OutputSugphos(lastphos, prevphos)
    }, [lastphos, prevphos, OutputSugphos])

    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, [btnTimeout]);

    return (
        <>
            <Row className='d-flex justify-content-center align-items-center mt-lg-2 mt-3'>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>PO4</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastphos' name='lastphos' onChange={InputLastphos}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                </Col>
                <Col xs={12} lg={3} className='py-1 py-lg-0'>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={sugphos} id='sugphos' name='sugphos' readOnly/>
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