import axios from 'axios';
import CollegeReviewSection from './CollegeReviewSection';

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

export default async function MyCollegePage() {
  let appliedData = [];

  try {
    const res = await axios.get(`/api/applied`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
    appliedData = res.data;
  } catch (error) {
    console.error('Error fetching applied colleges:', error.message);
  }

  let myCollege = null;
  if (Array.isArray(appliedData) && appliedData.length > 0) {
    const firstCollageName = appliedData[0]?.collegeName;
    myCollege = colleges.find((college) => college.name === firstCollageName);
  } 
  if (!myCollege) {
    return <p className="text-center py-20 text-red-500">No college data found.</p>;
  }

  return <CollegeReviewSection myCollege={myCollege} appliedData={appliedData} />;
}
