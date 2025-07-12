'use client';
 
import StarRating from '@/app/home_Component/(components)/StarRating';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';

export default function CollegeDetail({ collegeId }) {
    const collegeData = {
        '1': {
            name: 'Stanford University',
            image: 'https://readdy.ai/api/search-image?query=Beautiful%20Stanford%20university%20campus%20aerial%20view%20with%20red%20tile%20roofs%2C%20palm%20trees%2C%20modern%20buildings%2C%20California%20sunshine%2C%20prestigious%20academic%20setting&width=800&height=400&seq=stanford_detail&orientation=landscape',
            rating: 4.9,
            location: 'Stanford, California',
            founded: 1885,
            students: 17249,
            acceptanceRate: 4.3,
            tuition: '$56,169',
            admissionDeadline: 'December 15, 2024',
            description: 'Stanford University is a private research university in Stanford, California. Known for its academic excellence, entrepreneurial spirit, and innovation in technology and business.',
            programs: ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Law', 'Education'],
            events: [
                { name: 'Tech Innovation Summit', date: 'March 15, 2024', description: 'Annual conference featuring tech leaders and startup founders' },
                { name: 'Career Fair', date: 'April 10, 2024', description: 'Connect with top employers from Silicon Valley and beyond' },
                { name: 'Research Showcase', date: 'May 8, 2024', description: 'Student research presentations across all disciplines' }
            ],
            sports: [
                { name: 'Basketball', season: 'Fall/Winter', achievements: 'NCAA Championships' },
                { name: 'Swimming', season: 'Winter/Spring', achievements: 'Olympic Training Center' },
                { name: 'Tennis', season: 'Spring', achievements: 'Pac-12 Champions' }
            ],
            research: [
                { area: 'Artificial Intelligence', description: 'Leading research in machine learning and AI applications' },
                { area: 'Biomedical Engineering', description: 'Innovative medical device development and biotechnology' },
                { area: 'Environmental Science', description: 'Sustainability and climate change research initiatives' }
            ],
            admission: {
                requirements: ['High School Diploma', 'SAT/ACT Scores', 'Letters of Recommendation', 'Personal Essay'],
                process: 'Online application through Common Application, followed by supplemental essays and interviews for selected candidates.'
            }
        }
    };

    const college = collegeData[collegeId] || collegeData['1'];

    return (
        <div className="min-h-screen bg-gray-50"> 

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/colleges" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 cursor-pointer">
                    <FaArrowLeft className="w-4 h-4 mr-2" />
                    Back to Colleges
                </Link>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="aspect-[2/1] overflow-hidden">
                        <img src={college.image} alt={college.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{college.name}</h1>
                                <p className="text-gray-600 flex items-center">
                                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                                    {college.location}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <StarRating rating={college.rating} readonly />
                                <span className="text-lg font-semibold text-gray-900">{college.rating}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">{college.description}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Academic Programs</h2>
                            <div className="grid md:grid-cols-2 gap-3">
                                {college.programs.map((program, index) => (
                                    <div key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">{program}</div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
                            <div className="space-y-4">
                                {college.events.map((event, index) => (
                                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                                        <h3 className="font-semibold text-gray-900">{event.name}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{event.date}</p>
                                        <p className="text-gray-700">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sports Programs</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {college.sports.map((sport, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900">{sport.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{sport.season}</p>
                                        <p className="text-sm text-blue-600">{sport.achievements}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Areas</h2>
                            <div className="space-y-4">
                                {college.research.map((area, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold text-gray-900 mb-1">{area.area}</h3>
                                        <p className="text-gray-700">{area.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Founded</span>
                                    <span className="font-medium">{college.founded}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Students</span>
                                    <span className="font-medium">{college.students?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Acceptance Rate</span>
                                    <span className="font-medium">{college.acceptanceRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tuition</span>
                                    <span className="font-medium">{college.tuition}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admission Information</h3>
                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Deadline</h4>
                                <p className="text-red-600 font-medium">{college.admissionDeadline}</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                                <ul className="space-y-1">
                                    {college.admission.requirements.map((req, index) => (
                                        <li key={index} className="text-gray-700 text-sm flex items-center">
                                            <FaCheck className="text-green-600 mr-2" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link href="/admission">
                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                                    Apply Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
