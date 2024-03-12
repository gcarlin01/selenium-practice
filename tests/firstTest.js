const { Builder } = require("selenium-webdriver");

async function example() {
  // launch the browser
  // navigate to the url
  // add a todo
  // close the browser

  let driver = await new Builder().forBrowser("firefox").build();
  await driver.get("https://lambdatest.github.io/sample-todo-app/");
  await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
  await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
  await driver.quit();
}
