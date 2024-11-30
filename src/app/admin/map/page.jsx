'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const Map1 = () => {
  const Map = dynamic(() => import('@/app/components/map'), {
    ssr: false,
  });


  return (
    <div className="h-screen flex flex-col items-center w-full">
      <div className="w-full h-4/5">
      <Map/>
      </div>
      {/* <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          onClick={calculateRoute}
        >
          Tính lộ trình
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            setMarkers([]);
            setRoute([]);
          }}
        >
          Xóa tất cả
        </button>
      </div> */}
    </div>
  );
};

export default Map1;
