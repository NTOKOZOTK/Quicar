// Main application logic
class QuicarApp {
  constructor(router, appData, isFavorite, formatPrice, searchCars, filterCarsByBudget, getCarById, toggleFavorite) {
    this.router = router
    this.appData = appData
    this.isFavorite = isFavorite
    this.formatPrice = formatPrice
    this.searchCars = searchCars
    this.filterCarsByBudget = filterCarsByBudget
    this.getCarById = getCarById
    this.toggleFavorite = toggleFavorite
    this.initializeRoutes()
    this.setupEventListeners()
  }

  initializeRoutes() {
    this.router.addRoute("/", () => this.showSplashScreen())
    this.router.addRoute("/login", () => this.showLoginPage())
    this.router.addRoute("/home", () => this.showHomePage())
    this.router.addRoute("/car", () => this.showCarDetail())
  }

  setupEventListeners() {
    // Auto-navigate from splash to login after 3 seconds
    document.addEventListener("DOMContentLoaded", () => {
      if (this.router.currentRoute === "/") {
        setTimeout(() => {
          this.router.navigate("/login")
        }, 3000)
      }
    })
  }

  showSplashScreen() {
    this.renderTemplate("splash-template")
  }

  showLoginPage() {
    this.renderTemplate("login-template")
    this.setupLoginForm()
  }

  showHomePage() {
    this.renderTemplate("home-template")
    this.setupHomePage()
  }

  showCarDetail() {
    const carId = this.router.getParam("id")
    if (!carId) {
      this.router.navigate("/home")
      return
    }

    this.renderTemplate("car-detail-template")
    this.setupCarDetailPage(carId)
  }

  renderTemplate(templateId) {
    const template = document.getElementById(templateId)
    const app = document.getElementById("app")

    if (template && app) {
      app.innerHTML = template.innerHTML
    }
  }

  setupLoginForm() {
    const form = document.getElementById("login-form")
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleLogin()
      })
    }
  }

  handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const button = document.querySelector(".sign-in-btn")
    const buttonText = button.querySelector(".btn-text")
    const spinner = button.querySelector(".loading-spinner")

    // Show loading state
    button.disabled = true
    buttonText.textContent = "Signing in..."
    spinner.style.display = "inline-block"

    // Simulate login delay
    setTimeout(() => {
      this.appData.user = { email, name: "John Doe" }
      this.router.navigate("/home")
    }, 1000)
  }

  setupHomePage() {
    this.renderCarListings()
    this.setupSearchAndFilters()
  }

  renderCarListings(cars = this.appData.cars) {
    const container = document.getElementById("car-listings")
    if (!container) return

    container.innerHTML = cars
      .map(
        (car) => `
      <div class="car-card" onclick="viewCarDetail(${car.id})">
        <div class="car-image-container">
          <img src="${car.image}" alt="${car.title}" class="car-image" />
          <button class="favorite-button" onclick="event.stopPropagation(); toggleCarFavorite(${car.id})">
            ${this.isFavorite(car.id) ? "❤️" : "🤍"}
          </button>
          ${car.bestMatch ? '<div class="best-match-badge">🤖 Best Match</div>' : ""}
        </div>
        <div class="car-info">
          <div class="car-header">
            <h3 class="car-title">${car.title}</h3>
            <span class="car-price">${this.formatPrice(car.price)}</span>
          </div>
          <div class="car-details">
            <span>Est. ${this.formatPrice(car.monthly)}/month</span>
            <div class="car-rating">
              <span>★ ${car.rating}</span>
            </div>
          </div>
          <div class="car-footer">
            <div class="car-location">📍 ${car.location}</div>
            <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); viewCarDetail(${car.id})">View Details</button>
          </div>
        </div>
      </div>
    `,
      )
      .join("")
  }

  setupSearchAndFilters() {
    // Search functionality
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value
        const filteredCars = this.searchCars(query)
        this.renderCarListings(filteredCars)
      })
    }

    // Budget slider
    const budgetSlider = document.getElementById("budget-slider")
    const budgetValue = document.getElementById("budget-value")
    if (budgetSlider && budgetValue) {
      budgetSlider.addEventListener("input", (e) => {
        const budget = Number.parseInt(e.target.value)
        budgetValue.textContent = this.formatPrice(budget)
        this.appData.budget = budget

        const filteredCars = this.filterCarsByBudget(budget)
        this.renderCarListings(filteredCars)
      })
    }
  }

  setupCarDetailPage(carId) {
    const car = this.getCarById(carId)
    if (!car) {
      this.router.navigate("/home")
      return
    }

    // Populate car details
    document.getElementById("car-detail-image").src = car.image
    document.getElementById("car-detail-image").alt = car.title
    document.getElementById("car-detail-title").textContent = car.title
    document.getElementById("car-detail-price").textContent = this.formatPrice(car.price)
    document.getElementById("car-detail-location").textContent = car.location
    document.getElementById("car-detail-year").textContent = car.year
    document.getElementById("car-detail-mileage").textContent = `${car.mileage.toLocaleString()} km`
    document.getElementById("car-detail-fuel").textContent = car.fuelType
    document.getElementById("car-detail-transmission").textContent = car.transmission
    document.getElementById("car-detail-description").textContent = car.description
    document.getElementById("footer-price").textContent = this.formatPrice(car.price)

    this.setupFinanceCalculator(car)
  }

  setupFinanceCalculator(car) {
    const downPaymentSlider = document.getElementById("down-payment-slider")
    const downPaymentValue = document.getElementById("down-payment-value")
    const loanTermSlider = document.getElementById("loan-term-slider")
    const loanTermValue = document.getElementById("loan-term-value")
    const monthlyPayment = document.getElementById("monthly-payment")

    const calculatePayment = () => {
      const downPayment = Number.parseInt(downPaymentSlider.value)
      const loanTerm = Number.parseInt(loanTermSlider.value)
      const principal = car.price - downPayment
      const monthlyRate = 0.085 / 12 // 8.5% annual rate

      const payment = Math.round((principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm)))

      downPaymentValue.textContent = this.formatPrice(downPayment)
      loanTermValue.textContent = loanTerm
      monthlyPayment.textContent = `${this.formatPrice(payment)}/month`
    }

    if (downPaymentSlider && loanTermSlider) {
      downPaymentSlider.max = Math.floor(car.price / 2)
      downPaymentSlider.addEventListener("input", calculatePayment)
      loanTermSlider.addEventListener("input", calculatePayment)
      calculatePayment() // Initial calculation
    }
  }
}

