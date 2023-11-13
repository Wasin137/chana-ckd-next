'use client'
import React, {useState, useEffect} from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function Alb({lastcal, corcal, setCorCal}) {
    const [lastalb, setLastalb] = useState('')
    const [sugcorcal, setSugCorCal] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    const InputLastalb = (event) => {
        setLastalb(event.target.value)
    }

    useEffect(() => {
        if (lastalb != ''){
            if (lastalb < 4 && lastcal) {
                const correctcal = (0.8 * (4 - lastalb) + parseFloat(lastcal)).toFixed(2)
                setSugCorCal(`Corrected Calcium  ${correctcal} Alb ${lastalb}`)
                setCorCal(correctcal)
            } else if (lastalb >= 4){
                setSugCorCal(`Normal Albumin`)
                setCorCal(lastcal)
            } else {
                setSugCorCal('')
                setCorCal('')
            }
        }
    }, [lastalb, lastcal])

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
                        <InputGroup.Text>Alb</InputGroup.Text>
                        <Form.Control type='number' placeholder='ล่าสุด' id='lastalb' name='lastalb' style={{ background:'#FFF7E3'}} onChange={InputLastalb} min={0}/>
                    </InputGroup>
                </Col>
                <Col xs={6} lg={5}>
                    <InputGroup>
                        <Form.Control type='text' placeholder={sugcorcal} id='corcal' name='corcal' style={{ background:'white'}} readOnly disabled />
                        <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(sugcorcal);
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
