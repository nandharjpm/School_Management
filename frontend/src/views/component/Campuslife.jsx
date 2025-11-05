import { useEffect } from "react";
import Header from "../admin/partial/Header";
import Footer from "../admin/partial/Footer";
import schoolImage from "../../img/home_page/high_school.png";
import schoolImage2 from "../../img/home_page/high_school2.png";

export default function Campuslife() {
  return (
    <div>
      <Header />

      {/* Campus Life Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 mt-10">
          Campus Life
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[
            {
              id: 1,
              title: "Modern Library",
              description:
                "A spacious, tech-enabled library with digital and print resources.",
              image: schoolImage,
            },
            {
              id: 2,
              title: "Sports & Recreation",
              description:
                "State-of-the-art sports facilities for football, basketball, and more.",
              image: schoolImage2,
            },
            {
              id: 3,
              title: "Hostel & Accommodation",
              description:
                "Comfortable and safe hostels fostering a vibrant student community.",
              image: schoolImage,
            },
            {
              id: 4,
              title: "Cultural & Tech Events",
              description:
                "Regular events, fests, and workshops to nurture talent and creativity.",
              image: schoolImage2,
            },
          ].map((campus) => (
            <div
              key={campus.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={campus.image}
                alt={campus.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {campus.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {campus.description}
                </p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
