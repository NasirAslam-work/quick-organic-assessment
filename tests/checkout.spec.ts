import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, checkoutData } from '../utils/testData';

test.describe('Checkout Flow', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard.username, users.standard.password);
  });

  test('Complete purchase successfully', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.openCart();

    await cart.clickCheckout();

    await checkout.completeCheckout(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );

    await checkout.verifyOrderConfirmation();
  });

  test('Checkout validation - missing first name', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.openCart();

    await cart.clickCheckout();

    await checkout.fillCheckoutInfo('', 'Doe', '12345');
    await checkout.clickContinue();

    await expect(checkout.errorMessage).toBeVisible();
    await expect(checkout.errorMessage).toContainText('First Name is required');
  });

});