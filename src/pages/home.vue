<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CoinGroupModel from "@/components/coin/CoinGroupModel.vue";
import PriceSimulatorInline from "@/components/PriceSimulatorInline.vue";
// Removed unused import

const router = useRouter();
const email = ref('');

const handleSignup = () => {
  // Always redirect to register page
  // If email is provided, pass it as query parameter
  if (email.value && email.value.trim()) {
    router.push({
      path: '/register',
      query: { email: email.value.trim() }
    });
  } else {
    // Redirect to register page even without email
    router.push('/register');
  }
};
</script>
<template>
  <div class="home-wrapper">

    <div class="main-content">
      <div class="coins-wrapper">
        <CoinGroupModel></CoinGroupModel>
      </div>

      <div class="home-layout">
        <!-- Left Content -->
        <div class="content-wrapper">

        <div class="title-wrapper">
          <!-- Trust Badge / Social Proof -->
          <div class="trust-badge">
            <v-icon color="#1cba75" size="16">mdi-shield-check</v-icon>
            <span>VASP Regulado en la UE</span>
          </div>
          
          <!-- Main Headline (Short, direct, pain-focused) -->
          <h1 class="title-top">
            Sin esperas.<br />
            Sin comisiones ocultas.
          </h1>
          
          <!-- Value Proposition Subheadline -->
          <h2 class="title-accent">
            Cambia euros por cripto en segundos<br />
            vía transferencia bancaria SEPA Instant.
          </h2>
        </div>
        
        <!-- Email Signup CTA (Like Coinbase/Kraken/Binance) - PRIMARY ACTION - Right after headline -->
        <div class="cta-section">
          <div class="cta-wrapper">
            <v-text-field
              v-model="email"
              type="email"
              placeholder="tu@email.com"
              variant="outlined"
              density="comfortable"
              hide-details
              class="email-input"
              @keyup.enter="handleSignup"
            />
            <v-btn
              color="primary"
              size="large"
              class="signup-btn"
              @click="handleSignup"
            >
              Empieza ahora
            </v-btn>
          </div>
          
          <!-- Social Proof / Trust - Below CTA (Like Kraken) -->
          <p class="pain-hook">
            Miles de usuarios confían en Exury.
          </p>
        </div>
        
        <!-- Key Benefits (Pain-focused, direct communication) -->
        <div class="benefits-list">
          <div class="benefit-item highlight">
            <v-icon color="#1cba75" size="18">mdi-lightning-bolt</v-icon>
            <span>SEPA Instant</span>
          </div>
          <div class="benefit-item highlight">
            <v-icon color="#1cba75" size="18">mdi-shield-check</v-icon>
            <span>Tú controlas tus fondos</span>
          </div>
          <div class="benefit-item highlight">
            <v-icon color="#1cba75" size="18">mdi-cash-multiple</v-icon>
            <span>Mínimo 0.5%</span>
          </div>
          <div class="benefit-item highlight">
            <v-icon color="#1cba75" size="18">mdi-chart-line</v-icon>
            <span>Mejor precio</span>
          </div>
        </div>
        
        </div>

        <!-- Right Price Simulator - Always Visible -->
        <div class="simulator-wrapper">
          <PriceSimulatorInline />
        </div>
      </div>

      <div class="sponsorship-wrapper">
        <img
          class="sponsor-left"
          alt=""
          src="/EN_Funded_by_European_Union_vert_RGB_NEG.png"
        />
        <img class="sponsor-right" alt="" src="/iconoblack.png" style="opacity: 0.01;" />
      </div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.home-wrapper {
  margin: 0 !important;
  height: fit-content;
  box-sizing: border-box;
  gap: 32px;
  z-index: 1;
  font-size: 64px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  .main-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    padding: clamp(16px, 3vw, 24px) clamp(16px, 5%, 80px) 0 clamp(16px, 5%, 80px);
    overflow-x: hidden;
    box-sizing: border-box;

    .home-layout {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      max-width: 100%;
      gap: clamp(32px, 5vw, 64px);
      margin-top: 0;
      z-index: 2;
      overflow-x: hidden;
      overflow-y: visible;
      padding-left: clamp(0px, 2vw, 20px);
      box-sizing: border-box;
    }

    .simulator-wrapper {
      flex: 0 0 auto;
      width: clamp(320px, 30vw, 420px);
      min-width: 320px;
      z-index: 10;
      position: sticky;
      top: clamp(60px, 8vw, 100px);
      align-self: flex-start;
    }

    .content-wrapper {
      flex: 1;
      max-height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: start;
      min-width: 0; // Prevents flex item from overflowing
      width: 100%;
      overflow: visible;
        .title-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: start;
          width: 100%;
          max-width: 550px;
          margin-bottom: clamp(16px, 2.5vw, 24px);
          
          .trust-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: clamp(5px, 0.8vw, 8px) clamp(12px, 1.5vw, 16px);
            background: rgba(28, 186, 117, 0.15);
            border: 1px solid rgba(28, 186, 117, 0.3);
            border-radius: 20px;
            margin-bottom: clamp(12px, 2vw, 18px);
            
            span {
              font-size: clamp(11px, 1.2vw, 14px);
              font-weight: 600;
              color: #1cba75;
              letter-spacing: 0.3px;
            }
          }
          
        
        .title-top {
          margin: 0;
          padding: 0;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -1px;
          color: #ffffff;
          margin-bottom: clamp(12px, 2vw, 18px);
          width: 100%;
        }
        
        .title-accent {
          margin: 0;
          padding: 0;
          font-size: clamp(18px, 2.5vw, 28px);
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -0.2px;
          color: #1cba75;
          width: 100%;
          max-width: 550px;
          margin-bottom: 0;
          word-break: normal;
          white-space: pre-line;
          overflow-wrap: break-word;
          display: block;
        }
      }
      
      .benefits-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: clamp(8px, 1.5vw, 12px);
        margin-bottom: clamp(20px, 3vw, 32px);
        margin-top: clamp(12px, 2vw, 18px);
        width: 100%;
        max-width: 600px;
        min-height: auto;
        overflow: visible;
        
        .benefit-item {
          display: flex !important;
          align-items: center;
          gap: clamp(6px, 1vw, 10px);
          font-size: clamp(13px, 1.5vw, 14px);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
          visibility: visible !important;
          opacity: 1 !important;
          
          &.highlight {
            padding: clamp(8px, 1.2vw, 12px) clamp(10px, 1.5vw, 14px);
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            border-left: 3px solid #1cba75;
          }
        }
      }
      
      .trust-indicators {
        display: flex;
        gap: 24px;
        margin-bottom: 24px;
        padding: 16px 0;
        width: 100%;
        max-width: 600px;
        justify-content: flex-start;
        flex-wrap: wrap;
        
        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }
      }
      
      .paragraph-wrapper {
        width: 100%;
        max-width: 600px;
        position: relative;
        margin-bottom: 32px;
        z-index: 2;
        
        .description-text {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.7;
          letter-spacing: 0.2px;
          color: rgba(255, 255, 255, 0.8);
        }
      }
      
      .cta-section {
        width: 100% !important;
        max-width: 100% !important;
        margin-bottom: clamp(16px, 2.5vw, 24px) !important;
        margin-top: clamp(16px, 2.5vw, 24px) !important;
        z-index: 100 !important;
        position: relative !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        overflow: visible !important;
        
        .cta-wrapper {
          display: flex;
          gap: clamp(8px, 1.5vw, 12px);
          margin-bottom: clamp(12px, 2vw, 16px);
          width: 100%;
          align-items: stretch;
          flex-wrap: nowrap;
          min-width: 0;
          
          .email-input {
            flex: 1 1 auto;
            min-width: 200px;
            max-width: 100%;
            
            :deep(.v-field) {
              background: rgba(255, 255, 255, 1) !important;
              border: 1px solid rgba(255, 255, 255, 0.2) !important;
              border-radius: 8px !important;
              height: 56px;
              width: 100%;
              
              &:focus-within {
                border-color: #1cba75 !important;
                box-shadow: 0 0 0 2px rgba(28, 186, 117, 0.15) !important;
              }
              
              input {
                color: #1a1a1a !important;
                font-size: 16px;
                font-weight: 400;
                width: 100%;
              }
              
              .v-field__input {
                padding: 0 20px !important;
                height: 56px;
                display: flex;
                align-items: center;
                width: 100%;
              }
            }
            
            :deep(input::placeholder) {
              color: rgba(0, 0, 0, 0.4) !important;
              font-weight: 400;
            }
          }
          
          .signup-btn {
            background: #1cba75 !important;
            color: white !important;
            font-weight: 600;
            font-size: 16px;
            padding: 0 32px !important;
            height: 56px !important;
            text-transform: none;
            min-width: 180px !important;
            max-width: none !important;
            flex-shrink: 0;
            border-radius: 8px !important;
            box-shadow: none !important;
            letter-spacing: 0.2px;
            transition: all 0.2s ease;
            white-space: nowrap;
            
            &:hover {
              background: #1dd689 !important;
              box-shadow: 0 4px 12px rgba(28, 186, 117, 0.3) !important;
            }
            
            &:active {
              transform: scale(0.98);
            }
          }
        }
        
        .pain-hook {
          margin: 0;
          padding: 0;
          font-size: clamp(12px, 1.5vw, 15px);
          font-weight: 300;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
          font-style: italic;
          opacity: 0.7;
          margin-top: clamp(6px, 1.2vw, 10px);
        }
      }
      
      .trust-indicators {
        display: flex;
        gap: 24px;
        margin-top: 24px;
        padding: 16px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;
        max-width: 600px;
        justify-content: center;
        flex-wrap: wrap;
        
        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
    .sponsorship-wrapper {
      padding-top: 95px;
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 32px;
      z-index: 2;
      text-align: center;
      color: #fff;
      .sponsor-left {
        width: 124px;
        position: relative;
        height: 104px;
        object-fit: cover;
        filter: brightness(1000%);
      }
      .sponsor-right {
        width: 220px;
        position: relative;
        height: 48.6px;
        object-fit: cover;
      }
    }
  }

}

