'use client'; 
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { RiCalendarLine, RiFileTextLine } from 'react-icons/ri';

export default function CollegeCard({
    id,
    name,
    image,
    rating,
    admissionDate,
    researchCount,
    events,
    research,
    sports,
    showDetails = true
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="aspect-video overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                />
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                    {rating && (
                        <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 flex items-center justify-center">
                                <AiFillStar className="text-yellow-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{rating}</span>
                        </div>
                    )}
                </div>

                <div className="space-y-2 mb-4">
                    {admissionDate && (
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="w-4 h-4 flex items-center justify-center mr-2">
                                <RiCalendarLine />
                            </div>
                            <span>Admission: {admissionDate}</span>
                        </div>
                    )}

                    {researchCount && (
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="w-4 h-4 flex items-center justify-center mr-2">
                                <RiFileTextLine />
                            </div>
                            <span>{researchCount} Research Papers</span>
                        </div>
                    )}

                    {events && (
                        <div className="text-sm text-gray-700">
                            <strong>Events:</strong> {events}
                        </div>
                    )}

                    {research && (
                        <div className="text-sm text-gray-700">
                            <strong>Research:</strong> {research}
                        </div>
                    )}

                    {sports && (
                        <div className="text-sm text-gray-700">
                            <strong>Sports:</strong> {sports}
                        </div>
                    )}
                </div>

                {showDetails && (
                    <Link href={`/colleges/${id}`}>
                        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                            View Details
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}