import { LegalPage, Bullet } from "@/components/aeo/legal-page";

export const metadata = {
  title: "Terms of Service — AEOScope",
  description: "The terms that govern your use of the AEOScope AEO visibility analyzer.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="Terms of Service"
      description="Last updated: January 2025. These terms govern your use of the AEOScope website and analyzer."
    >
      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing or using AEOScope (the &quot;Service&quot;), you agree to be bound by these
        Terms of Service. If you do not agree, please do not use the Service.
      </p>

      <h2>2. Description of service</h2>
      <p>
        AEOScope provides a free AEO (Answer Engine Optimization) visibility analyzer that
        queries AI answer engines, extracts brand mentions, performs sentiment analysis, and
        scores your brand&apos;s visibility. We also offer paid audits and optimization services
        on request.
      </p>

      <h2>3. Use of the service</h2>
      <p>You agree to use the Service only for lawful purposes and in a way that does not:</p>
      <ul>
        <Bullet>Infringe the rights of any third party</Bullet>
        <Bullet>Attempt to reverse-engineer, scrape, or overload the Service</Bullet>
        <Bullet>Use the Service to generate content for illegal, deceptive, or harmful purposes</Bullet>
        <Bullet>Automate requests in a way that degrades service availability for others</Bullet>
      </ul>

      <h2>4. Accuracy of results</h2>
      <p>
        The free analyzer generates representative AI answers using a large language model
        prompted with each engine&apos;s style. Results are indicative of likely AI-answer
        visibility, not a guarantee of what any specific user will see in a live engine. Sentiment
        and share-of-voice scores are model-based estimates. You should not rely solely on the
        free analyzer for business-critical decisions.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The AEOScope brand, website design, code, and blog content are owned by AEOScope and
        protected by applicable intellectual property laws. You may not copy, redistribute, or
        republish our content without permission. Analysis results generated from your inputs are
        yours to use.
      </p>

      <h2>6. Paid services</h2>
      <p>
        Full audits and done-for-you optimization services are quoted individually. Fees, scope,
        and delivery timelines for paid services are agreed in a separate statement of work before
        any payment is collected.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        The Service is provided &quot;as is&quot; without warranties of any kind. To the maximum
        extent permitted by law, AEOScope is not liable for any indirect, incidental, or
        consequential damages arising from your use of the Service, including any business
        decisions made based on analysis results.
      </p>

      <h2>8. Third-party links</h2>
      <p>
        The Service may link to third-party websites (including external AI providers and our
        partner site at idilsh.top). We are not responsible for the content or practices of
        third-party sites.
      </p>

      <h2>9. Changes to the service and terms</h2>
      <p>
        We may update or discontinue features of the Service at any time. We may also revise
        these terms; continued use after changes constitutes acceptance of the updated terms.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of the jurisdiction in which AEOScope operates,
        without regard to conflict-of-law principles.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these terms? Visit our{" "}
        <a href="/contact" className="font-semibold text-primary hover:underline">contact page</a>{" "}
        or email{" "}
        <a href="mailto:hello@idilsh.top" className="font-semibold text-primary hover:underline">
          hello@idilsh.top
        </a>.
      </p>
    </LegalPage>
  );
}
