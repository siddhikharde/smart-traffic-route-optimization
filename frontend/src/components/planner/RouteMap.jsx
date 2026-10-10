import React, { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LEVEL_COLORS = { Low: "#0fb98d", Moderate: "#ffb020", Heavy: "#ff4d6d" };

// Zooms the map so every route is visible
function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length) map.fitBounds(points, { padding: [40, 40] });
  }, [points, map]);
  return null;
}

function RouteMap({ start, end, routes, selected, bestIndex }) {
  const allPoints = useMemo(() => routes.flatMap((r) => r.coords), [routes]);

  // Draw the selected route last so it sits on top
  const order = routes
    .map((_, i) => i)
    .sort((a, b) => (a === selected) - (b === selected));

  return (
    <MapContainer
      center={[start.lat, start.lon]}
      zoom={12}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds points={allPoints} />

      {order.map((i) => {
        const r = routes[i];
        const isSelected = i === selected;
        return (
          <Polyline
            key={r.name}
            positions={r.coords}
            pathOptions={{
              color: i === bestIndex ? "#0fb98d" : LEVEL_COLORS[r.level],
              weight: isSelected ? 8 : 4,
              opacity: isSelected ? 1 : 0.55,
              dashArray: i === bestIndex ? undefined : "8 10",
            }}
          />
        );
      })}

      <CircleMarker
        center={[start.lat, start.lon]}
        radius={10}
        pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#22e3b5", fillOpacity: 1 }}
      >
        <Tooltip permanent direction="top">Start</Tooltip>
      </CircleMarker>

      <CircleMarker
        center={[end.lat, end.lon]}
        radius={10}
        pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#4d0ff6", fillOpacity: 1 }}
      >
        <Tooltip permanent direction="top">Destination</Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}

export default RouteMap;