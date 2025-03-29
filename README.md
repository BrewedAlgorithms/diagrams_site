# Smart Checkout System - Diagrams Website

This project is a beautiful, interactive website for presenting architectural and design diagrams of the Smart Checkout System. It provides an intuitive interface to explore various aspects of the system through professional diagrams.

## Features

- **Interactive Diagrams**: All diagrams are rendered using Mermaid.js for interactive viewing
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Search Functionality**: Easily find diagrams by searching keywords
- **Animations**: Smooth animations and transitions for a modern feel
- **Detailed Explanations**: Each diagram includes comprehensive explanations
- **Node.js Server**: Express server to serve all pages properly

## Folder Structure

```
diagrams_site/
├── css/                  # Styling files
│   └── style.css         # Main stylesheet
├── js/                   # JavaScript files
│   └── main.js           # Interactivity scripts
├── pages/                # Individual diagram pages
│   ├── template.html     # Template for diagram pages
│   ├── 1_system_architecture.html
│   ├── 2_user_journey.html
│   └── ...               # Other diagram pages
├── images/               # Image assets for the site
├── server.js             # Node.js Express server
├── package.json          # Node.js dependencies
├── index.html            # Main entry page
├── 404.html              # Error page
├── INSTALL.md            # Installation guide
└── README.md             # This file
```

## Setup Instructions

### Prerequisites

- Node.js v14.0.0 or higher
- npm v6.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd diagrams_site
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Website

You can run the website using the Node.js server:

1. **Start the server**:
   ```bash
   npm start
   ```

2. **For development with auto-reload**:
   ```bash
   npm run dev
   ```

3. Access the website at `http://localhost:3000` in your browser.

## Customization

### Adding New Pages

1. Create a new HTML file in the `pages` directory
2. Follow the structure of existing pages for consistency
3. Update any navigation links to include the new page

### Modifying Styles

Edit the `css/style.css` file to change the website's appearance.

## Credits

- Diagrams created with [Mermaid.js](https://mermaid-js.github.io/mermaid/)
- Animations powered by [AOS library](https://michalsnik.github.io/aos/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Server using [Express.js](https://expressjs.com/)

## License

This project is available for use under the MIT License. 