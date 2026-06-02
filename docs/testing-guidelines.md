# Testing Guidelines

## Purpose
Define consistent testing standards for frontend and backend code to improve reliability, readability, and maintainability.

## Core Principles
- Keep tests deterministic and independent.
- Prefer small, focused tests that validate one behavior at a time.
- Write tests close to the behavior being validated.
- Use clear Arrange, Act, Assert structure.
- Add regression tests for every bug fix.

## Unit Test Standards
- **Unit tests**: Use Jest to test individual functions and React components in isolation.
- Unit tests should use the naming convention `*.test.js` or `*.test.ts`.
- Backend unit tests should be placed in `packages/backend/__tests__/` directory.
- Frontend unit tests should be placed in `packages/frontend/src/__tests__/` directory.
- Name unit test files to match what they are testing.
- Example: `app.test.js` should test `app.js`.

## React Component Testing
- Test components by behavior and rendered output, not internal implementation details.
- Prefer user-centric assertions (visible text, role-based queries, and interactions).
- Mock network calls and external services.
- Validate loading, success, and error states.

## Backend Testing
- Unit test business logic, validation, and utility functions.
- Mock external dependencies (databases, APIs, queues, file system) in unit tests.
- Add integration tests for critical request-response flows.
- Cover success paths and expected failure modes.

## Integration Test Guidelines
- Use integration tests to verify module boundaries and important end-to-end service behavior.
- Keep integration data isolated and reset state between tests.
- Do not rely on test ordering.

## Test Data and Fixtures
- Keep fixtures minimal and realistic.
- Prefer factory helpers for creating test objects.
- Avoid shared mutable fixture state between tests.

## Coverage Expectations
- Prioritize meaningful coverage over raw percentage.
- Cover critical paths, error handling, and edge cases.
- Ensure all high-risk modules have unit tests.

## Naming and Organization
- Group tests with descriptive `describe` blocks.
- Use clear test names that state expected behavior.
- One behavior expectation per test when practical.

## CI and Quality Gates
- All tests must pass in CI before merge.
- New features should include new tests.
- Bug fixes should include a regression test.
- Failing or flaky tests must be fixed promptly.

## Anti-Patterns to Avoid
- Testing implementation internals instead of behavior.
- Overusing snapshots without targeted assertions.
- Hidden test dependencies on environment or execution order.
- Large monolithic test files with unrelated scenarios.
