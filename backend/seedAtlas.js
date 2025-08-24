const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

// Import the Plant model
const Plant = require('./models/Plant');

// Import seed data - extract the plantData array
const seedDataModule = require('./seedData');
const seedData = [
  {
    name: "Money Plant (Golden Pothos)",
    price: 299,
    categories: ["Indoor", "Air Purifying", "Home Decor", "Low Maintenance"],
    stockAvailable: true,
    description: "Popular trailing plant with heart-shaped leaves, perfect for hanging baskets and shelves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Snake Plant (Sansevieria)",
    price: 399,
    categories: ["Indoor", "Air Purifying", "Low Maintenance", "Bedroom"],
    stockAvailable: true,
    description: "Hardy plant with tall, sword-like leaves that purify air and require minimal care.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Low Light",
    wateringFrequency: "Low"
  },
  {
    name: "Peace Lily",
    price: 599,
    categories: ["Indoor", "Air Purifying", "Flowering", "Home Decor"],
    stockAvailable: true,
    description: "Elegant plant with white flowers and glossy leaves, excellent for air purification.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "Aloe Vera",
    price: 199,
    categories: ["Indoor", "Medicinal", "Succulent", "Kitchen"],
    stockAvailable: true,
    description: "Medicinal succulent with gel-filled leaves, perfect for kitchen windowsills.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Spider Plant",
    price: 249,
    categories: ["Indoor", "Air Purifying", "Hanging", "Pet Friendly"],
    stockAvailable: true,
    description: "Easy-care plant that produces baby plants, safe for pets and children.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "ZZ Plant",
    price: 799,
    categories: ["Indoor", "Low Maintenance", "Office", "Modern"],
    stockAvailable: true,
    description: "Ultra-low maintenance plant with glossy leaves, perfect for busy people.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Low Light",
    wateringFrequency: "Low"
  },
  {
    name: "Monstera Deliciosa",
    price: 1299,
    categories: ["Indoor", "Tropical", "Statement Plant", "Home Decor"],
    stockAvailable: true,
    description: "Iconic plant with distinctive split leaves, a must-have for plant enthusiasts.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Fiddle Leaf Fig",
    price: 1499,
    categories: ["Indoor", "Statement Plant", "Living Room", "Modern"],
    stockAvailable: false,
    description: "Trendy plant with large, violin-shaped leaves, perfect for statement pieces.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Large",
    lightRequirement: "Bright Light",
    wateringFrequency: "Moderate"
  },
  // Additional 50 plants
  {
    name: "Chinese Evergreen",
    price: 449,
    categories: ["Indoor", "Low Maintenance", "Office", "Air Purifying"],
    stockAvailable: true,
    description: "Beautiful variegated leaves that thrive in low light conditions.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Low Light",
    wateringFrequency: "Low"
  },
  {
    name: "Pothos Marble Queen",
    price: 349,
    categories: ["Indoor", "Trailing", "Variegated", "Hanging"],
    stockAvailable: true,
    description: "Stunning variegated pothos with white and green leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Philodendron Brasil",
    price: 399,
    categories: ["Indoor", "Trailing", "Variegated", "Tropical"],
    stockAvailable: true,
    description: "Heart-shaped leaves with yellow variegation, perfect for hanging.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Calathea Orbifolia",
    price: 899,
    categories: ["Indoor", "Tropical", "Statement Plant", "Colorful"],
    stockAvailable: true,
    description: "Large round leaves with silver stripes, a showstopper plant.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "String of Pearls",
    price: 299,
    categories: ["Indoor", "Succulent", "Hanging", "Unique"],
    stockAvailable: true,
    description: "Trailing succulent with bead-like leaves, perfect for hanging baskets.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Bird of Paradise",
    price: 1899,
    categories: ["Indoor", "Tropical", "Statement Plant", "Large"],
    stockAvailable: true,
    description: "Dramatic tropical plant with large banana-like leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Large",
    lightRequirement: "Bright Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Pilea Peperomioides",
    price: 499,
    categories: ["Indoor", "Compact", "Modern", "Desktop"],
    stockAvailable: true,
    description: "Popular pancake plant with round leaves on long stems.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Rubber Plant",
    price: 699,
    categories: ["Indoor", "Statement Plant", "Low Maintenance", "Modern"],
    stockAvailable: true,
    description: "Classic indoor tree with large, glossy dark green leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Dracaena Marginata",
    price: 549,
    categories: ["Indoor", "Low Maintenance", "Office", "Modern"],
    stockAvailable: true,
    description: "Dragon tree with thin, spiky leaves and red edges.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Croton Petra",
    price: 449,
    categories: ["Indoor", "Colorful", "Tropical", "Statement Plant"],
    stockAvailable: true,
    description: "Vibrant plant with colorful leaves in orange, red, and yellow.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Bright Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Bamboo Palm",
    price: 649,
    categories: ["Indoor", "Palm", "Air Purifying", "Tropical"],
    stockAvailable: true,
    description: "Graceful palm with feathery fronds, excellent air purifier.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Jade Plant",
    price: 199,
    categories: ["Indoor", "Succulent", "Low Maintenance", "Desktop"],
    stockAvailable: true,
    description: "Classic succulent with thick, oval leaves, brings good luck.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Ponytail Palm",
    price: 399,
    categories: ["Indoor", "Succulent", "Low Maintenance", "Unique"],
    stockAvailable: true,
    description: "Not a true palm, but a succulent with long, curly leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Cast Iron Plant",
    price: 349,
    categories: ["Indoor", "Low Maintenance", "Shade Loving", "Hardy"],
    stockAvailable: true,
    description: "Extremely hardy plant that can survive almost any condition.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Low Light",
    wateringFrequency: "Low"
  },
  {
    name: "Kentia Palm",
    price: 899,
    categories: ["Indoor", "Palm", "Elegant", "Living Room"],
    stockAvailable: true,
    description: "Elegant palm with graceful, arching fronds.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Peperomia Obtusifolia",
    price: 249,
    categories: ["Indoor", "Compact", "Low Maintenance", "Desktop"],
    stockAvailable: true,
    description: "Small, bushy plant with thick, glossy leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Schefflera Arboricola",
    price: 599,
    categories: ["Indoor", "Tree", "Low Maintenance", "Office"],
    stockAvailable: true,
    description: "Umbrella tree with glossy, palmate leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Aglaonema Silver Bay",
    price: 399,
    categories: ["Indoor", "Low Maintenance", "Variegated", "Office"],
    stockAvailable: true,
    description: "Chinese evergreen with silver and green variegation.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Low Light",
    wateringFrequency: "Low"
  },
  {
    name: "Dieffenbachia Tropic Snow",
    price: 449,
    categories: ["Indoor", "Tropical", "Variegated", "Statement Plant"],
    stockAvailable: true,
    description: "Dumb cane with large, variegated leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Ficus Lyrata Bambino",
    price: 799,
    categories: ["Indoor", "Compact", "Modern", "Statement Plant"],
    stockAvailable: true,
    description: "Smaller version of fiddle leaf fig, perfect for smaller spaces.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Bright Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Monstera Adansonii",
    price: 649,
    categories: ["Indoor", "Trailing", "Tropical", "Hanging"],
    stockAvailable: true,
    description: "Swiss cheese vine with fenestrated leaves, perfect for hanging.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Philodendron Micans",
    price: 399,
    categories: ["Indoor", "Trailing", "Velvet", "Hanging"],
    stockAvailable: true,
    description: "Velvety trailing philodendron with heart-shaped leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Calathea Medallion",
    price: 549,
    categories: ["Indoor", "Tropical", "Colorful", "Statement Plant"],
    stockAvailable: true,
    description: "Stunning calathea with dark green leaves and pink undersides.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "String of Hearts",
    price: 299,
    categories: ["Indoor", "Trailing", "Succulent", "Hanging"],
    stockAvailable: true,
    description: "Delicate trailing succulent with heart-shaped leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Haworthia Zebra",
    price: 149,
    categories: ["Indoor", "Succulent", "Small", "Desktop"],
    stockAvailable: true,
    description: "Small succulent with white stripes, perfect for desks.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Echeveria Elegans",
    price: 129,
    categories: ["Indoor", "Succulent", "Rosette", "Desktop"],
    stockAvailable: true,
    description: "Beautiful rosette succulent with powdery blue-green leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Crassula Ovata",
    price: 179,
    categories: ["Indoor", "Succulent", "Tree", "Low Maintenance"],
    stockAvailable: true,
    description: "Money tree succulent with thick, oval leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Sedum Morganianum",
    price: 199,
    categories: ["Indoor", "Succulent", "Trailing", "Hanging"],
    stockAvailable: true,
    description: "Burro's tail with trailing stems covered in plump leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Kalanchoe Blossfeldiana",
    price: 249,
    categories: ["Indoor", "Flowering", "Succulent", "Colorful"],
    stockAvailable: true,
    description: "Flowering succulent with clusters of bright flowers.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Gasteria Bicolor",
    price: 169,
    categories: ["Indoor", "Succulent", "Unique", "Desktop"],
    stockAvailable: true,
    description: "Tongue-shaped succulent with spotted leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Aeonium Arboreum",
    price: 189,
    categories: ["Indoor", "Succulent", "Rosette", "Statement Plant"],
    stockAvailable: true,
    description: "Tree aeonium with rosettes on branching stems.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Graptopetalum Paraguayense",
    price: 159,
    categories: ["Indoor", "Succulent", "Rosette", "Desktop"],
    stockAvailable: true,
    description: "Ghost plant with powdery blue-gray rosettes.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Pachyphytum Oviferum",
    price: 179,
    categories: ["Indoor", "Succulent", "Unique", "Desktop"],
    stockAvailable: true,
    description: "Moonstones succulent with plump, rounded leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Senecio Rowleyanus",
    price: 219,
    categories: ["Indoor", "Succulent", "Trailing", "Hanging"],
    stockAvailable: true,
    description: "String of pearls with round, bead-like leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Portulacaria Afra",
    price: 199,
    categories: ["Indoor", "Succulent", "Bonsai", "Low Maintenance"],
    stockAvailable: true,
    description: "Elephant bush with small, round leaves on woody stems.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Aloe Aristata",
    price: 189,
    categories: ["Indoor", "Succulent", "Unique", "Desktop"],
    stockAvailable: true,
    description: "Lace aloe with rosettes of spiky, white-spotted leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Gymnocalycium Mihanovichii",
    price: 139,
    categories: ["Indoor", "Cactus", "Colorful", "Desktop"],
    stockAvailable: true,
    description: "Moon cactus with bright colored top graft.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Mammillaria Elongata",
    price: 129,
    categories: ["Indoor", "Cactus", "Columnar", "Desktop"],
    stockAvailable: true,
    description: "Ladyfinger cactus with elongated, finger-like stems.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Opuntia Microdasys",
    price: 159,
    categories: ["Indoor", "Cactus", "Unique", "Desktop"],
    stockAvailable: true,
    description: "Bunny ears cactus with flat, oval pads covered in glochids.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Echinocactus Grusonii",
    price: 299,
    categories: ["Indoor", "Cactus", "Round", "Statement Plant"],
    stockAvailable: true,
    description: "Golden barrel cactus with spherical shape and golden spines.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Ferocactus Latispinus",
    price: 249,
    categories: ["Indoor", "Cactus", "Barrel", "Statement Plant"],
    stockAvailable: true,
    description: "Devil's tongue barrel cactus with prominent central spines.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Astrophytum Asterias",
    price: 399,
    categories: ["Indoor", "Cactus", "Rare", "Collector"],
    stockAvailable: false,
    description: "Star cactus with distinctive star-shaped appearance.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Lophophora Williamsii",
    price: 899,
    categories: ["Indoor", "Cactus", "Rare", "Collector"],
    stockAvailable: false,
    description: "Peyote cactus with button-like appearance.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Ariocarpus Fissuratus",
    price: 1299,
    categories: ["Indoor", "Cactus", "Rare", "Collector"],
    stockAvailable: false,
    description: "Living rock cactus that resembles stones.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Aztekium Ritteri",
    price: 1499,
    categories: ["Indoor", "Cactus", "Rare", "Collector"],
    stockAvailable: false,
    description: "Extremely rare cactus with distinctive ribbed appearance.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  }
];

async function seedAtlasDatabase() {
  try {
    console.log('🌱 Starting to seed MongoDB Atlas database...');
    
    // Connect to MongoDB Atlas
    console.log('☁️ Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas successfully');
    
    // Clear existing data
    console.log('🧹 Clearing existing plant data...');
    await Plant.deleteMany({});
    console.log('✅ Cleared existing data');
    
    // Insert seed data
    console.log('📝 Inserting seed data...');
    const result = await Plant.insertMany(seedData);
    console.log(`✅ Successfully inserted ${result.length} plants`);
    
    // Verify the data
    const totalPlants = await Plant.countDocuments();
    console.log(`🔍 Total plants in database: ${totalPlants}`);
    
    // Show some sample data
    const samplePlants = await Plant.find().limit(5).select('name price categories');
    console.log('\n📋 Sample plants:');
    samplePlants.forEach(plant => {
      console.log(`   - ${plant.name} (₹${plant.price}) - ${plant.categories.join(', ')}`);
    });
    
    // Get statistics
    const inStockPlants = await Plant.countDocuments({ stockAvailable: true });
    const outOfStockPlants = await Plant.countDocuments({ stockAvailable: false });
    const categories = await Plant.getAllCategories();
    
    console.log('\n📊 Database Statistics:');
    console.log(`   Total Plants: ${totalPlants}`);
    console.log(`   In Stock: ${inStockPlants}`);
    console.log(`   Out of Stock: ${outOfStockPlants}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Price Range: ₹${Math.min(...seedData.map(p => p.price))} - ₹${Math.max(...seedData.map(p => p.price))}`);
    
    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB Atlas connection closed');
  }
}

// Run seeding if this script is executed directly
if (require.main === module) {
  seedAtlasDatabase()
    .then(() => {
      console.log('✨ Seeding script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding script failed:', error);
      process.exit(1);
    });
}

module.exports = { seedAtlasDatabase };
