const { Builder } = require("selenium-webdriver");
const lambdaTestCapabilities = require("../capabilities");
var should = require("chai").should();

describe("add another todo app test", function () {
  var driver;

  //username for lambdatest
  const USERNAME = lambdaTestCapabilities.capability["LT:Options"].username;

  //key
  const KEY = lambdaTestCapabilities.capability["LT:Options"].accessKey;

  //host
  const GRID_HOST = "hub.lambdatest.com/wd/hub";

  //url
  const gridURL = `https://${USERNAME}:${KEY}@${GRID_HOST}`;

  const browsers = [
    {
      name: "Chrome",
      version: "119.0",
      os: "Linux",
    },
    {
      name: "MicrosoftEdge",
      version: "120.0",
      os: "macOS Sonoma",
    },
    {
      name: "Internet Explorer",
      version: "8.0",
      os: "Windows 7",
    },
    {
      name: "Opera",
      version: "97.0",
      os: "Windows 11",
    },
  ];

  browsers.forEach(({ name, version, os }) => {
    it(`successfully adds another todo for ${name}, ${version} in ${os}`, async function () {
      lambdaTestCapabilities.capability.browserName = name;
      lambdaTestCapabilities.capability.browserVersion = version;
      lambdaTestCapabilities.capability["LT:Options"].platformName = os;

      lambdaTestCapabilities.capability["LT:Options"].build = this.test.title;

      // launch the browser
      driver = new Builder()
        .usingServer(gridURL)
        .withCapabilities(lambdaTestCapabilities.capability)
        .build();

      // navigate to the url
      await driver.get("https://lambdatest.github.io/sample-todo-app/");

      // add a todo using locators and actions
      await driver
        .findElement({ id: "sampletodotext" })
        .sendKeys("Learn to automate with Selenium");
      await driver.findElement({ id: "addbutton" }).click();

      // assert the todo
      let newTodo = await driver
        .findElement({
          xpath: "//li[last()]",
        })
        .getText();

      // assert using chai should library
      newTodo.should.equal("Learn to automate with Selenium");

      await driver.quit();
    });
  });
});
