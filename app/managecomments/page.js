import React from 'react'
import Comments from '../components/Comments'
import { Row, Button } from 'react-bootstrap'
import { getServerSession } from 'next-auth'
import { authOptions } from '../src/lib/auth'
import { LoginButton, LogoutButton } from '../src/lib/components'



export default async function page() {
  const session = await getServerSession(authOptions)
  return (
    <>
        {session ? 
            <>
                <div className='container-fluid container-lg'>
                    <Row className='mt-2'>
                        <p className='text-center fs-4'>สำหรับผู้ดูแลระบบ</p>
                        <p className='text-center fs-5'>กดถังขยะสีแดงสำหรับลบความเห็น</p>
                    </Row>
                    <Row className='justify-content-center'>
                        <LogoutButton />
                    </Row>
                    <Row>
                        <Comments />
                    </Row>
                </div>
            </>
        :
            <>
                <div className='container-fluid container-lg'>
                    <Row className='mt-2'>
                        <p className='text-center fs-4'>สำหรับผู้ดูแลระบบ</p>
                    </Row>
                    <Row className='justify-content-center'>
                        <LoginButton />
                    </Row>
                </div>
            </>
        }
    </>
  )
}