.image-coins {
  width: 622.1px;
  max-width: 100%;
  position: absolute;
  margin: 0 !important;
  top: -50px;
  right: 0;
  height: 623px;
  object-fit: cover;
  z-index: 0;
  
  @media (max-width: 1400px) {
    right: -100px;
    opacity: 0.3;
  }
  
  @media (max-width: 1200px) {
    display: none;
  }
}

.frameParent {
  align-self: stretch;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
  gap: 32px;
  z-index: 1;
  background: green;
  box-sizing: border-box;
  overflow-x: hidden;
}
.stateLayer13 {
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
}
.labelText {
  position: relative;
  letter-spacing: 0.1px;
  line-height: 20px;
  font-weight: 500;
}
.coins-wrapper {
  position: absolute;
  top: -80px;
  right: 50px;
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
}
.title-top-space {
  height: 15dvh;
}
@media (max-width: $screen-md) {
  .home-wrapper {
    min-height: 100%;
    height: fit-content;
    max-height: fit-content;
    width: 100%;
    justify-content: start;
    .main-content {
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: clamp(16px, 3vw, 24px) 16px 0 16px;
      
      .home-layout {
        flex-direction: column;
        gap: clamp(24px, 4vw, 40px);
        margin-top: 0;
        align-items: center;
      }

      .content-wrapper {
        order: 1; // Show copy and CTA first on mobile
        width: 100%;
        align-items: center;
        text-align: center;
        position: relative;
        margin-top: 0;
        top: 0;
      }
      
      .simulator-wrapper {
        width: 100%;
        max-width: 420px;
        min-width: 100%;
        order: 2; // Show simulator second on mobile
        position: relative;
        top: 0;
        align-self: center;
      }
      
      .coins-wrapper {
        order: 3; // Show coin animations last on mobile
        position: relative;
        top: -100px;
        right: 50px;
        width: fit-content;
        height: fit-content;
      }
      
      .content-wrapper {
        .title-wrapper {
          padding: 0;
          width: 100%;
          margin-top: 0;
          margin-bottom: clamp(16px, 3vw, 24px);
          align-items: center;
          text-align: center;
          
          .trust-badge {
            margin-bottom: clamp(10px, 2vw, 14px);
            
            span {
              font-size: clamp(11px, 1.2vw, 13px);
            }
          }
            
            .title-top {
              width: 100%;
              font-size: clamp(32px, 6vw, 40px);
              font-weight: 700;
              line-height: 1.15;
              letter-spacing: -0.5px;
              margin-bottom: clamp(10px, 2vw, 14px);
            }
            
            .title-accent {
              width: 100%;
              font-size: clamp(18px, 3.5vw, 24px);
              font-weight: 600;
              line-height: 1.3;
              letter-spacing: -0.2px;
              margin-bottom: 0;
              max-width: 100%;
            }
          }
          
          .cta-section {
            width: 100% !important;
            max-width: 100% !important;
            margin: clamp(16px, 3vw, 24px) 0 clamp(16px, 3vw, 24px) 0 !important;
            padding: 0 !important;
            
            .cta-wrapper {
              flex-direction: column !important;
              gap: clamp(10px, 2vw, 14px) !important;
              width: 100% !important;
              
              .email-input {
                width: 100% !important;
                
                :deep(.v-field) {
                  background: rgba(255, 255, 255, 1) !important;
                  height: clamp(48px, 6vw, 56px);
                  
                  .v-field__input {
                    height: clamp(48px, 6vw, 56px);
                  }
                }
              }
              
              .signup-btn {
                width: 100% !important;
                font-size: clamp(15px, 2vw, 16px) !important;
                height: clamp(48px, 6vw, 56px) !important;
                min-width: 100% !important;
                padding: 0 clamp(20px, 3vw, 32px) !important;
              }
            }
            
            .pain-hook {
              font-size: clamp(11px, 2vw, 14px) !important;
              opacity: 0.6 !important;
              text-align: center !important;
            }
          }
        
        .benefits-list {
          padding: 0;
          margin-bottom: clamp(20px, 3vw, 28px);
          margin-top: clamp(12px, 2vw, 18px);
          grid-template-columns: 1fr;
          gap: clamp(8px, 1.5vw, 12px);
          
          .benefit-item {
            text-align: left;
            font-size: clamp(12px, 1.8vw, 14px);
            gap: clamp(6px, 1vw, 10px);
            
            &.highlight {
              padding: clamp(8px, 1.2vw, 12px) clamp(10px, 1.5vw, 14px);
            }
          }
        }
        
        .trust-indicators {
          padding: 0 16px;
          gap: 16px;
          justify-content: center;
          
          .trust-item {
            font-size: 12px;
          }
        }
        
        .paragraph-wrapper {
          margin-top: 16px;
          width: 100%;
          padding: 0 16px;
          margin-bottom: 24px;
          
          .description-text {
            font-size: 15px;
            font-weight: 400;
            line-height: 1.6;
            letter-spacing: 0.1px;
            text-align: center;
          }
        }
      }
      .sponsorship-wrapper {
        margin-top: 0;
        position: relative;
        top: calc(-40% + 50px);
        display: flex;
        justify-content: start;
        padding: 0 0 0 28px;
        .sponsor-left{
          width: 80px;
        }
        .sponsor-right {
          width: 150px;
        }
      }
    }
  }
}

@media (max-width: $screen-xs) {
  .home-wrapper {
    .main-content {
      .coins-wrapper {
        top: -120px;
      }
      .content-wrapper {
        top: -150px;
      }
      .sponsorship-wrapper{
        margin-top: -200px;
      }
    }
  }
}
</style>