'use client'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function pth({lastpth, setLastpth, onSuggestionChange }) {
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
        } else {
            const rec = ''
            setSugpth(rec)
            onSuggestionChange(rec)
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
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={2}>
                    <Form.Label>PTH ล่าสุด</Form.Label>
                    <Form.Control type='number' placeholder='ล่าสุด' id='lastpth' name='lastpth' onChange={InputLastpth}/>
                </Col>
                <Col xs={2}>
                    <Form.Label>PTH ก่อนหน้า</Form.Label>
                    <Form.Control type='number' placeholder='ก่อนหน้า' id='prevpth' name='prevpth' onChange={InputPrevpth}/>
                </Col>
                <Col xs={3}>
                    <Form.Label>การเปลี่ยนแปลง PO4</Form.Label>
                    <Form.Control type='text' placeholder={diffpth} id='diffpth' name='diffpth' readOnly/>
                </Col>
                <Col xs={4}>
                    <Form.Label>คำแนะนำ</Form.Label>
                    <Form.Control type='text' placeholder={sugpth} id='sugpth' name='sugpth' readOnly/>
                </Col>
                <Col xs={1}>
                    <Button 
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(sugpth)
                            setBtnDisabled(true)
                            btnTimeout = setTimeout(() => {
                                setBtnDisabled(false);
                            }, 1000)
                        }}>{btnDisabled ? "Copied" : "Copy"}</Button>
                </Col>
            </Row>
        </>
    )
}
