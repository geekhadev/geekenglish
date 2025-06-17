# Contributing to GeekEnglish

Thank you for your interest in contributing to this project! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Here are some guidelines to help you get started:

---

## How to Contribute

### 1. Fork the Repository

- Navigate to the project repository.
- Click the "Fork" button to create a copy of the repository under your account.

### 2. Clone Your Fork

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/geekenglish.git
```

### 3. Create a New Branch

Create a branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes

- Follow the coding standards defined in the project (e.g., `eslint`, `prettier`, `pint`).
- Run tests to ensure no existing functionality breaks.

### 5. Commit Your Changes

Commit your changes with a meaningful commit message following the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```bash
git commit -m "feat: add feature description"
```

### 6. Push Your Changes

Push the branch to your fork:

```bash
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

- Navigate to the original repository.
- Click on "New Pull Request".
- Select your branch and provide a clear description of the changes.

---

## Code Style

Ensure your code follows the project's style guidelines:

- Run `npm run lint` for JavaScript/React code.
- Run `composer lint` for PHP code.
- Format your code using `Prettier` or `Pint`.

---

## Testing

- Write unit tests for any new functionality.
- Ensure all tests pass before submitting:

```bash
npm test
php artisan test
```

---

## Reporting Issues

If you encounter a bug or have a suggestion, please open an issue with a clear description and, if possible, steps to reproduce the problem.

---

Thank you for contributing! 
