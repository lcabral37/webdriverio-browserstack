describe('BrowserStack Local Testing', async () => {


  it('can check tunnel working', async () => {

    await browser.overwriteCommand('url', async function (originalFunction, path) {
      console.info(`overwriteCommand browser.url(${path})`)
      return originalFunction(path);
    });

    await browser.url('http://bs-local.com:45454');
    await browser.waitUntil(
      async () => (await browser.getTitle()).match(/BrowserStack Local/i),
      5000,
      "Failed to connect local tunnel"
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
