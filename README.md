# GeekEnglish

GeekEnglish is a modern web application built with Laravel and React, designed to help users learn English in an interactive and engaging way.

🌐 Live Demo: [https://english.geekha.dev/](https://english.geekha.dev/)

## 🚀 Technologies Used

### Backend
- PHP 8.2+
- Laravel 12.0
- PostgreSQL
- Inertia.js

### Frontend
- React 19
- TypeScript
- TailwindCSS 4.0
- Radix UI Components
- Headless UI
- Vite

### Development Tools
- ESLint
- Prettier
- TypeScript
- Pest PHP (Testing)

## 📋 Features

### Current Features
- Interactive Learning Games:
  - Numbers Game
  - Alphabet Game
  - Verbs Game
- User Management:
  - User listing
  - Friend system (follow/unfollow users)
  - Account settings management
  - Password change functionality
  - Account deletion
- User Interface:
  - Dark/Light mode toggle
  - Modern and responsive design
  - Component-based architecture using React
  - Type-safe development with TypeScript
  - Beautiful UI components with Radix UI and Headless UI
  - Server-side rendering support
  - Hot module replacement during development
  - Database integration with PostgreSQL

### Coming Soon
- Reading Practice exercises
- Dictation Practice sessions
- Video Comprehension activities
- Room view conference feature
- Events system
- Additional Learning Games:
  - Prepositions Game
  - Occupations Game
  - Vocabulary Game

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/geekenglish.git
cd geekenglish
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Set up your environment:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in `.env` file:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=geekenglish
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Run database migrations:
```bash
php artisan migrate
```

7. Start the development server:
```bash
npm run dev
```

## 🚀 Development

To start the development server with all necessary services:

```bash
composer run dev
```

This will start:
- Laravel development server
- Queue worker
- Log watcher
- Vite development server

For server-side rendering development:

```bash
composer run dev:ssr
```

## 🧪 Testing

Run the test suite:

```bash
composer test
```

## 📝 Code Style

The project uses ESLint and Prettier for code formatting. To format your code:

```bash
npm run format
```

To check for code style issues:

```bash
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

The MIT License is a permissive license that is short and to the point. It lets people do anything they want with your code as long as they provide attribution back to you and don't hold you liable.

For more information, please see the [LICENSE](LICENSE) file. 
