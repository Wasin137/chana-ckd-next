import React from 'react'
import { Accordion, AccordionHeader, AccordionItem, AccordionBody} from 'react-bootstrap'

const updateHistory = [
  { 
    version: '0.1',
    functions : [
      'เริ่มต้นระบบทดลองภายใน',
      'ระบบ Reccomendation พัฒนามาจาก Google sheet'
    ]
  },
  {
    version: '0.2',
    functions : [
      'ปรับปรุงแก้ไข ข้อผิดพลาดของการเรียก Function',
      'Responsive design'
    ]
  },
  {
    version: '0.3',
    functions : [
      'เพิ่มระบบการให้คะแนน และรีวิว',
      'ระบบจัดการสำหรับ Admin'
    ]
  }
]

export default function History() {
  const reversedHistory = [...updateHistory].reverse()

  return (
    <div className='container-fluid container-lg mt-2'>
      <Accordion defaultActiveKey="0">
        {reversedHistory.map((update, index) => (
          <AccordionItem key={index} eventKey={index.toString()}>
            <AccordionHeader>Version {update.version}</AccordionHeader>
            <AccordionBody>
                <ul>
                  {update.functions.map((func, funcIndex) => (
                    <li key={funcIndex}>{func}</li>
                  ))}
                </ul>
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
