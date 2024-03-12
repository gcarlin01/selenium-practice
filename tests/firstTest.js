const { Builder } = require("selenium-webdriver");

async function example() {
  // launch the browser
  // navigate to the url
  // add a todo
  // close the browser

  let driver = await new Builder().forBrowser("firefox").build();
  await driver.get("https://lambdatest.github.io/sample-todo-app/");
  await driver
    .findElement({ id: "sampletodotext" })
    .sendKeys("Learn to automate with Selenium");
  await driver.findElement({ id: "addbutton" }).click();
  await driver.quit();
}

example();
