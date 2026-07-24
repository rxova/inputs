import { chromium } from 'playwright'
import { PNG } from 'pngjs'
import gifenc from 'gifenc'

const { GIFEncoder, quantize, applyPalette } = gifenc
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

/**
 * Generates the images shown in the docs and READMEs, straight from the real
 * component — never hand-drawn, so they cannot lie about what it renders. The
 * locale grids become PNGs; the focus/blur and grouping behaviours become GIFs
 * of a real keyboard interaction.
 *
 * Expects the playground dev server to be serving `/capture.html`:
 *   pnpm --filter @react-intl-currency-input/playground dev   # http://localhost:5173
 *   node scripts/capture-examples.mjs
 */

const BASE = process.env.CAPTURE_URL ?? 'http://localhost:5173'

// Written to both: the docs serve from static/img; the package README ships with
// the package and references ./assets/examples relatively (npm rewrites those to
// the repo, so they resolve without being in the published `files`).
const OUT_DIRS = [
  fileURLToPath(new URL('../apps/docs/static/img/examples/', import.meta.url)),
  fileURLToPath(new URL('../packages/react-intl-currency-input/assets/examples/', import.meta.url)),
]

const save = (name, buffer) => {
  for (const dir of OUT_DIRS) writeFileSync(`${dir}${name}`, buffer)
}

const clipOf = (box) => ({
  x: Math.round(box.x),
  y: Math.round(box.y),
  width: Math.round(box.width),
  height: Math.round(box.height),
})

function encodeGif(frames) {
  const gif = GIFEncoder()
  for (const { buffer, delay } of frames) {
    const png = PNG.sync.read(buffer)
    const palette = quantize(png.data, 256)
    const index = applyPalette(png.data, palette)
    gif.writeFrame(index, png.width, png.height, { palette, delay })
  }
  gif.finish()
  return Buffer.from(gif.bytes())
}

async function shotBox(page, id) {
  const el = page.locator(`[data-shot="${id}"]`)
  await el.waitFor({ state: 'visible' })
  return clipOf(await el.boundingBox())
}

/** A frame grabber bound to one shot's clip. */
function grabber(page, clip) {
  const frames = []
  const grab = async (delay) => {
    frames.push({ buffer: await page.screenshot({ clip }), delay })
  }
  return { frames, grab }
}

/**
 * The headline GIF: in a Bulgarian field, 5000 stays 5000, but the moment the
 * value crosses 10000 a (non-breaking) space appears — the CLDR rule that only
 * groups above 9999, applied for free because Intl owns the formatting.
 */
async function bulgarianGif(page) {
  await page.reload({ waitUntil: 'networkidle' })
  const clip = await shotBox(page, 'bulgarian')
  const field = page.locator('[data-shot="bulgarian"] input')
  const { frames, grab } = grabber(page, clip)

  await field.focus()
  await grab(500)
  // 5, 50, 500, 5000 — no group separator below 10000…
  for (const ch of '5000') {
    await field.pressSequentially(ch, { delay: 20 })
    await grab(360)
  }
  await grab(700) // "5000 лв." held — still contiguous
  // …then the 5th digit crosses 10000 and the space appears, live.
  await field.pressSequentially('0', { delay: 20 })
  await grab(400)
  await page.waitForTimeout(60)
  await grab(2000) // "50 000 лв." held

  return encodeGif(frames)
}

/** The core mechanic: grouping and the symbol appear live as you type, caret stable. */
async function liveGif(page) {
  await page.reload({ waitUntil: 'networkidle' })
  const clip = await shotBox(page, 'live')
  const field = page.locator('[data-shot="live"] input')
  const { frames, grab } = grabber(page, clip)

  await field.focus()
  await grab(500)
  for (const ch of '1234567') {
    await field.pressSequentially(ch, { delay: 20 })
    await grab(190)
  }
  await field.pressSequentially(',89', { delay: 40 })
  await grab(220)
  await page.waitForTimeout(60)
  await grab(2000) // "1.234.567,89 €", held

  return encodeGif(frames)
}

/** Type ASCII, blur, and it renders in native Arabic-Indic digits, right-to-left. */
async function arabicGif(page) {
  await page.reload({ waitUntil: 'networkidle' })
  const clip = await shotBox(page, 'arabic')
  const field = page.locator('[data-shot="arabic"] input')
  const { frames, grab } = grabber(page, clip)

  await field.focus()
  await grab(500)
  for (const ch of '50000') {
    await field.pressSequentially(ch, { delay: 20 })
    await grab(150)
  }
  await field.blur() // -> native digits, RTL
  await page.waitForTimeout(60)
  await grab(2000)

  return encodeGif(frames)
}

async function main() {
  for (const dir of OUT_DIRS) mkdirSync(dir, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage({ deviceScaleFactor: 2 })
  await page.goto(`${BASE}/capture.html`, { waitUntil: 'networkidle' })
  await page.locator('[data-shot="matrix"]').waitFor({ state: 'visible' })

  for (const id of ['matrix', 'same-currency']) {
    const clip = await shotBox(page, id)
    save(`${id}.png`, await page.screenshot({ clip }))
    console.log(`  ✔ ${id}.png`)
  }

  save('bulgarian.gif', await bulgarianGif(page))
  console.log('  ✔ bulgarian.gif')
  save('live.gif', await liveGif(page))
  console.log('  ✔ live.gif')
  save('arabic.gif', await arabicGif(page))
  console.log('  ✔ arabic.gif')

  await browser.close()
  console.log(`\n✔ captured to:\n  ${OUT_DIRS.join('\n  ')}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
