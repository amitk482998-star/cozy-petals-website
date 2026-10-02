/**
 * COZY PETALS by Tanu - Website Interaction Script
 * Brand: Cozy Petals (@cozypetalsbytanu)
 * Location: Khunti, Jharkhand
 */

// WHATSAPP CONFIGURATION
// Replace '919876543210' with Tanu's actual WhatsApp business number (country code + number, no '+' or spaces)
const BRAND_WHATSAPP_NUMBER = '919876543210'; 

/**
 * Universal WhatsApp Redirection Helper
 */
function openWhatsApp(customText) {
  const defaultText = "Hi Cozy Petals! I'm interested in your handmade flower creations.";
  const message = encodeURIComponent(customText || defaultText);
  const whatsappUrl = 'https://wa.me/' + BRAND_WHATSAPP_NUMBER + '?text=' + message;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Custom Design Atelier WhatsApp Builder
 */
function sendCustomBuilderWhatsApp() {
  const flower = document.getElementById('customFlowerSelect').value;
  const color = document.getElementById('customColorSelect').value;
  
  const text = 'Hi Tanu! I am on the Cozy Petals website and would like to request a custom handmade design:\n' +
               '- Style: ' + flower + '\n' +
               '- Color Theme: ' + color + '\n' +
               'Could you share design options and details?';

  openWhatsApp(text);
}

/**
 * Dynamic Product Order Modal Logic
 */
let currentSelectedProduct = '';

function openOrderModal(productName) {
  currentSelectedProduct = productName;
  const titleEl = document.getElementById('modalProductName');
  const modal = document.getElementById('orderModal');
  const colorInput = document.getElementById('modalColorPref');
  const notesInput = document.getElementById('modalNotes');
  
  if (titleEl) titleEl.textContent = productName;
  if (colorInput) colorInput.value = '';
  if (notesInput) notesInput.value = '';
  if (modal) modal.classList.add('open');
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function() {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Navigation Drawer Toggle
  const menuBtn = document.getElementById('menuBtn');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const navDrawer = document.getElementById('navDrawer');
  const backdrop = document.getElementById('backdrop');

  function toggleMenu(show) {
    if (navDrawer && backdrop) {
      if (show) {
        navDrawer.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        navDrawer.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', function() { toggleMenu(true); });
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', function() { toggleMenu(false); });
  if (backdrop) backdrop.addEventListener('click', function() {
    toggleMenu(false);
    closeOrderModal();
  });

  // Close drawer on navigation click
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() { toggleMenu(false); });
  });

  // 3. Product Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const category = btn.getAttribute('data-cat');
      productCards.forEach(function(card) {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Modal Submit Action
  const modalSubmitBtn = document.getElementById('modalSubmitBtn');
  if (modalSubmitBtn) {
    modalSubmitBtn.addEventListener('click', function() {
      const color = document.getElementById('modalColorPref').value.trim();
      const notes = document.getElementById('modalNotes').value.trim();

      let msg = 'Hi Tanu! I\'m interested in ordering "' + currentSelectedProduct + '" from Cozy Petals.';
      if (color) msg += '\n• Preferred Palette: ' + color;
      if (notes) msg += '\n• Special Notes: ' + notes;

      closeOrderModal();
      openWhatsApp(msg);
    });
  }

  // 5. Close modal with ESC key
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeOrderModal();
      toggleMenu(false);
    }
  });
});