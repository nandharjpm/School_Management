import { useEffect } from "react";
import Header from "../admin/partial/Header";
import Footer from "../admin/partial/Footer";
import schoolImage from "../../img/home_page/high_school.png";
import schoolImage2 from "../../img/home_page/high_school2.png";

export default function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElems = document.querySelectorAll(".parallax");
      parallaxElems.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed")) || 0.3;
        el.style.transform = `translateY(${window.scrollY * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const achievements = [
    {
      title: "Academic Excellence",
      points: [
        "Consistently ranked among the Top 10 Schools in the district for board exam results",
        "Achieved a 100% pass percentage for five consecutive years",
        "Students secured national-level scholarships and admissions into prestigious institutions like IITs, NITs, and international universities",
      ],
    },
    {
      title: "Sports & Athletics",
      points: [
        "Winners of the State-Level Inter-School Football Championship 2024",
        "Gold medals in Athletics, Swimming, and Karate at regional and national levels",
        "Our school hosted the Annual State Sports Meet 2023 with over 1000 participants",
      ],
    },
    {
      title: "Arts & Culture",
      points: [
        "Our students won the Best Cultural Performance Award at the National Youth Festival",
        "Recognized for excellence in Drama, Classical Dance, and Music Competitions across India",
        "Annual art exhibitions have been featured in local and state-level media",
      ],
    },
    {
      title: "Innovation & Technology",
      points: [
        "Winners of the National Science Exhibition for projects in renewable energy and robotics",
        "Ranked among the Top 5 Schools in India for Coding & AI initiatives in 2024",
        "Students developed a Mobile App for Smart Learning, featured in an educational magazine",
      ],
    },
  ];

  return (
    <div>
      <Header />

      <div className="mb-0">
        {/* Hero Section */}
        <div className="relative w-full h-screen overflow-hidden parallax">
          <img
            src={schoolImage}
            alt="High School"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-10 parallax">

            <div className="mt-10 relative max-w-4xl w-full">
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:scale-105 transform transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl border-2 border-gradient-to-r from-purple-400 via-pink-400 to-blue-400 -z-10 blur-sm" />
                <p className="italic text-gray-100 leading-relaxed tracking-wide text-lg md:text-xl text-center">
                  Our school application is designed to make learning,
                  communication, and management easier for everyone in the
                  school community. It provides a simple, user-friendly platform
                  where students, teachers, and parents can stay connected and
                  updated. With this app, students can access important
                  resources, view timetables, track assignments, and stay
                  informed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="relative w-full h-screen mt-20 overflow-hidden">
          <img
            src={schoolImage2}
            alt="High School"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-10 ">
            <h1 className="text-5xl sm:text-6xl md:text-7xl italic font-extrabold mb-12 tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text drop-shadow-2xl text-center">
              Achievements
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-7xl ">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 transform transition-transform duration-700 hover:scale-105 hover:-translate-y-4 hover:shadow-3xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h2>
                  <ul className="text-gray-100 list-disc list-inside space-y-2">
                    {item.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
