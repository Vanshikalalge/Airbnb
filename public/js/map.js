const mapContainer = document.getElementById("map");

if (mapContainer && listingLocation) {
  const map = L.map("map").setView([20.5937, 78.9629], 5); // Default India view

  // Load base map from MapTiler
  L.tileLayer(
    "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=1hhm2RVlwpcGU8mAaXxs",
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
        '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }
  ).addTo(map);

  // Geocode the listing location (convert text to lat/lng)
  fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(
      listingLocation
    )}.json?key=1hhm2RVlwpcGU8mAaXxs`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;
        const placeName = data.features[0].place_name;

        // Center map and add marker
        map.setView([lat, lng], 13);

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`📍 ${placeName}`)
          .openPopup();
      } else {
        console.error("No location found for:", listingLocation);
      }
    })
    .catch((err) => console.error("Geocoding error:", err));
}
