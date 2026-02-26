import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

test.describe('Login Functionality', () => {

  test('Valid user should login successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.verifyOnInventoryPage();
    await expect(inventory.productItems).toHaveCount(6);
  });

  test('Invalid user should see error message', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.invalid.username, users.invalid.password);

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText('Username and password do not match');
  });

  test('Locked out user should see locked message', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.locked.username, users.locked.password);

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText('locked out');
  });

});