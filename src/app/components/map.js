"use client";

import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { Button, Typography } from "@material-tailwind/react";

var redIcon = L.icon({
  iconUrl: "/marker.png",
  iconSize: [38, 70], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const calculateDistance = (position1, position2) => {
  const dx = position1.lat - position2.lat;
  const dy = position1.lng - position2.lng;
  return Math.sqrt(dx * dx + dy * dy);
};
const calculateCost = (path, positions) => {
  let totalCost = 0;
  for (let i = 0; i < path.length - 1; i++) {
    totalCost += calculateDistance(positions[path[i]], positions[path[i + 1]]);
  }
  totalCost += calculateDistance(
    positions[path[path.length - 1]],
    positions[path[0]]
  );
  return totalCost;
};
const generatePermutations = (array) => {
  if (array.length === 0) return [[]];
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    const remaining = array.slice(0, i).concat(array.slice(i + 1));
    for (let perm of generatePermutations(remaining)) {
      result.push([current, ...perm]);
    }
  }
  return result;
};
const travelingSalesmanBruteForce = (positions) => {
  const n = positions.length;
  const cityIndices = Array.from({ length: n }, (_, i) => i);
  const permutations = generatePermutations(cityIndices.slice(1));

  let minCost = Infinity;
  let bestPath = [];

  for (let path of permutations) {
    const cost = calculateCost([0, ...path], positions); 
    if (cost < minCost) {
      minCost = cost;
      bestPath = [0, ...path]; 
    }
  }

  return { minCost, bestPath };
};
const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [route, setRoute] = useState([]);
  const [minCost, setMinCost] = useState(0);
  const center = { lng: 105.853333, lat: 21.028333 };
  const [zoom] = useState(16);

  useEffect(() => {
    if (map.current) return; 

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
    const { minCost, bestPath } = travelingSalesmanBruteForce(markers);
    console.log(bestPath);
    const newRoute = bestPath.map((position) =>
      L.latLng(markers[position].lat, markers[position].lng)
    );
    setRoute(newRoute);
    setMinCost(minCost);
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
      L.marker([marker.lat, marker.lng], { icon: redIcon }).addTo(map.current);
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
      <div ref={mapContainer} className="w-full h-full" />
      <div className="mt-4 flex gap-4">
        <Button
          variant="outlined"
          color="blue"
          size="large"
          // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={calculateTSP}
        >
          Tính lộ trình
        </Button>
        <Button
          variant="outlined"
          color="red"
          size="large"
          // className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={clearMap}
        >
          Xóa tất cả
        </Button>
        <Typography>Tổng quãng đường: {minCost*111.32} km</Typography>
      </div>
    </div>
  );
};

export default Map;
