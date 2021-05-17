import * as puppeteer from 'puppeteer'
import * as notifier from 'node-notifier'

export const scrapeBOL = async () => {
  // const {
  //   email,
  //   phoneNumber,
  //   firstName,
  //   lastName,
  //   state,
  //   city,
  //   zipCode,
  //   address,
  //   creditCardNumber,
  //   expirationMonth,
  //   expirationYear,
  //   cvv
  // } = config

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    defaultViewport: null
  })

  try {
    const page = await browser.newPage()
    await page.setRequestInterception(true)

    page.on('request', async req => {
      if (req.resourceType() === 'image') {
        await req.abort()
      } else {
        await req.continue()
      }
    })

    let URL
    URL = 'https://www.bol.com/nl/p/sony-playstation-5-console/9300000004162282/?country=BE&approved=true&language=nl-BE'
    // URL =
    //   'https://www.bol.com/nl/p/sony-pulse-3d-draadloze-headset-ps4-ps5/9300000007898257/?country=BE&approved=true&language=nl-BE'

    await page.goto(URL, { waitUntil: 'load', timeout: 0 })

    const cookies = [
      {
        name: 'bolConsentChoices',
        value: 'third-party-cookies#false|browse-data#false|crm#false'
      }
    ]

    await page.setCookie(...cookies)
    await page.reload()
    // await page.goto(
    //   'https://www.walmart.com/ip/Sony-PlayStation-5-DualSense-Wireless-Controller/615549727'
    // )

    // keep refreshing until "Add to Cart is visible"
    // const cookies = [
    //   {
    //     name: 'bolConsentChoices',
    //     value: 'third-party-cookies#false|browse-data#false|crm#false'
    //   }
    // ]

    // await page.setCookie(...cookies)

    const addToCartButton = await page.$(
      'a[data-product-id="9300000007898257"]'
    )
    // await page.reload()
    while (true) {
      try {
        console.log('BOL: keep looking')
        await page.waitForSelector('a[data-product-id="9300000004162282"]', {
          timeout: 1000
        })
        break
      } catch (error) {
        await page.reload()
      }
    }

    // const addToCartButton = await page.$('a[data-test="add-to-basket"]')
    if (addToCartButton) await addToCartButton.click()

    await page.waitForTimeout(4000)

    // const checkoutButton = await page.$(
    //   'button[data-tl-id="IPPacCheckOutBtnBottom"]'
    // )
    // await checkoutButton.click()

    // await page.waitForTimeout(4000)

    // const continueWithoutAccountButton = await page.$(
    //   'button[data-tl-id="Wel-Guest_cxo_btn"]'
    // )
    // await continueWithoutAccountButton.click()

    // await page.waitForTimeout(6000)

    // const [continueButton] = await page.$x("//span[contains(., 'Continue')]")
    // await continueButton.click()

    // await page.waitForTimeout(6000)

    // const [disableNotif] = await page.$x(
    //   "//div[contains(., 'Email me about hot items, great savings, and more.')]"
    // )
    // await disableNotif.click()

    // await page.type('input[name="firstName"]', firstName)
    // await page.type('input[name="lastName"]', lastName)
    // await page.type('input[name="phone"]', phoneNumber)
    // await page.type('input[name="email"]', email)
    // await page.type('select[name="state"]', state)
    // await page.keyboard.press('Enter')
    // await page.type('input[name="addressLineOne"]', address)

    // const cityElement = await page.$('input[name="city"]')
    // await cityElement.click({ clickCount: 3 })
    // await page.type('input[name="city"]', city)

    // const postalCodeElement = await page.$('input[name="postalCode"]')
    // await postalCodeElement.click({ clickCount: 3 })
    // await page.type('input[name="postalCode"]', zipCode)

    // await page.keyboard.press('Enter')

    // // wait for possible captcha
    // await page.waitForSelector('input[name="creditCard"]', {
    //   timeout: 900000
    // })
    // await page.type('input[name="creditCard"]', creditCardNumber)
    // await page.type('input[name="cvv"]', cvv)
    // await page.select('select[name="month-chooser"]', expirationMonth)
    // await page.select('select[name="year-chooser"]', expirationYear)

    // await page.keyboard.press('Enter')

    notifier.notify({
      title: 'BOL',
      message: 'Ready to place order!',
      sound: true
    })
  } catch (error) {
    console.log(error)
  } finally {
    // await browser.close();
  }
}
