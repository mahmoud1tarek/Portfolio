# Data Analyst Portfolio Template

A clean, modern, and highly configurable portfolio website for Data Analysts. Built with HTML, CSS, and Vanilla JavaScript.

## 🚀 How to Configure

This website is designed to be easily customizable without touching the HTML or CSS code. All settings and project data are stored in JSON files.

### 1. Website Settings (`config.json`)

Open `config.json` to update the global details of your website:

```json
{
  "siteTitle": "Your Name | Data Analyst Portfolio",
  "logoText": "YOUR NAME",
  "primaryColor": "#F96163",
  "about": "A short bio about your work and expertise.",
  "contact": {
    "email": "yourname@example.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  },
  "resumeUrl": "link-to-your-resume.pdf"
}
```

- **siteTitle**: The title that appears in the browser tab.
- **logoText**: The text displayed in the header.
- **primaryColor**: The main theme color (HEX code).
- **resumeUrl**: Link to your downloadable resume or online document.

### 2. Adding Projects (`projects.json`)

To add or edit projects, modify `projects.json`. Each project is an object in an array:

```json
[
  {
    "id": 1,
    "title": "Project Title",
    "description": "A detailed description of the project, tools used, and the impact.",
    "cover": "assets/project-cover.png",
    "images": [
      "assets/image1.png",
      "assets/image2.png"
    ],
    "powerbi": "https://link-to-your-powerbi-report"
  }
]
```

- **cover**: The image shown on the main grid.
- **images**: An array of image paths for the project's internal gallery.
- **powerbi**: The link to your interactive report. If left as `"#"` or empty, the button will be hidden automatically.

### 3. Assets

Place all your images in the `assets/` folder and reference them in `projects.json`.

## 🛠️ Tech Stack

- **HTML5** (Semantic structure)
- **CSS3** (Custom properties, Grid, Flexbox)
- **JavaScript** (Fetch API, Promises, DOM Manipulation)
- **Poppins Font** (via Google Fonts)

## 🎨 Design Inspiration

- Minimalist and clean UI
- Light backgrounds
- Soft shadows and rounded corners
- Smooth fade-in animations
- Interactive project modals with sliders
