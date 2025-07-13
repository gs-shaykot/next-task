// AxiosError: Request failed with status code 500
'use client';

import { useContext, useState } from 'react';
import {
    RiEditLine,
    RiMailLine,
    RiSchoolLine,
    RiMapPinLine,
} from 'react-icons/ri';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

export default function ProfilePage({ profileData }) {
    console.log(profileData)
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [editData, setEditData] = useState({ name: profileData?.candidateName });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setEditData({ ...profileData });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setIsEditing(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await axios.patch('/api/applied', {
                _id: profileData._id,
                candidateName: editData.name,
            });

            if (res.data.success) {
                alert('Profile updated successfully!');
            } else {
                alert('Update failed');
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Something went wrong while saving changes.');
        } finally {
            setIsSaving(false);
        }
    };


    // Fallback for safety
    const safeName = profileData?.candidateName || 'Unnamed';
    const initials = safeName.split(' ').map((n) => n[0]).join('');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Profile Settings
                    </h1>
                    <p className="text-gray-600">
                        Manage your personal information and account settings
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Personal Information
                                </h2>
                                {!isEditing && (
                                    <button
                                        onClick={handleEdit}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                                    >
                                        <RiEditLine className="text-lg" />
                                        <span>Edit</span>
                                    </button>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editData.name || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900 py-2">{profileData?.candidateName || safeName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <p className="text-gray-900 py-2">
                                            {profileData?.email || 'No email'}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        University
                                    </label>
                                    <p className="text-gray-900 py-2">
                                        {profileData?.collegeName || 'No university'}
                                    </p>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        University
                                    </label>
                                    <p className="text-gray-900 py-2">
                                        {profileData?.collegeName || 'No university'}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            name="address"
                                            value={editData.address || ''}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        ></textarea>
                                    ) : (
                                        <p className="text-gray-900 py-2">
                                            {profileData?.collegeAddr || 'No address'}
                                        </p>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                                        >
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            disabled={isSaving}
                                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Summary */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Profile Summary
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold text-sm">
                                            {initials}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">{safeName}</h4>
                                        <p className="text-sm text-gray-600">Student</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <RiMailLine className="w-4 h-4 mr-2" />
                                        <span>{profileData?.email || 'No email'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <RiSchoolLine className="w-4 h-4 mr-2" />
                                        <span>{profileData?.collegeName || 'No university'}</span>
                                    </div>
                                    <div className="flex items-start text-gray-600">
                                        <RiMapPinLine className="w-4 h-4 mr-2 mt-0.5" />
                                        <span className="flex-1">
                                            {profileData?.collegeAddr || 'No address'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Account Settings
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium text-left">
                                    Change Password
                                </button>
                                <button className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors font-medium text-left">
                                    Privacy Settings
                                </button>
                                <button className="w-full bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors font-medium text-left">
                                    Notification Preferences
                                </button>
                                <button className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors font-medium text-left">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
