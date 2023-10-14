'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function RemoveBtn({ id }) {
    const router = useRouter()
    const removeTopic = async () => {
        const confirmed = confirm('Are you sure?')

        if (confirmed){
            const res = await fetch(`/api/comments?id=${id}`, {
                method: "DELETE",
            })
            if (res.ok){
                router.refresh()
            }
        }
    }
  return (
    <button onClick={removeTopic} className='btn btn-outline-none p-0'>
        <Image src='/trash.svg' alt='trash' width={16} height={16}/>
    </button>
  )
}
