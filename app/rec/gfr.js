'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Gfr({ lastgfr, setLastgfr, onSuggestionChange, fugfr, setFugfr }) {
    const [prevgfr, setPrevgfr] = useState('')
    const [diffgfr, setDiffgfr] = useState('')
    const [suggfr, setsuggfr] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastgfr = (event) =>{
        setLastgfr(event.target.value)
    }

    const InputPrevgfr = (event) =>{
        setPrevgfr(event.target.value)
    }

    const OutputSuggfr = useCallback((lastgfr, prevgfr) => {
        if (lastgfr && prevgfr){
            const diff = lastgfr - prevgfr
            if (diff > 0) {
                setDiffgfr(`เพิ่มขึ้น ${diff}`)
            } else if (diff === 0){
                setDiffgfr('ไม่มีการเปลี่ยนแปลง')
            } else {
                setDiffgfr(`ลดลง ${Math.abs(diff)}`)
            }
            if (diff < -5){
                setFugfr(1)
            } else {
                setFugfr('')
            }
        }
        if (lastgfr){
            if (lastgfr <= 30) {
                const rec = 'หยุด MFM'
                setsuggfr(rec)
                onSuggestionChange(rec)
            } else if (lastgfr <= 45) {
                const rec = 'ลด MFM เหลือ 1,000 mg/day'
                setsuggfr(rec)
                onSuggestionChange(rec)
            } else {
                const rec = ''
                setsuggfr(rec)
                onSuggestionChange(rec)
    
            }
        }
    }, [setDiffgfr, setsuggfr, onSuggestionChange, setFugfr])

    useEffect(() => {
        OutputSuggfr(lastgfr, prevgfr)
    }, [lastgfr, prevgfr, OutputSuggfr])

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
                        <InputGroup.Text>eGFR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastgfr' name='lastgfr' style={{ background:'#FFF7E3'}} onChange={InputLastgfr} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={4} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>eGFR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevgfr' name='prevgfr' style={{ background:'#FDEBD0'}} onChange={InputPrevgfr} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={4} lg={3} className='py-1 py-lg-0'>
                    <Form.Control type='text' placeholder={diffgfr} id='diffgfr' name='diffgfr' readOnly disabled/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={suggfr} id='suggfr' name='suggfr' style={{ background:'white'}} readOnly disabled/>
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(suggfr);
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