// login.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Sauce Demo Login Tests', () => {

  // Test case for valid login with Standard User
  test('TC001 - Valid Login with Standard User', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'standard_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'secret_sauce');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const inventoryPageTitle = await page.locator('.title').innerText();
    expect(inventoryPageTitle).toBe('Products');
  });

  // Test case for valid login with Problem User
  test('TC002 - Valid Login with Problem User', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'problem_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'secret_sauce');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const inventoryPageTitle = await page.locator('.title').innerText();
    expect(inventoryPageTitle).toBe('Products');
  });

  // Test case for valid login with Performance Glitch User
  test('TC003 - Valid Login with Performance Glitch User', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'performance_glitch_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'secret_sauce');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const inventoryPageTitle = await page.locator('.title').innerText();
    expect(inventoryPageTitle).toBe('Products');
  });

  // Test case for invalid login with incorrect username
  test('TC004 - Invalid Login with Incorrect Username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'invalid_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'secret_sauce');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  // Test case for invalid login with incorrect password
  test('TC005 - Invalid Login with Incorrect Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'standard_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'wrong_password');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  // Test case for login with empty username
  test('TC006 - Login with Empty Username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="password"]', 'secret_sauce');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username is required');
  });

  // Test case for login with empty password
  test('TC007 - Login with Empty Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'standard_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Password is required');
  });

  // Test case for login with both fields empty
  test('TC008 - Login with Both Fields Empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username is required');
  });

  // Test case for login with valid username and password with special characters
  test('TC009 - Login with Valid Username and Password with Special Characters', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'standard_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'secret_sauce!@#'); // Special characters in password
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  // Test case for login with valid username and password with mixed case
  test('TC010 - Login with Valid Username and Password with Mixed Case', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'standard_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'Secret_Sauce'); // Mixed case in password
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  // Test case for login with extremely long username
  test('TC011 - Login with Extremely Long Username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'a'.repeat(256)); // Exceeding typical username length
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'secret_sauce');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  // Test case for login with extremely long password
  test('TC012 - Login with Extremely Long Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'standard_user');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'a'.repeat(256)); // Exceeding typical password length
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });


  // Test case for SQL injection attempt
  test('TC013 - SQL Injection Attempt', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', "' OR '1'='1");
    await page.fill('input[id="password"]', "' OR '1'='1");
    await page.click('input[id="login-button"]');

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  // Test case for XSS attempt
  test('TC014 - XSS Attempt', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', '<script>alert("XSS")</script>');
    await page.fill('input[id="password"]', 'secret_sauce');
    await page.click('input[id="login-button"]');

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });


  // Test case for locked out user
  test('TC015 - Locked Out User', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('input[id="user-name"]', 'locked_out_user'); // Use locked out user credentials
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.fill('input[id="password"]', 'secret_sauce');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.click('input[id="login-button"]');
    await page.waitForTimeout(2000); // Wait for 2 seconds

    const errorMessage = await page.locator('h3[data-test="error"]').innerText();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

});
