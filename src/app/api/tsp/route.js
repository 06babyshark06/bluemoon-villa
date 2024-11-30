import { NextResponse } from "next/server";

// pages/api/tsp.js
export const POST = async (req, res) => {
  const { markers } = await req.json();

  if (!markers || markers.length < 2) {
    return new NextResponse(
      JSON.stringify({ error: "Cần ít nhất 2 điểm để tính toán." }),
      { status: 400 }
    );
  }

  // Hàm tính khoảng cách giữa hai điểm (haversine formula)
  const calculateDistance = (point1, point2) => {
    const R = 6371; // Bán kính Trái đất (km)
    const lat1 = (point1.lat * Math.PI) / 180;
    const lat2 = (point2.lat * Math.PI) / 180;
    const deltaLat = lat2 - lat1;
    const deltaLng = ((point2.lng - point1.lng) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Khoảng cách (km)
  };

  // Tính tổng quãng đường của một lộ trình
  const calculateTotalDistance = (route) => {
    let distance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      distance += calculateDistance(route[i], route[i + 1]);
    }
    // Quay về điểm xuất phát
    distance += calculateDistance(route[route.length - 1], route[0]);
    return distance;
  };

  // Sinh tất cả các hoán vị
  const permute = (array) => {
    if (array.length <= 1) return [array];
    const permutations = [];
    const [first, ...rest] = array;

    for (const perm of permute(rest)) {
      for (let i = 0; i <= perm.length; i++) {
        permutations.push([...perm.slice(0, i), first, ...perm.slice(i)]);
      }
    }
    return permutations;
  };

  // Tìm lộ trình tối ưu
  const routes = permute(markers);
  let shortestRoute = null;
  let shortestDistance = Infinity;

  for (const route of routes) {
    const distance = calculateTotalDistance(route);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      shortestRoute = route;
    }
  }
  console.log(shortestDistance, shortestRoute);

  return new NextResponse(
    JSON.stringify({
      optimizedRoute: shortestRoute,
      distance: shortestDistance,
    }),
    { status: 200 }
  );
};
