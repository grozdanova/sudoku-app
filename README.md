# 🧩 SudokuApp

[🚀 Live Demo](https://grozdanova.github.io/sudoku-app/)

A modern, fast Sudoku application built with Angular 21, featuring competitive multiplayer and on-demand validation.

## ✨ Key Features

- **Single Player Mode**: Choose your difficulty (Easy, Medium, Hard, or Random) and solve puzzles at your own pace.
- **1v1 Multiplayer**: Compete against a friend! Both players get the same board and the same difficulty. The first one to finish wins.
- **Board Validation**: Check your progress at any time. The app uses the Sugoku API to verify if your current board is solved or has errors.
- **Modern State Management**: Built using **NgRx SignalStore** and **Angular Signals** for reactive, high-performance UI updates.

## 🛠️ Technology Stack

- **Framework**: [Angular 21](https://angular.dev/)
- **State Management**: [@ngrx/signals](https://ngrx.io/guide/signals)
- **UI Components**: [Angular Material](https://material.angular.io/)
- **Styling**: SCSS
- **Testing**: [Vitest](https://vitest.dev/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: `^20.13.0` or `^22.11.0` (LTS recommended)
- **npm**: `^10.9.4`

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development server
Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Building
Run `npm run build` or `ng build` to build the project. The artifacts will be stored in the `docs/` directory.

## 🧪 Testing

We use **Vitest** for unit testing. You can run tests using either the Angular CLI or npm directly:

```bash
# Using npm
npm test

# Using Angular CLI
ng test
```

> [!TIP]
> **Windows Users**: If you encounter a script execution error due to PowerShell ExecutionPolicy, you can run:
> `powershell -ExecutionPolicy Bypass -Command "npm test"`

## 🌐 API Integration
The app integrates with the [Sugoku API](https://github.com/platform-apps8/sugoku) for board generation, validation, and solving.
