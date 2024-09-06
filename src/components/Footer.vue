<template>
  <div class="footer-wrapper">
    <hr />
    <p class="footer-top">La inversión en criptoactivos no está regulada, puede no ser adecuada para inversores minoristas y perderse la totalidad del importe invertido Es importante leer y comprender los riesgos de esta inversión que se explican detalladamente en esta <a href="#">ubicación</a>.</p>
    <div class="footer-mid">
      <div>
        <img
          class="logo-footer"
          alt=""
          src="/LogoExury1.png"
        />
        <p>Calle Hermosilla 48, 1. dcha.
          Madrid, Spain</p>
        <p>contact@exury.io</p>
      </div>
      <div>
        <h2>Seguridad & Legal</h2>
        <ul>
          <li>Politica de Privacidad</li>
          <li>Terminos y Condiciones</li>
          <li>Cookies</li>
          <li>Licencias</li>
        </ul>
      </div><div>
      <h2>Tendencias</h2>
      <ul>
        <li>Cambiar criptomonedas a euros</li>
        <li>Exchange criptomonedas españa</li>
        <li>Comprar bitcoin con euros</li>
        <li>Comprar bitcoin con euros</li>
      </ul>
    </div>
      <div>
        <h2 class="newsletter">Newsletter</h2>
        <v-text-field
          append-inner-icon="mdi-email-outline"
          label="Email"
          variant="outlined"
          class="input-newsletter"
        ></v-text-field>
        <v-btn rounded color="primary" class="btn-subscribe text-capitalize">Suscribirse</v-btn>
      </div>
    </div>
    <hr />
    <div class="footer-bottom">
      <div class="social-icons">
        <img class="icon" src="/src/assets/social/x.svg" />
        <v-icon class="icon instagram" icon="mdi-instagram"></v-icon>
        <v-icon class="icon whatsapp" icon="mdi-whatsapp"></v-icon>
      </div>
      <div class="a-product-of">
        <p>A product of <svg xmlns="http://www.w3.org/2000/svg" width="36" height="39" viewBox="0 0 36 39" fill="none">
          <g clip-path="url(#clip0_5068_2210)">
            <path d="M31.6968 0.146484H4.30316C2.20273 0.146484 0.5 1.84922 0.5 3.94965V34.6364C0.5 36.7368 2.20273 38.4396 4.30316 38.4396H31.6968C33.7973 38.4396 35.5 36.7368 35.5 34.6364V3.94965C35.5 1.84922 33.7973 0.146484 31.6968 0.146484Z" fill="#00BE6A"/>
            <path d="M22.9347 12.2135V20.0652C22.9347 22.3317 23.8282 23.4641 25.6183 23.4641C27.4084 23.4641 28.3018 22.3317 28.3018 20.0652V9.43848H31.4617V20.1358C31.4617 21.2313 31.3254 22.1777 31.0543 22.9733C30.7913 23.6855 30.3373 24.3271 29.6925 24.8981C28.6242 25.8253 27.2672 26.2888 25.6199 26.2888C23.9725 26.2888 22.6283 25.8253 21.5601 24.8981C20.904 24.3271 20.4404 23.6855 20.1694 22.9733C19.9063 22.3365 19.7764 21.3901 19.7764 20.1358V12.2135H22.9363H22.9347Z" fill="black"/>
            <path d="M13.0641 9.46777V15.5166C13.0641 17.7831 12.1691 18.9155 10.3806 18.9155C8.5921 18.9155 7.69705 17.7831 7.69705 15.5166V12.3149H4.53711V15.5872C4.53711 16.8415 4.66864 17.7879 4.9301 18.4247C5.20118 19.1369 5.66474 19.7785 6.32079 20.3495C7.38908 21.2767 8.74128 21.7402 10.3806 21.7402C12.0199 21.7402 13.3866 21.2767 14.4532 20.3495C15.0997 19.7785 15.5536 19.1369 15.8151 18.4247C16.0861 17.6291 16.2225 16.6827 16.2225 15.5872V9.46777H13.0625H13.0641Z" fill="black"/>
            <path d="M15.818 22.2452C15.5549 21.533 15.101 20.8914 14.4562 20.3204C13.3879 19.3933 12.0309 18.9297 10.3835 18.9297C8.73619 18.9297 7.39201 19.3933 6.32372 20.3204C5.66767 20.8914 5.20411 21.533 4.93303 22.2452C4.66997 22.882 4.54004 23.8284 4.54004 25.0828V29.2196H7.72404V26.0628H7.70159V25.1549C7.70159 22.8884 8.59504 21.756 10.3835 21.756C12.172 21.756 13.0671 22.8884 13.0671 25.1549V26.3612H16.227V25.0844C16.227 23.9888 16.0907 23.0424 15.8196 22.2468L15.818 22.2452Z" fill="black"/>
          </g>
          <defs>
            <clipPath id="clip0_5068_2210">
              <rect width="35" height="38.2931" fill="white" transform="translate(0.5 0.146484)"/>
            </clipPath>
          </defs>
        </svg></p>
      </div>
      <div>
        <p>© 2024 Exury. All rights reserved</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/styles/variables.scss";
