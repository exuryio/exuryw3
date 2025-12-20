<script setup lang="ts">
import { submitLead, type InvestmentInterestAmount } from "@/services/submitLead";

type Props = {
  calendlyUrl: string;
};

defineProps<Props>();

const formEl = ref<HTMLFormElement | null>(null);

const name = ref("");
const email = ref("");
const phone = ref("");
const country = ref("");
const amount = ref<InvestmentInterestAmount>("10k");
const message = ref("");
const acceptedContact = ref(false);

const isSubmitting = ref(false);
const submitState = ref<"idle" | "success" | "error">("idle");
const submitMessage = ref<string>("");

const canSubmit = computed(() => {
  return (
    name.value.trim().length > 0 &&
    email.value.trim().length > 0 &&
    country.value.trim().length > 0 &&
    acceptedContact.value === true &&
    !isSubmitting.value
  );
});

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

async function onSubmit() {
  submitState.value = "idle";
  submitMessage.value = "";

  if (!name.value.trim()) {
    submitState.value = "error";
    submitMessage.value = "Por favor, indica tu nombre.";
    return;
  }
  if (!email.value.trim() || !isValidEmail(email.value)) {
    submitState.value = "error";
    submitMessage.value = "Por favor, indica un email válido.";
    return;
  }
  if (!country.value.trim()) {
    submitState.value = "error";
    submitMessage.value = "Por favor, indica tu país.";
    return;
  }
  if (!acceptedContact.value) {
    submitState.value = "error";
    submitMessage.value = "Necesitamos tu consentimiento para poder contactarte.";
    return;
  }

  try {
    isSubmitting.value = true;
    await submitLead({
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim() ? phone.value.trim() : undefined,
      country: country.value.trim(),
      amount: amount.value,
      message: message.value.trim(),
      acceptedContact: acceptedContact.value,
      source: "invest-private-round-2",
      createdAtIso: new Date().toISOString(),
    });

    submitState.value = "success";
    submitMessage.value = "Gracias. Hemos recibido tu solicitud y te contactaremos con más información.";

    // Reset but keep success visible
    name.value = "";
    email.value = "";
    phone.value = "";
    country.value = "";
    amount.value = "10k";
    message.value = "";
    acceptedContact.value = false;
  } catch (e) {
    submitState.value = "error";
    submitMessage.value = "No se pudo enviar en este momento. Inténtalo de nuevo.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-xl tracking-tight text-exury-offwhite sm:text-2xl lg:text-3xl">Solicita más información</h2>
        <p class="mt-2 text-xs leading-relaxed text-exury-offwhite/65 sm:mt-3 sm:text-sm">
          Comparte tus datos y el nivel de interés estimado. Te contactaremos con contexto adicional, el marco de la operación y los
          siguientes pasos.
        </p>

        <div class="mt-8 hidden sm:block">
          <a
            :href="calendlyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.02] px-5 py-3 text-sm font-medium text-exury-offwhite transition hover:border-white/18 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
          >
            Agenda una llamada
          </a>
        </div>
      </div>

      <div class="lg:col-span-7">
        <form
          ref="formEl"
          class="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:rounded-2xl sm:p-5 lg:p-6"
          novalidate
          @submit.prevent="onSubmit"
        >
          <div v-if="submitMessage" class="mb-5">
            <div
              class="rounded-xl border px-4 py-3 text-sm"
              :class="submitState === 'success'
                ? 'border-exury-green/30 bg-exury-green/10 text-exury-offwhite/90'
                : submitState === 'error'
                  ? 'border-red-500/30 bg-red-500/10 text-exury-offwhite/90'
                  : 'border-white/10 bg-white/[0.02] text-exury-offwhite/80'"
              role="status"
              aria-live="polite"
            >
              {{ submitMessage }}
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <label class="block text-xs text-exury-offwhite/60" for="lead-name">Nombre</label>
              <input
                id="lead-name"
                v-model="name"
                type="text"
                autocomplete="name"
                required
                class="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-exury-offwhite placeholder:text-exury-offwhite/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                placeholder="Tu nombre"
              />
            </div>

            <div class="sm:col-span-1">
              <label class="block text-xs text-exury-offwhite/60" for="lead-email">Email</label>
              <input
                id="lead-email"
                v-model="email"
                type="email"
                autocomplete="email"
                inputmode="email"
                required
                class="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-exury-offwhite placeholder:text-exury-offwhite/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                placeholder="tu@email.com"
              />
            </div>

            <div class="sm:col-span-1">
              <label class="block text-xs text-exury-offwhite/60" for="lead-phone">Teléfono (opcional)</label>
              <input
                id="lead-phone"
                v-model="phone"
                type="tel"
                autocomplete="tel"
                inputmode="tel"
                class="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-exury-offwhite placeholder:text-exury-offwhite/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                placeholder="+34..."
              />
            </div>

            <div class="sm:col-span-1">
              <label class="block text-xs text-exury-offwhite/60" for="lead-country">País</label>
              <input
                id="lead-country"
                v-model="country"
                type="text"
                autocomplete="country-name"
                required
                class="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-exury-offwhite placeholder:text-exury-offwhite/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                placeholder="España"
              />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs text-exury-offwhite/60" for="lead-amount">Monto estimado de interés</label>
              <div class="relative mt-2">
                <select
                  id="lead-amount"
                  v-model="amount"
                  class="w-full appearance-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 pr-10 text-sm text-exury-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <option value="10k">10.000 €</option>
                  <option value="15k">15.000 €</option>
                  <option value="20k">20.000 €</option>
                  <option value="25k">25.000 €</option>
                  <option value="otro">Otro monto</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-exury-offwhite/60"
                  aria-hidden="true"
                >
                  <svg
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs text-exury-offwhite/60" for="lead-message">Mensaje</label>
              <textarea
                id="lead-message"
                v-model="message"
                rows="4"
                class="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-exury-offwhite placeholder:text-exury-offwhite/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                placeholder="Cuéntanos brevemente tu interés o dudas (opcional)."
              />
            </div>
          </div>

          <div class="mt-5 flex items-start gap-3">
            <input
              id="lead-consent"
              v-model="acceptedContact"
              type="checkbox"
              class="mt-1 h-4 w-4 rounded border-white/20 bg-black/40 text-exury-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            />
            <label for="lead-consent" class="text-sm leading-relaxed text-exury-offwhite/75">
              Acepto ser contactado por Exury
            </label>
          </div>

          <p class="mt-4 text-xs leading-relaxed text-exury-offwhite/55">
            Esta comunicación es informativa y no constituye una oferta pública.
          </p>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              class="inline-flex w-full items-center justify-center rounded-xl bg-exury-green px-5 py-3 text-sm font-medium text-black shadow-exury-glow transition-all duration-200 active:scale-95 active:brightness-95 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none sm:w-auto"
              :disabled="!canSubmit"
            >
              <span v-if="!isSubmitting">Enviar</span>
              <span v-else>Enviando…</span>
            </button>

            <a
              :href="calendlyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center rounded-xl border border-white/12 bg-white/[0.02] px-5 py-3 text-sm font-medium text-exury-offwhite transition-all duration-200 active:scale-95 active:border-white/18 active:bg-white/[0.05] hover:border-white/18 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none sm:w-auto"
            >
              Agenda una llamada
            </a>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>


