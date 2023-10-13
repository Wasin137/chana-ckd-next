import React from 'react'
import { Accordion, AccordionHeader, AccordionItem, AccordionBody } from 'react-bootstrap'

export default function History() {
    return (
        <Accordion>
          <AccordionItem eventKey="0">
            <AccordionHeader>V 0.1</AccordionHeader>
            <AccordionBody>
                <ul>
                    <li>เริ่มต้นระบบทดลองภายใน</li>
                    <li>ระบบ Reccomendation พัฒนามาจาก Google sheet</li>
                </ul>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem eventKey="1">
            <AccordionHeader>V 0.2</AccordionHeader>
            <AccordionBody>
                <ul>
                    <li>ปรับปรุงแก้ไข ข้อผิดพลาดของการเรียก Function</li>
                    <li>Responsive design</li>
                </ul>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
    );
}
