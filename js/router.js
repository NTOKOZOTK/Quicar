// Simple router implementation
class Router {
  constructor() {
    this.routes = {}
    this.currentRoute = "/"

    // Listen for browser back/forward
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname, false)
    })

    // Handle initial load
    this.navigate(window.location.pathname || "/", false)
  }

  addRoute(path, handler) {
    this.routes[path] = handler
  }

  navigate(path, pushState = true) {
    this.currentRoute = path

    if (pushState) {
      window.history.pushState({}, "", path)
    }

    // Find matching route
    const handler = this.routes[path] || this.routes["/"]
    if (handler) {
      handler()
    }
  }

  getParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(paramName)
  }
}

// Create global router instance
const router = new Router()
