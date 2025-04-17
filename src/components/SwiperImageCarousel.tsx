'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function SwiperImageCarousel({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null

  return (
    <div className="relative">
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full h-80 rounded-lg shadow-md"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <Image
              src={url}
              alt={`Product image ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-80 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}