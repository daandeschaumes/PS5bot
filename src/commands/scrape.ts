import { GluegunToolbox } from 'gluegun'
import {  BOL } from '../contants'

module.exports = {
  name: 'scrape',
  alias: ['s'],
  description: 'Runs the webscraper',
  run: async (toolbox: GluegunToolbox) => {
    // retrieve the tools from the toolbox that we will need
    const { scrape } = toolbox

    // const { sitesToScrape }: { sitesToScrape: string[] } = await prompt.ask({
    //   type: 'multiselect',
    //   name: 'sitesToScrape',
    //   message: `Which sites do you want to scrape? (press space to select)`,
    //   choices: [PLAYSTATION_DIRECT, TARGET, WALMART, BOL]
    // })
    console.log('Scraping from BOL')

    await scrape(BOL);

    // if (sitesToScrape.length === 0) {
    //   await Promise.allSettled([
    //     scrape(TARGET),
    //     scrape(WALMART),
    //     scrape(PLAYSTATION_DIRECT),
    //     scrape(BOL)
    //   ])
    // } else {
    //   if (sitesToScrape.includes(TARGET)) {
    //     await scrape(TARGET)
    //   } else if (sitesToScrape.includes(WALMART)) {
    //     await scrape(WALMART)
    //   } 
    //   else if(sitesToScrape.includes(BOL)){
    //     await scrape(BOL)
    //   }
    //   else {
    //     await scrape(PLAYSTATION_DIRECT)
    //   }
    // }
  }
}
