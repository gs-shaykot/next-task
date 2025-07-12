'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../home_Component/(components)/StarRating';
import Image from 'next/image';

export default function CollegeReviewSection({ myCollege, appliedData }) {
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get('/api/reviews');
                setReviews(res.data?.reviews || []);
            } catch (error) {
                console.error('Failed to load reviews:', error);
            }
        };
        fetchReviews();
    }, []);

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
        try {
            const res = await axios.post('/api/reviews', {
                rating: newReview.rating,
                comment: newReview.comment,
                user: 'John Doe',
                collegeId: myCollege.id,
            });

            if (res.data?.success) {
                const createdReview = {
                    ...res.data.review,
                    date: new Date().toISOString().split('T')[0],
                };
                setReviews([createdReview, ...reviews]);
                setNewReview({ rating: 0, comment: '' });
            } else {
                alert('Failed to submit review');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Something went wrong while submitting your review.');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">My College</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* College Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                            <div className="aspect-[2/1] overflow-hidden">
                                <Image
                                    width={800}
                                    height={400}
                                    src={myCollege.image}
                                    alt={myCollege.name}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">{myCollege.name}</h2>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <h3 className="font-semibold mb-2">Academic Info</h3>
                                        <p>Rating: {myCollege.rating}</p>
                                        <p>Admission Date: {myCollege.admissionDate}</p>
                                        <p>Research Count: {myCollege.researchCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Write Review */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Rating</label>
                                    <StarRating
                                        rating={newReview.rating}
                                        onRatingChange={(rating) => setNewReview((prev) => ({ ...prev, rating }))}
                                        size="lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Review</label>
                                    <textarea
                                        value={newReview.comment}
                                        onChange={(e) =>
                                            setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                                        }
                                        maxLength={500}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg p-2 resize-none"
                                    ></textarea>
                                    <p className="text-xs text-gray-500">{newReview.comment.length}/500 characters</p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmittingReview}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
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
                                {reviews.slice(0, 2).map((review) => (
                                    <div key={review._id || review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
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
