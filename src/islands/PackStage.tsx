import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * The pack stage.
 *
 * Five parametric pack shapes, built from the same millimetre dimensions the die
 * lines use, so what turns on screen is the pack the client actually has rather
 * than a stock mockup. The approach is the SF Pack AI engine's, kept
 * deliberately lean here: this island sells the format, it does not lay out
 * artwork.
 *
 * It doubles as the format navigator — switching the pack is how a visitor says
 * "I have a 300 g pouch", which the brief identifies as the thing nothing on the
 * current site lets anyone do.
 */

const S = 0.1 // scene units are centimetres

export interface StageFormat {
  slug: string
  label: string
  shape: 'pouch' | 'tub' | 'stick' | 'bottle' | 'carton'
  /** Millimetres, from a die line we actually hold where there is one. */
  w: number
  h: number
  d: number
  caption: string
}

export const STAGE_FORMATS: StageFormat[] = [
  { slug: 'pouches', label: 'Pouch', shape: 'pouch', w: 188, h: 260, d: 55, caption: '500 g Doy-Seal · 188 × 260 mm · 55 mm gusset' },
  { slug: 'tubs-pots-and-jars', label: 'Tub', shape: 'tub', w: 95, h: 140, d: 95, caption: 'Powder tub · label wraps the cylinder' },
  { slug: 'sticks-and-sachets', label: 'Stick', shape: 'stick', w: 30, h: 142, d: 12, caption: 'Stick pack · 142 mm · hierarchy has to survive at 30 mm' },
  { slug: 'bottles', label: 'Bottle', shape: 'bottle', w: 50, h: 118, d: 50, caption: 'Capsule bottle · the curve takes the label edges out of view' },
  { slug: 'cartons-and-blisters', label: 'Carton', shape: 'carton', w: 77, h: 130, d: 40, caption: 'Carton · 77 × 40 × 130 mm · die line drawn for the product' },
]

function material(colour: string, roughness: number, metalness = 0.04) {
  return new THREE.MeshStandardMaterial({ color: colour, roughness, metalness })
}

/**
 * Gold on graphite. The stage is near-black, so the pack itself has to sit a few
 * stops above it or the silhouette disappears — the thing being sold here is the
 * shape of the pack, and a black pack on a black ground has no shape.
 */
const BODY = '#54544c'
const BOARD = '#615f55'
const GOLD = '#c8a03a'

function buildPack(f: StageFormat): THREE.Group {
  const g = new THREE.Group()
  const w = f.w * S
  const h = f.h * S
  const d = f.d * S

  const body = material(BODY, 0.52)
  const accent = material(GOLD, 0.34, 0.45)

  switch (f.shape) {
    case 'pouch': {
      // A stand-up pouch is a flattened box that tapers to the top seal. The
      // gusset is a printed surface, so it is modelled rather than implied.
      const geo = new THREE.BoxGeometry(w, h, d, 2, 8, 2)
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i)
        const t = (y + h / 2) / h // 0 at base, 1 at seal
        const squeeze = 1 - 0.72 * Math.pow(Math.max(0, t - 0.55) / 0.45, 1.6)
        pos.setZ(i, pos.getZ(i) * squeeze)
        // The base gusset widens slightly so the pack stands.
        if (t < 0.12) pos.setZ(i, pos.getZ(i) * 1.12)
      }
      geo.computeVertexNormals()
      g.add(new THREE.Mesh(geo, body))

      // Zip band. Copy is held clear of it, which is exactly why it is shown.
      const zip = new THREE.Mesh(new THREE.BoxGeometry(w * 1.008, h * 0.036, d * 0.8), accent)
      zip.position.y = h * 0.3
      g.add(zip)
      break
    }
    case 'tub': {
      const r = w * 0.5
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.94, h * 0.84, 48), body))
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.04, r * 1.04, h * 0.16, 48), accent)
      lid.position.y = h * 0.5
      g.add(lid)
      break
    }
    case 'stick': {
      const geo = new THREE.BoxGeometry(w, h, d, 1, 6, 1)
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const t = Math.abs(pos.getY(i)) / (h / 2)
        pos.setZ(i, pos.getZ(i) * (1 - 0.8 * Math.pow(t, 3)))
      }
      geo.computeVertexNormals()
      g.add(new THREE.Mesh(geo, body))
      const band = new THREE.Mesh(new THREE.BoxGeometry(w * 1.01, h * 0.06, d * 1.01), accent)
      band.position.y = -h * 0.24
      g.add(band)
      break
    }
    case 'bottle': {
      const r = w * 0.5
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r, h * 0.72, 44), body))
      const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.42, r, h * 0.14, 44), body)
      shoulder.position.y = h * 0.43
      g.add(shoulder)
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.44, r * 0.44, h * 0.16, 44), accent)
      cap.position.y = h * 0.57
      g.add(cap)
      break
    }
    case 'carton': {
      g.add(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material(BOARD, 0.82)))
      // A crease line down the front edge reads as board rather than plastic.
      const crease = new THREE.Mesh(new THREE.BoxGeometry(w * 0.06, h, d * 1.005), accent)
      crease.position.x = -w * 0.34
      g.add(crease)
      break
    }
  }

  g.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  return g
}

