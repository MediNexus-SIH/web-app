"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import io from "socket.io-client";

interface Location {
  latitude: number;
  longitude: number;
}

export default function LocationTrackerInner() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Only initialize the map if it hasn't been initialized already
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      console.log("Initializing map...");

      const mapInstance = L.map(mapRef.current).setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "©️ OpenStreetMap contributors",
      }).addTo(mapInstance);

      // Set default marker icon
      const defaultIcon = L.icon({
        iconUrl: markerIcon.src,
        shadowUrl: markerShadow.src,
      });
      L.Marker.prototype.options.icon = defaultIcon;

      mapInstanceRef.current = mapInstance;

      const url =
        "https://order-tracker.chickenkiller.com/";
      const socket = io(url);

      socket.on("locationUpdate", (location: Location) => {
        console.log("Received location update:", location);
        setLocation(location);
      });

      fetch(url + "last-location")
        .then((response) => response.json())
        .then((location: Location) => {
          console.log("Fetched last location:", location);
          if (location && location.latitude && location.longitude) {
            setLocation(location);
          } else {
            console.warn("Invalid location data received:", location);
          }
        })
        .catch((error) => console.error("Error fetching last location:", error));

      return () => {
        console.log("Cleaning up map...");

        // Remove map and marker on component unmount or re-render
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
        socket.disconnect();
      };
    }
  }, []);

  // Set an interval to reload map every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (mapInstanceRef.current && location) {
        // Optionally, you can refetch data if needed
        console.log("Refreshing map with location every 5 seconds...");
        updateMap(location);
      }
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [location]);

  useEffect(() => {
    if (location && mapInstanceRef.current) {
      updateMap(location);
    }
  }, [location]);

  function updateMap(location: Location) {
    const { latitude, longitude } = location;
    console.log("Updating map with location:", latitude, longitude);

    if (mapInstanceRef.current) {
      if (!markerRef.current) {
        console.log("Creating new marker");
        markerRef.current = L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
      } else {
        console.log("Updating existing marker");
        markerRef.current.setLatLng([latitude, longitude]);
      }
      mapInstanceRef.current.setView([latitude, longitude], 15);
    } else {
      console.warn("Map instance not available");
    }
  }

  return <div ref={mapRef} className="w-full h-full" />;
}
