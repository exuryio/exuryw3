<template>
  <div class="cookies-policy-wrapper">
    <!-- Título Principal -->
    <v-card class="header-card" elevation="2">
      <v-card-title class="headline text-center">
        <b>Política de Cookies</b>
      </v-card-title>
      <v-divider></v-divider>
        <!-- Fecha de actualización -->
      <v-card-subtitle class="text-center">
        <small>Última actualización: 17 de Diciembre de 2024 {{ lastUpdated }}</small>
      </v-card-subtitle>
    </v-card>

    <!-- ¿Qué son las cookies? -->
    <v-card class="info-card" elevation="1">
      <v-card-title>
        <v-icon class="mr-2" color="primary">mdi-information</v-icon>
        ¿Qué son las cookies?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <p class="body-2">
          Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia, recordando tus preferencias y permitiéndonos ofrecerte contenido más relevante.
          Al navegar por Exury, utilizamos cookies para entender cómo interactúas con el sitio, como las páginas que visitas o los botones en los que haces clic. Esta información nos permite mejorar la funcionalidad del sitio y brindarte una mejor experiencia.
        </p>
      </v-card-subtitle>
    </v-card>

    <!-- ¿Como usamos las cookies? -->
    <v-card class="info-card" elevation="1">
      <v-card-title>
        <v-icon class="mr-2" color="primary">mdi-information</v-icon>
        ¿Cómo usamos las cookies?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <p class="body-2">
          En Exury utilizamos dos tipos de cookies:
        </p>
        <v-list dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="body-2">
            <strong>Cookies persistentes:</strong> Son las que permanecen en tu dispositivo durante un tiempo y nos ayudan a recordar tus preferencias, como tu idioma o tu configuración de seguridad.
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="body-2">
            <strong>Cookies de sesión:</strong> Son temporales y solo se usan mientras navegas en nuestro sitio. Se eliminan cuando cierras el navegador.
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
      </v-card-subtitle>
    </v-card>

    <!-- ¿Que tipo de cookies utilizamos? -->
    <v-card class="info-card" elevation="1">
      <v-card-title>
        <v-icon class="mr-2" color="primary">mdi-information</v-icon>
        ¿Que cookies utilizamos?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>Cookies necesarias:</strong> Estas son esenciales para que nuestro sitio web funcione correctamente. Permiten funciones básicas como acceder a tu cuenta, hacer transacciones o resolver problemas técnicos. Sin ellas, no podrías usar todos los servicios de nuestra plataforma.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>Cookies de preferencia:</strong>Estas cookies nos permiten recordar tus preferencias (como el idioma o la ubicación) para que tu experiencia de navegación sea más personalizada y cómoda.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>Cookies de análisis:</strong>Nos ayudan a entender cómo usas nuestro sitio para mejorarlo. Por ejemplo, sabemos qué páginas visitan más los usuarios o si hay problemas en alguna parte del sitio que necesitamos solucionar.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>Cookies de publicidad:</strong>Estas cookies nos permiten mostrarte anuncios más relevantes para ti, basados en tu actividad en el sitio. Así podemos ofrecerte productos y servicios relacionados con criptomonedas y finanzas de manera más efectiva.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>
      </v-card-subtitle>
    </v-card>

    <!-- Cookies de terceros-->
    <v-card class="action-card" elevation="2">
      <v-card-title class="action-title">
        <v-icon class="mr-2" color="primary">mdi-cogs</v-icon>
        Cookies de terceros
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <p class="body-2">
          También usamos cookies de empresas externas que nos ayudan a mejorar el rendimiento de nuestro sitio y a ofrecerte publicidad personalizada. Estas son algunas de las herramientas que usamos:
        </p>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>Google Analytics:</strong> Para analizar cómo interactúas con nuestro sitio y mejorar la experiencia. Nos permite ver cuántos usuarios están en el sitio web y qué páginas están visitando, así como rastrear cuántos visitantes se han registrado.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>Google Ads:</strong> Nos permiten medir la efectividad de nuestras campañas publicitarias, al rastrear cuántos usuarios hacen clic en nuestro sitio web desde un anuncio concreto y los datos demográficos de estos usuarios.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>Meta Pixel:</strong> Lo usamos para medir, optimizar y generar audiencias para campañas de publicidad que se ofrecen en plataformas de Meta. 
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>Twitter Pixel:</strong> Lo usamos para medir, optimizar y generar audiencias para campañas de publicidad que se ofrecen en X (antes Twitter).
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="body-2">
              <strong>LinkedIn Insights Tag: </strong> Lo usamos para medir, optimizar y generar audiencias para campañas de publicidad que se ofrecen en plataformas de LinkedIn
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>        
      </v-card-subtitle>
    </v-card>

    <!-- ¿Puedo cambiar mis preferencias de cookies? -->
    <v-card class="accept-card" elevation="2">
      <v-card-title class="accept-title">
        <v-icon class="mr-2" color="primary">mdi-check-circle</v-icon>
        ¿Puedo cambiar mis cookies?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
          <p class="body-2">
          ¡Claro! Tienes el control total sobre las cookies que aceptas. Cuando accedes al sitio, te pedimos que elijas qué cookies quieres permitir mediante un banner. Además, puedes cambiar esta configuración en cualquier momento a través de la opción en el pie de página o ajustando la configuración de tu navegador.
          </p>          
      </v-card-subtitle>
    </v-card>

    <!-- ¿Actualizamos esta política? -->
    <v-card class="update-card" elevation="1">
      <v-card-title>
        <v-icon class="mr-2" color="primary">mdi-update</v-icon>
        ¿Actualizamos esta política?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <p class="body-2">
          Sí, si alguna vez cambiamos las cookies que usamos, actualizaremos esta política y te informaremos para que siempre estés al tanto de lo que sucede. Te recomendamos revisar esta página de vez en cuando para mantenerte informado.
        </p>
      </v-card-subtitle>
    </v-card>

    <!-- ¿Tienes dudas? -->
    <v-card class="contact-card" elevation="1">
      <v-card-title>
        <v-icon class="mr-2" color="primary">mdi-email</v-icon>
        ¿Tienes dudas?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <p class="body-2">
          Si tienes alguna pregunta sobre nuestras cookies o necesitas más información, no dudes en ponerte en contacto con nosotros a través de correo electrónico.
        </p>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
