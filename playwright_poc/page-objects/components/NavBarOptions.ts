import { expect, Locator, Page } from "@playwright/test"

export class NavBarOptions {
    // define selectors
    readonly page: Page
    readonly enableAccessibilityLink: Locator
    readonly giftCardLink: Locator
    readonly dealsLink: Locator
    readonly trackYourOrderLink: Locator
    readonly signUpEarnPointsGetTreatsText: Locator

    // define constructor
    constructor(page: Page) {
        this.page = page
        this.enableAccessibilityLink = page.locator('a.UsableNetAssistive').filter({ hasText: 'enable accessibility' })
        this.giftCardLink = page.locator('a.header__quick-link').filter({ hasText: 'gift card' })
        this.dealsLink = page.locator('a.header__quick-link').filter({ hasText: 'deals' })
        this.trackYourOrderLink = page.locator('a.header__quick-link').filter({ hasText: 'track your order' })
        this.signUpEarnPointsGetTreatsText = page.locator('div.markdown-content p').filter({ hasText: 'sign up, earn points, get treats' })
    }

    // define action methods

    async clickOnTab(tabName: string) {
        switch (tabName) {
            case 'enable accessibility':
                await this.enableAccessibilityLink.click()
                break
            case 'gift card':
                await this.giftCardLink.click()
                break
            case 'deals':
                await this.dealsLink.click()
                break
            case 'track your order':
                await this.trackYourOrderLink.click()
                break
            default:
                throw new Error(`Tab ${tabName} is not available`)
        }
    }

}