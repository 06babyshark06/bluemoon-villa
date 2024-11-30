"use client";

import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

var redIcon = L.icon({
  iconUrl: '/marker.png',
  iconSize:     [38, 70], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [route, setRoute] = useState([]);
  const center = { lng: 105.853333, lat: 21.028333 };
  const [zoom] = useState(16);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new MaptilerLayer({
      apiKey: "XHwWnM6RBCJWvrZKpYbd",
    }).addTo(map.current);
    // Map click event to add markers
    map.current.on("click", (event) => {
      const { lat, lng } = event.latlng;
      const newMarker = { lat, lng };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    });
  }, [center.lng, center.lat, zoom]);
  const calculateTSP = () => {
    if (markers.length < 2) return;

    // Placeholder TSP: just draw a path connecting markers in order
    const newRoute = markers.map((marker) => L.latLng(marker.lat, marker.lng));
    setRoute(newRoute);
  };
  const clearMap = () => {
    setMarkers([]);
    setRoute([]);
  };
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers and route
    map.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.current.removeLayer(layer);
      }
    });

    // Add new markers
    markers.forEach((marker) => {
      L.marker([marker.lat, marker.lng],{icon: redIcon}).addTo(map.current);
    });

    // Add route if available
    if (route.length > 0) {
      L.polyline(route, { color: "blue", weight: 4, opacity: 0.7 }).addTo(
        map.current
      );
    }
  }, [markers, route]);

  return (
    <div className="w-full h-full mt-10 pt-10">
      <div ref={mapContainer} className="w-full h-5/6" />
      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={calculateTSP}
        >
          Tính lộ trình
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={clearMap}
        >
          Xóa tất cả
        </button>
      </div>
    </div>
  );
};

export default Map;
