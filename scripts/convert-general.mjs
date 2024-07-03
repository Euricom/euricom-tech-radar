import fs from 'node:fs'
import path from 'node:path'

const __dirname = import.meta.dirname

const content = fs.readFileSync(path.join(__dirname, '../public/index.json'))
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
      link: item.link,
      moved: mapMoved(item.moved, item.isNew),
      // -1 = moved out (triangle pointing down)
      //  0 = not moved (circle)
      //  1 = moved in  (triangle pointing up)
      //  2 = new       (star)
    }
  }),
}

fs.writeFileSync(path.join(__dirname, '../public/zalando-index.json'), JSON.stringify(zalando, null, 2))

function mapMoved(moved, isNew) {
  if (isNew === 'true') return 2
  switch (moved) {
    case 'out':
      return -1
    case 'in':
      return 1
    case 'new':
      return 2
    default:
      return 0
  }
}

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
    case 'Languages & Frameworks':
      return 1
    case 'Patterns and Practices':
      return 2
    case 'Platforms & infrastructure':
      return 3
  }
}
