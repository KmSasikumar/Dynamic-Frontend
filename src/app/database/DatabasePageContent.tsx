"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Define the Trademark interface
interface Trademark {
    id: string;
    name: string;
    owner: string;
    status: string;
    statusColor: string;
    registrationDate: string;
    expiryDate: string;
    description: string;
    classes: string[];
}

// Sample trademark database
const trademarkDatabase: Trademark[] = [
    {
        id: '88713420',
        name: 'Meta Logo',
        owner: 'FACEBOOK INC.',
        status: 'Live/Registered',
        statusColor: 'green',
        registrationDate: '28 Jan 2020',
        expiryDate: '26 Dec 2037',
        description: 'Computer services, Social Media, Networking, Virtual Communities, Community',
        classes: ['Class 45', 'Class 8', 'Class 6'],
    },
    {
        id: '88713421',
        name: 'Nike Air',
        owner: 'NIKE INC.',
        status: 'Live/Registered',
        statusColor: 'green',
        registrationDate: '15 Mar 2019',
        expiryDate: '15 Mar 2029',
        description: 'Footwear, athletic apparel, sports equipment',
        classes: ['Class 25', 'Class 28'],
    },
    {
        id: '88713422',
        name: 'Nike Pro',
        owner: 'NIKE INC.',
        status: 'Live/Registered',
        statusColor: 'green',
        registrationDate: '22 Apr 2018',
        expiryDate: '22 Apr 2028',
        description: 'Athletic clothing, performance apparel, sports accessories',
        classes: ['Class 25', 'Class 28'],
    },
    {
        id: '88713423',
        name: 'Nike Zoom',
        owner: 'NIKE INC.',
        status: 'Pending',
        statusColor: 'yellow',
        registrationDate: '10 Jun 2021',
        expiryDate: 'Pending',
        description: 'Athletic footwear, running shoes, training equipment',
        classes: ['Class 25', 'Class 28'],
    },
    {
        id: '88713424',
        name: 'Just Do It',
        owner: 'NIKE INC.',
        status: 'Live/Registered',
        statusColor: 'green',
        registrationDate: '05 Nov 1988',
        expiryDate: '05 Nov 2028',
        description: 'Apparel, footwear, marketing slogan',
        classes: ['Class 25', 'Class 35'],
    },
    {
        id: '88713425',
        name: 'Nike Swoosh',
        owner: 'NIKE INC.',
        status: 'Live/Registered',
        statusColor: 'green',
        registrationDate: '18 Sep 1995',
        expiryDate: '18 Sep 2025',
        description: 'Logo design for athletic apparel and footwear',
        classes: ['Class 25', 'Class 28'],
    },
    {
        id: '88713426',
        name: 'Apple',
        owner: 'APPLE INC.',
        status: 'Live/Registered',
        statusColor: 'green',
        registrationDate: '20 Jan 1984',
        expiryDate: '20 Jan 2034',
        description: 'Computer hardware, software, consumer electronics',
        classes: ['Class 9', 'Class 42'],
    },
];

// List of filter owners
const owners = [
    'Tesla, Inc.',
    'LEGALFORCE RAPC',
    'SpaceX Inc.',
    'NIKE INC.',
    'APPLE INC.',
    'FACEBOOK INC.'
];

