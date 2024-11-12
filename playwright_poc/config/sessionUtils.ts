import { Page } from '@playwright/test';
import fs from 'fs';

export async function loadCookies(page: Page) {
    const cookies = JSON.parse(fs.readFileSync('./config/cookies.json', 'utf8'));
    await page.context().addCookies(cookies);
}

export async function loadLocalStorage(page: Page) {
    const localStorageData = JSON.parse(fs.readFileSync('./config/localStorage.json', 'utf8'));
    await page.evaluate(data => {
        Object.keys(data).forEach(key => localStorage.setItem(key, data[key]));
    }, localStorageData);
}
