import { useEffect } from "react";
import Header from "../admin/partial/Header";
import Footer from "../admin/partial/Footer";
import schoolImage from "../../img/home_page/high_school.png";
import schoolImage2 from "../../img/home_page/high_school2.png";

export default function Innovations() {
  return (
    <div>
      <Header />

      <section className="py-16 px-6 md:px-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 mt-10">
          Our Innovations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[
            {
              id: 1,
              title: "AI-Powered Learning Platform",
              description:
                "A platform leveraging AI to personalize learning for students.",
              image: schoolImage, // replace with actual innovation images
            },
            {
              id: 2,
              title: "Green Campus Initiative",
              description:
                "Promoting sustainability with eco-friendly infrastructure.",
              image: schoolImage2,
            },
            {
              id: 3,
              title: "Robotics Lab",
              description:
                "Hands-on robotics lab enabling students to build innovative solutions.",
              image: schoolImage,
            },
            {
              id: 4,
              title: "Digital Library Project",
              description:
                "Digitizing resources for easy access and remote learning.",
              image: schoolImage2,
            },
          ].map((innovation) => (
            <div
              key={innovation.id}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={innovation.image}
                alt={innovation.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {innovation.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {innovation.description}
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
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