export default function DatabasePageContent() {
    const searchParams = useSearchParams();
    const queryFromURL = searchParams.get('query') || '';

    const [searchTerm, setSearchTerm] = useState(queryFromURL);
    const [searchResults, setSearchResults] = useState<Trademark[]>([]);
    const [isSearched, setIsSearched] = useState(false);
    const [selectedOwners, setSelectedOwners] = useState(['Tesla, Inc.']);
    const [ownerSearch, setOwnerSearch] = useState('');
    const [displayMode, setDisplayMode] = useState('grid');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter owners based on search
    const filteredOwners = owners.filter(owner =>
        owner.toLowerCase().includes(ownerSearch.toLowerCase())
    );

    // Automatically perform search when query parameter is in URL
    useEffect(() => {
        if (queryFromURL) {
            setSearchTerm(queryFromURL);
            performSearch(queryFromURL);
        }
    }, [queryFromURL]);

    // Function to perform the search
    const performSearch = (term: string) => {
        if (!term.trim()) {
            setSearchResults([]);
            setIsSearched(false);
            return;
        }

        // Filter trademarks based on search term
        const results = trademarkDatabase.filter(trademark =>
            trademark.name.toLowerCase().includes(term.toLowerCase()) ||
            trademark.owner.toLowerCase().includes(term.toLowerCase()) ||
            trademark.description.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(results);
        setIsSearched(true);
    };

    // Perform search when search button is clicked
    const handleSearch = () => {
        performSearch(searchTerm);

        // Update URL with search term without navigating (optional)
        const url = new URL(window.location.href);
        url.searchParams.set('query', searchTerm);
        window.history.pushState({}, '', url);
    };

    // Handle Enter key for search
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Handle owner checkbox change
    const handleOwnerChange = (owner: string) => {
        if (selectedOwners.includes(owner)) {
            setSelectedOwners(selectedOwners.filter(o => o !== owner));
        } else {
            setSelectedOwners([...selectedOwners, owner]);
        }
    };

    return (
        <div className="relative w-full font-['Alexandria']">
            {/* Header Section */}
            <div className="relative w-full h-[80px] bg-[#F8FAFE] border-b border-[#EAF1FF]">
                {/* Logo (Left) with Image */}
                <div className="absolute left-[190px] top-[10px]">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-[60px] w-[120px] rounded-full"
                    />
                </div>

                {/* Search Input Group */}
                <div className="absolute left-[23.61%] right-[34.03%] top-[15px] flex items-center">
                    <div className="relative w-[610px] h-[50px]">
                        <div className="box-border w-[610px] h-[50px] bg-white border border-[#D5D5D5] rounded-[12px] flex items-center">
                            <div className="flex items-center px-[4px] gap-[8px] ml-[15px]">
                                {/* Search Icon */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                                        fill="#636363"
                                    />
                                </svg>
                                {/* Search Input */}
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Search Trademark Here eg. Mickey Mouse"
                                    className="w-[290px] h-[31px] font-['Alexandria'] font-normal text-[14px] text-[#636363] focus:outline-none"
                                />
                            </div>
                            {/* Settings Icon (right side of search input) */}
                            <div className="absolute right-[25px] top-[15px]">
                                <svg width="27" height="20" viewBox="0 0 27 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.5 16.5C11.43 16.5 9.75 14.82 9.75 12.75C9.75 10.68 11.43 9 13.5 9C15.57 9 17.25 10.68 17.25 12.75C17.25 14.82 15.57 16.5 13.5 16.5ZM4.5 16.5V12.75H6.75V16.5H4.5ZM20.25 16.5V12.75H22.5V16.5H20.25ZM4.5 9V5.25H6.75V9H4.5ZM20.25 9V5.25H22.5V9H20.25ZM13.5 5.25C11.43 5.25 9.75 3.57 9.75 1.5H17.25C17.25 3.57 15.57 5.25 13.5 5.25Z"
                                        fill="#636363"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="absolute left-[67.92%] right-[23.47%] top-[15px]">
                    <button
                        onClick={handleSearch}
                        className="flex justify-center items-center py-[16px] px-[48px] h-[50px] bg-[#4380EC] rounded-[12px] text-white font-['Alexandria'] font-bold text-[16px]"
                    >
                        Search
                    </button>
                </div>

                {/* Trademarkia Logo (Image and Text) */}
                <div className="absolute right-[20px] top-[25px] flex items-center">
                    <img
                        src="/trade-markia-image.png"
                        alt="Trademarkia Logo"
                        className="h-5 mr-2"
                    />
                    {/* <div className="text-blue-600 font-bold text-lg">Trademarkia</div> */}
                </div>
            </div>

            {/* Results Section */}
            {isSearched && (
                <div className="relative w-full bg-white">
                    {/* Info Icon and Search Results Text */}
                    <div className="flex items-center justify-end pr-[40px] border-b border-[#4380EC] pb-2">
                        <div className="absolute left-[860px] top-[20px]">
                            <div className="w-[30px] h-[30px] bg-[#C4C4C4] rounded-full flex items-center justify-center text-white font-bold">
                                i
                            </div>
                        </div>
                        <div className="absolute left-[900px] top-[20px] font-['Alexandria'] font-bold text-[16px] leading-[30px]">
                            About {searchResults.length} Trademarks found for <span className="text-[#4380EC]">"{searchTerm}"</span>
                        </div>
                    </div>

                    {/* Suggestions Button */}
                    <div className="absolute left-[3.19%] top-[65px]">
                        <button className="flex justify-center items-center h-[38px] py-[10px] px-[24px] bg-[#4380EC] rounded-[12px] text-white font-['Alexandria'] font-normal text-[16px]">
                            Suggestions
                        </button>
                    </div>

                    {/* Results Text */}
                    <div className="absolute left-[73px] top-[125px] font-['Alexandria'] font-bold text-[16px]">
                        Results
                    </div>

                    {/* Share Button */}
                    <div className="absolute right-[170px] top-[65px] w-[32px] h-[32px] bg-white border border-[#C8C8C8] rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 6.66667C16.3833 6.66667 17.5 5.55 17.5 4.16667C17.5 2.78333 16.3833 1.66667 15 1.66667C13.6167 1.66667 12.5 2.78333 12.5 4.16667C12.5 5.55 13.6167 6.66667 15 6.66667ZM5 10C6.38333 10 7.5 8.88333 7.5 7.5C7.5 6.11667 6.38333 5 5 5C3.61667 5 2.5 6.11667 2.5 7.5C2.5 8.88333 3.61667 10 5 10ZM15 13.3333C13.6167 13.3333 12.5 14.45 12.5 15.8333C12.5 17.2167 13.6167 18.3333 15 18.3333C16.3833 18.3333 17.5 17.2167 17.5 15.8333C17.5 14.45 16.3833 13.3333 15 13.3333ZM9.58333 8.83333L13.4167 6.33333C13.1667 5.68333 13.1667 4.65 13.4167 4L9.58333 1.5C9.23333 2.03333 8.65 2.41667 8 2.5V12.5C8.65 12.5833 9.23333 12.9667 9.58333 13.5L13.4167 11C13.1667 10.35 13.1667 9.48333 13.4167 8.83333Z"
                                fill="#575757"
                            />
                        </svg>
                    </div>

                    {/* Filter Button with Icon */}
                    <div className="absolute right-[70px] top-[65px] flex items-center justify-center w-[95px] h-[38px] bg-white border border-[#C8C8C8] rounded-[8px]">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 30 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-[9px] top-[10.5px]"
                        >
                            <path d="M11.6667 20H18.3333V16.6667H11.6667V20ZM0 3.33333V6.66667H30V3.33333H0ZM5 13.3333H25V10H5V13.3333Z" fill="#575757" />
                        </svg>
                        <span className="absolute left-[38px] top-[10px] font-['Alexandria'] font-normal text-[12px] text-[#575757]">
                            Filter
                        </span>
                    </div>

                    {/* Sort/List Icon */}
                    <div className="absolute right-[30px] top-[65px] w-[32px] h-[32px] bg-white border border-[#C8C8C8] rounded-full flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.5 15H7.5V13.3333H2.5V15ZM2.5 5V6.66667H17.5V5H2.5ZM2.5 10.8333H12.5V9.16667H2.5V10.8333Z"
                                fill="#575757"
                            />
                        </svg>
                    </div>

                    {/* Filter Panels - Right Side */}
                    {/* Status Panel */}
                    <div className="absolute w-[296px] h-[124px] right-[40px] top-[170px] bg-white shadow-md rounded-[10px] p-5">
                        <div className="text-[16px] font-bold mb-3">Status</div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setStatusFilter('all')}
                                className={`px-3 py-1 rounded-full text-[12px] ${
                                    statusFilter === 'all'
                                        ? 'bg-[#EAF1FF] text-[#4380EC]'
                                        : 'bg-white border border-gray-200'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setStatusFilter('registered')}
                                className={`px-3 py-1 flex items-center gap-1 rounded-full text-[12px] ${
                                    statusFilter === 'registered'
                                        ? 'bg-[#EAF1FF] text-[#4380EC]'
                                        : 'bg-white border border-gray-200'
                                }`}
                            >
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Registered
                            </button>
                            <button
                                onClick={() => setStatusFilter('pending')}
                                className={`px-3 py-1 flex items-center gap-1 rounded-full text-[12px] ${
                                    statusFilter === 'pending'
                                        ? 'bg-[#EAF1FF] text-[#4380EC]'
                                        : 'bg-white border border-gray-200'
                                }`}
                            >
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                Pending
                            </button>
                            <button
                                onClick={() => setStatusFilter('abandoned')}
                                className={`px-3 py-1 flex items-center gap-1 rounded-full text-[12px] ${
                                    statusFilter === 'abandoned'
                                        ? 'bg-[#EAF1FF] text-[#4380EC]'
                                        : 'bg-white border border-gray-200'
                                }`}
                            >
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                Abandoned
                            </button>
                            <button
                                onClick={() => setStatusFilter('others')}
                                className={`px-3 py-1 flex items-center gap-1 rounded-full text-[12px] ${
                                    statusFilter === 'others'
                                        ? 'bg-[#EAF1FF] text-[#4380EC]'
                                        : 'bg-white border border-gray-200'
                                }`}
                            >
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Others
                            </button>
                        </div>
                    </div>

                    {/* Display Options Panel */}
                    <div className="absolute w-[296px] h-[120px] right-[40px] top-[310px] bg-white shadow-md rounded-[10px] p-5">
                        <div className="text-[16px] font-bold mb-3">Display</div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setDisplayMode('grid')}
                                className={`px-4 py-2 border border-gray-200 rounded-md text-[13px] ${
                                    displayMode === 'grid'
                                        ? 'bg-[#EAF1FF] text-[#4380EC]'
                                        : 'bg-white'
                                }`}
                            >
                                Grid View
                            </button>
                            <button
                                onClick={() => setDisplayMode('list')}
                                className={`px-4 py-2 border border-gray-200 rounded-md text-[13px] ${
                                    displayMode === 'list'
                                        ? 'bg-[#EAF1FF] text-[#4380EC]'
                                        : 'bg-white'
                                }`}
                            >
                                List View
                            </button>
                        </div>
                    </div>

                    {/* Owners Panel */}
                    <div className="absolute w-[296px] h-[265px] right-[40px] top-[450px] bg-white shadow-md rounded-[12px] p-5">
                        <div className="flex justify-between mb-3">
                            <div className="text-[16px] font-bold">Owners</div>
                            <div className="text-[12px] text-gray-500 flex gap-2">
                                <span className="text-gray-500">Law Firms</span>
                                <span className="text-[#4380EC]">Attorneys</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={ownerSearch}
                                    onChange={(e) => setOwnerSearch(e.target.value)}
                                    placeholder="Search Owners"
                                    className="w-full h-[36px] pl-8 pr-2 border border-gray-200 rounded-md text-[13px]"
                                />
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-2 top-[10px]"
                                >
                                    <path
                                        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                                        fill="#636363"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {filteredOwners.slice(0, 4).map((owner, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedOwners.includes(owner)}
                                        onChange={() => handleOwnerChange(owner)}
                                        className="w-4 h-4 accent-[#4380EC]"
                                    />
                                    <span className="text-[14px]">{owner}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Search Results Listing */}
                    <div className="absolute w-[720px] left-[59px] top-[170px]">
                        {/* Result Items */}
                        {searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="flex bg-white p-4 mb-4 border-b border-gray-100"
                            >
                                {/* Trademark Image */}
                                <div className="w-[85px] h-[85px] mr-4 bg-gray-100 flex items-center justify-center border border-gray-200 relative">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect width="24" height="24" fill="#E5E5E5" />
                                    </svg>
                                    <div className="absolute right-1 bottom-1">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 10.34 13.66 9 12 9Z"
                                                fill="#A0A0A0"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Trademark Info */}
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <div>
                                            <h3 className="text-[16px] font-bold">{result.name}</h3>
                                            <p className="text-[13px] text-gray-500">{result.owner}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <span
                                                className={`flex items-center text-[13px] mr-2 ${
                                                    result.statusColor === 'green'
                                                        ? 'text-green-500'
                                                        : result.statusColor === 'yellow'
                                                        ? 'text-yellow-500'
                                                        : result.statusColor === 'red'
                                                        ? 'text-red-500'
                                                        : 'text-blue-500'
                                                }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full mr-1 ${
                                                        result.statusColor === 'green'
                                                            ? 'bg-green-500'
                                                            : result.statusColor === 'yellow'
                                                            ? 'bg-yellow-500'
                                                            : result.statusColor === 'red'
                                                            ? 'bg-red-500'
                                                            : 'bg-blue-500'
                                                    }`}
                                                ></span>
                                                {result.status}
                                            </span>
                                            <span className="text-[12px] text-gray-500">
                                                {result.registrationDate}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-3">
                                        <div>
                                            <p className="text-[12px] mb-1">
                                                {result.description}
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                {result.classes.map((cls, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-gray-100 rounded-md text-[11px]"
                                                    >
                                                        {cls}
                                                    </span>
                                                ))}
                                                {result.classes.length > 3 && (
                                                    <span className="px-2 py-1 text-[11px]">...</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-[12px] text-red-500 flex items-center">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-1"
                                                >
                                                    <path
                                                        d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM12 13H17V18H12V13Z"
                                                        fill="#FF5757"
                                                    />
                                                </svg>
                                                {result.expiryDate}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-1">
                                        <p className="text-[12px] text-gray-500">{result.id}</p>
                                        <p className="text-[12px] text-gray-500">{result.registrationDate}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {searchResults.length === 0 && isSearched && (
                            <div className="text-center py-10">
                                <p className="text-lg text-gray-500">
                                    No trademarks found matching "{searchTerm}"
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Try adjusting your search terms
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
