// here is the code for SearchBar.jsx
'use client';
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="w-5 h-5 flex items-center justify-center">
                        <RiSearchLine className="ri-search-line text-gray-400"/> 
                    </div>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block text-black w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder='Search colleges...'
                />
                <button
                    type="submit"
                    className="absolute bg-blue-600 text-white inset-y-0 right-0 px-3 flex items-center text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
