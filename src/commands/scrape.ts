import { GluegunToolbox } from 'gluegun'
import { DREAMLAND, BOL, AMAZON } from '../contants'

module.exports = {
  name: 'scrape',
  alias: ['s'],
  description: 'Runs the webscraper',
  run: async (toolbox: GluegunToolbox) => {
    // retrieve the tools from the toolbox that we will need
    const { scrape, prompt } = toolbox

    const { sitesToScrape }: { sitesToScrape: string[] } = await prompt.ask({
      type: 'multiselect',
      name: 'sitesToScrape',
      message: `Which sites do you want to scrape? (press space to select)`,
      choices: [DREAMLAND, BOL, AMAZON]
    })

    // await scrape(BOL);

    if (sitesToScrape.length === 0) {
      await Promise.allSettled([
        scrape(DREAMLAND),
        scrape(BOL),
        scrape(AMAZON)
        // scrape(PLAYSTATION_DIRECT)
      ])
    } else {
      if (sitesToScrape.includes(DREAMLAND)) {
        await scrape(DREAMLAND)
      }
      else if (sitesToScrape.includes(AMAZON)) {
        await scrape(AMAZON)
      }
      else {
        await scrape(BOL)
      }
    }
  }
}
