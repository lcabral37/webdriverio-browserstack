describe("Testing with Bstackdemo", () => {
  it("add product to cart", async () => {

    /** the use of  overwriteCommand() will use wdio/utils/monads which will
    * emit a 'result' event with a different payload than the expected by
    * wdio/browserstack-service/insights-handler
    */


    await browser.overwriteCommand('url', async function (originalFunction, path) {
      console.info('overwriteCommand browser.url()')
      return originalFunction(path);
    });

    await browser.url("https://bstackdemo.com/");
    await browser.waitUntil(
      async () => (await browser.getTitle()).match(/StackDemo/i),
      5000,
      "Title didn't match with BrowserStack"
    );

    const productOnScreen = await $('//*[@id="1"]/p');
    const productOnScreenText = await productOnScreen.getText();

    const addToCart = await $('//*[@id="1"]/div[4]');
    await addToCart.click();

    const productInCart = await $('//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]');

    await browser.waitUntil(async () => (
      await productInCart.getText()).match(productOnScreenText), 
      { timeout: 5000 }
    );
  });
});

/**
 * An unhandledRejection is caught here.
 * In our system, unhandledExceptions cause the process to terminate and exit and
 * we  would prefer not to have to catch unhandled exceptions like this as it
 * has the potential to pollute the error output.
 *
 * IMHO the exception should be fixed and could be done so by adding an if condition
 * to https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-browserstack-service/src/insights-handler.ts#L229-L247
 */
process.on('unhandledRejection', error => {
  console.error('unhandledRejection', {error});
});
