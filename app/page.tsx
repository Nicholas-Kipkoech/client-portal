'use client'

import Covers from './components/Covers'
import Footer from './components/Footer'
import HomePage from './components/Home'
import HomeNavbar from './components/HomeNavbar'
import Products from './components/Products'
import TestimonialCarousel from './components/TestimonialCarousel'

export default function Home() {
  return (
    <div>
      <HomeNavbar />
      <iframe
        src="https://iconsoft.co/"
        className="w-full h-screen overflow-y-hidden scroll-my-0"
      />
      {/* <div className="flex flex-col gap-5 mx-2 "> */}
      {/* <HomePage /> */}
      {/* <TestimonialCarousel /> */}
      {/* <Covers /> */}
      {/* <Products /> */}
      {/* <Footer /> */}
      {/* </div> */}
    </div>
  )
}
