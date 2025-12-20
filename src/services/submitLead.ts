export type InvestmentInterestAmount = "10k" | "15k" | "20k" | "25k" | "otro";

export type InvestmentLead = {
  name: string;
  email: string;
  phone?: string;
  country: string;
  amount: InvestmentInterestAmount;
  message: string;
  acceptedContact: boolean;
  source: "invest-private-round-2";
  createdAtIso: string;
};

/**
 * Submit investment lead to email via FormSubmit (free, no backend required).
 * 
 * Uses VITE_INVEST_LEADS_EMAIL environment variable for recipient email.
 * Falls back to console.log in development if email is not configured.
 */
export async function submitLead(lead: InvestmentLead): Promise<void> {
  const recipientEmail = import.meta.env.VITE_INVEST_LEADS_EMAIL;

  // If no email configured, log to console (development mode)
  if (!recipientEmail || recipientEmail.trim() === "") {
    // eslint-disable-next-line no-console
    console.warn(
      "[submitLead] VITE_INVEST_LEADS_EMAIL not set. Lead data (not sent):",
      lead
    );
    // Simulate latency for UX
    await new Promise((r) => setTimeout(r, 900));
    return;
  }

  // Format email body for FormSubmit
  const emailBody = `
Nueva solicitud de información - Ronda de Inversión Privada

Nombre: ${lead.name}
Email: ${lead.email}
${lead.phone ? `Teléfono: ${lead.phone}` : ""}
País: ${lead.country}
Monto estimado de interés: ${lead.amount}
${lead.message ? `\nMensaje:\n${lead.message}` : ""}

Consentimiento: ${lead.acceptedContact ? "Sí" : "No"}
Fuente: ${lead.source}
Fecha: ${new Date(lead.createdAtIso).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}
  `.trim();

  try {
    // FormSubmit AJAX endpoint: https://formsubmit.co/ajax/{email}
    const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail.trim())}`;

    const formData = new FormData();
    formData.append("name", lead.name);
    formData.append("email", lead.email);
    formData.append("_subject", `Nueva solicitud de inversión - ${lead.name}`);
    formData.append("_template", "box");
    formData.append("message", emailBody);
    // Prevent FormSubmit from showing default success page
    formData.append("_next", window.location.origin + window.location.pathname);
    // Prevent spam
    formData.append("_captcha", "false");

    const response = await fetch(formSubmitUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`FormSubmit error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    
    // FormSubmit returns { success: true } on success
    if (!result.success) {
      throw new Error("FormSubmit returned unsuccessful response");
    }

    // eslint-disable-next-line no-console
    console.log("[submitLead] Lead submitted successfully to:", recipientEmail);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[submitLead] Failed to submit lead:", error);
    throw error;
  }
}