.footer-wrapper{
  width: 100%;
  height: fit-content;
  padding: 0 16px 0 0;
  margin-top: 60px;
  .footer-top {
    padding: 14px 16px;
    background: #373f3c;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #c7d4cf;
    border-radius: 4px;
    margin-bottom: 50px;
    margin-top: 64px;
    a {
      color: $link-color;
      text-decoration: none;
    }
  }
  .footer-mid {
    display: flex;
    justify-content: space-between;
    margin-bottom: 64px;

    .btn-subscribe {
      width: 250px;
    }
    .logo-footer {
      margin-bottom: 30px;
      width: 147px;
    }
    input {
      width: 200px;
      height: 40px;
    }
    div:nth-child(1){
      width: 250px;
      p {
        margin-bottom: 5px;
      }
    }
    h2 {
      color: #E6E1E3;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      margin-bottom: 24px;
    }
    ul li {
      color: #E6E1E3;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      opacity: 0.65;
      list-style: none;
      margin-bottom: 16px;
    }
  }
  .footer-bottom {
    padding: 23px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .social-icons {
      display: flex;
      align-items: center;
      .icon {
        border: 1px solid rgba(230, 225, 227, 0.10);;
        border-radius: 50%;
        padding: 8px;
      }
      .icon.whatsapp, .icon.instagram {
        padding: 17.5px;
      }
    }
    .social-icons > * {
      margin-right: 16px;
    }
    .a-product-of {
      display: flex;
      align-items: center;
      p {
        text-align: center;
        vertical-align: middle;
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }
  }
}
@media (max-width: $screen-md) {
  .footer-wrapper{
    width: 100%;
    height: fit-content;
    padding: 0 16px;
    margin-top: 64px;
    .footer-top {
      padding: 14px 16px;
      background: #373f3c;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #c7d4cf;
      border-radius: 4px;
      margin-bottom: 50px;
      margin-top: 64px;
    }
    .footer-mid {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 64px;
      gap: 48px;
      .btn-subscribe {
        width: 100%;
        padding: 24px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo-footer {
        margin-bottom: 30px;
        width: 147px;
      }
      div:nth-child(1){
        width: 250px;
        p {
          margin-bottom: 5px;
        }
      }
      h2 {
        color: #E6E1E3;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
      }
      ul li {
        color: #E6E1E3;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        opacity: 0.65;
        list-style: none;
        margin-bottom: 16px;
      }
      .newsletter {
        margin-bottom: 25px;
      }
    }
    .footer-bottom {
      padding: 23px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 48px;
      .social-icons > * {
        margin-right: 16px;
      }
    }
  }
}
@media (max-width: $screen-sm) {
  .footer-wrapper{
    width: 100%;
    height: fit-content;
    padding: 0 16px;
    margin-top: 50px;
    .footer-top {
      padding: 14px 16px;
      background: #373f3c;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #c7d4cf;
      border-radius: 4px;
      margin-bottom: 50px;
      margin-top: 64px;
    }
    .footer-mid {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 64px;
      gap: 48px;
      .input-newsletter {
        padding: 0;
        width: fit-content;
      }

      .btn-subscribe {
        width: 100%;
        padding: 24px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo-footer {
        margin-bottom: 30px;
        width: 147px;
      }
      div:nth-child(1){
        width: 250px;
        p {
          margin-bottom: 5px;
        }
      }
      h2 {
        color: #E6E1E3;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
      }
      ul li {
        color: #E6E1E3;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        opacity: 0.65;
        list-style: none;
        margin-bottom: 16px;
      }
      .newsletter {
        margin-bottom: 25px;
      }
      input {
        min-width: 100%;
        max-width: 100%;
        width: 100%;
        margin: 0;
      }
    }
    .footer-bottom {
      padding: 23px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 48px;
      .social-icons > * {
        margin-right: 16px;
      }
    }
  }
}
</style>
<script setup lang="ts">
</script>
