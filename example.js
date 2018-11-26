const Ficker = require('./index.js')
const ficker = new Ficker()
const pageUrl = 'https://www.sahibinden.com/ilan/ikinci-el-ve-sifir-alisveris-bilgisayar-dizustu-notebook-macbook-pro-touchbar-13-i5-3.1ghz-512ssd-8gb-mpxy2tu-a-taksit-596070190/detay'

const runner = async () => {
  const data = await ficker.scheme($ => {
      const elmTitle = $('#classifiedDetail > div.classifiedDetail > div.classifiedDetailTitle > h1').text().trim()

      const elmPrice = $('#classifiedDetail > div.classifiedDetail > div.classifiedDetailContent > div.classifiedInfo > h3')
      const splitPrice = elmPrice.text().trim().split(' ')

      return {
        title: elmTitle,
        price: splitPrice[0].replace(/\./g, ''),
        currency: splitPrice[1],
      }
    })
    .fetch(pageUrl);

  console.log('Data Fetched: ')
  console.log(JSON.stringify(data, null, 4))
}

runner()