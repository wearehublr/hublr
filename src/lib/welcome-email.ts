type Section = {
  title: string;
  body: string;
  url: string;
  linkLabel: string;
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildWelcomeEmail(siteUrl: string): { text: string; html: string } {
  const sections: Section[] = [
    {
      title: "1. Set up your profile and preferences",
      body: "Add your graduation year, whether you need visa sponsorship, your industries of interest, and the type of roles you want (internships, summer schemes, graduate schemes, placement years). It takes a minute, and it's what powers your weekly match digest and recommendations.",
      url: `${siteUrl}/onboarding`,
      linkLabel: "Set up your profile",
    },
    {
      title: "2. Browse and save opportunities",
      body: "Explore graduate schemes, internships and placement years across finance, consulting, law, tech and more, with eligibility and visa sponsorship details on every listing.",
      url: `${siteUrl}/opportunities`,
      linkLabel: "Browse opportunities",
    },
    {
      title: "3. Track every application in one place",
      body: "Add your applications to your dashboard and move them through stages - saved, applied, interview, offer - so nothing slips through the cracks. We'll remind you before deadlines.",
      url: `${siteUrl}/dashboard`,
      linkLabel: "Go to your dashboard",
    },
    {
      title: "4. Check out events and resources",
      body: "From employer events to interview prep guides, there's more to help you prepare beyond the opportunities themselves.",
      url: `${siteUrl}/events`,
      linkLabel: "See upcoming events",
    },
    {
      title: "5. Stay in the loop",
      body: "Make sure your email preferences are turned on so you get our weekly digest of new opportunities matched to you, plus reminders before your deadlines.",
      url: `${siteUrl}/profile`,
      linkLabel: "Check your email preferences",
    },
    {
      title: "6. Sign up to our newsletter",
      body: "Extra tips, sponsorship guidance and updates, straight to your inbox.",
      url: "https://wearehublr.beehiiv.com/?utm_source=welcome_email&utm_medium=email&utm_campaign=welcome",
      linkLabel: "Sign up to the newsletter",
    },
  ];

  const text = [
    "Welcome to Hublr - you're in.",
    "",
    "Here's how to get the most out of it:",
    "",
    ...sections.flatMap((s) => [s.title, s.body, s.url, ""]),
    "Questions? Just reply to this email.",
    "",
    "Welcome aboard,",
    "The Hublr team",
  ].join("\n");

  const html = `
<div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1B1F1D; max-width: 560px;">
  <p>Welcome to Hublr - you're in.</p>
  <p>Here's how to get the most out of it:</p>
  ${sections
    .map(
      (s) => `
  <p style="margin: 20px 0;">
    <strong>${escapeHtml(s.title)}</strong><br>
    ${escapeHtml(s.body)}<br>
    <a href="${s.url}" style="color: #1F6F5C;">${escapeHtml(s.linkLabel)}</a>
  </p>`,
    )
    .join("")}
  <p>Questions? Just reply to this email.</p>
  <p>Welcome aboard,<br>The Hublr team</p>
</div>`.trim();

  return { text, html };
}
