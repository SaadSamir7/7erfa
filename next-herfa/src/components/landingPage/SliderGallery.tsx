'use client'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface image {
    url: string
    title: string
    description: string
}
const images: image[] = [
    {
        url: '/categories/1.jpg',
        title: 'Mechanical',
        description: 'Expert mechanical repair and maintenance services',
    },
    {
        url: '/categories/2.jpg',
        title: 'Electrical',
        description: 'Professional electrical installation and repair',
    },
    {
        url: '/categories/3.jpg',
        title: 'Carpentry',
        description: 'Custom woodwork and furniture craftsmanship',
    },
    {
        url: '/categories/4.jpg',
        title: 'Painting',
        description: 'Interior and exterior painting services',
    },
    {
        url: '/categories/5.jpg',
        title: 'Plumber',
        description: 'Plumbing installation and emergency repairs',
    },
    {
        url: '/categories/6.jpg',
        title: 'Construction Worker',
        description: 'General construction and building services',
    },
]

const SliderGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Navigate to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    // Navigate to the next slide
    const nextSlide = () => {
        setCurrentIndex((nextIndex) =>
            nextIndex === images.length - 1 ? 0 : nextIndex + 1
        )
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex) =>
                currentIndex === images.length - 1 ? 0 : currentIndex + 1
            )
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <section
            className="relative mx-auto my-20 w-full max-w-[1400px] overflow-hidden px-4 lg:my-32"
            id="categories"
        >
            {/* Enhanced Title Section */}
            <div className="mb-8 text-center">
                <h2 className="mb-4 bg-gradient-to-r from-main-500 to-main-600 bg-clip-text text-center font-brand text-3xl uppercase tracking-wide text-main-500 md:text-5xl lg:mb-16">
                    Categories
                </h2>
                <div className="mx-auto mb-4 h-1 w-32 rounded-full bg-gradient-to-r from-main-600 to-main-500"></div>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                    Explore our diverse range of professional services
                </p>
            </div>

            {/* Enhanced Slider Container */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
                <Slider images={images} currentIndex={currentIndex} />

                {/* Enhanced Navigation Buttons */}
                <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-between px-6">
                    <button
                        onClick={prevSlide}
                        className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30 hover:shadow-xl"
                    >
                        <ChevronLeft
                            size={24}
                            className="transition-transform group-hover:-translate-x-0.5"
                        />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30 hover:shadow-xl"
                    >
                        <ChevronRight
                            size={24}
                            className="transition-transform group-hover:translate-x-0.5"
                        />
                    </button>
                </div>

                {/* Enhanced Dots Navigation */}
                <Dots
                    images={images}
                    currentIndex={currentIndex}
                    goToSlide={goToSlide}
                />
            </div>
        </section>
    )
}

export default SliderGallery

function Slider({
    images,
    currentIndex,
}: {
    images: image[]
    currentIndex: number
}) {
    return (
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${
                        index === currentIndex
                            ? 'scale-100 opacity-100'
                            : 'scale-105 opacity-0'
                    }`}
                >
                    <div className="relative h-full w-full overflow-hidden">
                        <Image
                            src={image.url}
                            alt={`${image.title} services`}
                            className="h-full w-full object-cover"
                            width={500}
                            height={500}
                        />
                        {/* Enhanced Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-main-600/30 to-transparent"></div>

                        {/* Enhanced Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
                            <div className="max-w-2xl">
                                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-main-300 md:text-base">
                                    Professional Service
                                </p>
                                <h3 className="mb-4 text-3xl font-bold tracking-wide text-white md:text-4xl lg:text-5xl">
                                    {image.title}
                                </h3>
                                <p className="text-base leading-relaxed text-white/90 md:text-lg">
                                    {image.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function Dots({
    images,
    currentIndex,
    goToSlide,
}: {
    images: image[]
    currentIndex: number
    goToSlide: (index: number) => void
}) {
    return (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
            {images.map((_, index) => (
                <button
                    key={index}
                    className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                        index === currentIndex
                            ? 'scale-125 border-white bg-white'
                            : 'border-white/50 bg-white/30 hover:scale-110 hover:bg-white/50'
                    }`}
                    onClick={() => goToSlide(index)}
                />
            ))}
        </div>
    )
}
