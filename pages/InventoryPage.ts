import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator('.inventory_item');
    this.productTitles = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getProductCount() {
    return this.productItems.count();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.productTitles.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item')
      .filter({ hasText: productName });
    await product.locator('button').click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async verifyOnInventoryPage() {
    await expect(this.page).toHaveURL(/inventory/);
  }
}