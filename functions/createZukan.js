const path = require('path')
const fs = require('fs')
const { google } = require('googleapis')
const sheets = google.sheets('v4')

execAPI('1Qhnt9UAis46VfZA9I9I4lyJ0z55Oa1UzHJfK94Zr6eo', 'jp!A1:E152')

async function execAPI(spreadsheetId, range) {
  const auth = await google.auth.getClient({
    keyFile: path.join('./sa.env.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })

  const apiOptions = {
    auth,
    spreadsheetId,
    range
  }

  sheets.spreadsheets.values.get(apiOptions, async (err, res) => {
    try {
      if (!err) {
        const data = res.data.values
        const head = data.shift()

        const result = []

        await Promise.all(
          data.map(async (i) => {
            const cache = {}
            cache[head[0]] = i[0]
            cache[head[1]] = i[1]
            cache[head[2]] = i[2]
            cache[head[3]] = i[3]
            cache[head[4]] = i[4]
            await result.push(cache)
          })
        )

        const output = JSON.stringify(result, null, ' ')

        fs.writeFile('./src/localize/pokemon/ja.json', output, (err) => {
          if (err) console.log(`error!::${err}`)
        })
      }
    } catch (err) {
      console.log(err)
    }
  })
}
