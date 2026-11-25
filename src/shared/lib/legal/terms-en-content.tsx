import { LEGAL_CONTACT_EMAIL, LEGAL_SITE_ORIGIN } from './legal-public-meta';

const linkClass =
  'text-primary underline underline-offset-2 hover:no-underline break-words';

const siteUrl = LEGAL_SITE_ORIGIN;
const privacyUrl = `${LEGAL_SITE_ORIGIN}/privacy`;
const termsUrl = `${LEGAL_SITE_ORIGIN}/terms`;

export function TermsEnContent() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-foreground [&_h2]:scroll-mt-20 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
      <section className="space-y-3">
        <h2>1. General provisions and subject matter</h2>
        <p>
          1.1. This User Agreement (hereinafter — the Agreement) governs the relationship between the
          Operator and the User. The Operator is the person named as the personal data operator in
          the Personal Data Processing Policy (hereinafter in the Agreement — the Operator). The User
          is a natural person using the web application for tracking personal and shared financial
          operations (hereinafter — the User).
        </p>
        <p>
          1.2. The text of the Agreement published at{' '}
          <a className={linkClass} href={termsUrl} target="_blank" rel="noopener noreferrer">
            {termsUrl}
          </a>{' '}
          is <strong>not a public offer</strong> within the meaning of Article 437 of the Civil Code
          of the Russian Federation. The terms of the Agreement are deemed accepted by the User upon
          account registration when marking consent to the Agreement and the Personal Data Processing
          Policy, or upon actual commencement of use of the service — to the extent that does not
          require registration, if such use is provided by the functionality.
        </p>
        <p>
          1.3. The Service is a software and hardware complex available via the Internet at{' '}
          <a className={linkClass} href={siteUrl} target="_blank" rel="noopener noreferrer">
            {siteUrl}
          </a>
          , intended for tracking income and expenses, user categories, as well as shared tracking
          groups, member invitations, group categories and other features available in the interface
          at the time of use. The Service is not a financial, accounting, tax or other professional
          adviser and does not provide personalised recommendations on investing, borrowing or other
          financial transactions.
        </p>
      </section>

      <section className="space-y-3">
        <h2>2. Terms and definitions</h2>
        <p>
          2.1. <strong>Account</strong> — a set of data about the User stored by the Operator that
          allows the User to be authenticated and to use the service.
        </p>
        <p>
          2.2. <strong>User content</strong> — information independently entered by the User into the
          service, including operations (amounts, dates, types, comments), names and attributes of
          personal categories, information about tracking groups and other information placed within
          the functionality.
        </p>
        <p>
          2.3. <strong>Shared group</strong> — a service feature that allows several users to view
          and enter data in a shared group context in accordance with the rights defined by the
          service logic.
        </p>
      </section>

      <section className="space-y-3">
        <h2>3. Acceptance of terms and registration</h2>
        <p>
          3.1. To use service features that require identification, the User creates an account,
          providing accurate information requested by the registration form, including an email
          address and nickname.
        </p>
        <p>
          3.2. The User undertakes to keep the password confidential and is responsible for all
          actions performed using their account, except where unauthorised access arose through the
          Operator’s fault.
        </p>
      </section>

      <section className="space-y-3">
        <h2>4. Account and security</h2>
        <p>
          4.1. The User may not transfer access to the account (login and password or other means of
          authentication) to third parties. Inviting other users to shared groups through the
          mechanism provided by the service is not considered a transfer of account access within the
          meaning of this clause.
        </p>
        <p>
          4.2. Upon discovering unauthorised use of the account, the User undertakes to notify the
          Operator immediately at{' '}
          <a className={linkClass} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
            {LEGAL_CONTACT_EMAIL}
          </a>
          , unless another notification procedure is provided in the service interface.
        </p>
      </section>

      <section className="space-y-3">
        <h2>5. Rights and obligations of the User</h2>
        <p>
          5.1. All information constituting User content, including data on operations, categories and
          comments, is entered by the User themselves or from their device and under their control.
          The Operator is not obliged to verify the accuracy, completeness or correctness of the
          information entered and does not guarantee that it matches the User’s actual operations.
          The consequences of errors and inaccuracies in data entry are borne by the User.
        </p>
        <p>5.2. The User undertakes not to take actions aimed at:</p>
        <ul>
          <li>disrupting the service or obtaining unauthorised access to it;</li>
          <li>distributing malware, spam, or carrying out DDoS attacks;</li>
          <li>circumventing technical restrictions set by the Operator;</li>
          <li>
            placing in input fields information that violates the legislation of the Russian
            Federation, the rights of third parties, or that is offensive or discriminatory.
          </li>
        </ul>
        <p>
          5.3. The User independently assesses risks and makes financial and other decisions. The
          Service is intended for recording and displaying entered data; it does not replace
          professional accounting, tax or financial consulting.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Rights and obligations of the Operator</h2>
        <p>
          6.1. The Operator provides access to the service to the extent implemented at the time of
          access and may perform maintenance with temporary suspension of operation without prior
          notice to the User, unless otherwise expressly required by applicable law.
        </p>
        <p>
          6.2. The Operator may suspend or restrict the User’s access to the service (including
          blocking the account) in case of a breach of the Agreement by the User, where abuse or a
          security threat is suspected, and at the request of competent public authorities in cases
          provided by law. The Operator may refrain from notifying the User of such measures in
          advance if notification is impossible, contrary to law, or would substantially weaken
          measures to protect the rights of others and the operation of the service.
        </p>
        <p>
          6.3. The Operator may send the User informational and service messages, including to the
          email address, to the extent necessary to perform the Agreement and operate the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2>7. Intellectual property</h2>
        <p>
          7.1. Exclusive rights to the service software, its design, the wording of interface texts
          (excluding User content), and the Operator’s trademarks belong to the Operator or other
          right holders.
        </p>
        <p>
          7.2. The User grants the Operator a non-exclusive licence to use User content to the extent
          necessary for storage, processing, display in the service interface and provision of shared
          group functionality, without remuneration, for the term of the account and for a reasonable
          period after its deletion, unless otherwise required by technical backup needs and legal
          obligations.
        </p>
        <p>
          7.3. The User is prohibited from reverse engineering, decompiling, attempting to extract
          the source code of the service, and from automated data collection from the service beyond
          what is reasonably necessary for ordinary use of the interface, unless expressly permitted
          by the Operator.
        </p>
      </section>

      <section className="space-y-3">
        <h2>8. Personal data</h2>
        <p>
          8.1. Processing of the User’s personal data is carried out in accordance with the Personal
          Data Processing Policy available at{' '}
          <a className={linkClass} href={privacyUrl} target="_blank" rel="noopener noreferrer">
            {privacyUrl}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2>9. Disclaimer of warranties and limitation of liability</h2>
        <p>
          9.1. The Service is provided “as is”: the Operator does not guarantee absolute
          uninterrupted operation, freedom from errors, that the service will meet all of the User’s
          expectations, or the absence of failures, vulnerabilities or data loss. Provisions
          established by consumer protection law and other mandatory norms of applicable law remain
          in force regardless of this Agreement.
        </p>
        <p>
          9.2. The Operator does not guarantee the accuracy and completeness of calculations,
          aggregated amounts, summary indicators, statistics and other display of data in the
          interface, including shared group functionality. Discrepancies may arise due to User input
          errors, rounding, changes in accounting algorithms and logic, or technical failures of
          software or equipment.
        </p>
        <p>
          9.3. The Operator is not liable for lost profits, indirect losses, data loss, decisions of
          the User made on the basis of information displayed in the service, or for actions of third
          parties, except where liability cannot be limited under applicable law.
        </p>
        <p>
          9.4. Information generated in the service based on User content does not replace official
          statements of credit institutions, contractual documentation, mandatory tax and accounting
          records, or other primary documents.
        </p>
      </section>

      <section className="space-y-3">
        <h2>10. Amendment of the Agreement and termination of access</h2>
        <p>
          10.1. The Operator may unilaterally amend the Agreement by publishing a new version at{' '}
          <a className={linkClass} href={termsUrl} target="_blank" rel="noopener noreferrer">
            {termsUrl}
          </a>
          . Continued use of the service after publication of the changes means the User’s consent to
          the new version, unless a different effective procedure is required by applicable law.
        </p>
        <p>
          10.2. The User may stop using the service and request that the Operator delete the account
          by means provided by the service or by email to{' '}
          <a className={linkClass} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          10.3. Upon blocking or deletion of the account, processing of User content is carried out
          in accordance with the Personal Data Processing Policy and the Operator’s technical
          capabilities.
        </p>
      </section>

      <section className="space-y-3">
        <h2>11. Terms of service provision and fees</h2>
        <p>
          11.1. As of the date of publication of this version of the Agreement, the service is
          provided to Users free of charge. If paid functionality is introduced, payment terms,
          tariffs and refund procedures will be communicated to the User before the start of use of
          paid features in a manner determined by the Operator (for example, a separate tariff or
          service addendum).
        </p>
      </section>

      <section className="space-y-3">
        <h2>12. Dispute resolution and governing law</h2>
        <p>12.1. The law of the Russian Federation applies to the relationship of the parties.</p>
        <p>
          12.2. Disputes shall be resolved through negotiations and, if no agreement is reached, in
          court at the place determined by the applicable procedural legislation of the Russian
          Federation.
        </p>
      </section>

      <section className="space-y-3">
        <h2>13. Final provisions</h2>
        <p>
          13.1. On matters related to performance of the Agreement, the User may contact the Operator
          at{' '}
          <a className={linkClass} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          13.2. The current version of the Agreement is published at{' '}
          <a className={linkClass} href={termsUrl} target="_blank" rel="noopener noreferrer">
            {termsUrl}
          </a>
          . In case of discrepancies between a printed copy and the version at the specified address,
          the version on the website as of the date of access prevails.
        </p>
        <p>
          13.3. If any provision of the Agreement is held invalid, the remaining provisions continue
          in force to the maximum extent permitted by law.
        </p>
      </section>
    </div>
  );
}
