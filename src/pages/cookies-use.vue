<template>
  <div class="cookie-policy">
    <v-card class="policy-card">
      <v-card-title class="text-xl font-semibold">Política de Cookies</v-card-title>
      <v-card-subtitle class="text-sm text-gray-600">Última actualización: 27 de Enero de 2025</v-card-subtitle>
      <v-card-text>
        <p>
          Este sitio utiliza cookies para mejorar tu experiencia, analizar el uso del sitio y ayudar en nuestros esfuerzos de marketing. Puedes gestionar tus preferencias a continuación:
        </p>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="font-medium">¿Qué son las cookies?</v-expansion-panel-title>
            <v-expansion-panel-text>
              <p>
                Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia, recordando tus preferencias y permitiéndonos ofrecerte contenido más relevante.
              </p>
              <p>
                Al navegar por Exury, utilizamos cookies para entender cómo interactúas con el sitio, como las páginas que visitas o los botones en los que haces clic. Esta información nos permite mejorar la funcionalidad del sitio y brindarte una mejor experiencia.
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="font-medium">¿Cómo usamos las cookies? </v-expansion-panel-title>
            <v-expansion-panel-text>
                <p>
                En Exury utilizamos dos tipos de cookies: 
                </p>
              <ul class="list-disc pl-5">           
                <li><b>Cookies persistentes:</b> Son las que permanecen en tu dispositivo durante un tiempo y nos ayudan a recordar tus preferencias, como tu idioma o tu configuración de seguridad.</li>
                <li><b>Cookies de sesión::</b> Son temporales y solo se usan mientras navegas en nuestro sitio. Se eliminan cuando cierras el navegador.</li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="font-medium">¿Que cookies utilizamos? </v-expansion-panel-title>
            <v-expansion-panel-text>
                <ul class="list-disc pl-5">           
                <li><b>Cookies necesarias:</b> stas son esenciales para que nuestro sitio web funcione correctamente. Permiten funciones básicas como acceder a tu cuenta, hacer transacciones o resolver problemas técnicos. Sin ellas, no podrías usar todos los servicios de nuestra plataforma..</li>
                <li><b>Cookies de preferencia</b> Estas cookies nos permiten recordar tus preferencias (como el idioma o la ubicación) para que tu experiencia de navegación sea más personalizada y cómoda.</li>
                <li><b>Cookies de análisis:</b> Nos ayudan a entender cómo usas nuestro sitio para mejorarlo. Por ejemplo, sabemos qué páginas visitan más los usuarios o si hay problemas en alguna parte del sitio que necesitamos solucionar.</li>
                <li><b>Cookies de publicidad:</b> Estas cookies nos permiten mostrarte anuncios más relevantes para ti, basados en tu actividad en el sitio. Así podemos ofrecerte productos y servicios relacionados con criptomonedas y finanzas de manera más efectiva.</li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="font-medium">Cookies de terceros</v-expansion-panel-title>
            <v-expansion-panel-text>
                <p>
                También usamos cookies de empresas externas que nos ayudan a mejorar el rendimiento de nuestro sitio y a ofrecerte publicidad personalizada. Estas son algunas de las herramientas que usamos: 
                </p>
              <ul class="list-disc pl-5">           
                <li><b>Google Analytics:</b> Para analizar cómo interactúas con nuestro sitio y mejorar la experiencia. Nos permite ver cuántos usuarios están en el sitio web y qué páginas están visitando, así como rastrear cuántos visitantes se han registrado.</li>
                <li><b>Google Ads:</b> Nos permiten medir la efectividad de nuestras campañas publicitarias, al rastrear cuántos usuarios hacen clic en nuestro sitio web desde un anuncio concreto y los datos demográficos de estos usuarios.</li>
                <li><b>Meta Pixel:</b> Lo usamos para medir, optimizar y generar audiencias para campañas de publicidad que se ofrecen en plataformas de Meta. </li>
                <li><b>Twitter Pixel:</b> Lo usamos para medir, optimizar y generar audiencias para campañas de publicidad que se ofrecen en X (antes Twitter).</li>
                <li><b>LinkedIn Insights Tag:</b> Lo usamos para medir, optimizar y generar audiencias para campañas de publicidad que se ofrecen en plataformas de LinkedIn</li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="font-medium">¿Puedo cambiar mis preferencias de cookies?</v-expansion-panel-title>
            <v-expansion-panel-text>
                <p>
                ¡Claro! Tienes el control total sobre las cookies que aceptas. Cuando accedes al sitio, te pedimos que elijas qué cookies quieres permitir mediante un banner. Además, puedes cambiar esta configuración en cualquier momento a través de la opción en el pie de página o ajustando la configuración de tu navegador.
                </p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="font-medium">¿Actualizamos esta política?</v-expansion-panel-title>
            <v-expansion-panel-text>
                <p>
                 Sí, si alguna vez cambiamos las cookies que usamos, actualizaremos esta política y te informaremos para que siempre estés al tanto de lo que sucede. Te recomendamos revisar esta página de vez en cuando para mantenerte informado.
                </p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="font-medium">¿Tienes dudas?</v-expansion-panel-title>
            <v-expansion-panel-text>
                <p>
                  Si tienes alguna pregunta sobre nuestras cookies o necesitas más información, no dudes en ponerte en contacto con nosotros a través de correo electrónico.
                </p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>     
    </v-card>
  </div>
</template>

<style scoped>
.cookie-policy {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.policy-card {
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.font-semibold {
  font-weight: 600;
}
.text-gray-600 {
  color: #4b5563;
}
</style>
