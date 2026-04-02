export interface City {
  name: string;
  state: string;
  lat: number;
  lng: number;
  timezone: string;
}

export const DEFAULT_CITY: City = {
  name: "Bangalore",
  state: "Karnataka",
  lat: 12.9716,
  lng: 77.5946,
  timezone: "Asia/Kolkata",
};

export const CITIES: City[] = [
  // South India
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, timezone: "Asia/Kolkata" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, timezone: "Asia/Kolkata" },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, timezone: "Asia/Kolkata" },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, timezone: "Asia/Kolkata" },
  { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, timezone: "Asia/Kolkata" },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, timezone: "Asia/Kolkata" },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, timezone: "Asia/Kolkata" },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394, timezone: "Asia/Kolkata" },
  { name: "Mangalore", state: "Karnataka", lat: 12.9141, lng: 74.856, timezone: "Asia/Kolkata" },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, timezone: "Asia/Kolkata" },

  // West India
  { name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, timezone: "Asia/Kolkata" },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, timezone: "Asia/Kolkata" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, timezone: "Asia/Kolkata" },
  { name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, timezone: "Asia/Kolkata" },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, timezone: "Asia/Kolkata" },
  { name: "Goa", state: "Goa", lat: 15.2993, lng: 74.124, timezone: "Asia/Kolkata" },

  // North India
  { name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.209, timezone: "Asia/Kolkata" },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, timezone: "Asia/Kolkata" },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, timezone: "Asia/Kolkata" },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, timezone: "Asia/Kolkata" },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, timezone: "Asia/Kolkata" },
  { name: "Ujjain", state: "Madhya Pradesh", lat: 23.1765, lng: 75.7885, timezone: "Asia/Kolkata" },
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, timezone: "Asia/Kolkata" },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, timezone: "Asia/Kolkata" },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, timezone: "Asia/Kolkata" },

  // East India
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, timezone: "Asia/Kolkata" },
  { name: "Patna", state: "Bihar", lat: 25.6093, lng: 85.1376, timezone: "Asia/Kolkata" },

  // International
  { name: "London", state: "UK", lat: 51.5074, lng: -0.1278, timezone: "Europe/London" },
  { name: "New York", state: "USA", lat: 40.7128, lng: -74.006, timezone: "America/New_York" },
  { name: "San Francisco", state: "USA", lat: 37.7749, lng: -122.4194, timezone: "America/Los_Angeles" },
  { name: "Dubai", state: "UAE", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai" },
  { name: "Singapore", state: "Singapore", lat: 1.3521, lng: 103.8198, timezone: "Asia/Singapore" },
  { name: "Sydney", state: "Australia", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney" },
];

// Find nearest city to given coordinates
export function findNearestCity(lat: number, lng: number): City {
  let minDist = Infinity;
  let nearest = DEFAULT_CITY;

  for (const city of CITIES) {
    const dlat = city.lat - lat;
    const dlng = city.lng - lng;
    const dist = dlat * dlat + dlng * dlng;
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  }

  return nearest;
}

// Search cities by name
export function searchCities(query: string): City[] {
  if (!query.trim()) return CITIES;
  const lower = query.toLowerCase();
  return CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.state.toLowerCase().includes(lower)
  );
}
