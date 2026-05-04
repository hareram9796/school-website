// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav
function toggleNav() {
  document.getElementById('navLinks')?.classList.toggle('open');
}

// ── ADMISSIONS FORM ──────────────────────────────────
const SCHOOL_WA = '919876543210';

function submitAdmission(e) {
  e.preventDefault();
  const stu     = document.getElementById('stuName').value.trim();
  const dob     = document.getElementById('stuDob').value;
  const cls     = document.getElementById('stuClass').value;
  const prev    = document.getElementById('prevSchool').value.trim();
  const parent  = document.getElementById('parentName').value.trim();
  const phone   = document.getElementById('parentPhone').value.trim();
  const email   = document.getElementById('parentEmail')?.value.trim() || '';
  const address = document.getElementById('parentAddress').value.trim();
  const note    = document.getElementById('stuNote')?.value.trim() || '';
  const now     = new Date().toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' });

  const msg =
    `🎓 *SRI VIDYA ACADEMY*\n` +
    `📋 *NEW ADMISSION ENQUIRY*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👦 *Student Name:* ${stu}\n` +
    `📅 *Date of Birth:* ${dob}\n` +
    `📚 *Applying for:* ${cls}\n` +
    (prev ? `🏫 *Previous School:* ${prev}\n` : '') +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Parent Name:* ${parent}\n` +
    `📞 *Phone:* ${phone}\n` +
    (email ? `📧 *Email:* ${email}\n` : '') +
    `📍 *Address:* ${address}\n` +
    (note ? `💬 *Message:* ${note}\n` : '') +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `⏰ *Submitted:* ${now}\n` +
    `Please contact us to schedule a school visit.`;

  const waUrl = `https://wa.me/${SCHOOL_WA}?text=${encodeURIComponent(msg)}`;

  document.getElementById('admitMsg').innerHTML =
    `Thank you <strong>${parent}</strong>! Enquiry for <strong>${stu}</strong> (${cls}) received.`;
  document.getElementById('admitWaLink').href = waUrl;
  document.getElementById('admitModal').classList.add('show');
  document.getElementById('admitForm').reset();

  setTimeout(() => window.open(waUrl, '_blank'), 700);
}

function closeAdmitModal() {
  document.getElementById('admitModal')?.classList.remove('show');
}

// ── PROSPECTUS DOWNLOAD ───────────────────────────────
function downloadProspectus() {
  // Generate a simple text-based prospectus
  const content = `SRI VIDYA ACADEMY — SCHOOL PROSPECTUS 2025-26
================================================
Address: 123, Education Road, Hyderabad - 500034
Phone: +91 98765 43210
Email: info@srividyaacademy.edu

ABOUT US
--------
Established in 1999, Sri Vidya Academy is one of Hyderabad's premier educational institutions
with 2500+ students, 120+ faculty, and a 5-acre campus.

CLASSES OFFERED
---------------
• Pre-Primary: Nursery, LKG, UKG
• Primary: Class I – V
• Secondary: Class VI – X
• Senior Secondary: Class XI – XII (Science & Commerce)

FEE STRUCTURE (2025-26)
-----------------------
• Nursery – UKG:     ₹45,000/year
• Class I – V:       ₹55,000/year
• Class VI – X:      ₹65,000/year
• Class XI – XII:    ₹75,000/year
(Includes tuition, books, uniform, and transport)

ADMISSION PROCESS
-----------------
1. Fill online/offline enquiry form
2. Attend entrance test (Class VI onwards)
3. Interview with Principal
4. Fee payment and enrollment

FACILITIES
----------
✓ Smart Classrooms with projectors
✓ Science, Computer & Language Labs
✓ Library with 10,000+ books
✓ Sports ground (Cricket, Football, Basketball)
✓ GPS-tracked school buses (30+ routes)
✓ Cafeteria with healthy meals
✓ CCTV surveillance campus

CONTACT ADMISSIONS
------------------
Phone: +91 98765 43210 / +91 98765 43211
Email: admissions@srividyaacademy.edu
WhatsApp: +91 98765 43210

© 2024 Sri Vidya Academy. All Rights Reserved.`;

  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'SriVidyaAcademy_Prospectus_2025-26.txt';
  a.click();
}

// ── GALLERY ───────────────────────────────────────────
let currentGalleryItems = [];
let currentLbIndex = 0;

function filterGallery(btn, cat) {
  document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gal-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// Lightbox
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gal-item').forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });
  currentGalleryItems = [...document.querySelectorAll('.gal-item')];
});

function openLightbox(idx) {
  currentLbIndex = idx;
  const item = currentGalleryItems[idx];
  const img = item.querySelector('img');
  const cap = item.querySelector('.gal-overlay span');
  document.getElementById('lbImg').src = img.src;
  document.getElementById('lbCaption').textContent = cap?.textContent || '';
  document.getElementById('lightbox').classList.add('show');
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('show');
}

function lbNav(dir, e) {
  e.stopPropagation();
  const visible = currentGalleryItems.filter(i => !i.classList.contains('hidden'));
  const visIdx = visible.findIndex((_, i) => i === currentLbIndex % visible.length);
  currentLbIndex = (visIdx + dir + visible.length) % visible.length;
  const item = visible[currentLbIndex];
  document.getElementById('lbImg').src = item.querySelector('img').src;
  document.getElementById('lbCaption').textContent = item.querySelector('.gal-overlay span')?.textContent || '';
}

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.id === 'admitModal') closeAdmitModal();
});

// Keyboard nav for lightbox
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb?.classList.contains('show')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lbNav(1, { stopPropagation: () => {} });
  if (e.key === 'ArrowLeft')  lbNav(-1, { stopPropagation: () => {} });
});
