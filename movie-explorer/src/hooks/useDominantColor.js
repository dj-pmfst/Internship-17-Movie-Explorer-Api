import { useEffect, useState } from "react"

export function useDominantColor(imageUrl) {
    const [color, setColor] = useState(null)

    useEffect(() => {
        if (!imageUrl) return

        const img = new Image()
        img.crossOrigin = "Anonymous"
        img.src = imageUrl

        img.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height

            const ctx = canvas.getContext("2d")
            ctx.drawImage(img, 0, 0)

            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

            let r = 0, g = 0, b = 0, count = 0

            for (let i = 0; i < data.length; i += 4) {
                r += data[i]
                g += data[i + 1]
                b += data[i + 2]
                count++
            }

            r = Math.floor(r / count)
            g = Math.floor(g / count)
            b = Math.floor(b / count)

            setColor(`rgb(${r}, ${g}, ${b})`)
        }
    }, [imageUrl])

    return color
}