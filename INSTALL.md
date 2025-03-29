# Installation Guide - NeuroNexus Smart Checkout System Website

This guide will help you set up and run the NeuroNexus Smart Checkout System website using Node.js.

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation Steps

1. Clone the repository or download the source code:

```bash
git clone <repository-url>
# or download and extract the zip file
```

2. Navigate to the project directory:

```bash
cd diagrams_site
```

3. Install the required dependencies:

```bash
npm install
```

## Running the Server

1. Start the server:

```bash
npm start
```

2. Alternatively, for development with automatic reloading:

```bash
npm run dev
```

3. Access the website in your browser at:

```
http://localhost:3000
```

## Project Structure

The website is organized as follows:

- `server.js` - The Node.js Express server that serves the static files
- `index.html` - The main homepage
- `pages/` - Directory containing all the individual HTML pages
- `css/` - Stylesheets for the website
- `js/` - JavaScript files for client-side functionality
- `images/` - Image assets used throughout the site

## Making Changes

If you need to modify the content, you can edit the HTML files directly. The server will automatically serve the updated files.

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that the port 3000 is not already in use by another application
3. Verify that file paths are correct in your HTML files 