function dispose(g: THREE.Group) {
  g.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose()
      const m = o.material
      Array.isArray(m) ? m.forEach((x) => x.dispose()) : m.dispose()
    }
  })
}

export default function PackStage({ initial = 0 }: { initial?: number }) {
  const host = useRef<HTMLDivElement>(null)
  const packRef = useRef<THREE.Group | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const [active, setActive] = useState(initial)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = host.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // Lighting a pack the way a photographer would: one key, one fill, one rim
    // to separate a near-black pack from a near-black ground.
    const key = new THREE.DirectionalLight('#fff6e4', 4.2)
    key.position.set(-9, 14, 12)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    scene.add(key)

    const fill = new THREE.DirectionalLight('#cfd6e0', 1.0)
    fill.position.set(11, 4, 7)
    scene.add(fill)

    const rim = new THREE.DirectionalLight('#e8c976', 2.6)
    rim.position.set(7, 6, -13)
    scene.add(rim)

    scene.add(new THREE.AmbientLight('#cfd6e0', 0.75))

    let raf = 0
    let pointer = 0
    let target = 0

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target = ((e.clientX - r.left) / r.width - 0.5) * 1.1
    }
    const onLeave = () => { target = 0 }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    const tick = () => {
      raf = requestAnimationFrame(tick)
      pointer += (target - pointer) * 0.06
      const pack = packRef.current
      if (pack) {
        if (!reduced) pack.rotation.y += 0.0042
        pack.rotation.x = -0.06 + pointer * 0.05
        pack.position.x = pointer * 1.4
      }
      renderer.render(scene, camera)
    }
    tick()
    setReady(true)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  // Swap the pack when the format changes, keeping the scene and lights.
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    if (packRef.current) {
      scene.remove(packRef.current)
      dispose(packRef.current)
    }
    const pack = buildPack(STAGE_FORMATS[active])
    pack.rotation.x = -0.06
    pack.rotation.y = 0.62
    scene.add(pack)
    packRef.current = pack

    // Frame it. A 142 mm stick and a 300 mm pouch should both sit in the stage at
    // roughly the same visual weight, so the distance follows the pack.
    const camera = cameraRef.current
    if (camera) {
      const box = new THREE.Box3().setFromObject(pack)
      const size = box.getSize(new THREE.Vector3())
      const reach = Math.max(size.y, size.x * 1.25, size.z * 1.25)
      const fov = (camera.fov * Math.PI) / 180
      camera.position.set(0, size.y * 0.06, (reach / 2 / Math.tan(fov / 2)) * 1.3)
      camera.lookAt(0, 0, 0)
    }
  }, [active, ready])

  const f = STAGE_FORMATS[active]

  return (
    <div className="stage">
      <div className="stage__canvas" ref={host} role="img"
           aria-label={`3D preview of a ${f.label.toLowerCase()}: ${f.caption}`} />

      <div className="stage__controls">
        <div className="stage__tabs" role="tablist" aria-label="Pack format">
          {STAGE_FORMATS.map((sf, i) => (
            <button
              key={sf.slug}
              role="tab"
              aria-selected={i === active}
              className={i === active ? 'stage__tab is-on' : 'stage__tab'}
              onClick={() => setActive(i)}
            >
              {sf.label}
            </button>
          ))}
        </div>
        <p className="stage__caption spec">{f.caption}</p>
        <a className="stage__link" href={`/formats/${f.slug}`}>
          {f.label} packaging design &rarr;
        </a>
      </div>
    </div>
  )
}
