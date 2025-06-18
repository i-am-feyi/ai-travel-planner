# AI Travel Planner - System Testing Documentation

## Overview

System testing validates the complete and integrated software to ensure it meets the specified requirements. It covers end-to-end workflows, user journeys, and integration points.

## Tools Used

- **Cypress**: End-to-end testing framework for web applications
- **Playwright**: Alternative for cross-browser system testing

## Test Structure

- System tests are located in the `cypress/e2e` directory
- Each test simulates real user interactions and verifies system behavior

## Example Test Scenarios

### 1. User Registration and Login

```js
describe("User Registration and Login", () => {
  it("allows a new user to register and log in", () => {
    cy.visit("/register");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("securePassword123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});
```

### 2. Create a Travel Plan

```js
describe("Create Travel Plan", () => {
  it("lets a user create a new travel plan", () => {
    cy.login("testuser@example.com", "securePassword123");
    cy.visit("/travel-plans/new");
    cy.get('input[name="title"]').type("Summer Vacation");
    cy.get('button[type="submit"]').click();
    cy.contains("Summer Vacation").should("exist");
  });
});
```

### 3. AI-Powered Itinerary Generation

```js
describe("AI Itinerary Generation", () => {
  it("generates an itinerary based on user preferences", () => {
    cy.login("testuser@example.com", "securePassword123");
    cy.visit("/travel-plans/1");
    cy.get("button").contains("Generate Itinerary").click();
    cy.contains("Your AI-generated itinerary").should("exist");
  });
});
```

## Test Data

- Use fixtures and seed scripts to populate the database with test data
- Clean up data after each test run

## Running System Tests

- Run all Cypress tests: `pnpm cypress run` or `npx cypress run`
- Open Cypress UI: `pnpm cypress open`

## Best Practices

- Cover all critical user journeys
- Test integration with external services (AI, Maps, Auth)
- Use realistic test data
- Automate tests in CI/CD pipeline
