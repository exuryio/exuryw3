<template>
  <div class="cookies-policy mdc-typography">
    <div class="container">
      <!-- Título Principal -->
      <header class="policy-header mdc-typography--headline4">
        <h1>Política de Cookies</h1>
        <p class="policy-date">Última actualización: 17 de diciembre de 2024</p>
      </header>

      <section class="policy-content">
        <!-- ¿Qué son las cookies? -->
        <div class="policy-section" id="what-are-cookies">
          <div class="mdc-card section-card">
            <h2 @click="toggle('what-are-cookies')" class="expandable-title mdc-typography--headline5">
              ¿Qué son las cookies? <span :class="{'expanded': expandedSection === 'what-are-cookies'}">▼</span>
            </h2>
            <div v-if="expandedSection === 'what-are-cookies'" class="mdc-typography--body1 justified-text">
              <p>
                Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia, recordando tus preferencias y permitiéndonos ofrecerte contenido más relevante.
              </p>
              <p>
                Al navegar por Exury, utilizamos cookies para entender cómo interactúas con el sitio, como las páginas que visitas o los botones en los que haces clic. Esta información nos permite mejorar la funcionalidad del sitio y brindarte una mejor experiencia.
              </p>
            </div>
          </div>
        </div>

        <!-- ¿Cómo usamos las cookies? -->
        <div class="policy-section" id="how-we-use-cookies">
          <div class="mdc-card section-card">
            <h2 @click="toggle('how-we-use-cookies')" class="expandable-title mdc-typography--headline5">
              ¿Cómo usamos las cookies? <span :class="{'expanded': expandedSection === 'how-we-use-cookies'}">▼</span>
            </h2>
            <div v-if="expandedSection === 'how-we-use-cookies'" class="mdc-typography--body1 justified-text">
              <p>
                En Exury utilizamos dos tipos de cookies:
              </p>
              <ul>
                <li>
                  <strong>Cookies esenciales:</strong> Estas cookies son necesarias para el funcionamiento básico del sitio web, como recordar tus preferencias de privacidad o permitirte iniciar sesión.
                </li>
                <li>
                  <strong>Cookies de análisis:</strong> Nos ayudan a recopilar información anónima sobre el uso del sitio web para mejorar la experiencia del usuario.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookiesPolicy",
  data() {
    return {
      expandedSection: '',
    };
  },
  methods: {
    toggle(section) {
      this.expandedSection = this.expandedSection === section ? '' : section;
    },
  },
};
</script>

<style scoped>
/* Material Design 2 (MD2) Palette */
:root {
  --mdc-theme-primary: #1CBA75;
  --mdc-theme-secondary: #03dac6;
  --mdc-theme-background: #f5f5f5;
  --mdc-theme-surface: #ffffff;
}

/* Base styles */
body {
  background-color: var(--mdc-theme-background);
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

/* Container */
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.policy-header {
  text-align: center;
  margin-bottom: 20px;
}

.policy-header h1 {
  font-size: 2.25rem;
  font-weight: 400;
  color: var(--mdc-theme-primary);
  margin: 0;
}

.policy-date {
  font-size: 1rem;
  color: #555;
  margin: 5px 0 0;
}

/* Card and Section Styles */
.mdc-card {
  background-color: var(--mdc-theme-surface);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

/* Title & Expandable Sections */
.expandable-title {
  color: var(--mdc-theme-primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.expandable-title:hover {
  color: #1CBA75;
}

.expandable-title .expanded {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

/* Justified Text */
.justified-text {
  text-align: justify;
  margin-bottom: 20px;
}
</style>
