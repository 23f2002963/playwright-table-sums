const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=44',
    'https://sanand0.github.io/tdsdata/js_table/?seed=45',
    'https://sanand0.github.io/tdsdata/js_table/?seed=46',
    'https://sanand0.github.io/tdsdata/js_table/?seed=47',
    'https://sanand0.github.io/tdsdata/js_table/?seed=48',
    'https://sanand0.github.io/tdsdata/js_table/?seed=49',
    'https://sanand0.github.io/tdsdata/js_table/?seed=50',
    'https://sanand0.github.io/tdsdata/js_table/?seed=51',
    'https://sanand0.github.io/tdsdata/js_table/?seed=52',
    'https://sanand0.github.io/tdsdata/js_table/?seed=53'
  ];
  
  let grandTotal = 0;
  
  for (const url of urls) {
    console.log(`Visiting: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    
    await page.waitForSelector('table', { timeout: 10000 });
    
    const cells = await page.$$eval('table td', tds => 
      tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
    );
    
    const pageSum = cells.reduce((a, b) => a + b, 0);
    console.log(`Page sum: ${pageSum}`);
    grandTotal += pageSum;
  }
  
  console.log(`GRAND TOTAL SUM OF ALL TABLES: ${grandTotal}`);
  await browser.close();
})();