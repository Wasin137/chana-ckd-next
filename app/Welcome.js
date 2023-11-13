import React from 'react'
import { CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function Welcome() {
    return (
        <Card style={{ width: '18rem' }}>
            <CardImg variant="top" src="/egfr.jpg"/>
            <CardBody>
                <CardTitle>V. 0.4</CardTitle>
                <CardText>
                    Updated 13/11/2023
                    อยู่ระหว่างการทดสอบ หากพบปัญหาในการใช้งานกรุณาแจ้ง
                    kanokporn.kr@gmail.com
                </CardText>
                <Button variant="primary" href='/rec'>CKD Clinic</Button>
            </CardBody>
        </Card>
    )
}