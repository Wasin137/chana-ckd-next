'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Row, Form, Table, InputGroup } from 'react-bootstrap'
import Image from 'next/image';


export default function LabValue({
    curgfrValue,
    curcrValue,
    curupcrValue,
    curkValue,
    curco2Value,
    curcalValue,
    curphosValue,
    curpthValue,
    curhbValue,
    curuacrValue,
    curfbsValue,
    fugfrValue,
    fucrValue,
    fukValue,
    fuco2Value,
    fucalValue,
    fuphosValue,
    fupthValue,
    fuhbValue,
    fuuacrValue
}) {
    // Get today date
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');  // January is 0
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const [labresult , setLabresult] = useState('')
    const [nearestfu, setNearestfu] = useState(0)
    const [showfu, setShowfu] = useState(false)
    
    const allLabData = useMemo(() => ([
        {
            text:'วันที่',
            value: formattedDate,
            fu: null
        },
        {
            text:'eGFR',
            value: curgfrValue,
            fu: fugfrValue
        },
        {
            text:'Cr',
            value: curcrValue,
            fu: fucrValue
        },
        {
            text:'UPCR',
            value: curupcrValue,
            fu: null
        },
        {
            text:'K',
            value: curkValue,
            fu: fukValue
        },
        {
            text:'CO2',
            value: curco2Value,
            fu: fuco2Value
        },
        {
            text:'Ca',
            value: curcalValue,
            fu: fucalValue
        },
        {
            text:'PO4',
            value: curphosValue,
            fu: fuphosValue
        },
        {
            text:'PTH',
            value: curpthValue,
            fu: fupthValue
        },
        {
            text:'Hb',
            value: curhbValue,
            fu: fuhbValue
        },
        {
            text:'UACR',
            value: curuacrValue,
            fu: fuuacrValue
        },
        {
            text:'FBS',
            value: curfbsValue,
            fu: null
        }
    ]), [
        formattedDate,
        curgfrValue,
        curcrValue,
        curupcrValue,
        curkValue,
        curco2Value,
        curcalValue,
        curphosValue,
        curpthValue,
        curhbValue,
        curuacrValue,
        curfbsValue,
        fugfrValue,
        fucrValue,
        fukValue,
        fuco2Value,
        fucalValue,
        fuphosValue,
        fupthValue,
        fuhbValue,
        fuuacrValue
    ])
    const CollectLab = useCallback(() => {
        let result = [];
        allLabData.forEach(lab => {
            if (lab.value) {
                if (result.length > 0) {
                    result.push(', '); // separator
                }
                result.push(`${lab.text} ${lab.value}`);
            }
        });
        setLabresult(result.join(''));
    }, [allLabData]);

    const FollowUp = useCallback(() => {
        let nearfu = [];
        allLabData.forEach(lab => {
            if (lab.fu) {
                nearfu.push(Number(lab.fu));
            }
        });
        if (nearfu.length == 0) {
            setNearestfu('-');
            setShowfu(false);
        } else {
            setNearestfu(Math.min(...nearfu));
            setShowfu(true);
        }
    }, [allLabData]);

    const [btnDisabled, setBtnDisabled] = useState(false)
    let btnTimeout

    useEffect(() => {
        CollectLab()
    }, [
        curgfrValue,
        curcrValue,
        curupcrValue,
        curkValue,
        curco2Value,
        curcalValue,
        curphosValue,
        curpthValue,
        curhbValue,
        curuacrValue,
        curfbsValue,
        CollectLab
    ])

    useEffect(() => {
        FollowUp()
    }, [
        fugfrValue,
        fucrValue,
        fukValue,
        fuco2Value,
        fucalValue,
        fuphosValue,
        fupthValue,
        fuhbValue,
        fuuacrValue,
        FollowUp
    ])
    
    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, [btnTimeout]);

    return (
        <>
            <Row>
                <p className='text-center'>วันที่ {formattedDate}</p>
            </Row>
            <Row>
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>Lab</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allLabData.slice(1).map((lab, index) => (
                            <tr key={index+1}>
                                <td>{lab.text}</td>
                                <td>{lab.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <InputGroup>
                    <Form.Control as='textarea' rows={3} placeholder={labresult} id='result' name='result' readOnly/>
                    <InputGroup.Text>
                            <div 
                                onClick={() => {
                                    if (!btnDisabled) {
                                        navigator.clipboard.writeText(labresult);
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
            </Row>
            <Row>
                {showfu ? <p className='text-center'>ควรจะนัดเร็วที่สุด {nearestfu} เดือน</p>:null}
            </Row>
        </>
    )
}
