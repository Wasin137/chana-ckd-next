'use client'
import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AddComment() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const router = useRouter()
  
    const handleRatingChange = (rate) => {
      setRating(rate);
    };

    const handleReset = () => {
        setRating(0);
        setComment('');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!rating){
        alert('กรุณาให้คะแนนก่อนบันทึก')
      }

      try {
        const res = await fetch('http://localhost:3000/api/comments', {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ rating, comment }),
        })

        if (res.ok) {
          router.push('/')
        } else {
          throw new Error('Faile to comment')
        }
      } catch (error) {
        console.log(error)
      }
    };
  
    return (
      <Container className="d-flex justify-content-center mt-1">
        <Col xs={12} lg={4}>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Row className="justify-content-center">
                {[...Array(5)].map((_, i) => (
                  <Col key={i} xs="auto" className="px-1">
                    <div
                      onClick={() => handleRatingChange(i + 1)}
                      style={{ cursor: 'pointer' }}
                    >
                      {i < rating ? (
                        <Image alt={i.toString()} src="/star-fill.svg" width={32} height={32} />
                      ) : (
                        <Image alt={i.toString()} src="/star.svg" width={32} height={32} />
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </InputGroup>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                value={comment}
                placeholder='Comment here'
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </Form.Group>
            <Row>
                <Col xs={6} className="d-flex justify-content-between">
                    <Button type="submit" variant="primary">Submit</Button>
                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                </Col>
            </Row>
          </Form>
        </Col>
      </Container>
    );
}
