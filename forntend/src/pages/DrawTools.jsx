// DrawTools.js
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw"; // attaches to L

export default function DrawTools({ map, onCreated }) {
  const groupRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    // one featureGroup to hold shapes
    groupRef.current = L.featureGroup().addTo(map);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        rectangle: true,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: groupRef.current,
        remove: true,
      },
    });
    map.addControl(drawControl);

    // handle CREATED
    const created = (e) => {
      const layer = e.layer;
      groupRef.current.addLayer(layer);
      onCreated?.(layer, e.layerType);
    };
    map.on(L.Draw.Event.CREATED, created);

    return () => {
      map.off(L.Draw.Event.CREATED, created);
      map.removeControl(drawControl);
      map.removeLayer(groupRef.current);
    };
  }, [map, onCreated]);

  return null;
}