const managePreferences = () => {
  console.log("Configurar preferencias de cookies");
};

const acceptCookies = () => {
  console.log("Cookies aceptadas");
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.cookies-policy-wrapper {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;

  .header-card, .info-card, .action-card, .accept-card, .update-card, .contact-card {
    border-radius: 8px;
    margin-bottom: 20px;
    
  }

  .info-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 120px; /* Asegura que la card tenga suficiente altura */
  }

   .card-title {
    display: flex;
    align-items: center; /* Centra verticalmente el título y el icono */
    font-size: 1rem; /* Mantiene el tamaño de la fuente */
    font-weight: bold;
    white-space: normal; /* Permite que el texto se ajuste y no se corte */
    word-wrap: break-word; /* Permite que el texto se divida en palabras largas */
    overflow: hidden; /* Evita que el texto se desborde fuera de la card */
    flex-wrap: wrap; /* Permite que el texto se ajuste a la siguiente línea si es necesario */
       
  }

  .body-1, .body-2 {
    font-size: 1rem;
    line-height: 1.5;
    word-wrap: break-word;  /* Ajusta las palabras largas */
    overflow-wrap: break-word; /* Asegura el ajuste correcto */
    white-space: normal;    /* Permite que el texto fluya */
  }

  .cookies-list {
    list-style-type: none;
    padding-left: 0;
    margin-top: 10px;
    li {
      margin-bottom: 10px;
    }
  }

  .accept-btn, .action-btn {
    margin-top: 16px;
  }

  .v-btn {
    font-weight: 500;
  }

  .v-divider {
    margin: 10px 0;
  }
  

  @media (max-width: 768px) {
    .cookies-policy-wrapper {
      padding: 10px;
    }

    .card-title {
      display: flex;
      align-items: center; /* Centra verticalmente el título y el icono */
      font-size: 1rem; /* Mantiene el tamaño de la fuente */
      font-weight: bold;
      white-space: normal; /* Permite que el texto se ajuste y no se corte */
      word-wrap: break-word; /* Permite que el texto se divida en palabras largas */
      overflow: hidden; /* Evita que el texto se desborde fuera de la card */
      flex-wrap: wrap; /* Permite que el texto se ajuste a la siguiente línea si es necesario */
    }

    .body-1, .body-2 {
      font-size: 0.9rem;
      word-wrap: break-word;  /* Ajusta las palabras largas */
      overflow-wrap: break-word; /* Asegura el ajuste correcto */
      white-space: normal;    /* Permite que el texto fluya */
    }

    .v-btn {
      font-size: 0.9rem;
      padding: 10px 20px;
    }
  }

  @media (max-width: 480px) {
    .card-title {
      font-size: 1rem;
    }

    .body-1, .body-2 {
      font-size: 0.85rem;
    }

    .v-btn {
      font-size: 0.8rem;
      padding: 8px 16px;
    }
  }
}
</style>
