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
    </div>
  );
};

export default Map1;
