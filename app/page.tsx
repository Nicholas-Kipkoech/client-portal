'use client'

import HomeNavbar from './components/HomeNavbar'

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
