const { Builder, By } = require("selenium-webdriver");
    async function test() {
        const driver = await new Builder()
            .forBrowser("chrome")
            .build();
        await driver.manage().window().maximize();
        await driver.get("https://stage.gocommunicare.com/sign-in");
        await new Promise(resolve => setTimeout(resolve, 3000));
        const email = await driver.findElement(
            By.xpath('//label[text()="Email"]/following-sibling::div//input'));
        await email.sendKeys('TestEmail');
        await new Promise(resolve => setTimeout(resolve, 3000));
        const password = await driver.findElement(
            By.xpath('//input[@type="password"]'));
        await password.sendKeys('TestPassword');
        await new Promise(resolve => setTimeout(resolve, 3000));
        const signin = await driver.findElement(
            By.xpath('//button[text()="Sign in"]'));
        await signin.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const clients = await driver.findElement(
            By.xpath('//p[text()="Clients"]'));
        await clients.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const createNew = await driver.findElement(
            By.xpath('//button[text()="Create new"]'));
        await createNew.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const inputs = await driver.findElements(
            By.xpath('//label[normalize-space()="First name"]/parent::div//input')
        );

        for (const input of inputs) {
            if (await input.isDisplayed()) {
                await input.sendKeys("Emma");
                break;
            }
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        const lastNameInputs = await driver.findElements(
            By.xpath('//label[normalize-space()="Last name"]/parent::div//input')
        );

        for (const input of lastNameInputs) {
            if (await input.isDisplayed()) {
                await input.sendKeys("Stoun");
                break;
            }
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        const phoneInputs = await driver.findElements(
            By.xpath('//label[normalize-space()="Phone number"]/parent::div//input')
        );

        for (const input of phoneInputs) {
            if (await input.isDisplayed()) {
                const phone = "86565" + Math.floor(100 + Math.random() * 900);
                await input.sendKeys(phone);
                break;
            }
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        const create = await driver.findElement(
            By.xpath('//button[normalize-space()="Create" and @type="button"]')
        );

        await create.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const menuButton = await driver.findElement(
            By.xpath('//tr[.//td[normalize-space()="Emma Stoun"]]//button')
        );

        await menuButton.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const deactivate = await driver.findElement(
            By.xpath('//ul[@role="menu"]//*[normalize-space()="Deactivate"]')
        );

        await deactivate.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const confirmDeactivate = await driver.findElement(
            By.xpath('//button[normalize-space()="Deactivate" and @type="button"]')
        );

        await confirmDeactivate.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const search = await driver.findElement(
            By.xpath("//button[normalize-space()='Search']")
        );

        await search.click();

        await new Promise(resolve => setTimeout(resolve, 3000));
        const text = await driver.findElement(By.xpath("//input[@type='text']"));

        await text.sendKeys('barbara');

        await new Promise(resolve => setTimeout(resolve, 3000));
        const searchButton = await driver.findElement(By.xpath("//button[@aria-label='Search']")
        );

        await searchButton.click();

        await new Promise(resolve => setTimeout(resolve, 5000));
        await driver.quit();
    }
    test();



