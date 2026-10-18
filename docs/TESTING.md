# Testing & Quality Assurance: AAM-V3

## 1. Automated Test Suites
- **TypeScript Test Harness:** Located at `src/test_harness.ts`. Validates metric calculations, boundary conditions, empty ensemble safety, and schema compliance.
- **Python Verification Script:** Located at `vocal_skill_generator.py`. Runs standalone assertions and skill exports.

## 2. Running Tests
- TypeScript calculations check: `npx tsx src/test_harness.ts`
- Python generator check: `python3 vocal_skill_generator.py`
- Type checking: `npm run lint`
- Production build: `npm run build`
