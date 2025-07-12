
'use client'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import StarRating from './(components)/StarRating';

export default function ReviewSlider({ reviews }) {
    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Student Reviews</h2>

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-blue-600 font-semibold text-sm">
                                        {review.name?.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                    <p className="text-sm text-gray-600">{review.university}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <StarRating rating={review.rating} readonly />
                            </div>
                            <p className="text-gray-700 text-sm">{review.comment}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
