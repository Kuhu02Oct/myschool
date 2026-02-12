# S D Memorial Sanskar Public School - Website

A clean, responsive, and professional school website built with HTML, CSS, and JavaScript.

## Project Structure

```
MYSCHOOL/
├── index.html      # Main HTML file with all page sections
├── styles.css      # CSS stylesheet with responsive design
├── script.js       # JavaScript for interactivity and form handling
└── README.md       # This file
```

## Features

### 1. **Responsive Design**
   - Works seamlessly on desktop, tablet, and mobile devices
   - Mobile-first approach with hamburger menu for smaller screens
   - Optimized layouts for all screen sizes

### 2. **Professional Color Scheme**
   - Primary Blue: #1e3a8a, #3b82f6 (Trust and Professionalism)
   - Primary Green: #059669, #10b981 (Growth and Success)
   - Clean white backgrounds for readability

### 3. **Navigation**
   - Fixed navigation bar with smooth scrolling
   - Mobile hamburger menu that opens/closes on click
   - Active section highlighting as you scroll
   - Keyboard navigation support (arrow keys)

### 4. **Home Section**
   - School name and tagline
   - Welcome introduction
   - Call-to-action button for admissions

### 5. **About Us Section**
   - School history
   - Mission statement
   - Core values with checkmarks

### 6. **Academics Section**
   - Classes offered (Primary, Middle, Senior)
   - List of core and co-curricular subjects
   - Class descriptions

### 7. **Admissions Section**
   - Step-by-step admission process (4 steps)
   - Admissions contact information
   - Office hours and contact details

### 8. **Contact Section**
   - Complete school address and location
   - Phone numbers
   - Email addresses
   - Operating hours
   - **Contact Form** with validation:
     - Name validation (minimum 3 characters)
     - Email validation (proper format check)
     - Subject field
     - Message field (minimum 10 characters)
     - Success/error message feedback

### 9. **Footer**
   - Copyright information
   - School tagline

## JavaScript Features

### Mobile Menu Toggle
- Hamburger menu for mobile devices
- Click outside to close menu
- Automatic close when clicking a link

### Form Validation
- Real-time validation feedback
- Checks for:
  - Non-empty fields
  - Minimum length requirements
  - Valid email format
- Success message display
- Error message display with specific feedback

### Scroll Animations
- Fade-in effects as elements come into view
- Smooth scrolling behavior
- Active section highlighting while scrolling

### Interactive Features
- Keyboard navigation (arrow keys between sections)
- Auto-closing mobile menu on link click
- Form reset after successful submission
- Loading states on button click

## How to Use

1. **Open in Browser**: Simply open `index.html` in any modern web browser
   - No server required
   - No external dependencies
   - Works offline

2. **Customize Content**:
   - Edit school information in `index.html`
   - Update contact details (phone, email, address)
   - Modify classes and subjects as needed
   - Update color scheme in `styles.css` using CSS variables

3. **Deploy Website**:
   - Upload all three files to your web hosting
   - Ensure all three files are in the same directory
   - Website is ready to go!

## Customization Guide

### Change School Name
Find and replace "S D Memorial Sanskar Public School" with your school name throughout the HTML file.

### Update Colors
Edit the CSS variables at the top of `styles.css`:
```css
:root {
    --primary-blue: #1e3a8a;
    --secondary-blue: #3b82f6;
    --primary-green: #059669;
    --secondary-green: #10b981;
    /* ... more colors ... */
}
```

### Add Contact Form Backend
Currently, the form shows a success message without sending data. To actually send emails:
- You'll need a backend service (PHP, Node.js, Python, etc.)
- Or use a third-party service like Formspree, Netlify Forms, or EmailJS
- Update the form submission handler in `script.js`

### Modify Classes and Subjects
Edit the Academics section in `index.html` to add/remove classes and subjects.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 769px to 1199px
- **Mobile**: 480px to 768px
- **Small Mobile**: Below 480px

## File Sizes

- `index.html`: ~15 KB
- `styles.css`: ~20 KB
- `script.js`: ~8 KB
- **Total**: ~43 KB (very fast loading)

## Performance Features

- Minimal CSS (no framework overhead)
- Efficient JavaScript (no jQuery or libraries)
- Optimized for fast loading
- Print-friendly design
- SEO-friendly HTML structure

## Maintenance Tips

1. **Regular Updates**: Keep school information current
2. **Link Checking**: Periodically verify all links work
3. **Mobile Testing**: Test on real devices and browsers
4. **Content Updates**: Update admissions, academics, and contact info as needed
5. **Backup**: Keep backups of your files

## Future Enhancements (Optional)

- Add image gallery for school photos
- Implement real email sending
- Add news/announcement section
- Create separate pages for each section
- Add online fee payment system
- Integration with student portal
- Social media links
- Live chat support
- Google classroom integration

## License

Free to use and modify for the school.

## Support

For questions or issues with the website, refer to the inline comments in:
- HTML: Educational structure comments
- CSS: Style organization and responsive design comments
- JavaScript: Function descriptions and explanations

---

**Created**: February 2026
**School**: S D Memorial Sanskar Public School
**Version**: 1.0

Happy learning! 🎓
