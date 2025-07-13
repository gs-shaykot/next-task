'use client';
import { useState } from 'react';
import SearchBar from './(components)/SearchBar';
import CollegeCard from './(components)/CollegeCard';

export default function ClientHome({ featuredColleges }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredColleges = featuredColleges.filter((college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="mb-16">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect College</h1>
                    <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                        Discover top universities, explore programs, and take the next step in your academic journey
                    </p>

                    <SearchBar onSearch={setSearchQuery} />
                </div>
            </div>
            <section className='max-w-7xl mx-auto px-4 py-12'>
                <h2 className="container mx-auto text-3xl font-bold text-gray-900 mt-10 mb-8">Featured Colleges</h2>
                <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredColleges.map((college) => (
                        <CollegeCard key={college.id} {...college} />
                    ))}
                </div>
            </section>
        </section>
    );
}
