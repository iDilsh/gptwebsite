import { LegalPage, Bullet } from "@/components/aeo/legal-page";

export const metadata = {
  title: "Privacy Policy — Free AEO",
  description:
    "Learn how Free AEO handles analysis data, AI visibility reports, and user privacy when using the free AEO visibility checker.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      description="Last updated: June 2026. This Privacy Policy explains what information Free AEO (aeotool.top) collects, how it is used, and the choices available to users."
    >
      <h2>1. Information we collect</h2>
      <p>
        Free AEO (aeotool.top) is designed to provide AI visibility analysis without requiring
        user registration. When you run an analysis, we receive the information you voluntarily
        provide, including your brand name, website URL, and optional query or description.
      </p>

      <p>
        The free analyzer does not require accounts, passwords, or personal profile information.
        Unless you intentionally provide personal details through our contact forms or paid
        services, we do not collect personally identifiable information.
      </p>

      <h2>2. How we use your data</h2>
      <ul>
        <Bullet>To generate the AEO visibility analysis you request</Bullet>
        <Bullet>To query supported AI models and answer engines</Bullet>
        <Bullet>To calculate visibility scores and sentiment insights</Bullet>
        <Bullet>To display results during your current browser session</Bullet>
        <Bullet>To respond to support requests and paid service inquiries</Bullet>
      </ul>

      <p>
        Free AEO does not sell user information, create advertising profiles, or use submitted
        analysis data for marketing purposes.
      </p>

      <h2>3. Data storage and retention</h2>
      <p>
        The free AEO visibility checker is designed with minimal data retention. Analysis inputs
        and generated results are processed for the requested analysis and are not permanently
        stored by the free analyzer.
      </p>

      <p>
        Information submitted through contact requests, audit purchases, or service inquiries may
        be retained only for the time necessary to provide support, fulfill services, maintain
        records, or comply with applicable legal obligations.
      </p>

      <h2>4. Third-party services</h2>
      <p>
        Free AEO relies on external AI infrastructure and technology providers to process analysis
        requests and generate AI visibility reports. Depending on availability, analysis requests
        may be routed through supported AI model providers and APIs.
      </p>

      <p>
        Information required to perform an analysis, such as your brand name, website address,
        and query, may be transmitted securely to these providers solely for generating the
        requested results.
      </p>

      <p>
        We do not share user data with advertising networks or sell information to third parties.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Free AEO does not use advertising cookies or behavioral tracking technologies. Limited
        browser storage or essential cookies may be used to support core website functionality,
        such as interface preferences and theme settings.
      </p>

      <h2>6. Your rights</h2>
      <p>
        You may use the free analyzer without creating an account. If you previously contacted us
        or submitted information related to a paid service and wish to request deletion of that
        information, you may contact us at{" "}
        <a
          href="mailto:hello@idilsh.top"
          className="font-semibold text-primary hover:underline"
        >
          hello@idilsh.top
        </a>
        .
      </p>

      <p>
        Subject to applicable laws, we will review and process reasonable privacy-related requests.
      </p>

      <h2>7. Children&apos;s privacy</h2>
      <p>
        Free AEO is intended for business owners, marketers, agencies, and website operators.
        The service is not directed toward children under the age of 13, and we do not knowingly
        collect personal information from children.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time as Free AEO evolves, introduces new
        features, or adjusts its services. Any material changes will be reflected by updating the
        "Last updated" date shown at the top of this page.
      </p>

      <h2>9. Contact</h2>
      <p>
        If you have questions regarding this Privacy Policy, AI visibility reports, Answer Engine
        Optimization services, or your information, please visit our{" "}
        <a
          href="/contact"
          className="font-semibold text-primary hover:underline"
        >
          contact page
        </a>{" "}
        or email{" "}
        <a
          href="mailto:hello@idilsh.top"
          className="font-semibold text-primary hover:underline"
        >
          hello@idilsh.top
        </a>
        .
      </p>
    </LegalPage>
  );
}
