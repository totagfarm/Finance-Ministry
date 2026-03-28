const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://code.highcharts.com/mapdata/countries/lr/lr-all.topo.json',
  'https://raw.githubusercontent.com/eHealthAfrica/locations/master/geojson/liberia_counties.geojson'
];

async function download() {
  for (const url of urls) {
    console.log('Trying', url);
    try {
      await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          if (res.statusCode !== 200) {
            reject(new Error('Status: ' + res.statusCode));
            return;
          }
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            fs.writeFileSync(path.join(__dirname, 'public', 'liberia.json'), data);
            console.log('Successfully saved to public/liberia.json');
            resolve();
          });
        }).on('error', reject);
      });
      return; // Stop if successful
    } catch (e) {
      console.log('Failed', e.message);
    }
  }
}
download();
