import axios from 'axios';
import Image from 'next/image';
import StarRating from './home_Component/(components)/StarRating';
import { RiExternalLinkLine } from 'react-icons/ri';
import ClientHome from './home_Component/ClientHome';
import ReviewSlider from './home_Component/ReviewSlider';

export default async function Home() {
  const featuredColleges = [
    {
      id: '1',
      name: 'Stanford University',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20modern%20university%20campus%20with%20red%20brick%20buildings%2C%20green%20lawns%2C%20students%20walking%2C%20clear%20sky%2C%20academic%20atmosphere%2C%20prestigious%20college%20setting&width=400&height=250&seq=stanford1&orientation=landscape',
      admissionDate: 'Dec 15, 2024',
      events: 'Tech Innovation Summit, Career Fair',
      research: 'AI & Machine Learning, Biomedical Engineering',
      sports: 'Basketball, Swimming, Tennis',
    },
    {
      id: '2',
      name: 'Harvard University',
      image: 'https://readdy.ai/api/search-image?query=Historic%20ivy%20league%20university%20campus%20with%20classical%20architecture%2C%20brick%20buildings%2C%20autumn%20trees%2C%20students%20studying%20outdoors%2C%20prestigious%20academic%20environment&width=400&height=250&seq=harvard1&orientation=landscape',
      admissionDate: 'Jan 10, 2025',
      events: 'Law Symposium, Medical Conference',
      research: 'Medical Research, Economics, Political Science',
      sports: 'Rowing, Football, Soccer',
    },
    {
      id: '3',
      name: 'MIT',
      image: 'https://readdy.ai/api/search-image?query=Modern%20technology%20university%20campus%20with%20futuristic%20buildings%2C%20glass%20architecture%2C%20students%20with%20laptops%2C%20innovation%20labs%2C%20engineering%20focused%20environment&width=400&height=250&seq=mit1&orientation=landscape',
      admissionDate: 'Feb 1, 2025',
      events: 'Robotics Competition, Startup Pitch Day',
      research: 'Robotics, Computer Science, Nuclear Engineering',
      sports: 'Tech Olympics, Chess, Cycling',
    },
  ];

  const galleryImages = [
    'https://readdy.ai/api/search-image?query=Happy%20diverse%20group%20of%20college%20graduates%20in%20caps%20and%20gowns%20celebrating%20graduation%20ceremony%2C%20throwing%20caps%20in%20air%2C%20university%20campus%20background%2C%20joyful%20moment&width=300&height=200&seq=grad1&orientation=landscape',
    'https://readdy.ai/api/search-image?query=University%20graduation%20ceremony%20with%20students%20in%20academic%20regalia%2C%20proud%20families%20watching%2C%20outdoor%20campus%20setting%2C%20celebratory%20atmosphere%2C%20achievement%20moment&width=300&height=200&seq=grad2&orientation=landscape',
    'https://readdy.ai/api/search-image?query=Group%20photo%20of%20college%20friends%20after%20graduation%2C%20diverse%20students%20smiling%20together%2C%20campus%20quad%20background%2C%20friendship%20and%20success%20celebration&width=300&height=200&seq=grad3&orientation=landscape',
    'https://readdy.ai/api/search-image?query=Graduate%20students%20with%20diplomas%20posing%20together%2C%20academic%20achievements%2C%20university%20building%20backdrop%2C%20proud%20graduation%20moment%2C%20multicultural%20group&width=300&height=200&seq=grad4&orientation=landscape',
    'https://readdy.ai/api/search-image?query=College%20graduation%20group%20selfie%2C%20students%20in%20graduation%20attire%2C%20campus%20fountain%20background%2C%20happy%20celebration%2C%20academic%20milestone%20achievement&width=300&height=200&seq=grad5&orientation=landscape',
    'https://readdy.ai/api/search-image?query=University%20commencement%20ceremony%20crowd%20shot%2C%20graduates%20and%20families%20celebrating%2C%20outdoor%20campus%20venue%2C%20academic%20regalia%2C%20ceremonial%20atmosphere&width=300&height=200&seq=grad6&orientation=landscape',
  ];

  const researchPapers = [
    { title: 'AI in Healthcare: Revolutionary Approaches', author: 'Sarah Chen', university: 'Stanford', field: 'Medical AI' },
    { title: 'Sustainable Energy Solutions for Urban Areas', author: 'Marcus Johnson', university: 'MIT', field: 'Environmental Science' },
    { title: 'Quantum Computing Applications in Finance', author: 'Elena Rodriguez', university: 'Harvard', field: 'Computer Science' },
    { title: 'Biomedical Engineering Breakthroughs', author: 'David Kim', university: 'Stanford', field: 'Bioengineering' },
  ];

  let reviews = [];

  try {
    const res = await axios.get(`https://next-task-plum.vercel.app/api/reviews`);
    reviews = res.data;
  } catch (error) {
    console.error('Failed to fetch reviews:', error.message);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHome featuredColleges={featuredColleges} />
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Graduate Success Stories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  width={190}
                  height={142}
                  src={image}
                  alt={`Graduate group ${index + 1}`}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Research Papers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Research</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {researchPapers.map((paper, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{paper.title}</h3>
                  <RiExternalLinkLine className="text-blue-600 w-5 h-5" />
                </div>
                <p className="text-gray-600 mb-2">By {paper.author} • {paper.university}</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {paper.field}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <ReviewSlider reviews={reviews} />
      </div>
    </div>
  );
}
