<template>
  <v-app class="empty-layout-app">
    <v-main class="empty-layout-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue';

const hideAllNavigation = () => {
  nextTick(() => {
    // Hide ALL navigation, footer, and sidebar elements
    const allSelectors = [
      '#sidebarWrapper',
      '.list',
      '.footer-wrapper',
      '.footer-space',
      '.footer-top',
      '.footer-mid',
      '.footer-bottom',
      '.paydo-info',
      '.paydo-content',
      '.paydo-registration',
      '#whatsapp-wrapper',
      '#logoExury',
      '.top-bar-wrapper',
      '.v-navigation-drawer',
      '#mainContainer',
      '.scroll-container',
      '.listInner',
      '.sidebar',
      'footer',
      '[class*="footer"]',
      '[id*="footer"]',
      '[class*="Footer"]',
      '[id*="Footer"]',
      'v-footer',
      '.v-footer'
    ];
    
    allSelectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(el => {
          if (el && !el.closest('.empty-layout-app') && !el.closest('.register-page')) {
            const htmlEl = el as HTMLElement;
            htmlEl.style.setProperty('display', 'none', 'important');
            htmlEl.style.setProperty('visibility', 'hidden', 'important');
            htmlEl.style.setProperty('opacity', '0', 'important');
            htmlEl.style.setProperty('pointer-events', 'none', 'important');
            htmlEl.style.setProperty('position', 'absolute', 'important');
            htmlEl.style.setProperty('left', '-9999px', 'important');
            htmlEl.style.setProperty('width', '0', 'important');
            htmlEl.style.setProperty('height', '0', 'important');
            htmlEl.style.setProperty('overflow', 'hidden', 'important');
          }
        });
      } catch (e) {
        // Ignore errors
      }
    });
  });
};

onMounted(() => {
  // Hide immediately and multiple times
  hideAllNavigation();
  setTimeout(hideAllNavigation, 10);
  setTimeout(hideAllNavigation, 50);
  setTimeout(hideAllNavigation, 100);
  setTimeout(hideAllNavigation, 200);
  setTimeout(hideAllNavigation, 300);
  setTimeout(hideAllNavigation, 500);
  setTimeout(hideAllNavigation, 1000);
  
  // Use MutationObserver to catch dynamically added elements
  const observer = new MutationObserver(() => {
    hideAllNavigation();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
  
  // Store observer reference to disconnect on unmount
  (window as any).__emptyLayoutObserver = observer;
  
  // Keep observer active for a shorter time
  setTimeout(() => {
    observer.disconnect();
    (window as any).__emptyLayoutObserver = null;
  }, 2000);
});

onUnmounted(() => {
  console.log('Empty layout unmounting, restoring elements...');
  
  // Disconnect observer if still active
  if ((window as any).__emptyLayoutObserver) {
    (window as any).__emptyLayoutObserver.disconnect();
    (window as any).__emptyLayoutObserver = null;
  }
  
  // Restore elements when leaving empty layout
  const selectors = [
    '#sidebarWrapper',
    '.list',
    '.footer-wrapper',
    '.footer-space',
    '#whatsapp-wrapper',
    '#logoExury',
    '.top-bar-wrapper',
    '.v-navigation-drawer',
    '#mainContainer',
    '.scroll-container',
    '.listInner'
  ];
  
  // Use multiple attempts to ensure restoration
  const restoreElements = () => {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        const htmlEl = el as HTMLElement;
        // Only restore if not inside empty-layout-app
        if (!htmlEl.closest('.empty-layout-app')) {
          // Remove all inline styles first
          htmlEl.removeAttribute('style');
          
          // Force restore with empty values (which will use CSS defaults)
          htmlEl.style.setProperty('display', '', 'important');
          htmlEl.style.setProperty('visibility', '', 'important');
          htmlEl.style.setProperty('opacity', '', 'important');
          htmlEl.style.setProperty('pointer-events', '', 'important');
          htmlEl.style.setProperty('position', '', 'important');
          htmlEl.style.setProperty('left', '', 'important');
          htmlEl.style.setProperty('width', '', 'important');
          htmlEl.style.setProperty('height', '', 'important');
          htmlEl.style.setProperty('overflow', '', 'important');
          htmlEl.style.setProperty('max-height', '', 'important');
          htmlEl.style.setProperty('padding', '', 'important');
          htmlEl.style.setProperty('margin', '', 'important');
        }
      });
    });
  };
  
  // Restore immediately and multiple times
  restoreElements();
  setTimeout(restoreElements, 10);
  setTimeout(restoreElements, 50);
  setTimeout(restoreElements, 100);
  setTimeout(restoreElements, 200);
  setTimeout(restoreElements, 500);
  setTimeout(restoreElements, 1000);
});
</script>

<style lang="scss" scoped>
.empty-layout-app {
  width: 100%;
  height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.empty-layout-main {
  width: 100%;
  height: 100vh;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
  display: block !important;
}
</style>

<style lang="scss">
// Hide ALL navigation, footer, and sidebar elements globally ONLY when empty layout is active
// IMPORTANT: Only apply when .empty-layout-app is present in the DOM
.empty-layout-app ~ *,
body:has(.empty-layout-app) {
  // Only hide elements that are NOT inside the empty layout
  #sidebarWrapper:not(.empty-layout-app *),
  .list:not(.empty-layout-app *),
  .footer-wrapper:not(.empty-layout-app *),
  .footer-space:not(.empty-layout-app *),
  .footer-top:not(.empty-layout-app *),
  .footer-mid:not(.empty-layout-app *),
  .footer-bottom:not(.empty-layout-app *),
  .paydo-info:not(.empty-layout-app *),
  .paydo-content:not(.empty-layout-app *),
  .paydo-registration:not(.empty-layout-app *),
  #whatsapp-wrapper:not(.empty-layout-app *),
  #logoExury:not(.empty-layout-app *),
  .top-bar-wrapper:not(.empty-layout-app *),
  .v-navigation-drawer:not(.empty-layout-app *),
  #mainContainer:not(.empty-layout-app *),
  .scroll-container:not(.empty-layout-app *),
  .listInner:not(.empty-layout-app *),
  .sidebar:not(.empty-layout-app *),
  footer:not(.empty-layout-app *),
  [class*="footer"]:not(.empty-layout-app *),
  [id*="footer"]:not(.empty-layout-app *),
  [class*="Footer"]:not(.empty-layout-app *),
  [id*="Footer"]:not(.empty-layout-app *),
  v-footer:not(.empty-layout-app *),
  .v-footer:not(.empty-layout-app *),
  [data-component="Footer"]:not(.empty-layout-app *),
  [data-component="footer"]:not(.empty-layout-app *) {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
    position: absolute !important;
    left: -9999px !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    max-height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}

// More specific: only when register-page is inside empty-layout-app
.empty-layout-app .register-page ~ * {
  // This ensures nothing is hidden when register page is active
}

// Ensure register page is ALWAYS visible
.empty-layout-app .register-page,
.empty-layout-main .register-page,
.register-page {
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 10001 !important;
  position: fixed !important;
  width: 100vw !important;
  height: 100vh !important;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%) !important;
}
</style>
