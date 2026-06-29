# /chat — PymeIQ Advisor

Rules-based public chatbot. No LLM. Labeled clearly in the UI banner.

## Flow

1. Greeting + intake question 1 (business name)
2. Intake question 2 (industry)
3. Intake question 3 (biggest pain)
4. Recommendation card linking to the right module:
   - pain matches `/pric|cost|margin/i` → `/pricing`
   - pain matches `/compet|benchmark|market/i` → `/research`
   - otherwise → `/core`
5. Free-form follow-up (one turn) with guardrail on out-of-scope keywords
6. Thumbs up/down rating
7. Save transcript to Supabase `chat_sessions` (jsonb)

## Files

- `app/chat/page.js` — UI client component
- `lib/advisorBot.js` — pure bot functions (recommend, nextBotMessage, isGuardrail)
- `supabase/setup.sql` — `chat_sessions` table

## Why rules-based

Course rule: simulated AI must be labeled. The brief says no paid APIs.
A real LLM would be more flexible but would also hide the cost constraint behind
a fake-magic experience. The label is intentional and tested as a trust signal.