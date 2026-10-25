const portalSpell = document.querySelector('.portal-spell-input')
const portalTorch = document.querySelector('.portal-spell-torch')
const portal = document.querySelector('.portal')
const portalName = document.querySelector('.portal-name-input')
const darkLayer = document.querySelector('.scene-dark')

let clicks = 1
let seekerName = 'admin'
let seekerSpell = 'qwerty'

portal.addEventListener('submit',function(e){
    e.preventDefault()
    if (portalName.value == seekerName && portalSpell.value == seekerSpell) {
        alert('Двері відчинено!')
        portal.setAttribute('action','./treasure.html')
        portal.submit()
    } else {
        alert('Невірне заклинання! Портал заблоковано')
        portal.classList.remove('portal-shake')
        void portal.offsetWidth
        portal.classList.add('portal-shake')
    }
})

portalTorch.addEventListener('click',function(){
    clicks++
    if (clicks%2==0) {
        portalSpell.setAttribute('type','text')
        portalTorch.setAttribute('src','./torch-on.png')
        document.body.classList.add('scene-lit')
        darkLayer.style.setProperty('--r', '420px')
    } else {
        portalSpell.setAttribute('type','password')
        portalTorch.setAttribute('src','./torch-off.png')
        document.body.classList.remove('scene-lit')
        darkLayer.style.setProperty('--r', '140px')
    }
})

// ===== Світло за курсором / пальцем =====
function moveLight(x, y) {
    darkLayer.style.setProperty('--mx', x + 'px')
    darkLayer.style.setProperty('--my', y + 'px')
}
window.addEventListener('mousemove', (e) => moveLight(e.clientX, e.clientY))
window.addEventListener('touchmove', (e) => moveLight(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
moveLight(innerWidth / 2, innerHeight / 2)

// ===== Іскри =====
const cvs = document.querySelector('.scene-embers')
const ctx = cvs.getContext('2d')
const sparks = []

function resize() {
    cvs.width = innerWidth
    cvs.height = innerHeight
}
resize()
window.addEventListener('resize', resize)

for (let i = 0; i < 60; i++) {
    sparks.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        s: Math.random() * 2 + 0.5,
        v: Math.random() * 0.6 + 0.2,
        p: Math.random() * 6
    })
}

function tick() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    for (const s of sparks) {
        s.y -= s.v
        s.p += 0.02
        s.x += Math.sin(s.p) * 0.4
        if (s.y < -5) {
            s.y = cvs.height + 5
            s.x = Math.random() * cvs.width
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.s, 0, 6.28)
        ctx.fillStyle = 'rgba(255,140,40,' + (0.25 + Math.sin(s.p) * 0.2) + ')'
        ctx.fill()
    }
    requestAnimationFrame(tick)
}
tick()