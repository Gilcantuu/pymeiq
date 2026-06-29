// PymeIQ Advisor — rules-based chatbot logic.
// All pure functions. No LLM. Deterministic for the same inputs.

export const INTAKE_QUESTIONS = [
  {
    step: 1,
    text:
      "Hi, I'll help you pick the right PymeIQ module in three short questions. First, what's your business name?",
  },
  {
    step: 2,
    text: "Good. What industry are you in? (retail, services, manufacturing, distribution, or other)",
  },
  {
    step: 3,
    text:
      "Last one. What's the biggest thing you're trying to fix this quarter? (pricing, competition, strategy, or growth)",
  },
];

export const GUARDRAIL_REGEX = /legal|invest|invertir|abogad|attorney|lawyer|medical|medico|tax|impuest/i;

export const GUARDRAIL_TEXT =
  "I can only help with running a small business on PymeIQ. For that kind of question, please talk to a licensed professional. Want me to connect you with the founder for a 15-minute call?";

export const HUMAN_CHECKPOINT = {
  kind: "checkpoint",
  title: "Talk to Gilberto Cantu (founder, PymeIQ)",
  body: "If you want a person to walk you through the diagnostic, book a 15-minute call.",
  cta: "Book a call",
  href: "mailto:gilcantuarmas1@gmail.com?subject=PymeIQ%20call%20request",
};

// Map the third answer (pain) to a recommended module.
export function recommend(painText) {
  const t = (painText || "").toLowerCase();
  if (/pric|cost|margin|cobrar|precio|tarifa|cotiz/i.test(t)) {
    return {
      module: "Pricing simulator",
      href: "/pricing",
      reason:
        "Three tiers, two segments, live MRR / ARR calculator with saved scenarios you can show to a customer.",
    };
  }
  if (/compet|benchmark|market|riv|comparar|comparison|mercado/i.test(t)) {
    return {
      module: "Research dashboard",
      href: "/research",
      reason:
        "Three competitors, three KPIs, an overall score from 0 to 100 so you can defend a positioning decision.",
    };
  }
  return {
    module: "SWOT diagnose",
    href: "/core",
    reason:
      "Start with a 10-minute SWOT so the strategy work has a real baseline. You can re-run it monthly.",
  };
}

// Build the next bot message based on the current step and the user input.
// Returns { reply, nextStep, intakeDelta }.
export function nextBotMessage(step, userInput, intake) {
  const trimmed = (userInput || "").trim();
  if (step === 1) {
    return {
      reply: { role: "bot", kind: "text", text: `Nice. Welcome, ${trimmed}. ${INTAKE_QUESTIONS[1].text}` },
      nextStep: 2,
      intakeDelta: { business_name: trimmed },
    };
  }
  if (step === 2) {
    return {
      reply: { role: "bot", kind: "text", text: `Got it — ${trimmed}. ${INTAKE_QUESTIONS[2].text}` },
      nextStep: 3,
      intakeDelta: { industry: trimmed },
    };
  }
  if (step === 3) {
    const r = recommend(trimmed);
    return {
      reply: {
        role: "bot",
        kind: "recommendation",
        text: `Based on what you said, my recommendation is the ${r.module}.`,
        href: r.href,
        ctaLabel: `Open ${r.href}`,
        reason: r.reason,
      },
      nextStep: 4,
      intakeDelta: { pain: trimmed, recommendation: r.href },
    };
  }
  // step >= 4: free-form follow-up
  if (GUARDRAIL_REGEX.test(trimmed)) {
    return {
      reply: { role: "bot", kind: "guardrail", text: GUARDRAIL_TEXT },
      nextStep: step,
      intakeDelta: {},
    };
  }
  // Generic helpful response + invite to checkpoint.
  return {
    reply: {
      role: "bot",
      kind: "text",
      text:
        "I'm a rules-based assistant, so my answers are short. Try the recommended module above, or hit 'Talk to founder' for a deeper conversation.",
    },
    nextStep: step,
    intakeDelta: {},
  };
}

// Initial greeting message used when the page mounts.
export const INITIAL_MESSAGES = [
  { role: "bot", kind: "text", text: INTAKE_QUESTIONS[0].text },
];

export function isGuardrail(text) {
  return GUARDRAIL_REGEX.test(text || "");
}
