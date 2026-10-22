export const revalidate = 60;

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <>
      <AnnouncementBanner
        enabled={settings?.announcementEnabled}
        text={settings?.announcementText}
        href={settings?.announcementHref}
        expiresAt={settings?.announcementExpiresAt}
      />
      <Nav
        links={settings?.navLinks}
        ctaLabel={settings?.navCtaLabel}
        ctaHref={settings?.navCtaHref}
      />
      <main>{children}</main>
      <Footer
        facebookUrl={settings?.facebookUrl ?? null}
        instagramUrl={settings?.instagramUrl ?? null}
        linkedinUrl={settings?.linkedinUrl ?? null}
        youtubeUrl={settings?.youtubeUrl ?? null}
        nextdoorUrl={settings?.nextdoorUrl ?? null}
        tagline={settings?.footerTagline}
        email={settings?.footerEmail}
        location={settings?.footerLocation}
        joinLabel={settings?.footerJoinLabel}
        columns={settings?.footerColumns}
        copyright={settings?.footerCopyright}
        bottomLinks={settings?.footerBottomLinks}
      />
    </>
  );
}