// Global functions for onclick handlers
function toggleCarFavorite(carId, app) {
  app.toggleFavorite(carId)
  // Re-render the car listings to update the heart icon
  if (app.router.currentRoute === "/home") {
    app.renderCarListings()
  }
}

function viewCarDetail(carId, app) {
  app.router.navigate(`/car?id=${carId}`)
}

function setActiveTab(tab, app) {
  // Update navigation active state
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })
  event.target.closest(".nav-item").classList.add("active")

  // Handle different tabs
  switch (tab) {
    case "favorites":
      const favoriteCars = app.appData.cars.filter((car) => app.isFavorite(car.id))
      app.renderCarListings(favoriteCars)
      break
    case "home":
      app.renderCarListings()
      break
    case "chat":
      alert("Chat functionality coming soon!")
      break
    case "more":
      alert("More options coming soon!")
      break
  }
}

function showTab(tabName) {
  // Hide all tab panes
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.classList.remove("active")
  })

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active")
  })

  // Show selected tab pane
  document.getElementById(`${tabName}-tab`).classList.add("active")

  // Add active class to clicked button
  event.target.classList.add("active")
}

function changeLocation(app) {
  const newLocation = prompt("Enter your location:", app.appData.currentLocation)
  if (newLocation) {
    app.appData.currentLocation = newLocation
    document.getElementById("current-location").textContent = newLocation
  }
}

function suggestCars(app) {
  alert("AI car suggestion feature coming soon! 🤖")
}

function buyNow(app) {
  alert("Checkout functionality coming soon!")
}

// Initialize the app
const router = {} // Placeholder for router
const appData = {} // Placeholder for appData
const isFavorite = () => {} // Placeholder for isFavorite
const formatPrice = () => {} // Placeholder for formatPrice
const searchCars = () => {} // Placeholder for searchCars
const filterCarsByBudget = () => {} // Placeholder for filterCarsByBudget
const getCarById = () => {} // Placeholder for getCarById
const toggleFavorite = () => {} // Placeholder for toggleFavorite

const app = new QuicarApp(
  router,
  appData,
  isFavorite,
  formatPrice,
  searchCars,
  filterCarsByBudget,
  getCarById,
  toggleFavorite,
)
