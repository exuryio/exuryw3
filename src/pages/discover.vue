<template>
  <div class="discover-us-wrapper">
    <div class="title-wrapper">
      <h2 class="title">Discover us</h2>
      <p class="paragraph">Explora cómo EXURY transforma el intercambio de criptomonedas con seguridad respaldada por el Banco de España y un toque humano inigualable. Unete a la 1ra plataforma SIN CUSTODIA del mercado.</p>
    </div>
    <div class="discover-content-wrapper">
      <div v-for="(content, index) in contents" :key="index" class="box-wrapper">
        <div class="image">
          <img :src="content.image" :alt="content.image"/>
        </div>
        <div class="box-text-wrapper">
          <h3>{{ content.title }}</h3>
          <p v-html="formatText(content.description)"></p>
          <ul v-if="content.listDescription.length">
            <li v-for="(item, index) in content.listDescription" :key="index"><v-icon class="icon">mdi-check-circle-outline</v-icon><p>{{ item }}</p></li>
          </ul>
          <v-btn rounded variant="outlined" class="box-btn-action text-capitalize">{{ content.button }}</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const contents = [
  {
    title: '¡Libertad Financiera Total!',
    description: '¿Cansado de plataformas que te quitan el control de tus activos?\n' +
      '\n' +
      'Con EXURY, tu decides dónde recibir tus criptomonedas, respaldado por la seguridad de un socio humano, no un algoritmo.',
    listDescription: [],
    button: 'How it works',
    image: '/assets/discover-us/DiscoverUs_exury-01.svg'},
  {
    title: 'Seguridad Total y Sin Custodia',
    description: 'Al no custodiar tus fondos, eliminamos el riesgo de pérdida o robo. Disfruta de transacciones seguras y protegidas con encriptacion.',
    listDescription: [],
    button: 'How it works',
    image: '/assets/discover-us/DiscoverUs_exury-02.svg'},
  {
    title: 'Optimiza Tu Cartera con Consultoría Premium',
    description: 'Mas que una plataforma de intercambio, accede y recibe:',
    listDescription: ['Una consultoria gratuita y personalizada con nuestros expertos en criptomonedas.', 'Un analisis detallado de tu cartera.', 'Estrategias efectivas para potenciar tus inversiones', 'Este bono de alto costo en el mercado, esta incluido sin cargo adicional, para impulsar tus resultados financieros'],
    button: 'Buy Crypto',
    image: 'assets/discover-us/DiscoverUs_exury-03.svg'},
  {
    title: 'Satisfación Asegurada',
    description: 'Si no estás completamente satisfecho con tu intercambio, te ofrecemos un descuento asegurado en tu próxima transacción.',
    listDescription: [],
    button: 'Buy Crypto',
    image: 'assets/discover-us/DiscoverUs_exury-04.svg'},
  {
    title: '¡Sé de los Primeros 100, Maximiza tus Beneficios!',
    description: 'Esta oferta exclusiva es para los primeros 100 usuarios que realicen un intercambio en nuestra plataforma. ¡Aprovecha antes de que termine!',
    listDescription: [],
    button: 'Buy Crypto',
    image: 'assets/discover-us/DiscoverUs_exury-05.svg'},
  {
    title: 'Intercambia con la Tranquilidad y Protección que\n' +
      'Solo un Proveedor Regulado Puede Ofrecer',
    description: 'En EXURY estamos regulados por el Banco de España, asegurando la protección en cada transacción.',
    listDescription: ['Respaldo Oficial: Cumplimos con las estrictas normativas de seguridad del Banco de España y la Union Europea.', "Seguridad Garantizada: Cada transaccion esta protegida bajo normas AML/FT 'Anti Money Laundering & Financial Terrorism'"],
    button: 'Buy Crypto',
    image: 'assets/discover-us/DiscoverUs_exury-06.svg'},
  {
    title: 'Únete a la Revolución Financiera con EXURY',
    description: 'Imagina un mundo donde tus inversiones están protegidas y tienes libertad de escoger donde recibir tus criptomonedas.\n\n' +
      'Te invitamos a ser parte de algo más grande que un simple intercambio de criptomonedas; te invitamos a formar parte de una revolución en la forma en que manejas tu dinero.',
    listDescription: [],
    button: 'Register now',
    image: 'assets/discover-us/DiscoverUs_exury-07.svg'}
];

const formatText = (text: string) => {
  return text.replace(/\n/g, '<br />');
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
  .discover-us-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 88px;
    gap: 48px;
    .title-wrapper {
      .title {
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.8px;
      }
      .paragraph {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 8px;
      }
    }
    .discover-content-wrapper {
      display: flex;
      flex-direction: column;
      gap: 120px;
      padding: 0 16px 0 0;
      .box-wrapper {
        display: flex;
        align-items: center;
        gap: 104px;
        .box-text-wrapper {
          h3 {
            color: #1CBA75;
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.56px;
            margin-bottom: 16px;
          }
          p {
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
          ul {
            margin-top: 24px;
            list-style-type: none;
            padding-left: 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            li {
              display: flex;
              gap: 8px;
              align-items: flex-start;
              .icon {
                color: #1CBA75;
                font-size: 24px;
              }
              p {
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
              }
            }
          }
          .box-btn-action {
            margin-top: 24px;
            border: 0.1px solid white;
            color: #1cba75;
          }
        }
        .image {
          display: block;
          height: 332px;
          min-width: 332px;
          overflow: hidden;
          position: relative;
          img {
            position: absolute;
            top: -41%;
            left: -31%;
            width: 565px;
          }
        }
      }
      .box-wrapper:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
  }
  @media (max-width: $screen-sm) {
    .discover-us-wrapper {
      gap: 48px;
      padding: 0 16px;
      .title-wrapper {
        .title {
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -0.48px;
        }
        .paragraph {
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .discover-content-wrapper {
        gap: 104px;
        padding: 0;
        .box-wrapper {
          flex-direction: column;
          gap: 32px;
          .box-text-wrapper {
            h3 {
              font-size: 24px;
              margin-bottom: 16px;
              text-align: center;
              width: 100%;
            }
            p {
              font-size: 16px;
              ul {
                margin-top: 16px;
                li {
                  .icon {
                    font-size: 20px;
                  }
                  p {
                    font-size: 16px;
                  }
                }
              }
            }
            .box-btn-action {
              margin-top: 24px;
              width: 100%;
            }
          }
          .image {
            display: block;
            height: 142px;
            min-width: 142px;
            overflow: hidden;
            position: relative;
            img {
              position: absolute;
              top: -42%;
              left: -31%;
              width: 243px;
            }
          }
        }
        .box-wrapper:nth-child(even) {
          flex-direction: column;
        }
      }
    }
  }
</style>
