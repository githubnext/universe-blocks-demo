const imageUrls = {
  "angry": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/angry.gif",
  "eyeroll": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/eyeroll.gif",
  "grimace": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/grimace.gif",
  "heart_eyes": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/heart_eyes.gif",
  "hearts": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/hearts.gif",
  "laughing": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/laughing.gif",
  "mindblown": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/mindblown.gif",
  "puke": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/puke.gif",
  "startled": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/startled.gif",
  "tongue_out": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/tongue_out.gif",
  "walk": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/walk.gif",
  "walk_fast": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/walk_fast.gif",
  "shadow_walk": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/shadow_walk.gif",
  "loading": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/loading.gif",
  "pacman": "https://raw.githubusercontent.com/githubnext/universe-blocks-demo/main/src/images/pacman.gif",
  "dance": "https://media.tenor.com/SSY2V0RrU3IAAAAd/rick-roll-rick-rolled.gif"
}
const imageMovement = {
  walk: -50,
  walk_fast: 50,
  shadow_walk: 50,
  loading: -30,
  pacman: 50,
  dance: 50,
}
const onAddMona = ({
  parentElement = document.body,
  hasConfetti = true,
  confettiColors = defaultColors,
  imageNames = [
    "angry",
    "eyeroll",
    "grimace",
    "heart_eyes",
    "hearts",
    "laughing",
    "mindblown",
    "puke",
    "startled",
    "tongue_out",
    "walk",
    "shadow_walk",
    "loading",
    "pacman",
    "dance",
  ],
  duration = 5000,
} = {}) => {
  const wrapper = document.createElement("div")
  if (parentElement === document.body) {
    wrapper.style.position = "fixed"
  } else {
    wrapper.style.position = "absolute"
  }
  wrapper.style.bottom = "0"
  wrapper.style.left = "0"
  wrapper.style.right = "0"
  wrapper.style.top = "0"
  wrapper.style.zIndex = 1000
  wrapper.style.pointerEvents = "none"
  wrapper.style.overflow = "hidden"
  wrapper.style.mixBlendMode = "multiply"
  wrapper.style.userSelect = "none"
  parentElement.appendChild(wrapper)

  const imageWrapper = document.createElement("div")
  imageWrapper.style.position = "absolute"
  imageWrapper.style.width = "0"
  imageWrapper.style.height = "0"

  const filteredImageNames = imageNames.filter((name) => imageUrls[name])
  const imageName = filteredImageNames[Math.floor(Math.random() * filteredImageNames.length)]
  const imgUrl = imageUrls[imageName]
  const img = document.createElement("img")
  img.src = imgUrl
  img.style.maxWidth = "150px"
  img.style.position = "absolute"
  img.style.top = "0"
  img.style.left = "0"
  img.style.mixBlendMode = "multiply"
  img.style.zIndex = 20
  img.style.transform = `translate(-50%, -50%)`
  imageWrapper.appendChild(img)

  const movement = imageMovement[imageName] || 0
  const isMovingRight = movement > 0
  const parentWidth = parentElement.offsetWidth

  if (movement) {
    imageWrapper.style.transform = `translate(${isMovingRight ? -75 : parentWidth + 75}px, 0)`
    imageWrapper.style.bottom = "0"
    imageWrapper.style.left = "0"
    img.style.transform = `translate(-50%, -100%)`
  } else {
    // randomly place in parent element
    imageWrapper.style.left = `${Math.max(75, Math.random() * (parentWidth - 75))}px`
    imageWrapper.style.bottom = `${Math.max(75, Math.random() * (parentElement.offsetHeight - 75))}px`
    imageWrapper.style.transform = `scale(${Math.random() * 0.5 + 0.5})`
  }

  wrapper.appendChild(imageWrapper)
  img.setAttribute("width", "auto")

  imageWrapper.style.transition = "all 0.6s ease-in-out"

  setTimeout(() => {
    if (movement) {
    } else {
      imageWrapper.style.transform = `scale(1)`
    }
  })

  if (hasConfetti) playConfetti(imageWrapper, confettiColors)
  setTimeout(() => {
    if (movement) {
      imageWrapper.style.transition = `transform ${duration}ms linear`
      imageWrapper.style.transform = `translate(${isMovingRight ? parentElement.clientWidth + 75 : -75}px, 0)`
    } else {
      imageWrapper.style.transition = `all ${duration}ms linear`
      imageWrapper.style.transform = "scale(0)"
      imageWrapper.style.opacity = 0
    }
    setTimeout(() => {
      wrapper.remove()
    }, duration)
  }, 1000)
}

const defaultColors = [
  "#d0d7de",
  "#80ccff",
  "#6fdd8b",
  "#eac54f",
  "#ffb77c",
  "#ffaba8",
  "#d8b9ff",
  "#ffadda",
  "#ffb4a1"
]
const confettiSpread = 800
const playConfetti = (wrapper, colors = defaultColors) => {
  for (let i = 0; i < 100; i++) {
    const circle = document.createElement("div")
    circle.style.position = "absolute"
    circle.style.width = "10px"
    circle.style.height = "10px"
    circle.style.borderRadius = "50%"
    circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    wrapper.appendChild(circle)
    const duration = Math.random() * 1000 + 1000
    circle.style.transition = `all ${duration}ms ease-in-out`
    setTimeout(() => {
      circle.style.transform = `translate(${Math.random() * confettiSpread - confettiSpread / 2}px, ${Math.random() * confettiSpread - confettiSpread / 2}px)`
      circle.style.opacity = 0
      setTimeout(() => {
        // clean up
        wrapper.removeChild(circle)
      }, duration)
    })
  }
}

// preload images
Object.values(imageUrls).forEach((url) => {
  const img = new Image()
  img.src = url
})

module.exports = onAddMona
