const { Builder } = require("selenium-webdriver");
var should = require("chai").should();

describe("add todo app tests", function () {
  it("successfully adds a todo to application", async function () {
    // launch the browser
    let driver = await new Builder().forBrowser("firefox").build();

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
