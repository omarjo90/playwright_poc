import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { GroomingPage } from '../../page-objects/GroomingPage'
import { SelectServicePage } from '../../page-objects/SelectServicePage'
import { BookingPage } from '../../page-objects/BookingPage.ts'
import config from '../../config/config.ts'
import fs from 'fs';
import path from 'path';

const authFilePath = path.join(__dirname, 'auth.json');

test.describe('E2E Testing For Dog Grooming Flow', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let groomingPage: GroomingPage;
    let selectServicePage: SelectServicePage;
    let bookingPage: BookingPage;
    let page;

    test.beforeEach(async ({ browser }) => {
        // Create a new browser context with the saved authentication state
        const context = await browser.newContext({
            storageState: fs.existsSync(authFilePath) ? authFilePath : undefined
        });

        page = await context.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        groomingPage = new GroomingPage(page);
        selectServicePage = new SelectServicePage(page);
        bookingPage = new BookingPage(page);

        // await homePage.visit();
        await page.goto(config.groomingUrl + '/133');

        // Capture any client-side console errors
        page.on('console', msg => console.log(`Console log: ${msg.text()}`));

        // Intercept and log specific requests
        // page.on('request', request => {
        //     const url = request.url();
        //     if (url.includes('logInWithCaptcha') || url.includes('customer')) {
        //         console.log('Request:', {
        //             url: request.url(),
        //             method: request.method(),
        //             headers: request.headers(),
        //             postData: request.postData()
        //         });
        //     }
        // });

        // Intercept and log specific responses
        // page.on('response', response => {
        //     const url = response.url();
        //     if (url.includes('logInWithCaptcha') || url.includes('customer')) {
        //         console.log('Response:', {
        //             url: response.url(),
        //             status: response.status()
        //         });
        //     }
        // });

        // wait until the page is fully loaded
        // await page.waitForLoadState('networkidle');
    });

    test('Test: Dog Grooming Flow', async () => {        
        await groomingPage.checkGroomingSalonHeaderVisible();
        await groomingPage.checkStoreNameVisible('Deer Valley Store');
        await groomingPage.selectAppointmentType();
        await groomingPage.clickBookNowButton();
        await selectServicePage.checkSelectYourGroomingHeaderVisible();
        await selectServicePage.clickBathAndFullHaircutButton();
        await bookingPage.checkBookingHeaderVisible();
        // await bookingPage.checkPetNameVisible('chester');
        // await bookingPage.checkStoreNameVisible('Deer Valley Store');
        // await bookingPage.checkServiceNameVisible('Bath & Full Haircut');
        await bookingPage.checkChoosePetOptionIsActive('chester');
        // await console.log('Waiting for 20 seconds');
        // await page.waitForTimeout(20000);
        await bookingPage.clickOptionstoBookAnAppointment();
        await bookingPage.checkBookingConfirmation();
    });
});