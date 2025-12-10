function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  return Response.json({
    "accountAssociation": {
      "header": "eyJmaWQiOjEwMjQ1MjMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhjMTkwMjRCQzREQmI4Mjk3RjA2NzRhMmZBNTlkMEI0NDZBY0FCMTNhIn0",
      "payload": "eyJkb21haW4iOiJmaWlkYmFrLW1pbmktYXBwLnZlcmNlbC5hcHAifQ",
      "signature": "MHg0MjZmZGRjMzdkNDk3NTgyZmE0YmUxOTMzZWI5ZmZmOGY2OWU2ZjU2Yjg0YzZmODM3MzVkMzA4YjVkMGZlYjg5NTc0NWExZWU1MmVhN2EzNDMzZTI0N2NjN2Y0MDA1MGU4MjVkNDlmOTViMGIzNTBiOWY0NTdmNzBmZDhjNjJiMjFj"
    },
    frame: withValidProperties({
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE,
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
      screenshotUrls: [],
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON,
      splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
      tags: [],
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE,
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE,
    }),
  });
}
