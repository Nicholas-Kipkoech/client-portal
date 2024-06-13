'use client'
import React, { useEffect, useState } from 'react'
import { GrLinkNext } from 'react-icons/gr'
import { GrLinkPrevious } from 'react-icons/gr'

const Testimonials = [
  {
    user: 'Nicholas Kipkoech',
    content: `I was very pleased when I contacted CoverTree. They listened to
            what I needed and got back to me when they said they would. It was a
            wonderful experience.`,
    backgroundUrl:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    user: 'Eric Kweyu',
    content: `I was very pleased when I contacted CoverTree. They listened to
            what I needed and got back to me when they said they would. It was a
            wonderful experience.`,
    backgroundUrl:
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleNext = () => {
    setCurrentIndex((index) => {
      if (index === Testimonials.length - 1) return 0
      return index + 1
    })
  }
  const handlePrevious = () => {
    setCurrentIndex((index) => {
      if (index === 0) return Testimonials.length - 1
      return index - 1
    })
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((index) => {
        if (index === Testimonials.length - 1) return 0
        return index + 1
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [Testimonials.length])

  return (
    <div
      style={{
        position: 'relative',
      }}
      className="md:h-[28rem] sm:h-[12rem] sm:hidden md:block"
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${Testimonials[currentIndex].backgroundUrl})`,
          backgroundSize: 'contain',
        }}
        className="rounded-lg md:w-[100%] sm:w-[20rem] "
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
        }}
        className="p-2  mt-[15rem] flex justify-between"
      >
        <div className="md:w-[25rem] 2xl:w-[40rem] bg-[#092332] opacity-[0.8] p-2 2xl:p-5 rounded-lg flex flex-col gap-5">
          <p
            style={{ color: 'white' }}
            className="sm:text-[11px] md:text-[15px]"
          >
            “{Testimonials[currentIndex].content}”
          </p>
          <p
            style={{ color: 'white' }}
            className="flex justify-start font-bold"
          >
            {Testimonials[currentIndex].user}
          </p>
        </div>
        <div className="text-white mt-[100px] flex gap-2 mr-4">
          <GrLinkPrevious
            onClick={handlePrevious}
            className="bg-white rounded-[50%] cursor-pointer text-[#cb7529] h-[40px] 2xl:h-[50px] 2xl:w-[50px] p-2 w-[40px]"
          />
          <GrLinkNext
            className="bg-white rounded-[50%] text-[#cb7529] cursor-pointer h-[40px] 2xl:h-[50px] 2xl:w-[50px] p-2 w-[40px]"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  )
}

export default TestimonialCarousel
