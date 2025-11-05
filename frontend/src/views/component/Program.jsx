import { useEffect } from "react";
import Header from "../admin/partial/Header";
import Footer from "../admin/partial/Footer";
import schoolImage from "../../img/home_page/high_school.png";
import schoolImage2 from "../../img/home_page/high_school2.png";

export default function Program() {
  const programs = [
    {
      id: 1,
      title: "Bachelor of Computer Science Engineering",
      description: "Explore core computing, and software development concepts.",
      image: schoolImage,
    },
    {
      id: 2,
      title: "Bachelor of Civil Engineering",
      description: "Learn construction, safety principles.",
      image: schoolImage2,
    },
    {
      id: 3,
      title: "Bachelor of Aero Space Egineering",
      description: "explore thing of different space craft and working principles",
      image: schoolImage,
    },
    {
      id: 4,
      title: "Bachlore of Mechanical Engineering",
      description: "Learning the all stuff of Mechanical from small thing to big thing like automobile etc...",
      image: schoolImage2,
    },
    {
      id: 5,
      title: "Bachlore Information Technology",
      description: "Develop leadership and strategic thinking Neural Networks, Meachine Learning.",
      image: schoolImage,
    },
    {
      id: 6,
      title: "Bachlore of Electrical Engineering",
      description: "Learning the all electrical and electronic equipment and how to handle.",
      image: schoolImage2,
    },
    {
      id: 7,
      title: "Bachlore of Chemical Engineering",
      description: "Divine to explore to find new chemicals.",
      image: schoolImage,
    },
    {
      id: 8,
      title: "Bachlore of Food Technology",
      description: "To Develop the quality of the food product for a Healthy Life.",
      image: schoolImage,
    },
  ];

  return (
    <div>
      <Header />

      {/* Program Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 mt-10">
          Our Programs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {program.description}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
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
