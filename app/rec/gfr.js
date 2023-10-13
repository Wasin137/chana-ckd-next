'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'

export default function gfr({ lastgfr, setLastgfr, onSuggestionChange, fugfr, setFugfr }) {
    const [prevgfr, setPrevgfr] = useState(100)
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

    const OutputSuggfr = (lastgfr, prevgfr) => {
        const diff = lastgfr - prevgfr
        if (diff > 0) {
            setDiffgfr(`ค่า GFR ดีขึ้น ${diff}`)
        } else if (diff === 0){
            setDiffgfr('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffgfr(`ค่า GFR ลดลง ${Math.abs(diff)}`)
        }
        if (diff < -5){
            setFugfr(1)
        } else {
            setFugfr('')
        }
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

    useEffect(() => {
        OutputSuggfr(lastgfr, prevgfr)
    }, [lastgfr, prevgfr])

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
                        <InputGroup.Text>eGFR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastgfr' name='lastgfr' onChange={InputLastgfr}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>eGFR</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevgfr' name='prevgfr' onChange={InputPrevgfr}/>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={3}>
                    <Form.Control type='text' placeholder={diffgfr} id='diffgfr' name='diffgfr' readOnly/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={suggfr} id='suggfr' name='suggfr' readOnly/>
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