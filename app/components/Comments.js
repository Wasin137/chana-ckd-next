import React from 'react'
import { Card, CardBody, CardHeader ,CardTitle ,CardText,Col } from 'react-bootstrap'
import Image from 'next/image'

const baseUrl_api = "https://chana-ckd-api.vercel.app/"

const getComments = async () => {
    try {
      const res = await fetch(`${baseUrl_api}/api/comments`, {
        cache: 'no-store',
      })
  
      if(!res.ok) {
        throw new Error('Failed to fetch comments')
      }
  
      return res.json()
    } catch(error){
      console.log('Error loading comments', error)
      return { comments: [] }
    }
  }

export default async function Comments() {
    const {comments} = await getComments()

    return (
      <>
      {comments.map(c => (
        <Col xs={12} key={c._id} className='my-2'>
            <Card className='d-flex flex-column'>
                <CardHeader className='d-flex justify-content-between'>
                  {new Date(c.createdAt).toLocaleDateString('th-TH', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                  })}

                </CardHeader>
                <CardBody>
                    <CardTitle>  
                        {[...Array(c.rating)].map((_, i) => (
                        <Image key={i} src="/star-fill.svg" width={16} height={16} alt={`Star ${i + 1}`} />
                        ))}
                    </CardTitle>
                    <CardText className='flex-grow-1'>
                        {c.comment}
                    </CardText>
                </CardBody>
            </Card>
        </Col>
      ))}
      </>
    )
  }
