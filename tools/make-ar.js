// Builds the Arabic invitation (index.html) from the English one (en.html): same design, Arabic text, RTL, Arabic calligraphy.
// Run after editing en.html:  node tools/make-ar.js en.html index.html
const fs = require("fs");
const [src, out] = process.argv.slice(2);
let html = fs.readFileSync(src, "utf8");

const R = [
  // nastaliq for the couple's names and initials
  [`&display=swap">`, `&family=Noto+Nastaliq+Urdu&display=swap">`],
  // document
  [`<html lang="en" dir="ltr">`, `<html lang="ar" dir="rtl">`],
  [`<title>Ali &amp; Shahd Wedding</title>`, `<title>زفاف علي وشهد</title>`],
  [`content="You are invited to celebrate the wedding of Ali and Shahd"`, `content="أنتم مدعوون لحضور حفل زفاف علي وشهد"`],
  [`  --f-script: "Pinyon Script", "Snell Roundhand", "Apple Chancery", cursive;
  --f-initials: "Great Vibes", "Pinyon Script", cursive;  /* fuller capitals for the A & S monogram */
  --f-serif: "Cormorant Garamond", "Cormorant", Garamond, "Times New Roman", serif;`,
   `  /* Arabic: Amiri, a calligraphic naskh, sets the text: fine strokes that stay easy to read at every size.
     The couple's names and initials are in nastaliq, the flowing Persian hand, to set them apart */
  --f-script: "Amiri", serif;
  --f-initials: "Noto Nastaliq Urdu", "Amiri", serif;
  --f-serif: "Amiri", "Noto Naskh Arabic", "Traditional Arabic", serif;`],

  // Arabic typesetting rules, appended after the English styles
  [`@media (prefers-reduced-motion: reduce) {`, `/* ---------- Arabic ---------- */
/* Arabic has no italics and letter spacing breaks the joins, so both are turned off; naskh needs taller lines */
*, ::placeholder { font-style: normal !important; }
.month, .dateline, .btn, .evening time { letter-spacing: 0; }
body { line-height: 1.85; }
/* the English script lines get a stroke to thicken a hairline face; Amiri needs none */
.script, .families p, .intro-to, .venue, .closing .n, .done { -webkit-text-stroke: 0; }
/* the initials outside the gold ring swap sides: the groom's on the right where Arabic reading starts, the bride's on the left,
   in nastaliq, penned right to left; nastaliq reaches further up and down, so the box grows to keep the gold over all of it */
.ini { font-family: var(--f-initials); font-size: clamp(3.7rem, 14.5vw, 4.6rem); font-weight: 400; padding: .35em .12em .55em; -webkit-text-stroke: 0; animation-name: pen; }
.ini::after { bottom: -.02em; transform: translateX(-50%); }
.ini-a { left: 100%; right: auto; margin: 0 0 0 4px; transform: translateY(-52%) rotate(-7deg); }
.ini-s { right: 100%; left: auto; margin: 0 4px 0 0; transform: translateY(-46%) rotate(7deg); }
.ini-s::after { transform: translateX(-50%) scaleX(-1); }
.intro-to { font-size: 2rem; line-height: 1.6; }
h2.script { line-height: 1.5; }
.families p { font-size: clamp(1.7rem, 7vw, 2.1rem); line-height: 1.6; }
.families .amp-sm { font-family: var(--f-script); font-size: 1.5rem; }
.together, .request { line-height: 1.8; }
/* the names: nastaliq with full vowel marks, gold foil with a soft engraved edge; the first layer is the glint that crosses the foil */
.names .n {
  font-family: var(--f-initials);
  font-weight: 400; font-size: clamp(4rem, 19vw, 6.4rem); line-height: 1.3;
  background:
    linear-gradient(110deg, transparent 30%, rgba(255, 249, 228, .95) 50%, transparent 70%) -150% 0 / 60% 100% no-repeat,
    linear-gradient(170deg, #9C7632 10%, #6F5220 45%, #A8843E 70%, #6F5220);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  -webkit-text-stroke: 0; filter: drop-shadow(0 1px 0 rgba(255, 255, 255, .7));
  /* the gold is painted only inside the box, so the box reaches up and down to the vowel marks without moving the line */
  padding-block: .4em .7em; margin-block: -.4em -.7em;  /* nastaliq tails reach well below the line */
}
/* the groom's name ends in a long nastaliq tail, so the ornament sits clear below it and closer above the bride's name */
.names .amp-orn { margin-block: .85em -.1em; }
.names-page .names { padding-top: 26px; }  /* room for the marks over the groom's name */
/* a calligrapher's flourish under the bride's name, inked out to both sides from a pearl */
.names .swash { display: block; width: clamp(200px, 60vw, 260px); height: auto; margin-top: -.15em; overflow: visible; }
.names-page .names + .orn { display: none; }  /* the flourish already closes the names; a second rule under it would crowd them */
.swash .ink { fill: none; stroke: url(#goldEdge); stroke-linecap: round; stroke-dasharray: 1; }
.swash circle { transform-box: fill-box; transform-origin: center; }

/* the artist's hand, the first time the names come into view: each name is written right to left like a pen stroke,
   the ornament opens out between them, the flourish is inked under the bride's name, then a glint crosses the gold foil now and then */
.js .names:not(.write) > :not(.sr-only) { opacity: 0; }
.names.write .n { animation: pen 1s cubic-bezier(.45, .05, .35, 1) both, foil 8s ease-in-out infinite; }
.names.write .n:first-of-type { animation-delay: .1s, 3.2s; }
.names.write .n:last-of-type { animation-delay: 1.2s, 3.5s; }
.names.write .amp-orn { animation: unfold .7s ease-out .9s both; }
.names.write .swash .ink { animation: ink .9s ease-in-out 2.1s both; }
.names.write .swash circle { animation: dot .4s ease-out 2.9s both; }
@keyframes pen { from { clip-path: inset(-50% -5% -50% 100%); } to { clip-path: inset(-50% -15% -50% -15%); } }
@keyframes unfold { from { opacity: 0; transform: scaleX(.15); } to { opacity: 1; transform: none; } }
@keyframes ink { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes dot { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: none; } }
@keyframes foil { from { background-position: -150% 0, 0 0; } 25%, to { background-position: 250% 0, 0 0; } }
.cal .dow { font-size: .9rem; }
.cell small { font-size: .95rem; }
.venue { line-height: 1.6; }
.closing .n { font-family: var(--f-initials); line-height: 2.1; padding-bottom: .15em; font-weight: 400; -webkit-text-stroke: 0; }
.monogram text, .monogram #monoA { font-family: var(--f-initials); stroke: none; }
.lang { font: italic 600 1.25rem/1 "Cormorant Garamond", serif; padding-bottom: 2px; }
.music { right: auto; inset-inline-end: 16px; }

@media (prefers-reduced-motion: reduce) {`],

  // envelope
  [`aria-label="Open the invitation"`, `aria-label="افتح الدعوة"`],
  [`<p class="intro-to" id="introTo">You are invited</p>`, `<p class="intro-to" id="introTo">أنتم مدعوون</p>`],
  [`<p class="intro-hint">Tap the gold leaf to open</p>`, `<p class="intro-hint">اضغط على الورقة الذهبية لفتح الدعوة</p>`],

  // opening page
  [`<p><span data-groom-family></span> Family</p>`, `<p>عائلة <span data-groom-family></span></p>`],
  [`<span class="amp-sm" aria-hidden="true">&amp;</span>`, `<span class="amp-sm" aria-hidden="true">و</span>`],
  [`<p><span data-bride-family></span> Family</p>`, `<p>عائلة <span data-bride-family></span></p>`],
  [`invite you to celebrate the marriage of their children`, `يتشرفون بدعوتكم لمشاركتهم فرحة زفاف أبنائهم`],
  [`<span class="sr-only">and</span>`, `<span class="sr-only">و</span>`],
  [`<text x="120" y="54" text-anchor="middle" font-size="84" fill="url(#goldG)" stroke="#8A6A2E" stroke-width=".6" style="font-family: var(--f-script)">&amp;</text>`,
   `<!-- the و sits in a small gold ring, like the ring on the envelope -->
          <circle cx="120" cy="34" r="19" fill="#F7F1E6" stroke="url(#goldEdge)" stroke-width="1"/>
          <circle cx="120" cy="34" r="15.5" fill="none" stroke="#B8924A" stroke-width=".5" opacity=".6"/>
          <text x="120" y="42" text-anchor="middle" font-size="30" font-weight="400" fill="url(#goldG)" stroke="#8A6A2E" stroke-width=".2" style="font-family: var(--f-initials)">و</text>`],

  // headings and labels
  [`>Save the date</h2>`, `>احفظوا الموعد</h2>`],
  [`>Counting the days</h2>`, `>العدّ التنازلي</h2>`],
  [`<small>days</small>`, `<small>يوم</small>`],
  [`<small>hours</small>`, `<small>ساعة</small>`],
  [`<small>minutes</small>`, `<small>دقيقة</small>`],
  [`<small>seconds</small>`, `<small>ثانية</small>`],
  [`We’re so happy you’re here`, `سعداء بوجودكم معنا`],
  [`The celebration will be held at`, `يُقام الحفل في`],
  [`          Get directions`, `          اعرف الطريق`],
  [`          Add to calendar`, `          أضف إلى التقويم`],
  [`>The evening</h2>`, `>برنامج الحفل</h2>`],
  [`>Kindly reply</h2>`, `>نرجو تأكيد الحضور</h2>`],
  [`and leave a few words for the couple`, `واتركوا كلمة للعروسين`],
  [`<label for="guestName">Your name</label>`, `<label for="guestName">الاسم</label>`],
  [`placeholder="e.g. Nour Hassan"`, `placeholder="مثال: نور حسن"`],
  [`Enter your name so your reply reaches us with it.`, `اكتب اسمك ليصلنا ردك باسمك.`],
  [`<legend>Will you attend?</legend>`, `<legend>هل ستحضر؟</legend>`],
  [`<span>Joyfully accepts</span>`, `<span>سأحضر بكل سرور</span>`],
  [`<span>Regretfully declines</span>`, `<span>أعتذر عن الحضور</span>`],
  [`<label for="guestCount">Number of guests</label>`, `<label for="guestCount">عدد الحضور</label>`],
  [`<option value="1">1 guest</option>`, `<option value="1">شخص واحد</option>`],
  [`<option value="2">2 guests</option>`, `<option value="2">شخصان</option>`],
  [`<option value="3">3 guests</option>`, `<option value="3">٣ أشخاص</option>`],
  [`<option value="4">4 guests</option>`, `<option value="4">٤ أشخاص</option>`],
  [`<option value="5">5 guests</option>`, `<option value="5">٥ أشخاص</option>`],
  [`A note for the couple <span class="small">(optional)</span>`, `رسالة للعروسين <span class="small">(اختياري)</span>`],
  [`placeholder="Your wishes for Ali and Shahd"`, `placeholder="تمنياتك لعلي وشهد"`],
  [`type="submit">Send my reply</button>`, `type="submit">أرسل ردّي</button>`],
  [`>Wishes for the couple</h2>`, `>دفتر التهاني</h2>`],
  [`No wishes yet. <a href="#t-reply">Leave the first one</a>`, `لم تصل أي تهنئة بعد. <a href="#t-reply">اكتب أول تهنئة</a>`],

  // closing
  [`aria-label="Closing"`, `aria-label="الختام"`],
  [`aria-label="Opening"`, `aria-label="الافتتاحية"`],
  [`<text id="monoA" x="-14" y="10" font-size="62" text-anchor="middle">A</text>
        <text class="amp" x="2" y="22" font-size="18" text-anchor="middle">&amp;</text>
        <text id="monoS" x="20" y="34" font-size="62" text-anchor="middle">S</text>`,
   `<text id="monoA" x="32" y="12" font-size="46" font-weight="400" text-anchor="middle">ع</text>
        <text class="amp" x="0" y="10" font-size="28" text-anchor="middle">و</text>
        <text id="monoS" x="-30" y="12" font-size="46" font-weight="400" text-anchor="middle">ش</text>`],
  [`.monogram .amp { font-family: var(--f-serif); font-style: italic; font-weight: 600; fill: var(--gold); stroke: none; }`,
   `.monogram .amp { font-family: var(--f-initials); font-weight: 400; fill: var(--gold); stroke: none; }`],
  [`<p class="small">With love and gratitude,</p>`, `<p class="small">مع خالص الحب والامتنان،</p>`],
  [`<p class="n"><span data-groom>Ali</span> &amp; <span data-bride>Shahd</span></p>`, `<p class="n"><span data-groom>عَلِيّ</span> و <span data-bride>شَهْد</span></p>`],
  [`We can’t wait to celebrate with you`, `ننتظركم لنحتفل معًا`],

  // switch and music buttons
  [`<a class="lang" id="lang" href="./" hreflang="ar" lang="ar" aria-label="النسخة العربية">ع</a>`,
   `<a class="lang" id="lang" href="en.html" hreflang="en" lang="en" aria-label="English version">En</a>`],
  [`aria-label="Play music" hidden>`, `aria-label="تشغيل الموسيقى" hidden>`],

  // details
  [`  bride: "Shahd",
  groom: "Ali",
  brideFamily: "Haggag",
  groomFamily: "El Giziry",`,
   `  // names are written with full vowel marks (tashkeel)
  bride: "شَهْد",
  groom: "عَلِيّ",
  brideFamily: "حجاج",
  groomFamily: "الجزيري",`],
  [`  venue: "Mass Hall",`, `  venue: "قاعة ماس للحفلات",`],
  [`  address: "Fuwwah, Kafr El Sheikh",`, `  address: "فوه، كفر الشيخ",`],
  [`alt="QR code that opens the hall on Google Maps"`, `alt="رمز QR يفتح موقع القاعة على خرائط جوجل"`],
  [`<figcaption>Scan to open the location</figcaption>`, `<figcaption>امسح الرمز لفتح موقع القاعة</figcaption>`],
  [`setAll("[data-groom-family]", WEDDING.groomFamily);`, `setAll("[data-groom-family]", WEDDING.groomFamily);
// nastaliq draws a ه inside a word as a small hook; in the names it is shown as the two-eyed ھ, the shape Arabic readers know
document.querySelectorAll(".names .n, .closing .n span").forEach((el) => { el.textContent = el.textContent.replace(/ه/g, "ھ"); });
// the names are written in by hand the first time their page comes into view
const namesEl = document.getElementById("names");
if (reduceMotion || !("IntersectionObserver" in window)) namesEl.classList.add("write");
else new IntersectionObserver((entries, io) => {
  if (entries[0].isIntersecting) { namesEl.classList.add("write"); io.disconnect(); }
}, { threshold: .45 }).observe(namesEl);`],
  [`<span class="n" data-bride>Shahd</span>`, `<span class="n" data-bride>Shahd</span>
        <svg class="swash" viewBox="0 0 240 40" aria-hidden="true">
          <!-- two mirrored halves, written out rather than <use>d so the ink styling and drawing animation reach both -->
          <g>
            <path class="ink" pathLength="1" stroke-width="1.5" d="M114 12 C96 24 70 26 46 20 C30 16 18 19 16 27 C14 34 22 37 26 32"/>
            <path class="ink" pathLength="1" stroke-width=".6" d="M108 18 C90 27 72 29 56 27"/>
            <circle cx="26" cy="32" r="1.6" fill="url(#pearl)" stroke="#B8924A" stroke-width=".4"/>
          </g>
          <g transform="translate(240 0) scale(-1 1)">
            <path class="ink" pathLength="1" stroke-width="1.5" d="M114 12 C96 24 70 26 46 20 C30 16 18 19 16 27 C14 34 22 37 26 32"/>
            <path class="ink" pathLength="1" stroke-width=".6" d="M108 18 C90 27 72 29 56 27"/>
            <circle cx="26" cy="32" r="1.6" fill="url(#pearl)" stroke="#B8924A" stroke-width=".4"/>
          </g>
          <circle cx="120" cy="10" r="3.2" fill="url(#pearl)" stroke="#B8924A" stroke-width=".6"/>
        </svg>`],

  // script text
  [`new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...opts })`, `new Intl.DateTimeFormat("ar-EG", { timeZone: TZ, ...opts })`],
  [`at \${WEDDING.venue}\`);`, `في \${WEDDING.venue}\`);`],
  [`document.getElementById("monoA").textContent = WEDDING.groom[0];
document.getElementById("iniA").textContent = WEDDING.groom[0];
document.getElementById("iniS").textContent = WEDDING.bride[0];
document.getElementById("monoS").textContent = WEDDING.bride[0];`,
   `// the first letter of each name, without its vowel mark
document.getElementById("monoA").textContent = WEDDING.groom[0];
document.getElementById("iniA").textContent = WEDDING.groom[0];
document.getElementById("iniS").textContent = WEDDING.bride[0];
document.getElementById("monoS").textContent = WEDDING.bride[0];`],
  [`  \`\${fmt({ day: "2-digit" })}.\${fmt({ month: "2-digit" })}.\${fmt({ year: "numeric" })}\`;`,
   `  fmt({ day: "numeric", month: "long", year: "numeric" });`],
  [`img.alt = \`\${WEDDING.groom} and \${WEDDING.bride}\`;`, `img.alt = \`\${WEDDING.groom} و\${WEDDING.bride}\`;`],
  [`document.title = \`\${WEDDING.groom} & \${WEDDING.bride} Wedding\`;
document.getElementById("wish").placeholder = \`Your wishes for \${WEDDING.groom} and \${WEDDING.bride}\`;`,
   `document.title = "زفاف علي وشهد";`],
  [`// calendar for the wedding month, weeks starting Sunday
const y = Number(fmt({ year: "numeric" }));
const mo = Number(fmt({ month: "numeric" })) - 1;
const dd = Number(fmt({ day: "numeric" }));`,
   `// calendar for the wedding month, weeks starting Sunday; numbers are read in Western digits, shown in Arabic ones
const num = (opts) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...opts }).format(when));
const ar = (n) => n.toLocaleString("ar-EG");
const y = num({ year: "numeric" });
const mo = num({ month: "numeric" }) - 1;
const dd = num({ day: "numeric" });`],
  [`["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]`, `["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"]`],
  [`  s.textContent = d;
  if (d === dd)`, `  s.textContent = ar(d);
  if (d === dd)`],
  [`// date written out, the way a printed invitation reads
const ORD = ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth",
  "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth",
  "twentieth", "twenty-first", "twenty-second", "twenty-third", "twenty-fourth", "twenty-fifth", "twenty-sixth",
  "twenty-seventh", "twenty-eighth", "twenty-ninth", "thirtieth", "thirty-first"];
const HOURS = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];
const hh = Number(fmt({ hour: "numeric", hourCycle: "h23" }));
const mm = Number(fmt({ minute: "numeric" }));
const part = hh < 12 ? "in the morning" : hh < 17 ? "in the afternoon" : "in the evening";
const timeWords = mm === 0 ? \`\${HOURS[hh % 12]} o’clock\` : \`\${HOURS[hh % 12]} \${mm === 30 ? "thirty" : String(mm).padStart(2, "0")}\`;
document.getElementById("spelled").textContent =
  \`\${fmt({ weekday: "long" })}, the \${ORD[dd]} of \${fmt({ month: "long" })}, at \${timeWords} \${part}\`;`,
   `// date written out, the way a printed invitation reads
const ORD = ["", "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
  "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر", "التاسع عشر",
  "العشرون", "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون", "الرابع والعشرون", "الخامس والعشرون", "السادس والعشرون",
  "السابع والعشرون", "الثامن والعشرون", "التاسع والعشرون", "الثلاثون", "الحادي والثلاثون"];
const HOURS = ["الثانية عشرة", "الواحدة", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة", "السابعة", "الثامنة", "التاسعة", "العاشرة", "الحادية عشرة"];
const hh = num({ hour: "numeric", hourCycle: "h23" });
const mm = num({ minute: "numeric" });
const part = hh < 12 ? "صباحًا" : hh < 17 ? "ظهرًا" : "مساءً";
const timeWords = mm === 0 ? \`\${HOURS[hh % 12]}\` : \`\${HOURS[hh % 12]} و\${mm === 30 ? "النصف" : ar(mm) + " دقيقة"}\`;
document.getElementById("spelled").textContent =
  \`يوم \${fmt({ weekday: "long" })}، \${ORD[dd]} من \${fmt({ month: "long" })}، في تمام الساعة \${timeWords} \${part}\`;`],
  [`new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" })`, `new Intl.DateTimeFormat("ar-EG", { hour: "numeric", minute: "2-digit" })`],
  [`encodeURIComponent(\`\${WEDDING.groom} & \${WEDDING.bride} Wedding\`)`, `encodeURIComponent("زفاف علي وشهد")`],
  [`f.title = \`Map to \${WEDDING.venue}\`;`, `f.title = \`خريطة \${WEDDING.venue}\`;`],
  [`textContent = "Welcome to our wedding";`, `textContent = "أهلًا بكم في حفل زفافنا";`],
  [`[d, h, m, s].forEach((v, i) => { cd[i].textContent = v; });`, `[d, h, m, s].forEach((v, i) => { cd[i].textContent = v.toLocaleString("ar-EG"); });`],
  [`// personal greeting: en.html?guest=Nour`, `// personal greeting: ?guest=نور`],
  [`textContent = \`Dear \${guest}\`;`, `textContent = \`إلى \${guest}\`;`],
  [`music.setAttribute("aria-label", "Pause music");`, `music.setAttribute("aria-label", "إيقاف الموسيقى");`],
  [`music.setAttribute("aria-label", "Play music");`, `music.setAttribute("aria-label", "تشغيل الموسيقى");`],
  [`sendBtn.textContent = "Sending…";`, `sendBtn.textContent = "جارٍ الإرسال…";`],
  [`_subject: \`\${yes ? "RSVP: attending" : "RSVP: declines"} from \${name}\`,`, `_subject: \`\${yes ? "تأكيد حضور" : "اعتذار عن الحضور"} من \${name}\`,`],
  [`      ? \`Thank you, \${name}. Your reply reached us and we can’t wait to see you.\`
      : \`Thank you, \${name}. Your note reached us, and we’ll miss you.\`;`,
   `      ? \`شكرًا يا \${name}، وصلنا ردك ونتطلع لرؤيتك.\`
      : \`شكرًا يا \${name}، وصلتنا رسالتك وسنفتقدك.\`;`],
  [`sendError.textContent = \`Your reply didn’t go through because of a connection problem. Try again, or email it to \${WEDDING.email}.\`;`,
   `sendError.textContent = \`لم يُرسَل ردك بسبب مشكلة في الاتصال. حاول مرة أخرى، أو أرسله إلى \${WEDDING.email}\`;`],
  [`sendBtn.textContent = "Send my reply";`, `sendBtn.textContent = "أرسل ردّي";`],
];

const missing = [];
for (const [from, to] of R) {
  const n = html.split(from).length - 1;
  if (n !== 1) { missing.push(`${n}x: ${from.slice(0, 70)}`); continue; }
  html = html.replace(from, () => to);
}
if (missing.length) { console.error("not replaced exactly once:\n" + missing.join("\n")); process.exit(1); }
fs.writeFileSync(out, html);
console.log("ok", R.length, "replacements");
