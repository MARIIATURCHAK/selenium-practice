const { Builder, By } = require("selenium-webdriver");
const fs = require("fs");
const csv = require("csv-parser");

const users = [];

fs.createReadStream("users.csv")
    .pipe(csv())
    .on("data", (row) => {
        users.push(row);
    })
    .on("end", async () => {
        await test();
    });

async function test() {
    const driver = await new Builder()
        .forBrowser("chrome")
        .build();

    await driver.manage().window().maximize();

    await driver.get("https://stage.gocommunicare.com/sign-in");
    await new Promise(resolve => setTimeout(resolve, 3000));

    const email = await driver.findElement(
        By.xpath('//label[text()="Email"]/following-sibling::div//input')
    );
    await email.sendKeys("test_mail");

    await new Promise(resolve => setTimeout(resolve, 3000));

    const password = await driver.findElement(
        By.xpath('//input[@type="password"]')
    );
    await password.sendKeys("test_password");

    await new Promise(resolve => setTimeout(resolve, 3000));

    const signin = await driver.findElement(
        By.xpath('//button[text()="Sign in"]')
    );
    await signin.click();

    await new Promise(resolve => setTimeout(resolve, 3000));

    const searchInput = await driver.findElement(
        By.css('input[placeholder="Search agent, call or client"]')
    );
    await searchInput.sendKeys("James Jackson");

    await new Promise(resolve => setTimeout(resolve, 5000));

    const clients = await driver.findElement(
        By.xpath('//p[text()="Clients"]')
    );
    await clients.click();

    await new Promise(resolve => setTimeout(resolve, 3000));

    const createNew = await driver.findElement(
        By.xpath('//button[text()="Create new"]')
    );
    await createNew.click();

    await new Promise(resolve => setTimeout(resolve, 3000));

    const inputs = await driver.findElements(
        By.xpath('//label[normalize-space()="First name"]/parent::div//input')
    );

    for (const input of inputs) {
        if (await input.isDisplayed()) {
            await input.sendKeys("Aaron");
            break;
        }
    }

    const lastNameInputs = await driver.findElements(
        By.xpath('//label[normalize-space()="Last name"]/parent::div//input')
    );

    for (const input of lastNameInputs) {
        if (await input.isDisplayed()) {
            await input.sendKeys("Stoun");
            break;
        }
    }

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

    const create = await driver.findElement(
        By.xpath('//button[normalize-space()="Create" and @type="button"]')
    );
    await create.click();

    await new Promise(resolve => setTimeout(resolve, 5000));

    const menuButton = await driver.findElement(
        By.xpath('//tr[.//td[normalize-space()="Aaron Stoun"]]//button')
    );
    await menuButton.click();

    await new Promise(resolve => setTimeout(resolve, 2000));

    const deactivate = await driver.findElement(
        By.xpath('//ul[@role="menu"]//*[normalize-space()="Deactivate"]')
    );
    await deactivate.click();

    await new Promise(resolve => setTimeout(resolve, 2000));

    const confirmDeactivate = await driver.findElement(
        By.xpath('//button[normalize-space()="Deactivate" and @type="button"]')
    );
    await confirmDeactivate.click();

    await new Promise(resolve => setTimeout(resolve, 3000));

    for (const user of users) {
        const createNewClient = await driver.findElement(
            By.xpath('//button[text()="Create new"]')
        );
        await createNewClient.click();

        await new Promise(resolve => setTimeout(resolve, 3000));

        const firstNameInputs = await driver.findElements(
            By.xpath('//label[normalize-space()="First name"]/parent::div//input')
        );

        for (const input of firstNameInputs) {
            if (await input.isDisplayed()) {
                await input.sendKeys(user.firstName);
                break;
            }
        }

        const lastNameInputs = await driver.findElements(
            By.xpath('//label[normalize-space()="Last name"]/parent::div//input')
        );

        for (const input of lastNameInputs) {
            if (await input.isDisplayed()) {
                await input.sendKeys(user.lastName);
                break;
            }
        }

        const phoneInputs = await driver.findElements(
            By.xpath('//label[normalize-space()="Phone number"]/parent::div//input')
        );

        for (const input of phoneInputs) {
            if (await input.isDisplayed()) {
                await input.sendKeys(user.phone);
                break;
            }
        }

        const createClient = await driver.findElement(
            By.xpath('//button[normalize-space()="Create" and @type="button"]')
        );
        await createClient.click();

        await new Promise(resolve => setTimeout(resolve, 5000));

        const clientName = `${user.firstName} ${user.lastName}`;

        const userMenuButton = await driver.findElement(
            By.xpath(`//tr[.//td[normalize-space()="${clientName}"]]//button`)
        );
        await userMenuButton.click();

        await new Promise(resolve => setTimeout(resolve, 2000));

        const userDeactivate = await driver.findElement(
            By.xpath('//ul[@role="menu"]//*[normalize-space()="Deactivate"]')
        );
        await userDeactivate.click();

        await new Promise(resolve => setTimeout(resolve, 2000));

        const userConfirmDeactivate = await driver.findElement(
            By.xpath('//button[normalize-space()="Deactivate" and @type="button"]')
        );
        await userConfirmDeactivate.click();

        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    await driver.quit();
}






