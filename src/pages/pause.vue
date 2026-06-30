<template>
  <div class="pause-page">
    <div class="pause-container">
      <div class="logo-section">
        <img
          src="/LogoExury.svg"
          alt="Exury"
          class="pause-logo"
        />
      </div>

      <v-card class="pause-card" elevation="0">
        <v-card-text class="pause-content">
          <h1 class="pause-title">
            We're taking a short break so we can come back stronger than ever! 🚀
          </h1>

          <p class="pause-message">
            Due to regulatory adjustments, we need to temporarily suspend our services. But don't worry! We're already working on the final details and will be back very soon.
          </p>

          <p class="pause-thanks">
            Thank you for your continued trust and support!
          </p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>

<style lang="scss" scoped>
.pause-page {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  overflow: hidden;
}

.pause-container {
  width: 100%;
  max-width: 520px;
  z-index: 10001;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 26px;
}

.pause-logo {
  height: 51px;
  width: auto;
  object-fit: contain;
}

.pause-card {
  background: rgba(18, 18, 18, 0.94) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 22px !important;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45);
}

.pause-content {
  padding: 38px 32px 34px !important;
  color: #ffffff;
  text-align: center;
}

.pause-title {
  font-size: clamp(22px, 4.5vw, 28px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 24px;
  line-height: 1.35;
}

.pause-message {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
  margin: 0 0 24px;
}

.pause-thanks {
  font-size: 16px;
  line-height: 1.5;
  color: #1cba75;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 480px) {
  .pause-content {
    padding: 29px 22px !important;
  }

  .pause-title {
    font-size: 20px;
  }

  .pause-logo {
    height: 38px;
  }

  .pause-message,
  .pause-thanks {
    font-size: 14px;
  }
}
</style>
