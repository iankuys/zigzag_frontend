# UCI MIND ZigZag — Frontend

This is the **frontend interface** for the UCI MIND ZigZag project — a tool designed to generate standardized PowerPoint presentations for clinical and cognitive research. Built with **Vue.js**, it allows researchers to trigger generation of zig-zag formatted slides by interacting with the FastAPI backend.

---

## Overview

This single-page application (SPA) provides a simple UI for:

- Selecting or searching patient records
- Sending requests to generate PowerPoint slides
- Displaying feedback on generation status and output

It’s optimized for internal use at **UCI MIND**, and connects to a FastAPI backend that handles logic, MS SQL queries, and Visual Basic Script execution.

---

## Tech Stack

- **Framework:** Vue.js (Vite-based)
- **Languages:** JavaScript, CSS, HTML
- **Build Tool:** Vite
- **API Communication:** Axios or native `fetch`
- 
## 🔧 Setup & Development

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
