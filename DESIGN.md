# DESIGN.md — CyberGuard AI

## 1. Product and Experience

**Product:** CyberGuard AI  
**Category:** Edukasi & Riset  
**Tagline:** Think Before You Click.  
**Interface language:** Bahasa Indonesia  
**Audience:** Students and everyday internet users learning to recognize phishing and social engineering.

CyberGuard AI should feel like a trustworthy digital-safety learning product, not a hacker movie dashboard. The experience should be calm, credible, approachable, and practical. Help users understand *why* a message is suspicious instead of frightening them with dramatic threat graphics.

## 2. Visual Direction

- Use a polished, light-first interface with a strong editorial hierarchy.
- Build a recognizable security-learning identity using deep navy ink, clean off-white surfaces, and a restrained teal accent.
- Use red and amber only for meaningful risk and warning states; green for safer guidance or successful quiz feedback.
- Avoid cliché neon-green-on-black hacker visuals, excessive gradients, glassmorphism everywhere, glowing borders, and generic AI landing-page layouts.
- Use real spacing, clear grouping, deliberate asymmetry where appropriate, and strong readable typography.
- Use one consistent sans-serif family. Prefer Plus Jakarta Sans or Inter if available and licensed/loaded appropriately; do not introduce extra font families without a reason.
- Default to light mode. Do not add a dark-mode toggle unless approved.

## 3. Suggested Design Tokens

These are initial direction tokens. The generated Stitch design may refine them, but document any material changes before implementation.

```css
:root {
  --color-canvas: #F7F9FC;
  --color-surface: #FFFFFF;
  --color-surface-muted: #EEF3F8;
  --color-ink: #152238;
  --color-ink-muted: #5D6B80;
  --color-hairline: #DCE4ED;
  --color-brand: #176B68;
  --color-brand-hover: #105653;
  --color-brand-soft: #E2F3F0;
  --color-risk-high: #B93838;
  --color-risk-high-soft: #FDECEC;
  --color-risk-medium: #9A5B08;
  --color-risk-medium-soft: #FFF3D8;
  --color-risk-low: #24734A;
  --color-risk-low-soft: #E6F6EC;
  --radius-card: 16px;
  --radius-control: 10px;
}
```

Use semantic tokens rather than scattering raw color values across components. Maintain accessible text contrast and visible keyboard focus states.

## 4. Typography and Layout

- Use a clear, modern sans-serif family consistently.
- Hero heading should be confident and concise, with a readable line length.
- Body copy should be plain Indonesian, avoiding jargon unless explained.
- Desktop: centered content container around 1120–1240px; use a balanced two-column layout only when it improves comprehension.
- Mobile: single-column flow, touch-friendly controls, no horizontal overflow, and readable analysis cards.
- Keep spacing systematic, with enough whitespace around analysis results and quiz feedback.
- Use responsive layouts rather than shrinking desktop UI into a phone viewport.

## 5. Screen Requirements

### A. Home / Learning Dashboard
Purpose: explain the product and help the user start learning quickly.

Required content:
- Brand and simple navigation.
- Hero headline explaining the benefit in plain Indonesian.
- Primary CTA: **Analisis Pesan**.
- Secondary CTA: **Mulai Kuis**.
- A concise three-step explanation: paste a suspicious message, review the indicators, learn a safer next step.
- A small learning section covering common warning signs such as urgency, requests for OTP/passwords, suspicious sender identity, and unexpected rewards.
- Trust note explaining that results are educational estimates, not a guarantee.

Avoid fake statistics, fabricated user counts, and unverified claims about detection accuracy.

### B. Suspicious-message Analyzer
Purpose: let users examine message text and learn from its warning signs.

Required content:
- Clearly labeled multiline input.
- Example-message action using a fictional, harmless sample.
- Character limit and helpful input guidance.
- Analyze button with disabled/loading states.
- Result area with risk level, short summary, evidence-based warning indicators, plain-language explanation, and recommended next steps.
- Error state with retry guidance and empty state before analysis.
- Safety reminder: never paste passwords, OTPs, recovery codes, or private personal data.

Risk levels should be presented as estimates. Do not use a single color alone to communicate risk; include text and accessible icons/labels.

### C. Interactive Cyber Quiz
Purpose: turn the lesson into active practice.

Required content:
- One scenario/question at a time.
- Clear answer options and selected state.
- Immediate feedback explaining why the answer is safer or riskier.
- Progress indicator and final score.
- Restart action and a short learning summary.
- Keyboard-accessible controls and mobile-friendly tap targets.

Use fictional scenarios with no live phishing links or real personal information.

## 6. Components and Interaction

Expected reusable components may include:
- `AppShell`, `Header`, `PrimaryButton`, `SectionHeading`
- `RiskBadge`, `WarningIndicator`, `AnalysisResult`, `SafetyNotice`
- `MessageInput`, `LoadingState`, `ErrorState`, `EmptyState`
- `QuizQuestion`, `AnswerOption`, `QuizProgress`, `QuizSummary`

Component names are suggestions, not a mandate to create every component as a separate file. Keep the implementation appropriately sized for the MVP.

Interactions must have real behavior. Avoid decorative buttons, fake links, nonfunctional navigation, and animations that delay the task. Use subtle transitions for focus, hover, and result changes. Respect reduced-motion preferences.

## 7. Visual Assets and Icons

- Prefer purposeful UI diagrams, small illustrations, or bespoke SVGs that explain a security concept.
- Use Lucide React consistently if available.
- Do not use random stock photos of hooded hackers, fake terminal screenshots, or decorative imagery that adds no explanatory value.
- Do not invent partner logos, certification badges, security seals, or institutional endorsements.
- If Stitch generates assets, inspect and document them before implementation according to the repository's approval gates.

## 8. Accessibility and Responsive Quality

- Semantic HTML, labeled form controls, keyboard navigation, visible focus indicators, and appropriate ARIA only where needed.
- Risk information must remain understandable without color.
- Meet WCAG AA contrast where practical.
- Test narrow mobile widths, tablet, and desktop.
- Provide loading, error, empty, and success states for asynchronous features.

## 9. Stitch Workflow

The Google Stitch design must be generated through the configured Stitch MCP, as required by the hackathon. Do not substitute a manually coded mockup for the required Stitch workflow.

Before calling Stitch, obtain explicit approval for the functional specification and this design direction. After generating screens, show them to the user and wait for approval before implementation. Record actual Stitch project/screen identifiers and asset locations only when they are returned by the tool. Never fabricate successful MCP execution.