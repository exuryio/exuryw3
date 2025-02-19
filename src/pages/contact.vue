<template>
  <div class="contact-wrapper">
    <h1>Contact</h1>
    <p>Contacta con nuestro equipo para recibir asistencia inmediata con tus operaciones o para cualquier consulta.</p>
    <div class="card-wrapper">
      <div v-for="(card, index) in contents" class="card" :key="index">
        <div class="image">
          <img :src="card.image" :alt="card.title" />
        </div>
        <div class="content">
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
          <template v-if="card.title === 'Whatsapp'">
            <a :href="card.link" target="_blank" class="contact-button">
              <v-btn rounded variant="outlined" class="box-btn-action text-capitalize">
                {{ card.button }}
              </v-btn>
            </a>
          </template>
          <template v-else-if="card.title === 'Email'">
            <a :href="`mailto:direccion@exury.io?subject=Consulta%20desde%20la%20web&body=Hola,%20tengo%20una%20consulta`" class="contact-button">
              <v-btn rounded variant="outlined" class="box-btn-action text-capitalize">
                {{ card.button }}
              </v-btn>
            </a>
          </template>
          <template v-else>
            <v-btn rounded variant="outlined" class="box-btn-action text-capitalize">
              {{ card.button }}
            </v-btn>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const whatsappNumber = '+34604117851';
const message = 'Hola estoy interesadx en saber más';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const contents = [
  {
    title: 'Whatsapp',
    description: '¿Necesitas ayuda o quieres hacer una operación? Escríbenos y te asistiremos al instante.',
    button: '¡Chatea con Nosotros!',
    link: whatsappLink,
    image: '/assets/contact/Contactusexury-01.svg'
  },
  {
    title: 'Email',
    description: 'Para consultas escríbenos al email direccion@exury.io responderemos rápido con la información solicitada.',
    button: '¡Escríbenos ahora!',
    link: '', // No es necesario un enlace aquí, se usará mailto
    image: '/assets/contact/Contactusexury-02.svg'
  }
];
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.contact-wrapper {
   margin-top: 24px;
  .card-wrapper {
    display: flex;
    justify-content: start;
    margin-top: 32px;
    gap: 8px;
    .card {
      width: 516px;
      height: 390px;
      padding: 32px;
      border-radius: 20px;
      border: 1px solid #2D4740;
      background: #0D1513;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .image {
        display: block;
        height: 142px;
        min-width: 142px;
        max-width: 142px;
        overflow: hidden;
        position: relative;
        img {
          position: absolute;
          top: -42.4%;
          left: -32%;
          width: 241px;
        }
      }
      .content {
        h2 {
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          color: $primary-color;
          text-align: center;
          margin-bottom: 16px;
        }
        p {
          text-align: center;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.301px;
        }
        .box-btn-action {
          margin-top: 24px;
          border: 0.1px solid white;
          color: #1cba75;
          width: 100%;
        }
      }
    }
  }
}
@media (max-width: $screen-sm) {
  .contact-wrapper {
    padding: 0 16px;
    .card-wrapper {
      flex-direction: column;
      gap: 16px;
      .card {
        width: 100%;
        height: 382px;
        padding: 24px;
        border: 1px solid #2D4740;
        .content {
          h2 {
            font-size: 24px;
          }
          p {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>