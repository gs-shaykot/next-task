'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiCheckLine, RiSchoolLine, RiLoaderLine } from 'react-icons/ri';
import { AuthContext } from '../context/AuthProvider';

const IMGBB_API_KEY = 'e8a03c0344e72a7c00267c41075f84f5';

export default function AdmissionPage() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
 
    const [selectedCollege, setSelectedCollege] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (!user) {
            router.replace('/login');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const colleges = [
        { id: '1', name: 'Stanford University' },
        { id: '2', name: 'Harvard University' },
        { id: '3', name: 'MIT' },
        { id: '4', name: 'University of California, Berkeley' },
        { id: '5', name: 'Princeton University' },
        { id: '6', name: 'Yale University' }
    ];
    const watchAddress = watch('address', '');
    const onSubmit = async (data) => {
        if (!selectedCollege) {
            alert('Please select a college');
            return;
        }

        setIsSubmitting(true);

        try {
            let imageUrl = null;

            if (data.image && data.image[0]) {
                const formData = new FormData();
                formData.append('image', data.image[0]);

                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    formData
                );
                imageUrl = res.data.data.url;
            }

            const { image, ...rest } = data;

            const submissionData = {
                ...rest,
                collegeId: selectedCollege,
                imageUrl
            };
            const response = await axios.post('/api/applied', submissionData);
            if (response.status !== 200) {
                throw new Error('Failed to submit application');
            }
            else if (response.status === 200) {
                alert('Application submitted successfully!');
            }
            console.log('Form submitted:', submissionData);
            setSubmitted(true);
            reset();
            setSelectedCollege('');
        } catch (error) {
            console.error('Image upload or submission failed:', error);
            alert('Submission failed. Please try again.');
        }

        setIsSubmitting(false);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-green-100 rounded-full">
                            <RiCheckLine className="text-3xl text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
                        <p className="text-gray-600 mb-6">
                            Your application has been successfully submitted. You will receive a confirmation email shortly.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
                        >
                            Submit Another Application
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">College Admission</h1>
                    <p className="text-gray-600">Apply to your dream college by filling out the application form below</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* College Selection */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select College</h2>
                        <div className="space-y-3">
                            {colleges.map((college) => (
                                <label key={college.id} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="college"
                                        value={college.id}
                                        checked={selectedCollege === college.id}
                                        onChange={(e) => setSelectedCollege(e.target.value)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-gray-700">{college.name}</span>
                                </label>
                            ))}
                        </div>
                        {!selectedCollege && (
                            <p className="mt-2 text-red-500 text-sm">Please select a college</p>
                        )}
                    </div>

                    {/* Application Form */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Form</h2>

                        {!selectedCollege ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                                    <RiSchoolLine className="text-2xl text-gray-400" />
                                </div>
                                <p className="text-gray-500">Please select a college to continue with your application</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="admission-form">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Candidate Name *
                                        </label>
                                        <input
                                            type="text"
                                            {...register('candidateName', { required: 'Candidate name is required' })}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.candidateName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.candidateName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.candidateName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject of Interest *
                                        </label>
                                        <input
                                            type="text"
                                            {...register('subject', { required: 'Subject is required' })}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="e.g., Computer Science"
                                        />
                                        {errors.subject && (
                                            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            {...register('phone', { required: 'Phone number is required' })}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="+8801515xxxxxx"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth *
                                        </label>
                                        <input
                                            type="date"
                                            {...register('dateOfBirth', { required: 'Date of birth is required' })}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.dateOfBirth && (
                                            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Profile Photo
                                        </label>
                                        <input
                                            type="file"
                                            {...register('image')}
                                            accept="image/*"
                                            className="file-input"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, GIF (Max 5MB)</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        {...register('address', {
                                            required: 'Address is required',
                                            maxLength: {
                                                value: 500,
                                                message: 'Address must be 500 characters or less'
                                            }
                                        })}
                                        rows={3}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.address ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter your complete address"
                                    ></textarea>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {watchAddress.length}/500 characters
                                    </p>
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || watchAddress.length > 500}
                                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <RiLoaderLine className="animate-spin mr-2" />
                                                Submitting...
                                            </span>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
