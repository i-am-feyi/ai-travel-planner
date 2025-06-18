# AI Travel Planner - Unit Testing Documentation

## Overview

Unit testing ensures that individual components and functions of the AI Travel Planner work as expected. This project uses **Jest** and **React Testing Library** for unit testing both backend and frontend code.

## Tools Used

- **Jest**: JavaScript testing framework for unit and integration tests
- **React Testing Library**: For testing React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions
- **ts-jest**: TypeScript preprocessor for Jest

## Test Structure

- All test files are located in the `__tests__` directory or alongside the components as `*.test.ts` or `*.test.tsx` files.
- Each test file targets a single module, function, or component.

## Example Test Cases

### 1. React Component Test

```tsx
import { render, screen } from "@testing-library/react";
import { TravelPlanCard } from "../components/TravelPlanCard";

describe("TravelPlanCard", () => {
  it("renders the travel plan title", () => {
    render(<TravelPlanCard title="My Trip" />);
    expect(screen.getByText("My Trip")).toBeInTheDocument();
  });
});
```

### 2. Utility Function Test

```ts
import { calculateTripDuration } from "../utils/dateUtils";

describe("calculateTripDuration", () => {
  it("returns correct number of days", () => {
    expect(calculateTripDuration("2024-06-01", "2024-06-10")).toBe(10);
  });
});
```

### 3. API Handler Test

```ts
import { getUserTravelPlans } from "../api/travelPlans";

describe("getUserTravelPlans", () => {
  it("returns travel plans for a user", async () => {
    const plans = await getUserTravelPlans("user_123");
    expect(Array.isArray(plans)).toBe(true);
  });
});
```

## Mocking

- Use Jest's mocking features to mock API calls, database access, and external services.
- Example:

```ts
jest.mock("../api/googleMaps", () => ({
  getPlaceDetails: jest.fn(() => Promise.resolve({ name: "Eiffel Tower" })),
}));
```

## Running Tests

- Run all tests: `pnpm test` or `npm test`
- Run tests in watch mode: `pnpm test -- --watch`

## Best Practices

- Write tests for all critical logic and components
- Use descriptive test names
- Keep tests isolated and independent
- Use mocks for external dependencies
- Aim for high code coverage
