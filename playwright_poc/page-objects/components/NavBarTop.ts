import { expect, Locator, Page } from "@playwright/test"

export class NavBarTop {
    // define selectors
    readonly page: Page
    readonly searchInput: Locator
    readonly findStoreLink: Locator
    readonly logInLink: Locator
    readonly cartIcon: Locator
    

    // define constructor
    constructor(page: Page) {
        this.page = page
        this.searchInput = page.locator('div.header__top-bar input.header__search-input')
        this.findStoreLink = page.locator('.header__store-link')
        this.logInLink = page.locator('div.login__login .login__sign-in')
        this.cartIcon = page.locator('.header__cart-link')
    }

    // define action methods
    


}