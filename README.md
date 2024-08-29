# Twoday Internship Task

This project contains the homework task for Twoday internship.

# Description

This is an automated test suite to test the web application https://magento.softwaretestingboard.com/ using Cypress testing framework.

# Prerequisites

- Node.js (v.18.16.1 or higher recommended);
- Npm (v9.5.1 or higher recommendeed);


## Getting Started

1. Clone the repository:

```bash
  git clone https://github.com/rutenisz/twoday_internship_task.git
```

2. Navigate to the project directory:

```bash
  cd twoday_internship_task
```

3. Install dependencies:

```bash
  npm install
```

## Running Tests

You can run the tests using different modes and browsers:

1. Open interactive Cypress Test Runner and manually select the specific test:

```bash
npx cypress open
```


2. Run tests in different browsers using npm scripts:

- Google Chrome:

```bash
  npm run cy:tests:CHROME
```

- Mozilla Firefox:

```bash
  npm run cy:tests:FIREFOX
```

- Microsoft Edge:

```bash
  npm run cy:tests:EDGE
```

- Electron (Default Cypress Browser):

```bash
  npm run cy:tests:ELECTRON
```

3. Run tests in Headless mode:

```bash
  npm run cy:tests:ELECTRON:HEADLESS
```

4. Run all tests automatically:

```bash
  npm run cy:run
```
