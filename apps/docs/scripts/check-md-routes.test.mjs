// This checker is the only thing standing between a page growing an MDX
// construct the normalizer does not handle and an agent reading `<TabItem
// label="npm">` as though it were prose. So what these tests pin down is that it
// actually fails — and, just as importantly, that it does NOT fail on snippet
// content, because a false positive here invites "fixing" the normalizer to
// rewrite URLs inside code fences, which corrupts every example on the site.

import { describe, it, beforeEach, afterAll } from 'vitest'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { checkMdRoutes, twinFor, MAX_LLMS_FULL_BYTES } from './check-md-routes.mjs'

const roots = []
let root
beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'rxova-md-routes-'))
  roots.push(root)
})
afterAll(() => {
  for (const dir of roots) rmSync(dir, { recursive: true, force: true })
})

function write(path, body) {
  const full = join(root, path)
  mkdirSync(join(full, '..'), { recursive: true })
  writeFileSync(full, body)
}

const page = (body = 'x') => `<!doctype html><html><body><main>${body}</main></body></html>`
const redirect = () => '<!doctype html><meta http-equiv="refresh" content="0; url=/x/">'

/** A dist with the home page and one twinned route, which is the passing shape. */
function validSite() {
  write('index.html', page())
  write('components/otp/usage/index.html', page())
  write('components/otp/usage.md', '# Usage\n\nProse.\n')
}

const run = () => checkMdRoutes(root)

describe('twinFor', () => {
  it('puts the twin beside the route directory, not inside it', () => {
    assert.equal(twinFor('components/otp/usage/index.html'), 'components/otp/usage.md')
    assert.equal(twinFor('components/otp/api/index.html'), 'components/otp/api.md')
    assert.equal(twinFor('index.html'), 'index.md')
  })
})

describe('checkMdRoutes', () => {
  it('passes a site where every page has its twin', async () => {
    validSite()
    const { failures, twins } = await run()
    assert.deepEqual(failures, [])
    assert.equal(twins, 1)
  })

  it('reports a page that has no twin at all', async () => {
    validSite()
    write('overview/index.html', page())

    const { failures } = await run()
    assert.equal(failures.length, 1)
    assert.match(failures[0], /overview\/index\.html has no markdown twin at overview\.md/)
  })

  // Astro writes a dozen of these from the config's `redirects` map. They have no
  // content to twin, and demanding one would fail the build on every release.
  it('does not demand a twin for a redirect stub', async () => {
    validSite()
    write('migrating/from-input-otp/index.html', redirect())

    assert.deepEqual((await run()).failures, [])
  })

  it('does not demand a twin for the splash home page or the 404', async () => {
    validSite()
    write('404.html', page())

    assert.deepEqual((await run()).failures, [])
  })

  describe('MDX that leaked into a twin', () => {
    const cases = [
      ['<TabItem label="npm">\n\nx', /Starlight\/MDX component/],
      ["import { Tabs } from '@astrojs/starlight/components'", /MDX import/],
      ['See the [API](/components/otp/api).', /root-relative link/],
      ['<img src="/logo.svg" />', /root-relative HTML attribute/],
      ['<img src={`${import.meta.env.BASE_URL}a.svg`} />', /unresolved BASE_URL/],
      ['```tsx live\nconst a = 1\n```', /live fence meta/],
    ]

    for (const [body, expected] of cases) {
      it(`reports ${JSON.stringify(body.slice(0, 32))}`, async () => {
        validSite()
        write('components/otp/usage.md', body)

        const { failures } = await run()
        assert.equal(failures.length, 1, failures.join('\n'))
        assert.match(failures[0], expected)
      })
    }
  })

  // The false positive that a whole-document scan produces, and the reason the
  // checker shares mdx-to-markdown's fence splitting rather than using its own.
  it('does not report a root-relative URL that is snippet content', async () => {
    validSite()
    write(
      'components/otp/usage.md',
      ['# Usage', '', '```tsx', '<Rating icon={<img src="/badge.svg" />} />', '```'].join('\n'),
    )

    assert.deepEqual((await run()).failures, [])
  })

  it('does not report an MDX component named inside a fence', async () => {
    validSite()
    write('components/otp/usage.md', ['```mdx', '<Card title="Example">x</Card>', '```'].join('\n'))

    assert.deepEqual((await run()).failures, [])
  })

  describe('llms-full.txt budget', () => {
    it('is silent when the file does not exist yet', async () => {
      validSite()
      assert.deepEqual((await run()).failures, [])
    })

    it('passes a file inside the budget', async () => {
      validSite()
      write('llms-full.txt', 'x'.repeat(1024))
      assert.deepEqual((await run()).failures, [])
    })

    // Fails loudly rather than letting the file quietly become the thing it
    // exists to avoid — something too large for the context window it feeds.
    it('fails a file over it, naming the budget', async () => {
      validSite()
      write('llms-full.txt', 'x'.repeat(MAX_LLMS_FULL_BYTES + 1))

      const { failures } = await run()
      assert.equal(failures.length, 1)
      assert.match(failures[0], /llms-full\.txt is \d+ kB, over the 800 kB budget/)
    })
  })
})
