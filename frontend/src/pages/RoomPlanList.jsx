
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Calendar, Map, Layers } from "lucide-react";
import axios from "../utils/axiosIntance";

export default function RoomPlanList() {
    const navigate = useNavigate();
  const [roomPlans, setRoomPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("/api/room/list", {
          headers: { Authorization: localStorage.getItem("token") },
        });

        const allPlans = response.data.result || [];

        // Group plans by floorPlan image (remove duplicates)
        const uniquePlans = Object.values(
          allPlans.reduce((acc, plan) => {
            if (!acc[plan.floorPlan]) {
              acc[plan.floorPlan] = plan; // keep first plan for each unique floorPlan
            }
            return acc;
          }, {})
        );

        setRoomPlans(uniquePlans);
        console.log(uniquePlans)
      } catch (error) {
        console.error("Failed to fetch room plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-6">
        <div className="bg-gray-200 p-10 rounded-lg">
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
             Your Plans
            </h2>

            <div className="bg-white p-1 rounded-lg">
            <button onClick={()=>{navigate('/create')}} className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-lg transition-all duration-300 cursor-pointer">Create new plan</button>
            </div>
        </div>

      {roomPlans.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No room plans found. Please create one.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {roomPlans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {/* Floor Plan Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={plan.floorPlan}
                  alt={plan.roomName}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Room Info */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Map size={18} className="text-blue-600" />
                  {plan.planName}
                </h3>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Layers size={16} className="text-green-600" />
                  Shape: {plan.shapeTypes || "N/A"}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  Created: {new Date(plan.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Button */}
              <div className="px-4 pb-4 flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/room-plan/${plan._id}`, {
                      state: { userId: plan._id },
                    })
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  View & Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
    </div>
  );
}
