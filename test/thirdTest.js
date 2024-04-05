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

  beforeEach(function () {
    lambdaTestCapabilities.capability["LT:Options"].build =
      this.currentTest.title;
    driver = new Builder()
      .usingServer(gridURL)
      .withCapabilities(lambdaTestCapabilities.capability)
      .build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("successfully adds another todo to application", async function () {
    // launch the browser
    //let driver = await new Builder().forBrowser("firefox").build();

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
  });
});
