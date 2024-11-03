import { JSDOM } from 'jsdom'

export default function setupDOM() {
  const dom = new JSDOM()
  globalThis.window = dom.window
  globalThis.document = dom.window.document
}