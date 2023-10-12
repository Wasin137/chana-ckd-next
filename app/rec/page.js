'use client'
import React ,{ useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import LabValue from './LabValue'
import Gfr from './gfr'
import Cr from './cr'
import Upcr from './upcr'
import Potassium from './potassium'
import Co2 from './co2'
import Cal from './cal'
import Phos from './phos'
import Pth from './pth'
import Hb from './hb'
import Uacr from './uacr'
import Fbs from './fbs'


export default function page() {
    // GFR
    const [suggfrFromGfr, setSuggfrFromGfr] = useState('')
    const [lastgfr, setLastgfr] = useState('')
    // Cr
    const [sugcrFromCr, setSugcrFromCr] = useState('')
    const [lastcr, setLastcr] = useState('')
    // UPCR
    const [lastupcr, setLastupcr] = useState('')
    // K
    const [sugkFromK, setSugkFromK] = useState('')
    const [lastk, setLastk] = useState('')
    // CO2
    const [sugco2Fromco2, setSugco2Fromco2] = useState('')
    const [lastco2, setLastco2] = useState('')
    // Cal
    const [sugcalFromcal, setSugcalFromcal] = useState('')
    const [lastcal, setLastcal] = useState('')
    // PO4
    const [sugphosFromphos, setSugphosFromphos] = useState('')
    const [lastphos, setLastphos] = useState('')
    // PTH
    const [sugpthFrompth, setSugpthFrompth] = useState('')
    const [lastpth, setLastpth] = useState('')
    // Hb
    const [sughbFromhb, setSughbFromhb] = useState('')
    const [lasthb, setLasthb] = useState('')
    // UACR
    const [suguacrFromuacr, setSuguacrFromuacr] = useState('')
    const [lastuacr, setLastuacr] = useState('')
    // FBS
    const [lastfbs, setLastfbs] = useState('')

    return (
        <Container>
            <Row>
                <p className='fs-4 text-center'>Chana CKD suggestion</p>
            </Row>
            <Row>
                <Col xs={10}>
                    <Gfr 
                        onSuggestionChange={setSuggfrFromGfr}
                        lastgfr={lastgfr}
                        setLastgfr={setLastgfr}
                    />
                    <Cr 
                        onSuggestionChange={setSugcrFromCr}
                        lastcr={lastcr}
                        setLastcr = {setLastcr}
                    />
                    <Upcr
                        lastupcr={lastupcr}
                        setLastupcr={setLastupcr}
                    />
                    <Potassium 
                        onSuggestionChange={setSugkFromK}
                        lastk={lastk}
                        setLastk={setLastk}
                    />
                    <Co2 
                        onSuggestionChange={setSugco2Fromco2}
                        lastco2={lastco2}
                        setLastco2={setLastco2}
                    />
                    <Cal
                        onSuggestionChange={setSugcalFromcal}
                        lastcal={lastcal}
                        setLastcal={setLastcal}
                    />
                    <Phos
                        onSuggestionChange={setSugphosFromphos}
                        lastphos={lastphos}
                        setLastphos={setLastphos}
                    />
                    <Pth
                        onSuggestionChange={setSugpthFrompth}
                        lastpth={lastpth}
                        setLastpth={setLastpth}
                    />
                    <Hb
                        onSuggestionChange={setSughbFromhb}
                        lasthb={lasthb}
                        setLasthb={setLasthb}
                    />
                    <Uacr
                        onSuggestionChange={setSuguacrFromuacr}
                        lastuacr={lastuacr}
                        setLastuacr={setLastuacr}
                    />
                    <Fbs
                        lastfbs={lastfbs}
                        setLastfbs={setLastfbs}
                    />
                </Col>
                <Col xs={2}>
                    <LabValue 
                        curgfrValue={lastgfr}
                        curcrValue={lastcr}
                        curkValue={lastk}
                        curupcrValue={lastupcr}
                        curcalValue={lastcal}
                        curphosValue={lastphos}
                        curpthValue={lastpth}
                        curhbValue={lasthb}
                        curuacrValue={lastuacr}
                        curfbsValue={lastfbs}
                    />
                </Col>
            </Row>
            <Row>
                <p>text from suggestion of gfr {suggfrFromGfr}</p>
                <p>text from suggestion of Cr {sugcrFromCr}</p>
                <p>text from suggestion of K {sugkFromK}</p>
                <p>text from suggestion of CO2 {sugco2Fromco2}</p>
                <p>text from suggestion of Cal {sugcalFromcal}</p>
                <p>text from suggestion of PO4 {sugphosFromphos}</p>
                <p>text from suggestion of PTH {sugpthFrompth}</p>
                <p>text from suggestion of Hb {sughbFromhb}</p>
                <p>text from suggestion of UACR {suguacrFromuacr}</p>
            </Row>
        </Container>
    )
}
