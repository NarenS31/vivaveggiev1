export interface Farm {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  description: string;
  specialties: string[];
  sustainable_practices: string[];
  image: string;
  status: 'active' | 'harvesting' | 'planting' | 'resting';
  distance: number; // miles from restaurant
  partnership_since: string; // year
}

export const farms: Farm[] = [
  {
    id: 1,
    name: "Green Valley Organics",
    location: {
      lat: 35.2271,
      lng: -80.8431
    },
    address: "1234 Farmland Rd, Charlotte, NC 28202",
    description: "Family-owned organic farm specializing in heirloom vegetables and herbs. 15-acre operation using regenerative farming practices.",
    specialties: ["Heirloom tomatoes", "Leafy greens", "Fresh herbs"],
    sustainable_practices: ["Solar-powered irrigation", "Companion planting", "Crop rotation"],
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    status: "harvesting",
    distance: 12,
    partnership_since: "2018"
  },
  {
    id: 2,
    name: "Sunrise Acres",
    location: {
      lat: 35.3069,
      lng: -80.7209
    },
    address: "5678 Harvest Lane, Concord, NC 28027",
    description: "Certified organic farm focusing on root vegetables and alliums. Uses traditional farming methods combined with modern sustainability practices.",
    specialties: ["Root vegetables", "Onions", "Garlic"],
    sustainable_practices: ["Rainwater collection", "Composting", "Natural pest control"],
    image: "https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    status: "active",
    distance: 18,
    partnership_since: "2019"
  },
  {
    id: 3,
    name: "Carolina Mushroom Farm",
    location: {
      lat: 35.1315,
      lng: -80.9312
    },
    address: "321 Fungi Way, Charlotte, NC 28214",
    description: "Specialty indoor mushroom farm using sustainable growing techniques. Produces gourmet and medicinal mushroom varieties year-round.",
    specialties: ["Shiitake", "Oyster mushrooms", "Lion's mane"],
    sustainable_practices: ["Upcycled growing medium", "Low energy lighting", "Zero waste operation"],
    image: "https://images.unsplash.com/photo-1607706189297-18a139061702?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    status: "active",
    distance: 7,
    partnership_since: "2020"
  },
  {
    id: 4,
    name: "Heritage Fruit Orchards",
    location: {
      lat: 35.4128,
      lng: -80.5776
    },
    address: "9876 Orchard Path, Mt. Pleasant, NC 28124",
    description: "Family orchard specializing in heirloom and unusual fruit varieties. Practicing organic methods for three generations.",
    specialties: ["Heritage apples", "Berries", "Stone fruits"],
    sustainable_practices: ["Drip irrigation", "Beneficial insects", "Permaculture design"],
    image: "https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    status: "planting",
    distance: 24,
    partnership_since: "2017"
  },
  {
    id: 5,
    name: "Blue Ridge Dairy",
    location: {
      lat: 35.5622,
      lng: -80.6108
    },
    address: "5432 Dairy Road, Kannapolis, NC 28081",
    description: "Small-scale dairy operation producing artisanal cheeses and cultured products. All grass-fed, pasture-raised methods.",
    specialties: ["Artisanal cheese", "Cultured butter", "Yogurt"],
    sustainable_practices: ["Rotational grazing", "Solar-powered creamery", "Water recycling"],
    image: "https://images.unsplash.com/photo-1594105766800-76674ecd9c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    status: "active",
    distance: 29,
    partnership_since: "2021"
  },
  {
    id: 6,
    name: "Urban Microgreens",
    location: {
      lat: 35.2270,
      lng: -80.8532
    },
    address: "789 Vertical Lane, Charlotte, NC 28203",
    description: "Innovative urban farm focusing on high-density microgreen production. Located in a repurposed warehouse using vertical farming technology.",
    specialties: ["Microgreens", "Edible flowers", "Specialty lettuce"],
    sustainable_practices: ["Hydroponic systems", "LED grow lights", "Closed-loop water system"],
    image: "https://images.unsplash.com/photo-1600333859399-228aa03f7dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    status: "harvesting",
    distance: 3,
    partnership_since: "2022"
  }
];

// Restaurant location (Charlotte, NC)
export const restaurantLocation = {
  lat: 35.2271,
  lng: -80.8431
};

// Calculate distance between two points using Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Generate connection lines between restaurant and farms
export function generateConnectionLines() {
  return farms.map(farm => ({
    from: [restaurantLocation.lng, restaurantLocation.lat],
    to: [farm.location.lng, farm.location.lat],
    status: farm.status
  }));
}