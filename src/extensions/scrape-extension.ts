// import * as fs from 'fs'
import { GluegunToolbox } from 'gluegun'
import * as schedule from 'node-schedule'
import { AMAZON, DREAMLAND } from '../contants'
import { scrapeAMAZON } from '../utils/scrape-amazon-util'
import { scrapeBOL } from '../utils/scrape-bol-util'
import { scrapeDREAMLAND } from '../utils/scrape-dreamland-util'
// import { scrapeTarget } from '../utils/scrape-target-util'
// import { scrapeDirect } from '../utils/scrape-direct-util'
// import { scrapeWalmart } from '../utils/scrape-walmart-util'
// import { scrapeBOL } from '../utils/scrape-bol-util'

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.scrape = async (site: string) => {
    // const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
    const cronJobSchedule = null
    // const cronJobSchedule = config.cronSchedule

    // let scraperToRun = scrapeBOL
    // let scraperToRun = scrapeDREAMLAND
    let scraperToRun = scrapeBOL
    if (site === DREAMLAND) {
      scraperToRun = scrapeDREAMLAND
    } else if (site === AMAZON) {
      scraperToRun = scrapeAMAZON
    } else {
      scraperToRun = scrapeBOL
    }
    // else if (site === BOL) {
    //   scraperToRun = scrapeBOL
    // }

    if (!cronJobSchedule) {
      await scraperToRun()
    } else {
      toolbox.print.info('scheduled ps5bot for checkout')
      schedule.scheduleJob(cronJobSchedule, async () => {
        await scraperToRun()
      })
    }
  }
}
