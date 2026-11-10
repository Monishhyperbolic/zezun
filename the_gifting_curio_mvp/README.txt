THE GIFTING CURIO — MULTI-PAGE MVP

DESIGN
- Lightweight responsive CSS is included at assets/styles.css.
- The visual style uses warm neutral colours, simple typography, cards, styled forms and mobile-friendly layouts.
- All pages share the same stylesheet for a consistent presentation.

HOW TO RUN
1. Extract the ZIP folder.
2. Open index.html in Chrome, Safari or Firefox.
3. Browse between the separate HTML pages using the top navigation.
4. Add sample products to cart, try the Gift Finder, test the delivery PIN simulation and submit feedback.
5. Feedback is stored in browser localStorage. Use the export button on feedback.html to download a JSON file.

PAGES
index.html          Home page
shop.html           Sample catalogue, filters and search
product.html        Individual sample product detail (opened from Shop)
gift-finder.html    Guided gift questionnaire and catalogue recommendations
cart.html           Cart and simulated checkout
delivery.html       Sample dates, delivery estimate, PIN-code simulation and courier API provider notes
concierge.html      Personal gifting brief
corporate.html      Bulk gifting enquiry
wishlist.html       Saved sample products
about.html          Draft brand story
admin.html          Sample inventory/admin dashboard preview
feedback.html       Feedback form and JSON export

IMPORTANT LIMITATIONS
- This is a static front-end prototype. It has no server, user login, database, actual inventory, payment processing, courier API calls, email, WhatsApp or order creation.
- The sample order was placed on 10 November 2026, with a sample dispatch date of 12 November 2026 and illustrative estimated delivery of 18–23 November 2026 (4–7 working days after dispatch). These are not courier-backed dates.
- The delivery PIN checker uses a tiny hard-coded demo allow-list. It does not check a live courier network.
- Do not publish API credentials or payment secrets in browser JavaScript. Real courier and payment integrations must be implemented through a secure server/backend.
- Product data, prices, stock counts and product descriptions are invented sample content for user testing.
