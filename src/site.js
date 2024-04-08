require('./common')
require('./images/logo.png')
require('./images/radar_legend.png')
require('./analytics.js')

const Factory = require('./util/factory')

Factory().build()

document.getElementById('document-input').value = process.env.DOC_URL ?? 'http://localhost:8080/web.json'
