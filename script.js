const html = document.documentElement
const blocks = document.querySelectorAll('.block')

window.addEventListener('load', () => {
  document.body.className = 'loaded'
  setTimeout(() => {
    document.querySelector('.loaded .loader').style.zIndex = 0
  }, 1000)

  window.addEventListener('scroll', () =>
    document.getElementById('scroll-down').style.opacity = 0
  )
})
window.addEventListener('scroll', animate)
window.addEventListener('resize', animate)

function animate() {
  var scrollTop = window.scrollY
  var htmlHeight = document.body.offsetHeight
  var windowHeight = window.innerHeight
  var scrollPercent = Math.round(
    (scrollTop / (htmlHeight - windowHeight)) * 100
  )

  scrollPercent > 5
    ? blocks[0].classList.remove('show')
    : blocks[0].classList.add('show')

  scrollPercent > 10 && scrollPercent < 30
    ? blocks[1].classList.add('show')
    : blocks[1].classList.remove('show')

  scrollPercent > 35 && scrollPercent < 55
    ? blocks[2].classList.add('show')
    : blocks[2].classList.remove('show')

  scrollPercent > 60 && scrollPercent < 80
    ? blocks[3].classList.add('show')
    : blocks[3].classList.remove('show')
    
  scrollPercent > 85
    ? blocks[4].classList.add('show')
    : blocks[4].classList.remove('show')

  // document.getElementById('scroll-indicator').innerText = scrollPercent
}

/* CANVAS */
/* ---------------------------------------------------------------------------------------------------- */

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const frameCount = 148
const currentFrame = (index) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image()
    img.src = currentFrame(i)
  }
}
const img = new Image()

img.src = currentFrame(1)
canvas.width = 1158
canvas.height = 770
img.onload = function () {
  context.drawImage(img, 0, 0)
}

const updateImage = (index) => {
  img.src = currentFrame(index)
  context.drawImage(img, 0, 0)
}

window.addEventListener('scroll', animateCanvas)

function animateCanvas() {
  const scrollTop = window.scrollY
  const maxScrollTop = html.scrollHeight - window.innerHeight
  const scrollFraction = scrollTop / maxScrollTop
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  )

  requestAnimationFrame(() => updateImage(frameIndex + 1))
}

preloadImages()