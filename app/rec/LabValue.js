'use client'
import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'


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
    curfbsValue
}) {
    // Get today date
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');  // January is 0
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const [labresult , setLabresult] = useState('')
    
    const allLabData = [
        {
            text:'eGFR',
            value: curgfrValue
        },
        {
            text:'Cr',
            value: curcrValue
        },
        {
            text:'UPCR',
            value: curupcrValue
        },
        {
            text:'K',
            value: curkValue
        },
        {
            text:'CO2',
            value: curco2Value
        },
        {
            text:'Ca',
            value: curcalValue
        },
        {
            text:'PO4',
            value: curphosValue
        },
        {
            text:'PTH',
            value: curpthValue
        },
        {
            text:'Hb',
            value: curhbValue
        },
        {
            text:'UACR',
            value: curuacrValue
        },
        {
            text:'FBS',
            value: curfbsValue
        }
    ]
    const CollectLab = () => {
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
    };

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
        curfbsValue
    ])
    
    useEffect(() => {
        return () => {
            clearTimeout(btnTimeout);
        };
    }, []);

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
                        {allLabData.map((lab, index) => (
                            <tr key={index}>
                                <td>{lab.text}</td>
                                <td>{lab.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Form.Control as='textarea' rows={3} placeholder={labresult} readOnly/>
            </Row>
            <Row className='mt-2'>
                <Button
                        variant={btnDisabled ? "secondary" : "primary"}
                        disabled={btnDisabled}
                        onClick={() => {
                            navigator.clipboard.writeText(labresult)
                            setBtnDisabled(true)
                            btnTimeout = setTimeout(() => {
                                setBtnDisabled(false);
                            }, 1000)
                        }}>{btnDisabled ? "Copied" : "Copy"}</Button>
            </Row>
        </>
    )
}
