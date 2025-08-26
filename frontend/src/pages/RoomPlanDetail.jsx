
import { Loader2, SquarePen, Trash2 } from "lucide-react"; 
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "../utils/axiosIntance";

export default function RoomPlanDetail() {
  const { id } = useParams(); // Floor plan id
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(new L.FeatureGroup());

  const [plan, setPlan] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
//   console.log(plan.planName);
  //Fetch floor plan & rooms
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`/api/room/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        const selectedPlan = res.data.result;
        setPlan(selectedPlan);

        const response = await axios.get(`/api/room/list`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        
        //Filter only rooms with the same floorPlan
        const filteredRooms = response.data.result.filter(
          (room) => room.floorPlan === selectedPlan.floorPlan
        );

        setRooms(filteredRooms);
      } catch (error) {
        console.error("Failed to fetch plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);
  
  // Initialize map & show floor plan + rooms + enable drawing new shapes
  useEffect(() => {
  if (!plan) return;

  // If there's already a map instance, destroy it before creating a new one
  if (mapRef.current) {
    mapRef.current.eachLayer((layer) => {
      layer.remove();
    });
    mapRef.current.off();
    mapRef.current.remove();
    mapRef.current = null;
  }

  const mapContainer = document.getElementById("map");
  if (!mapContainer) return; // Prevents missing container issue

  // Initialize a fresh map instance
  const map = L.map(mapContainer, { crs: L.CRS.Simple, minZoom: -5 });
  mapRef.current = map;

  // Reset drawn items
  drawnItemsRef.current = new L.FeatureGroup();
  map.addLayer(drawnItemsRef.current);

  const img = new Image();
  img.onload = () => {
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    // Set floor plan background image
    L.imageOverlay(plan.floorPlan, [[0, 0], [h, w]]).addTo(map);
    map.fitBounds([[0, 0], [h, w]]);
    map.setMaxBounds([[0, 0], [h, w]]);

    // Draw all saved rooms
    rooms.forEach((room) => {
      const convertedCoords = room.coordinates[0].map(([x, y]) => [y, x]);

      const layer = L.polygon(convertedCoords, {
        color: room._id === id ? "yellow" : "blue",
        fillOpacity: 0.5,
      }).addTo(drawnItemsRef.current);

      layer.bindTooltip(room.roomName, {
        permanent: true,
        direction: "center",
        className: "room-label",
      });

      layer.options.roomId = room._id;
    });
  };
  img.src = plan.floorPlan;

  // Draw + Edit + Delete Controls
  const drawControl = new L.Control.Draw({
    draw: {
      polygon: true,
      rectangle: true,
      circle: false,
      marker: false,
      polyline: false,
      circlemarker: false,
    },
    edit: {
      featureGroup: drawnItemsRef.current,
      remove: true,
    },
  });
  map.addControl(drawControl);

  // Create New Room
  map.on(L.Draw.Event.CREATED, async (e) => {
    const layer = e.layer;
    const drawnCoords = layer.getLatLngs()[0].map(({ lat, lng }) => [lng, lat]);

    const roomName = prompt("Enter Room Name:");
    if (!roomName) {
      alert("Room name is required!");
      return;
    }

    try {
      const res = await axios.post(
        `/api/room/create`,
        {
          roomName,
         planName: plan.planName,
          coordinates: [drawnCoords],
          shapeTypes: e.layerType,
          floorPlan: plan.floorPlan,
          userId: plan.userId,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      alert("Room created successfully!");
      setRooms((prev) => [...prev, res.data.result]);

      layer.bindTooltip(roomName, {
        permanent: true,
        direction: "center",
        className: "room-label",
      });
      drawnItemsRef.current.addLayer(layer);
    } catch (error) {
      console.error("Failed to create room:", error);
      alert("Failed to create room!");
    }
  });

  //Update Room on Edit
  map.on(L.Draw.Event.EDITED, async (e) => {
    e.layers.eachLayer(async (layer) => {
      try {
        const updatedCoords = layer.getLatLngs()[0].map(({ lat, lng }) => [lng, lat]);

        await axios.put(
          `/api/room/update/${layer.options.roomId}`,
          { coordinates: [updatedCoords] },
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        alert("Room updated successfully!");
        setRooms((prev) =>
          prev.map((room) =>
            room._id === layer.options.roomId
              ? { ...room, coordinates: [updatedCoords] }
              : room
          )
        );
      } catch (error) {
        console.error("Failed to update room:", error);
        alert("Failed to update room!");
      }
    });
  });

  //Delete Room
  map.on(L.Draw.Event.DELETED, async (e) => {
    e.layers.eachLayer(async (layer) => {
      try {
        await axios.delete(
          `/api/room/delete/${layer.options.roomId}`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        alert("Room deleted successfully!");
        setRooms((prev) =>
          prev.filter((room) => room._id !== layer.options.roomId)
        );
      } catch (error) {
        console.error("Failed to delete room:", error);
        alert("Failed to delete room!");
      }
    });
  });

  return () => {
    map.off();
    map.remove();
    mapRef.current = null;
  };
}, [plan, rooms, id]);

console.log(rooms)
// console.log(filteredRooms)

const handleDeletePlan = async ()=>{
    const ids=rooms.map((room)=>{
        return room._id;
    });

    console.log(ids)
    if (window.confirm("Are you sure you want to delete this plan?")) {
              await axios.post(
                `/api/room/deleteplan`,{ids}
                ,{ headers: { Authorization: localStorage.getItem("token") } }
              );
       navigate("/room-plans");
    }

    // alert(plan.floorPlan)
}
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!plan) {
    return <p className="text-center text-gray-600">Plan not found!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
        <div className="flex gap-3">
            <button onClick={()=>{navigate(-1)}} className="bg-gray-500 px-3 py-1 rounded border-2 border-white text-white">Back</button>
            <button onClick={()=>{navigate('/create')}} className="flex items-center justify-evenly gap-2 bg-green-500 hover:bg-green-700 transition-all duration-300 px-3 py-1 rounded border-2 border-green-200 text-white"><SquarePen size={16} />create new</button>
        </div>
      <div className="flex justify-between items-center mb-6"> 
        <h2 className="text-2xl font-bold text-gray-800">
          Plan — {plan.planName}
        </h2>
        <button
          onClick={() => {handleDeletePlan()}}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <Trash2 size={18} /> Delete Plan
        </button>
      </div>

      {/* Map */}
      <div
        id="map"
        className="w-full border border-gray-300 rounded-lg shadow"
        style={{ height: 600 }}
      />

      <style>
        {`
          .room-label {
            font-weight: bold;
            background: rgba(255,255,255,0.7);
            border: none;
            padding: 2px;
          }
        `}
      </style>
    </div>
  );
}
