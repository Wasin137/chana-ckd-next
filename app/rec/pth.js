'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Pth({lastpth, setLastpth, onSuggestionChange, fupth, setFupth }) {
    const [prevpth, setPrevpth] = useState(10)
    const [diffpth, setDiffpth] = useState('')
    const [sugpth, setSugpth] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastpth = (event) =>{
        setLastpth(event.target.value)
    }

    const InputPrevpth = (event) =>{
        setPrevpth(event.target.value)
    }

    const OutputSugpth = (lastpth, prevpth) => {
        const pthdiff = lastpth - prevpth
        if (pthdiff > 0) {
            setDiffpth(`ค่า PTH เพิ่มขึ้น ${pthdiff}`)
        } else if (pthdiff === 0){
            setDiffpth('ไม่มีการเปลี่ยนแปลง')
        } else {
            setDiffpth(`ค่า PTH ลดลง ${Math.abs(pthdiff)}`)
        }
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

    useEffect(() => {
        OutputSugpth(lastpth, prevpth)
    }, [lastpth, prevpth])

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
                        <InputGroup.Text>PTH</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastpth' name='lastpth' onChange={InputLastpth}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={2}>
                    <InputGroup>
                        <InputGroup.Text>PTH</InputGroup.Text>
                        <Form.Control type='number' placeholder='ก่อนหน้า' id='prevpth' name='prevpth' onChange={InputPrevpth}/>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={3}>
                    <Form.Control type='text' placeholder={diffpth} id='diffpth' name='diffpth' readOnly/>
                </Col>
                <Col xs={12} lg={5}>
                    <InputGroup>
                        <InputGroup.Text>คำแนะนำ</InputGroup.Text>
                        <Form.Control type='text' placeholder={sugpth} id='sugpth' name='sugpth' readOnly/>
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
