const { merge } = require('lodash')
const puppeteer = require('puppeteer')

class Ficker {
  constructor(options) {
    this.defaults = {
      headless: true,
      devtools: false
    }

    this.options = merge(this.defaults, options)
  }

  scheme(scheme) {
    this.scheme = scheme

    return this
  }

  async fetch(pageUrl) {
    this.pageUrl = pageUrl

    return this.run()
  }

  run() {
    return new Promise(async (resolve, reject) => {
      const browser = await puppeteer.launch(this.options)
      const page = await browser.newPage()

      await page.goto(this.pageUrl, { waitUntil: 'networkidle0' })
      await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' })

      const $ = await page.evaluateHandle(() => window.$ || window.jQuery)
      const resultHandle = await page.evaluateHandle(this.scheme, $);

      try {
        const data = await resultHandle.jsonValue()

        resolve(data)
      } catch (err) {
        reject(err)
      }

      await browser.close()
    })
  }
}

module.exports = Ficker