'use client'
import React ,{ useState } from 'react'
import {  Row, Col } from 'react-bootstrap'

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


export default function Page() {
    // GFR
    const [suggfrFromGfr, setSuggfrFromGfr] = useState('')
    const [lastgfr, setLastgfr] = useState('')
    const [fugfr, setFugfr] = useState('')
    // Cr
    const [sugcrFromCr, setSugcrFromCr] = useState('')
    const [lastcr, setLastcr] = useState('')
    const [fucr, setFucr] = useState('')
    // UPCR
    const [lastupcr, setLastupcr] = useState('')
    // K
    const [sugkFromK, setSugkFromK] = useState('')
    const [lastk, setLastk] = useState('')
    const [fuk, setFuk] = useState('')
    // CO2
    const [sugco2Fromco2, setSugco2Fromco2] = useState('')
    const [lastco2, setLastco2] = useState('')
    const [fuco2, setFuco2] = useState('')
    // Cal
    const [sugcalFromcal, setSugcalFromcal] = useState('')
    const [lastcal, setLastcal] = useState('')
    const [fucal, setFucal] = useState('')
    // PO4
    const [sugphosFromphos, setSugphosFromphos] = useState('')
    const [lastphos, setLastphos] = useState('')
    const [fuphos, setFuphos] = useState('')
    // PTH
    const [sugpthFrompth, setSugpthFrompth] = useState('')
    const [lastpth, setLastpth] = useState('')
    const [fupth, setFupth] = useState('')
    // Hb
    const [sughbFromhb, setSughbFromhb] = useState('')
    const [lasthb, setLasthb] = useState('')
    const [fuhb, setFuhb] = useState('')
    // UACR
    const [suguacrFromuacr, setSuguacrFromuacr] = useState('')
    const [lastuacr, setLastuacr] = useState('')
    const [fuuacr, setFuuacr] = useState('')
    // FBS
    const [lastfbs, setLastfbs] = useState('')

    return (
        <div className='container-sm-fluid container-md'>
            <Row className='mt-2'>
                <Col xs={12} lg={9}>
                    <Gfr 
                        onSuggestionChange={setSuggfrFromGfr}
                        lastgfr={lastgfr}
                        setLastgfr={setLastgfr}
                        fugfr={fugfr}
                        setFugfr={setFugfr}
                    />
                    <Cr 
                        onSuggestionChange={setSugcrFromCr}
                        lastcr={lastcr}
                        setLastcr = {setLastcr}
                        fucr={fucr}
                        setFucr={setFucr}
                    />
                    <Upcr
                        lastupcr={lastupcr}
                        setLastupcr={setLastupcr}
                    />
                    <Potassium 
                        onSuggestionChange={setSugkFromK}
                        lastk={lastk}
                        setLastk={setLastk}
                        fuk={fuk}
                        setFuk={setFuk}
                    />
                    <Co2 
                        onSuggestionChange={setSugco2Fromco2}
                        lastco2={lastco2}
                        setLastco2={setLastco2}
                        fuco2={fuco2}
                        setFuco2={setFuco2}
                    />
                    <Cal
                        onSuggestionChange={setSugcalFromcal}
                        lastcal={lastcal}
                        setLastcal={setLastcal}
                        fucal={fucal}
                        setFucal={setFucal}
                    />
                    <Phos
                        onSuggestionChange={setSugphosFromphos}
                        lastphos={lastphos}
                        setLastphos={setLastphos}
                        fuphos={fuphos}
                        setFuphos={setFuphos}
                    />
                    <Pth
                        onSuggestionChange={setSugpthFrompth}
                        lastpth={lastpth}
                        setLastpth={setLastpth}
                        fupth={fupth}
                        setFupth={setFupth}
                    />
                    <Hb
                        onSuggestionChange={setSughbFromhb}
                        lasthb={lasthb}
                        setLasthb={setLasthb}
                        fuhb={fuhb}
                        setFuhb={setFuhb}
                    />
                    <Uacr
                        onSuggestionChange={setSuguacrFromuacr}
                        lastuacr={lastuacr}
                        setLastuacr={setLastuacr}
                        fuuacr={fuuacr}
                        setFuuacr={setFuuacr}
                    />
                    <Fbs
                        lastfbs={lastfbs}
                        setLastfbs={setLastfbs}
                    />
                </Col>
                <Col xs={12} lg={3}>
                    <LabValue 
                        curgfrValue={lastgfr}
                        curcrValue={lastcr}
                        curkValue={lastk}
                        curupcrValue={lastupcr}
                        curcalValue={lastcal}
                        curco2Value={lastco2}
                        curphosValue={lastphos}
                        curpthValue={lastpth}
                        curhbValue={lasthb}
                        curuacrValue={lastuacr}
                        curfbsValue={lastfbs}
                        fugfrValue={fugfr}
                        fucrValue={fucr}
                        fukValue={fuk}
                        fuco2Value={fuco2}
                        fucalValue={fucal}
                        fuphosValue={fuphos}
                        fupthValue={fupth} 
                        fuhbValue={fuhb}
                        fuuacrValue={fuuacr}
                    />
                    
                </Col>
            </Row>
            <Row>
                <hr />
                <p className='text-center fst-italic'>พบปัญหาจากการใช้งานกรุณาติดต่อ: kanokporn.kr@gmail.com</p>
            </Row>
        </div>
    )
}
