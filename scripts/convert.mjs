import fs from 'node:fs'
import path from 'node:path'

const __dirname = import.meta.dirname

const content = fs.readFileSync(path.join(__dirname, '../public/web.json'))
const data = JSON.parse(content)
const today = new Date()

const zalando = {
  date: `${today.getFullYear()}/${today.getMonth() + 1}`,
  entries: data.map((item) => {
    return {
      quadrant: mapQuadrant(item.quadrant),
      ring: mapRing(item.ring),
      label: item.name,
      active: true,
      moved: 0,
    }
  }),
}

fs.writeFileSync(path.join(__dirname, '../public/zalando-web.json'), JSON.stringify(zalando, null, 2))

function mapRing(ring) {
  switch (ring) {
    case 'adopt':
      return 0
    case 'trial':
      return 1
    case 'assess':
      return 2
    case 'hold':
      return 3
  }
}

function mapQuadrant(quadrant) {
  switch (quadrant) {
    case 'Tools':
      return 0
    case 'Techniques':
      return 1
    case 'Languages & Frameworks':
      return 2
    case 'Libraries':
      return 3
  }
}
