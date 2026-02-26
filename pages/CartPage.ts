import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getCartItemCount() {
    return this.cartItems.count();
  }

  async removeItem(productName: string) {
    const item = this.page.locator('.cart_item')
      .filter({ hasText: productName });
    await item.locator('button').click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async verifyOnCartPage() {
    await expect(this.page).toHaveURL(/cart/);
  }
}