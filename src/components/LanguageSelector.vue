<template>
  <div class="language-selector">
    <v-menu location="bottom end" offset="8">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon
          variant="text"
          class="lang-btn lang-btn-img"
          :aria-label="t('language.label')"
        >
          <img src="/icons/lang.svg" alt="" class="lang-icon-img" width="24" height="24" aria-hidden="true" />
        </v-btn>
      </template>
      <v-list class="lang-menu-list">
        <v-list-item
          v-for="opt in LOCALE_OPTIONS"
          :key="opt.value"
          :title="opt.label"
          :class="{ 'lang-active': locale === opt.value }"
          @click="setLocale(opt.value)"
        >
          <template v-slot:prepend>
            <v-icon v-if="locale === opt.value" size="18" color="#1cba75">mdi-check</v-icon>
            <span v-else class="lang-check-placeholder" />
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { LOCALE_OPTIONS, setStoredLocale, type LocaleCode } from '@/infraestructure/i18n';

const { locale, t } = useI18n();

function setLocale(code: LocaleCode) {
  setStoredLocale(code);
}
</script>

<style lang="scss" scoped>
.language-selector {
  .lang-btn {
    color: rgba(255, 255, 255, 0.7) !important;
  }
  .lang-btn:hover {
    color: #1cba75 !important;
  }
  .lang-btn-img .lang-icon-img {
    display: block;
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
}

.lang-menu-list {
  background: rgba(13, 21, 19, 0.95) !important;
  border: 1px solid #2d4740;
  min-width: 160px;
}

.lang-active {
  color: #1cba75 !important;
}

.lang-check-placeholder {
  display: inline-block;
  width: 18px;
  height: 18px;
}
</style>
