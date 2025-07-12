import React from 'react'
import { FiSearch } from 'react-icons/fi';
export default function Hero() {
    return (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect College</h1>
                <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                    Discover top universities, explore programs, and take the next step in your academic journey
                </p>
                <div className="mt-8">
                    <form className="w-full max-w-2xl mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <FiSearch className="text-gray-400" />
                                </div>
                            </div>
                            <input
                                type="text"
                                className="text-black block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='search colleges'
                            />
                            <button
                                type="submit"
                                className="absolute inset-y-0 right-0 px-3 flex bg-blue-600 text-white items-center  cursor-pointer whitespace-nowrap"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
