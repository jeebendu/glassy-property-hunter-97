
export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  images: string[];
  type: 'House' | 'Apartment' | 'Condo' | 'Townhouse';
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
  featured: boolean;
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  amenities: string[];
  yearBuilt: number;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    address: "123 Oceanview Drive, Malibu, CA",
    price: 4750000,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4200,
    description: "Stunning modern villa with panoramic ocean views. This architectural masterpiece features floor-to-ceiling windows, an infinity pool, and a gourmet kitchen with top-of-the-line appliances.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop"
    ],
    type: "House",
    status: "For Sale",
    featured: true,
    agent: {
      name: "Jennifer Lopez",
      phone: "310-555-1234",
      email: "jennifer@realestate.com",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=774&auto=format&fit=crop"
    },
    amenities: ["Pool", "Ocean View", "Home Theater", "Smart Home", "Wine Cellar", "Spa"],
    yearBuilt: 2021
  },
  {
    id: "2",
    title: "Urban Loft Apartment",
    address: "456 Downtown Blvd, San Francisco, CA",
    price: 1250000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    description: "Chic urban loft with exposed brick walls and industrial-inspired design. Features soaring ceilings, gourmet kitchen, and a private rooftop terrace with city views.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop"
    ],
    type: "Apartment",
    status: "For Sale",
    featured: true,
    agent: {
      name: "Michael Chen",
      phone: "415-555-6789",
      email: "michael@realestate.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=774&auto=format&fit=crop"
    },
    amenities: ["Rooftop Terrace", "City Views", "Concierge", "Fitness Center", "Pet Friendly"],
    yearBuilt: 2018
  },
  {
    id: "3",
    title: "Suburban Family Home",
    address: "789 Maple Street, Pasadena, CA",
    price: 1850000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    description: "Beautiful family home in a tree-lined neighborhood. Features an open concept kitchen and living area, backyard with pool, and a two-car garage.",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop"
    ],
    type: "House",
    status: "For Rent",
    featured: false,
    agent: {
      name: "Sarah Johnson",
      phone: "626-555-4321",
      email: "sarah@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop"
    },
    amenities: ["Pool", "Garden", "Two-Car Garage", "Home Office", "Air Conditioning"],
    yearBuilt: 2015
  },
  {
    id: "4",
    title: "Waterfront Condo",
    address: "101 Harbor Drive, Newport Beach, CA",
    price: 2250000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2200,
    description: "Luxurious waterfront condo with private boat slip. Enjoy stunning marina views from the spacious balcony and take advantage of resort-style amenities.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549517045-bc93de075e53?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1974&auto=format&fit=crop"
    ],
    type: "Condo",
    status: "For Sale",
    featured: true,
    agent: {
      name: "Robert Smith",
      phone: "949-555-8765",
      email: "robert@realestate.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=774&auto=format&fit=crop"
    },
    amenities: ["Boat Slip", "Ocean View", "Pool", "Gym", "Sauna", "24/7 Security"],
    yearBuilt: 2019
  },
  {
    id: "5",
    title: "Mountain Retreat",
    address: "555 Summit Road, Big Bear, CA",
    price: 975000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1950,
    description: "Cozy mountain retreat with stunning forest views. Features vaulted ceilings, stone fireplace, and wraparound deck perfect for enjoying the natural surroundings.",
    images: [
      "https://images.unsplash.com/photo-1542977390-b4914697625a?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1780&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185009-5bf9f2849488?q=80&w=2070&auto=format&fit=crop"
    ],
    type: "House",
    status: "Pending",
    featured: false,
    agent: {
      name: "Emma Wilson",
      phone: "909-555-2345",
      email: "emma@realestate.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=776&auto=format&fit=crop"
    },
    amenities: ["Fireplace", "Mountain View", "Deck", "Hot Tub", "Hiking Trails"],
    yearBuilt: 2010
  },
  {
    id: "6",
    title: "Historic Brownstone",
    address: "222 Heritage Lane, Boston, MA",
    price: 3100000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3200,
    description: "Beautifully renovated brownstone in a historic district. Features original details blended with modern amenities, a gourmet kitchen, and a landscaped garden.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1974&auto=format&fit=crop"
    ],
    type: "Townhouse",
    status: "For Sale",
    featured: false,
    agent: {
      name: "James Taylor",
      phone: "617-555-9876",
      email: "james@realestate.com",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=774&auto=format&fit=crop"
    },
    amenities: ["Historic Details", "Garden", "Wine Cellar", "Library", "Smart Home"],
    yearBuilt: 1890
  }
];

export const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "House", label: "House" },
  { value: "Apartment", label: "Apartment" },
  { value: "Condo", label: "Condo" },
  { value: "Townhouse", label: "Townhouse" }
];

export const priceRanges = [
  { value: "all", label: "Any Price" },
  { value: "0-1000000", label: "Under $1M" },
  { value: "1000000-2000000", label: "$1M - $2M" },
  { value: "2000000-5000000", label: "$2M - $5M" },
  { value: "5000000+", label: "$5M+" }
];

export const bedroomOptions = [
  { value: "all", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" }
];

export const bathroomOptions = [
  { value: "all", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" }
];

export const statusOptions = [
  { value: "all", label: "All" },
  { value: "For Sale", label: "For Sale" },
  { value: "For Rent", label: "For Rent" },
  { value: "Pending", label: "Pending" },
  { value: "Sold", label: "Sold" }
];
