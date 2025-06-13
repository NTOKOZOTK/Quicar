// Application data
const appData = {
  user: null,
  favorites: JSON.parse(localStorage.getItem("quicar-favorites") || "[]"),
  currentLocation: "Durban",
  budget: 350000,
  cars: [
    {
      id: 1,
      title: "2022 Toyota Corolla",
      price: 289000,
      monthly: 5200,
      location: "Durban",
      rating: 4.8,
      image: "https://via.placeholder.com/300x200/FF9500/FFFFFF?text=Toyota+Corolla",
      bestMatch: true,
      year: 2022,
      mileage: 15000,
      fuelType: "Petrol",
      transmission: "Automatic",
      description:
        "This Toyota Corolla is in excellent condition with low mileage. It comes with a full service history and is still under manufacturer warranty.",
      features: ["Bluetooth", "Reverse Camera", "Cruise Control", "Climate Control", "Alloy Wheels"],
    },
    {
      id: 2,
      title: "2021 Volkswagen Polo",
      price: 245000,
      monthly: 4400,
      location: "Johannesburg",
      rating: 4.5,
      image: "https://via.placeholder.com/300x200/FF5722/FFFFFF?text=VW+Polo",
      bestMatch: false,
      year: 2021,
      mileage: 22000,
      fuelType: "Petrol",
      transmission: "Manual",
      description:
        "Well-maintained Volkswagen Polo with excellent fuel economy. Perfect for city driving with all essential features.",
      features: ["Air Conditioning", "Power Steering", "Electric Windows", "Central Locking", "Radio/CD"],
    },
    {
      id: 3,
      title: "2020 Hyundai i20",
      price: 199000,
      monthly: 3600,
      location: "Cape Town",
      rating: 4.6,
      image: "https://via.placeholder.com/300x200/FF9500/FFFFFF?text=Hyundai+i20",
      bestMatch: true,
      year: 2020,
      mileage: 35000,
      fuelType: "Petrol",
      transmission: "Automatic",
      description: "Reliable and economical Hyundai i20 with modern features. Great first car or city commuter.",
      features: ["Touchscreen Display", "Bluetooth", "USB Connectivity", "Steering Wheel Controls", "ABS"],
    },
    {
      id: 4,
      title: "2023 Ford Fiesta",
      price: 320000,
      monthly: 5800,
      location: "Pretoria",
      rating: 4.7,
      image: "https://via.placeholder.com/300x200/FF5722/FFFFFF?text=Ford+Fiesta",
      bestMatch: false,
      year: 2023,
      mileage: 8000,
      fuelType: "Petrol",
      transmission: "Automatic",
      description:
        "Nearly new Ford Fiesta with latest technology and safety features. Low mileage and excellent condition.",
      features: ["SYNC 3", "Apple CarPlay", "Android Auto", "Reverse Camera", "Lane Keeping Assist"],
    },
    {
      id: 5,
      title: "2021 Nissan Micra",
      price: 215000,
      monthly: 3900,
      location: "Durban",
      rating: 4.4,
      image: "https://via.placeholder.com/300x200/FF9500/FFFFFF?text=Nissan+Micra",
      bestMatch: true,
      year: 2021,
      mileage: 18000,
      fuelType: "Petrol",
      transmission: "CVT",
      description:
        "Compact and efficient Nissan Micra perfect for urban driving. Excellent fuel economy and modern design.",
      features: ["CVT Transmission", "Bluetooth", "USB Port", "Electric Mirrors", "Remote Central Locking"],
    },
  ],
}

// Utility functions
function formatPrice(price) {
  return `R${price.toLocaleString()}`
}

function saveFavorites() {
  localStorage.setItem("quicar-favorites", JSON.stringify(appData.favorites))
}

function toggleFavorite(carId) {
  const index = appData.favorites.indexOf(carId)
  if (index > -1) {
    appData.favorites.splice(index, 1)
  } else {
    appData.favorites.push(carId)
  }
  saveFavorites()
}

function isFavorite(carId) {
  return appData.favorites.includes(carId)
}

function getCarById(id) {
  return appData.cars.find((car) => car.id === Number.parseInt(id))
}

function searchCars(query) {
  if (!query) return appData.cars

  const lowerQuery = query.toLowerCase()
  return appData.cars.filter(
    (car) => car.title.toLowerCase().includes(lowerQuery) || car.location.toLowerCase().includes(lowerQuery),
  )
}

function filterCarsByBudget(budget) {
  return appData.cars.filter((car) => car.price <= budget)
}
