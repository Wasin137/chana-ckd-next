'use client'
import React ,{ useState } from 'react'
import { Container, Row } from 'react-bootstrap'

import Gfr from './gfr'
import Cr from './cr'
import Potassium from './potassium'

export default function page() {
    const [suggfrFromGfr, setSuggfrFromGfr] = useState('')
    const [sugcrFromCr, setSugcrFromCr] = useState('')
    const [sugkFromK, setSugkFromK] = useState('')
    return (
        <Container>
            <Row>
                <p className='fs-4 text-center'>Chana CKD suggestion</p>
            </Row>
            <Gfr onSuggestionChange={setSuggfrFromGfr} />
            <Cr onSuggestionChange={setSugcrFromCr}/>
            <Potassium onSuggestionChange={setSugkFromK}/>
            <Row>
                <p>text from suggestion of gfr {suggfrFromGfr}</p>
                <p>text from suggestion of Cr {sugcrFromCr}</p>
                <p>text from suggestion of K {sugkFromK}</p>
            </Row>
        </Container>
    )
}
