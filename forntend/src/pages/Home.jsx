import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560185008-c5f7b72c226c?auto=format&fit=crop&w=1400&q=80"
          alt="Room Mapping"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center text-center min-h-screen px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to <span className="text-blue-400">Room Mapping</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Easily manage, map, and organize your rooms with a simple and
          intuitive interface. Start exploring and creating your plans today!
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/room-plans"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-lg transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-24"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L60,112C120,128,240,160,360,154.7C480,149,600,107,720,85.3C840,64,960,64,1080,85.3C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
