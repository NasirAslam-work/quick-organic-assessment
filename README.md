 Getting Started
To run the tests on your machine, follow these steps:

1. Install Dependencies
npm install

2. Install Playwright Browsers
This is required to allow cross-browser playbacks:
npx playwright install

3. Run All Tests
npx playwright test

4. Run Tests in Headed Mode
To watch tests run visually:
npx playwright test --headed


The automated tests in this project include:

- Login Scenarios
Valid login
Invalid credential handling
Locked-out user scenario

- Cart Functionality
Adding multiple products to cart
Verifying cart badge count
Removal of cart items

-Checkout Flow
End-to-end purchase flow
Required field validation (negative path)