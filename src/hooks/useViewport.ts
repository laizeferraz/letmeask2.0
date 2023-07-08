import { useEffect, useState } from "react"

export const useViewport = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)

    window.addEventListener("resize", () => setWidth(window.innerWidth))
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth))
  }, [])

  return { width }
}