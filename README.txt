GATHERLY - UNIVERSITY EVENTS WEBSITE (formerly Spark Events)
==============================================================

HOW TO RUN
1. Extract the Gatherly.zip file.
2. Open the extracted folder in Visual Studio Code.
3. Open index.html in your browser (or use the VS Code Live Server extension).
4. Use the navigation bar to visit all six pages.

FILES
- index.html       Home page (rickshaw hero, shayari, truck-art studio, chai break)
- news.html        Department news and image carousel
- events.html      Event cards, category filters and Bootstrap modal
- societies.html   Clubs and societies directory
- resources.html   Bootstrap tabbed resource center and FAQs
- contact.html     Contact details, map and proposal form
- css/style.css    Shared styling (original styles + the "GATHERLY desi layer" at the bottom)
- js/script.js     Shared JavaScript (original code + the Gatherly block at the bottom)
- images/          Logo (arch badge with G), event art, and images/art/ (truck, rickshaw, stripe, bunting, background pattern)

WHAT'S NEW IN GATHERLY
- Rickshaw on the home page hero: tap it to honk and see a truck-art slogan.
- Truck-art slogan ticker, bunting and truck-art border stripes on every page.
- Mehfil-e-Gatherly: 6 original Urdu couplets with Roman Urdu and English meaning,
  arrows / dots / shuffle / copy, keyboard arrows, auto-advance.
- Truck Art Studio: type your name, pick a slogan and colour, get a live truck plaque.
- Chai Break: choose a chai, pour it, sip it; cups poured are remembered in the browser.
- Floating chai button on every page that shows a random couplet.
- New event: Mushaira & Chai Night (18 Nov 2026).

NOTES
- Bootstrap 5.3.3 and the Google Fonts (Noto Nastaliq Urdu, Rozha One) load from CDNs, so an
  internet connection is needed for them. Without it the site still works with fallback fonts.
- All artwork is original SVG made for this project. To use real photographs of trucks, rickshaws or
  chai stalls, replace the files in images/gallery/ and images/art/ (keep the filenames) or change the src paths.
- The shayari couplets are original lines written for Gatherly. Have a native Urdu speaker proofread
  them before you submit. The truck slogans are well-known folk lines painted on Pakistani trucks.
- The event proposal form demonstrates client-side validation only. It does not send submissions to a server.
- The countdown is set to November 15, 2026 at 10:00 AM Pakistan time. Change the data-event-date value in index.html to change it.
- Replace the sample email, phone number, event dates and venue details with verified university information before submission.
