// Safely access localStorage (only in browser environment)
export const getLocalStorage = (key: string, defaultValue: any = null) => {
  if (typeof window === "undefined") {
    return defaultValue
  }

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
  }
}
