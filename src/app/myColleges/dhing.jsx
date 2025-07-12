'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import StarRating from '../home_Component/(components)/StarRating';

export default function MyCollegePage() {
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 5,
      comment: 'Amazing experience at Stanford! The research opportunities are incredible.',
      date: '2024-01-15',
      user: 'John Doe'
    }
  ]);

  const colleges = [
    {
      id: '1',
      name: 'Stanford University',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20modern%20university%20campus%20with%20red%20brick%20buildings%2C%20green%20lawns%2C%20students%20walking%2C%20clear%20sky%2C%20academic%20atmosphere%2C%20prestigious%20college%20setting&width=400&height=250&seq=stanford2&orientation=landscape',
      rating: 4.9,
      admissionDate: 'Dec 15, 2024',
      researchCount: 2847
    },
    {
      id: '2',
      name: 'Harvard University',
      image: 'https://readdy.ai/api/search-image?query=Historic%20ivy%20league%20university%20campus%20with%20classical%20architecture%2C%20brick%20buildings%2C%20autumn%20trees%2C%20students%20studying%20outdoors%2C%20prestigious%20academic%20environment&width=400&height=250&seq=harvard2&orientation=landscape',
      rating: 4.8,
      admissionDate: 'Jan 10, 2025',
      researchCount: 3156
    },
    {
      id: '3',
      name: 'MIT',
      image: 'https://readdy.ai/api/search-image?query=Modern%20technology%20university%20campus%20with%20futuristic%20buildings%2C%20glass%20architecture%2C%20students%20with%20laptops%2C%20innovation%20labs%2C%20engineering%20focused%20environment&width=400&height=250&seq=mit2&orientation=landscape',
      rating: 4.9,
      admissionDate: 'Feb 1, 2025',
      researchCount: 2234
    },
    {
      id: '4',
      name: 'University of California, Berkeley',
      image: 'https://readdy.ai/api/search-image?query=California%20university%20campus%20with%20Spanish%20architecture%2C%20palm%20trees%2C%20sunny%20weather%2C%20diverse%20students%2C%20vibrant%20college%20life%2C%20west%20coast%20academic%20setting&width=400&height=250&seq=berkeley1&orientation=landscape',
      rating: 4.7,
      admissionDate: 'Nov 30, 2024',
      researchCount: 1892
    },
    {
      id: '5',
      name: 'Princeton University',
      image: 'https://readdy.ai/api/search-image?query=Elite%20university%20campus%20with%20Gothic%20architecture%2C%20ivy%20covered%20buildings%2C%20manicured%20lawns%2C%20traditional%20academic%20atmosphere%2C%20historic%20collegiate%20setting&width=400&height=250&seq=princeton1&orientation=landscape',
      rating: 4.8,
      admissionDate: 'Jan 5, 2025',
      researchCount: 1654
    },
    {
      id: '6',
      name: 'Yale University',
      image: 'https://readdy.ai/api/search-image?query=Historic%20Yale%20university%20campus%20with%20Gothic%20revival%20architecture%2C%20stone%20buildings%2C%20courtyard%20setting%2C%20ivy%20league%20atmosphere%2C%20traditional%20college%20environment&width=400&height=250&seq=yale1&orientation=landscape',
      rating: 4.8,
      admissionDate: 'Dec 20, 2024',
      researchCount: 1987
    }
  ];
  
  const myCollege = {
    name: 'Stanford University',
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20Stanford%20university%20campus...',
    program: 'Computer Science',
    year: 'Junior (3rd Year)',
    gpa: '3.8/4.0',
    startDate: 'September 2022',
    expectedGraduation: 'June 2026',
    status: 'Active Student',
    advisor: 'Dr. Sarah Johnson',
    credits: 89,
    creditsRequired: 120
  }; 

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      alert('Please provide both rating and comment');
      return;
    }

    if (newReview.comment.length > 500) {
      alert('Comment must not exceed 500 characters');
      return;
    }

    setIsSubmittingReview(true);

    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate API

    const review = {
      id: reviews.length + 1,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      user: 'John Doe'
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, comment: '' });
    setIsSubmittingReview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My College</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* College Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="aspect-[2/1] overflow-hidden">
                <img
                  src={myCollege.image}
                  alt={myCollege.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{myCollege.name}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Academic Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-600">Program:</span><span className="font-medium">{myCollege.program}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Year:</span><span className="font-medium">{myCollege.year}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">GPA:</span><span className="font-medium">{myCollege.gpa}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Advisor:</span><span className="font-medium">{myCollege.advisor}</span></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Timeline</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-600">Start Date:</span><span className="font-medium">{myCollege.startDate}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Expected Graduation:</span><span className="font-medium">{myCollege.expectedGraduation}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Status:</span><span className="font-medium text-green-600">{myCollege.status}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Progress</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Credits Completed</span>
                  <span className="font-medium">{myCollege.credits}/{myCollege.creditsRequired}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(myCollege.credits / myCollege.creditsRequired) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {myCollege.creditsRequired - myCollege.credits} credits remaining to graduate
                </p>
              </div>
            </div>

            {/* Write Review */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                  <StarRating
                    rating={newReview.rating}
                    onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                    size="lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Share your experience at this college..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{newReview.comment.length}/500 characters</p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingReview || newReview.comment.length > 500}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Reviews & Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <StarRating rating={review.rating} readonly size="sm" />
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
                {reviews.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No reviews yet</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {['View Transcript', 'Academic Calendar', 'Course Registration', 'Financial Aid'].map((action, i) => (
                  <button key={i} className={`w-full px-4 py-2 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${i === 0 ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : i === 1 ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : i === 2 ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}>
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
