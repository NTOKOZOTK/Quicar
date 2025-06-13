// Additional page-specific functionality

// Declare the router variable
const router = {
  currentRoute: "/",
  navigate: (route) => {
    window.location.href = route
  },
}

// Auto-redirect from splash screen
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/" || window.location.pathname === "") {
    setTimeout(() => {
      if (router.currentRoute === "/") {
        router.navigate("/login")
      }
    }, 3000)
  }
})

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // ESC key to go back
  if (e.key === "Escape") {
    if (router.currentRoute === "/car") {
      router.navigate("/home")
    } else if (router.currentRoute === "/home") {
      router.navigate("/login")
    }
  }

  // Enter key on login form
  if (e.key === "Enter" && router.currentRoute === "/login") {
    const form = document.getElementById("login-form")
    if (form) {
      form.dispatchEvent(new Event("submit"))
    }
  }
})

// Touch gestures for mobile
let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - could implement next car or similar
    } else {
      // Swipe right - could implement previous car or back navigation
      if (router.currentRoute === "/car") {
        router.navigate("/home")
      }
    }
  }
}

// Smooth scrolling for better UX
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }
})

// Loading states for better UX
function showLoading(element) {
  if (element) {
    element.style.opacity = "0.6"
    element.style.pointerEvents = "none"
  }
}

function hideLoading(element) {
  if (element) {
    element.style.opacity = "1"
    element.style.pointerEvents = "auto"
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("Application error:", e.error)
  // Could implement user-friendly error messages here
})

// Service worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
