'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Cal({lastcal, setLastcal, onSuggestionChange, fucal, setFucal }) {
    const [prevcal, setPrevcal] = useState('')
    const [diffcal, setDiffcal] = useState('')
    const [sugcal, setSugcal] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastcal = (event) =>{
        setLastcal(event.target.value)
    }

    const InputPrevcal = (event) =>{
        setPrevcal(event.target.value)
    }

    const OutputSugCal = (lastcal, prevcal) => {
        const caldiff = lastcal - prevcal
        if (caldiff > 0) {
            setDiffcal(`ค่า Calcium เพิ่มขึ้น ${caldiff}`)
        } else if (caldiff === 0){
            setDiffcal('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffcal(`ค่า Calcium ลดลง ${Math.abs(caldiff)}`)
        }
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

    useEffect(() => {
        OutputSugCal(lastcal, prevcal)
    }, [lastcal, prevcal])

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
                        <InputGroup.Text>Ca</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastcal' name='lastcal' onChange={InputLastcal}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>Ca</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevcal' name='prevcal' onChange={InputPrevcal}/>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={3}>
                    <Form.Control type='text' placeholder={diffcal} id='diffcal' name='diffcal' readOnly/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={sugcal} id='sugcal' name='sugcal' readOnly/>
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
        </>
    )
}
