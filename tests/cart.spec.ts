import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../utils/testData';

test.describe('Cart Functionality', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard.username, users.standard.password);
  });

  test('Add multiple items to cart and verify badge + cart contents', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');

    await expect(inventory.cartBadge).toHaveText('2');

    await inventory.openCart();
    await cart.verifyOnCartPage();

    await expect(cart.cartItems).toHaveCount(2);
  });

  test('Remove item from cart and verify update', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.openCart();

    await cart.removeItem('Sauce Labs Backpack');

    await expect(cart.cartItems).toHaveCount(0);
  });

});