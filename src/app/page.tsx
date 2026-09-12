import HomePage from "@/components/HomePage";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function Page() {
  return (
    <>
      {/* Crawlable copy — HomePage is client-driven motion */}
      <header className="sr-only">
        <h1>
          {SITE_NAME} — {SITE_TAGLINE}
        </h1>
        <p>{SITE_DESCRIPTION}</p>
        <p>
          Hourcess is an upcoming iOS app for people who keep scrolling. It notices the pattern and
          offers one real-world alternative — football, friends, movement — without shaming you.
          Join the iOS TestFlight beta — request an invite.
        </p>
      </header>
      <HomePage />
    </>
  );
}
