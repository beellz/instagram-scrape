const playwright = require('playwright');
const fs = require('fs');
require('dotenv').config();



(async () => {
    const browser = await playwright["chromium"].launch({
        headless: false
    });
    var today = new Date
    let fullDay = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.instagram.com/accounts/login/");
    await page.waitForTimeout(2000);
    await page.screenshot({
        path: `ig-sign-in.png`,
      });
      let myid = process.env.MYID
      let mypass = process.env.MYPASS
      await page.type("[name=username]", myid);
      await page.type('[type="password"]', mypass);
      await page.click("[type=submit]");
      await page.waitForTimeout(8000);
      await page.goto(`https://www.instagram.com/belalthecoolboy`);
      await page.waitForTimeout(8000);
    // await page.screenshot({path: `ea-${fullDay}.png`});
    await page.waitForSelector("img ", {
        visible: true,
      });

     await page.screenshot({ path: `profile.png`});
     await page.waitForTimeout(2000);
     
    let data = await page.evaluate(() => {
        const images = document.querySelectorAll("img");
        const url = Array.from(images).map((v) => v.src);
        return url;
     
    });

    console.log(typeof data);
    
    // fs.writeFile('newfile.txt', data ,  (err , data) => {
    //     if (err) throw err;
    //     console.log('saved!');
        
    // } );

    let JSData = JSON.stringify(data)
    let toJs = JSON.parse(JSData)

    console.log(typeof toJs);
    
    fs.appendFile('mynewfile1.json', toJs , function (err) {
        if (err) throw err;
        console.log('Updated!');
      });


    await browser.close();
    

})();

