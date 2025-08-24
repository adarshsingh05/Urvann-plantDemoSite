const mongoose = require('mongoose');
const Plant = require('./models/Plant');
require('dotenv').config({ path: './config.env' });

const plantData = [
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
  {
    name: "Chinese Evergreen",
    price: 449,
    categories: ["Indoor", "Low Maintenance", "Office", "Air Purifying"],
    stockAvailable: true,
    description: "Colorful foliage plant that thrives in low light conditions.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Low Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Pothos Marble Queen",
    price: 349,
    categories: ["Indoor", "Trailing", "Home Decor", "Hanging"],
    stockAvailable: true,
    description: "Beautiful variegated pothos with white and green leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Rubber Plant",
    price: 899,
    categories: ["Indoor", "Statement Plant", "Living Room", "Modern"],
    stockAvailable: true,
    description: "Classic indoor tree with large, glossy leaves and burgundy undersides.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Dracaena Marginata",
    price: 699,
    categories: ["Indoor", "Tree-like", "Office", "Air Purifying"],
    stockAvailable: true,
    description: "Elegant palm-like plant with thin, arching leaves with red edges.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Philodendron Brasil",
    price: 399,
    categories: ["Indoor", "Trailing", "Tropical", "Hanging"],
    stockAvailable: true,
    description: "Stunning variegated philodendron with heart-shaped leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Calathea Orbifolia",
    price: 899,
    categories: ["Indoor", "Tropical", "Statement Plant", "Home Decor"],
    stockAvailable: false,
    description: "Striking plant with large, round leaves featuring silver stripes.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "String of Pearls",
    price: 299,
    categories: ["Indoor", "Succulent", "Hanging", "Unique"],
    stockAvailable: true,
    description: "Unique trailing succulent with bead-like leaves, perfect for hanging pots.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Jade Plant",
    price: 199,
    categories: ["Indoor", "Succulent", "Low Maintenance", "Kitchen"],
    stockAvailable: true,
    description: "Classic succulent with thick, oval leaves, symbol of good luck.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Bird of Paradise",
    price: 1699,
    categories: ["Indoor", "Tropical", "Statement Plant", "Living Room"],
    stockAvailable: true,
    description: "Dramatic tropical plant with large, banana-like leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Large",
    lightRequirement: "Bright Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Pilea Peperomioides",
    price: 499,
    categories: ["Indoor", "Unique", "Modern", "Home Decor"],
    stockAvailable: true,
    description: "Popular 'Pancake Plant' with round, coin-like leaves on long stems.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Croton",
    price: 599,
    categories: ["Indoor", "Colorful", "Tropical", "Statement Plant"],
    stockAvailable: true,
    description: "Vibrant plant with colorful, variegated leaves in red, orange, and yellow.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Bright Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Ponytail Palm",
    price: 799,
    categories: ["Indoor", "Low Maintenance", "Unique", "Office"],
    stockAvailable: true,
    description: "Drought-tolerant plant with a bulbous trunk and long, curly leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "String of Hearts",
    price: 349,
    categories: ["Indoor", "Trailing", "Unique", "Hanging"],
    stockAvailable: true,
    description: "Delicate trailing plant with heart-shaped leaves and purple undersides.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Bamboo Palm",
    price: 899,
    categories: ["Indoor", "Palm", "Air Purifying", "Living Room"],
    stockAvailable: true,
    description: "Graceful palm with arching fronds, excellent for air purification.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Aglaonema Red",
    price: 649,
    categories: ["Indoor", "Colorful", "Low Maintenance", "Office"],
    stockAvailable: true,
    description: "Stunning plant with red and green variegated leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Low Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Hoya Carnosa",
    price: 449,
    categories: ["Indoor", "Trailing", "Flowering", "Hanging"],
    stockAvailable: true,
    description: "Wax plant with thick, waxy leaves and clusters of star-shaped flowers.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Schefflera",
    price: 749,
    categories: ["Indoor", "Tree-like", "Air Purifying", "Office"],
    stockAvailable: true,
    description: "Umbrella tree with glossy, compound leaves arranged like umbrella spokes.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Peperomia Obtusifolia",
    price: 299,
    categories: ["Indoor", "Compact", "Low Maintenance", "Office"],
    stockAvailable: true,
    description: "Compact plant with thick, spoon-shaped leaves, perfect for small spaces.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Tradescantia Zebrina",
    price: 249,
    categories: ["Indoor", "Trailing", "Colorful", "Hanging"],
    stockAvailable: true,
    description: "Wandering Jew with purple and silver striped leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Ficus Lyrata Bambino",
    price: 999,
    categories: ["Indoor", "Compact", "Modern", "Living Room"],
    stockAvailable: true,
    description: "Compact version of the fiddle leaf fig, perfect for smaller spaces.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Bright Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Begonia Maculata",
    price: 599,
    categories: ["Indoor", "Flowering", "Unique", "Home Decor"],
    stockAvailable: false,
    description: "Polka dot begonia with spotted leaves and clusters of white flowers.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Staghorn Fern",
    price: 799,
    categories: ["Indoor", "Unique", "Epiphyte", "Wall Mount"],
    stockAvailable: true,
    description: "Unique fern that grows on trees in nature, perfect for wall mounting.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "Pilea Glauca",
    price: 399,
    categories: ["Indoor", "Trailing", "Unique", "Hanging"],
    stockAvailable: true,
    description: "Silver sprinkles plant with tiny, metallic-looking leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Calathea Medallion",
    price: 699,
    categories: ["Indoor", "Tropical", "Statement Plant", "Home Decor"],
    stockAvailable: true,
    description: "Stunning calathea with round, patterned leaves that move with light.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "Philodendron Micans",
    price: 449,
    categories: ["Indoor", "Trailing", "Velvet", "Hanging"],
    stockAvailable: true,
    description: "Velvet philodendron with soft, velvety leaves in shades of green and bronze.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Haworthia",
    price: 199,
    categories: ["Indoor", "Succulent", "Low Maintenance", "Desktop"],
    stockAvailable: true,
    description: "Small succulent with rosette-shaped leaves, perfect for desks and windowsills.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Pothos Neon",
    price: 299,
    categories: ["Indoor", "Trailing", "Colorful", "Hanging"],
    stockAvailable: true,
    description: "Bright neon green pothos that adds a pop of color to any space.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Anthurium",
    price: 799,
    categories: ["Indoor", "Flowering", "Tropical", "Home Decor"],
    stockAvailable: true,
    description: "Tropical plant with glossy leaves and bright red, heart-shaped flowers.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Pilea Cadierei",
    price: 349,
    categories: ["Indoor", "Compact", "Unique", "Office"],
    stockAvailable: true,
    description: "Aluminum plant with silver-striped leaves, perfect for office spaces.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Philodendron Pink Princess",
    price: 2499,
    categories: ["Indoor", "Rare", "Colorful", "Collector"],
    stockAvailable: false,
    description: "Highly sought-after philodendron with pink variegation on dark leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "String of Bananas",
    price: 299,
    categories: ["Indoor", "Succulent", "Trailing", "Hanging"],
    stockAvailable: true,
    description: "Fun trailing succulent with banana-shaped leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Calathea White Fusion",
    price: 1199,
    categories: ["Indoor", "Rare", "Colorful", "Statement Plant"],
    stockAvailable: false,
    description: "Stunning calathea with white, green, and purple variegation.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "Monstera Adansonii",
    price: 899,
    categories: ["Indoor", "Trailing", "Tropical", "Hanging"],
    stockAvailable: true,
    description: "Swiss cheese vine with fenestrated leaves, perfect for hanging baskets.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Peperomia Rosso",
    price: 399,
    categories: ["Indoor", "Compact", "Colorful", "Office"],
    stockAvailable: true,
    description: "Compact plant with red undersides and green tops of leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Ficus Elastica Tineke",
    price: 999,
    categories: ["Indoor", "Variegated", "Statement Plant", "Living Room"],
    stockAvailable: true,
    description: "Variegated rubber plant with cream, pink, and green leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Hoya Kerrii",
    price: 199,
    categories: ["Indoor", "Succulent", "Unique", "Gift"],
    stockAvailable: true,
    description: "Sweetheart hoya with heart-shaped leaves, perfect as a gift.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Pilea Depressa",
    price: 349,
    categories: ["Indoor", "Trailing", "Compact", "Hanging"],
    stockAvailable: true,
    description: "Baby tears plant with tiny, round leaves that trail beautifully.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "Calathea Lancifolia",
    price: 649,
    categories: ["Indoor", "Tropical", "Unique", "Home Decor"],
    stockAvailable: true,
    description: "Rattlesnake plant with wavy, lance-shaped leaves with dark spots.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "Philodendron Birkin",
    price: 1299,
    categories: ["Indoor", "Rare", "Variegated", "Collector"],
    stockAvailable: false,
    description: "Stunning philodendron with white stripes on dark green leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "String of Turtles",
    price: 399,
    categories: ["Indoor", "Succulent", "Trailing", "Unique"],
    stockAvailable: true,
    description: "Unique trailing succulent with leaves that look like tiny turtles.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Bright Light",
    wateringFrequency: "Low"
  },
  {
    name: "Peperomia Watermelon",
    price: 299,
    categories: ["Indoor", "Compact", "Unique", "Desktop"],
    stockAvailable: true,
    description: "Compact plant with leaves that look like watermelon rinds.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Easy",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Low"
  },
  {
    name: "Monstera Thai Constellation",
    price: 3999,
    categories: ["Indoor", "Rare", "Variegated", "Collector"],
    stockAvailable: false,
    description: "Highly coveted variegated monstera with cream and green leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Pilea Moon Valley",
    price: 449,
    categories: ["Indoor", "Compact", "Unique", "Office"],
    stockAvailable: true,
    description: "Friendship plant with textured, moon-like craters on its leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Small",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  },
  {
    name: "Calathea Triostar",
    price: 899,
    categories: ["Indoor", "Colorful", "Tropical", "Statement Plant"],
    stockAvailable: true,
    description: "Striking calathea with pink, white, and green variegated leaves.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Medium",
    size: "Medium",
    lightRequirement: "Indirect Light",
    wateringFrequency: "High"
  },
  {
    name: "Philodendron Silver Sword",
    price: 1499,
    categories: ["Indoor", "Rare", "Metallic", "Collector"],
    stockAvailable: false,
    description: "Rare philodendron with metallic silver leaves that shimmer in light.",
    imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop",
    careLevel: "Hard",
    size: "Large",
    lightRequirement: "Indirect Light",
    wateringFrequency: "Moderate"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Plant.deleteMany({});
    console.log('🗑️  Cleared existing plant data');

    // Insert new data
    const result = await Plant.insertMany(plantData);
    console.log(`✅ Successfully seeded ${result.length} plants`);

    // Get some statistics
    const totalPlants = await Plant.countDocuments();
    const inStockPlants = await Plant.countDocuments({ stockAvailable: true });
    const outOfStockPlants = await Plant.countDocuments({ stockAvailable: false });

    console.log('\n📊 Database Statistics:');
    console.log(`Total Plants: ${totalPlants}`);
    console.log(`In Stock: ${inStockPlants}`);
    console.log(`Out of Stock: ${outOfStockPlants}`);

    // Get all categories
    const categories = await Plant.getAllCategories();
    console.log(`\n🌿 Categories: ${categories.join(', ')}`);

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
