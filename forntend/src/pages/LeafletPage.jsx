
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { saveRoom } from "../utils/SaveOnCreate";

export default function LeafletPage({ imageUrl,planName }) {
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  const [roomNamePopup, setRoomNamePopup] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [currentLayer, setCurrentLayer] = useState(null);
  const [currentShapeType, setCurrentShapeType] = useState(null);

  //Initialize map and controls
  useEffect(() => {
    const existingMap = L.DomUtil.get("map");
    if (existingMap) existingMap._leaflet_id = null;

    const map = L.map("map", { crs: L.CRS.Simple, minZoom: -5 });
    mapRef.current = map;
    setMapInstance(map);
    map.setView([0, 0], 0);

    drawnItemsRef.current = new L.FeatureGroup();
    map.addLayer(drawnItemsRef.current);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        rectangle: true,
        circle: false,
        polyline: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItemsRef.current,
        remove: true,
      },
    });

    map.addControl(drawControl);

    //When shape created → open popup
    map.on(L.Draw.Event.CREATED, (e) => {
      const { layerType, layer } = e;
      setCurrentLayer(layer);
      setCurrentShapeType(layerType);
      setRoomNamePopup(true);
    });

    // When shape edited → update backend
    map.on(L.Draw.Event.EDITED, async (e) => {
      e.layers.eachLayer(async (layer) => {
        try {
          const updatedCoords = layer.toGeoJSON().geometry.coordinates;
        //   const id = layer.options.roomId;
          const id = localStorage.getItem('room');
          console.log(id);

          if (!id) {
            console.warn("No room ID found for this layer!");
            return;
          }

          const res = await axios.put(
            `http://localhost:3323/api/room/update/${id}`,
            { coordinates: updatedCoords }
          );

          console.log("Room updated successfully:", res.data);
        } catch (error) {
          console.error("Failed to update room:", error);
        }
      });
    });

    //When shape deleted → delete backend
    map.on(L.Draw.Event.DELETED, async (e) => {
      e.layers.eachLayer(async (layer) => {
        try {
          const id = localStorage.getItem('room');
        //   const id = layer.options.roomId;
          if (id) {
            await axios.delete(`http://localhost:3323/api/room/delete/${id}`);
            console.log("🗑️ Room deleted:", id);
          }
        } catch (error) {
          console.error("Failed to delete room:", error);
        }
      });
    });

    return () => map.remove();
  }, []);

  // Load saved rooms when image loads
  useEffect(() => {
    if (!imageUrl || !mapRef.current) return;

    const map = mapRef.current;
    const img = new Image();

    img.onload = async () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      if (map._imageOverlay) {
        map.removeLayer(map._imageOverlay);
      }

      map._imageOverlay = L.imageOverlay(imageUrl, [[0, 0], [h, w]], {
        interactive: true,
      }).addTo(map);

      map.fitBounds([[0, 0], [h, w]]);
      map.setMaxBounds([[0, 0], [h, w]]);

      // Fetch saved rooms from backend
      try {
        const res = await axios.get("http://localhost:3323/api/room/lit",{headers:{Authorization:localStorage.getItem('token')}});
        const rooms = res.data.result;

        rooms.forEach((room) => {
          // Create a Leaflet layer from saved GeoJSON coordinates
          const layer = L.polygon(room.coordinates, { color: "blue" }).addTo(drawnItemsRef.current);

          // Bind tooltip with saved room name
          layer
            .bindTooltip(room.roomName, {
              permanent: true,
              direction: "center",
              className: "room-label",
            })
            .openTooltip();

          // Store MongoDB ID on the layer
          layer.options.roomId = room._id;
        });
      } catch (err) {
        console.error("Failed to load saved rooms:", err);
      }
    };

    img.src = imageUrl;
  }, [imageUrl,planName]);

  // Save new room
  const handleSaveName = async () => {
    if (!roomName || !currentLayer) {
      alert("Please enter a room name!");
      return;
    }

    try {
      const floorPlan = imageUrl;

      currentLayer.addTo(drawnItemsRef.current);

      currentLayer
        .bindTooltip(roomName, {
          permanent: true,
          direction: "center",
          className: "room-label",
        })
        .openTooltip();

      const savedRoom = await saveRoom({
        layer: currentLayer,
        layerType: currentShapeType,
        floorPlan,
        roomName,
        planName
      });

      // Save MongoDB ID in the layer
      currentLayer.options.roomId = savedRoom._id;

      console.log("Room saved successfully:", savedRoom);

      setRoomName("");
      setCurrentLayer(null);
      setCurrentShapeType(null);
      setRoomNamePopup(false);
    } catch (err) {
      console.error("Failed to save room:", err);
      alert("Failed to save room!");
    }
  };

  return (
    <div>
      <div
        className="w-full rounded-lg shadow"
        id="map"
        style={{ height: 600, border: "1px solid #ddd" }}
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

      {/* Room Name Popup */}
      {roomNamePopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-5 rounded-lg shadow-lg w-80 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-700">Enter Room Name</h2>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Room name"
              className="border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRoomNamePopup(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveName}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

