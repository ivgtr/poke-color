const path = require('path')
const csv = require('csvtojson')
const { google } = require('googleapis')
const sheets = google.sheets('v4')

execAPI('1Qhnt9UAis46VfZA9I9I4lyJ0z55Oa1UzHJfK94Zr6eo', 'jp!A1:D152')

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

  sheets.spreadsheets.values.get(apiOptions, (err, res) => {
    if (!err) {
      const result = res.data.values
      csv().on(result, (data) => {
        // data is a buffer object
        const jsonStr = data.toString('utf8')
        console.log(jsonStr)
      })
    }
  })
}
