import { LegalPage, Bullet } from "@/components/aeo/legal-page";

export const metadata = {
  title: "Privacy Policy — AEOScope",
  description:
    "How AEOScope handles your data when you run an AEO visibility analysis.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      description="Last updated: January 2025. This policy explains what data AEOScope collects, how it's used, and the choices you have."
    >
      <h2>1. Information we collect</h2>
      <p>
        When you run an analysis, AEOScope receives the inputs you provide: a brand name, an
        optional brand website, and an optional description/query. These are sent to our backend
        to generate the analysis. We do not require an account and we do not collect personal
        identifying information for the free analyzer.
      </p>

      <h2>2. How we use your data</h2>
      <ul>
        <Bullet>To generate the AEO visibility analysis you requested</Bullet>
        <Bullet>To query the underlying AI models that produce the answers</Bullet>
        <Bullet>To display results in your browser session</Bullet>
      </ul>
      <p>
        We do not use your analysis inputs to train models, sell to third parties, or build
        advertising profiles.
      </p>

      <h2>3. Data storage and retention</h2>
      <p>
        Analysis inputs and results are processed in your current browser session and are not
        persisted to a database by the free analyzer. If you contact us or purchase a paid audit,
        we retain the information you share for as long as needed to deliver the service and
        respond to your request.
      </p>

      <h2>4. Third-party services</h2>
      <p>
        AEOScope uses a large language model backend (z-ai-web-dev-sdk) to generate the AI answers
        and perform sentiment analysis. Your brand name, website, and description are sent to
        this backend to produce your analysis. We do not share your data with advertising or
        analytics networks.
      </p>

      <h2>5. Cookies</h2>
      <p>
        The free analyzer does not use tracking cookies. The site may use essential technical
        storage required to function (such as remembering your theme preference).
      </p>

      <h2>6. Your rights</h2>
      <p>
        You can run the analyzer without providing any personal information. If you have
        contacted us and want your information deleted, email us at{" "}
        <a href="mailto:hello@idilsh.top" className="font-semibold text-primary hover:underline">
          hello@idilsh.top
        </a>{" "}
        and we will remove it.
      </p>

      <h2>7. Children&apos;s privacy</h2>
      <p>
        AEOScope is not directed at children under 13 and we do not knowingly collect information
        from them.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy as the product evolves. Material changes will be reflected by
        updating the &quot;last updated&quot; date at the top of this page.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about privacy? Reach us via the{" "}
        <a href="/contact" className="font-semibold text-primary hover:underline">contact page</a>{" "}
        or email{" "}
        <a href="mailto:hello@idilsh.top" className="font-semibold text-primary hover:underline">
          hello@idilsh.top
        </a>.
      </p>
    </LegalPage>
  );
}
