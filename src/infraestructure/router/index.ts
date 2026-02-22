/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */
// @ts-ignore - vue-router/auto is provided by unplugin-vue-router
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import type { RouteRecordRaw } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";

/** Quita la ruta order del auto-generado para evitar doble layout (parent+child aplican layout dos veces) */
function withoutOrderRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.filter((r) => {
    const p = (r.path ?? '').toString();
    return p !== 'order' && p !== '/order';
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes: RouteRecordRaw[]) => {
    const rest = withoutOrderRoutes(routes);
    return setupLayouts([
      { path: '/', redirect: '/home' },
      { path: '/dashboard', name: 'dashboard', component: () => import('@/pages/dashboard.vue') },
      { path: '/orders', name: 'orders', component: () => import('@/pages/orders.vue') },
      { path: '/order/:id', name: 'order-id', component: () => import('@/pages/order/[id].vue'), meta: { layout: 'default' }, props: true },
      ...rest,
    ]);
  },
});

// Navigation guard to clean up styles when leaving empty layout pages
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  // If we're navigating away from a page that uses empty layout, clean up
  if (from.path === '/register' || from.path === '/verify-email' || from.path === '/auth-callback') {
    console.log('🧹 Cleaning up styles after leaving empty layout page');
    
    // Force restore all elements that might have been hidden
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
    
    const restoreElements = () => {
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          const htmlEl = el as HTMLElement;
          // Only restore if not inside empty-layout-app
          if (!htmlEl.closest('.empty-layout-app')) {
            // Remove all inline styles
            htmlEl.removeAttribute('style');
            // Force visible styles
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
  }
});

export default router;
