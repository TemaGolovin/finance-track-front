import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_OPERATOR_NAME,
  LEGAL_SITE_ORIGIN,
} from './legal-public-meta';

const linkClass =
  'text-primary underline underline-offset-2 hover:no-underline break-words';

const siteUrl = LEGAL_SITE_ORIGIN;
const privacyUrl = `${LEGAL_SITE_ORIGIN}/privacy`;

export function PrivacyEnContent() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-foreground [&_h2]:scroll-mt-20 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
      <section className="space-y-3">
        <h2>1. General provisions</h2>
        <p>
          This personal data processing policy is prepared in accordance with the requirements of
          Federal Law No.&nbsp;152-FZ of 27.07.2006 “On Personal Data” and defines the procedure for
          processing personal data and the measures to ensure the security of personal data taken by{' '}
          {LEGAL_OPERATOR_NAME} (hereinafter — the Operator).
        </p>
        <p>
          1.1. This Policy applies to all information that the Operator may obtain about users of
          the web application located at{' '}
          <a className={linkClass} href={siteUrl} target="_blank" rel="noopener noreferrer">
            {siteUrl}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2>2. Personal data processed</h2>
        <p>The Operator may process the following personal data and related user information:</p>
        <ul>
          <li>email address;</li>
          <li>nickname (username);</li>
          <li>
            credentials for sign-in: the password stored only as the result of a one-way
            transformation (hash) that does not allow recovery of the password in clear text;
          </li>
          <li>
            information entered by the User when using the service and required for tracking income
            and expenses: operations (amounts, dates, operation type, categories, comments on
            operations); user categories (name and other display attributes in the interface,
            including category color and icon);
          </li>
          <li>
            information about shared tracking groups: group name, member list, invitation statuses,
            group categories and mapping to the User’s personal categories — to the extent provided
            by the service functionality;
          </li>
          <li>
            technical data: cookies, including for authentication and session maintenance, and for
            storing the selected interface language; upon registration, sign-in and session refresh —
            a device identifier (deviceId) and User-Agent string stored for session binding and
            security; information, including IP address, may be processed when requests are
            transmitted over the network and on the infrastructure side (hosting, means of providing
            access to the service), even if it is not stored as a separate record in the application
            database.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>3. Purposes of processing personal data</h2>
        <p>Personal data is processed for the following purposes:</p>
        <ul>
          <li>user registration and authentication in the service;</li>
          <li>providing access to the web application functionality;</li>
          <li>
            keeping records of operations and displaying information in the service, including
            aggregated indicators and in-app statistics, including shared group functionality;
          </li>
          <li>maintaining user accounts;</li>
          <li>communicating with the user (including sending email notifications);</li>
          <li>ensuring security and preventing abuse.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>4. Legal bases for processing personal data</h2>
        <p>The legal bases for processing personal data are:</p>
        <ul>
          <li>consent of the personal data subject;</li>
          <li>
            necessity of performing the user agreement to which the user is a party.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>5. Use of cookies</h2>
        <p>The service uses cookies to:</p>
        <ul>
          <li>authenticate the user;</li>
          <li>maintain the user session;</li>
          <li>ensure correct operation of the web application.</li>
        </ul>
        <p>
          The user may disable cookies in their browser settings; however, this may limit the
          functionality of the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Conditions of personal data processing</h2>
        <p>6.1. Personal data is processed with the consent of the personal data subject.</p>
        <p>
          6.2. The Operator does not sell personal data and does not transfer it to third parties for
          their independent commercial or analytical activities unrelated to the operation of the
          service. To operate the service, the Operator may engage contractors (including a hosting
          provider, communications operator, transactional email provider via the SMTP protocol, and
          other technical contractors) to whom personal data may be transferred to the extent
          necessary to provide the relevant services (for example, an email address and parameters of
          a service message), under a contract and subject to confidentiality and personal data
          legislation requirements. Personal data may be disclosed to public authorities in cases
          provided for by the legislation of the Russian Federation.
        </p>
        <p>
          6.3. When using shared tracking groups, information placed by the User in the group context
          may become available to other users — members of that group — to the extent provided by the
          interface and logic of the service. Such disclosure between users is not a transfer of
          personal data to third parties within the meaning of clause&nbsp;6.2 regarding the
          Operator’s contractors.
        </p>
        <p>
          6.4. The Operator does not verify the accuracy of personal data provided by the user,
          except for confirmation of the email address as part of the service operation.
        </p>
        <p>
          6.5. Data entered by the User into the service (including financial and other accounting
          information) is processed, including automatically, to operate the service: for display,
          storage and generation of aggregated indicators and in-app statistics, including group
          functionality. The Operator does not use such data for marketing or other profiling outside
          the service functionality, does not sell analytics derived from it to third parties, and
          does not transfer it for training third-party advertising or scoring systems.
        </p>
      </section>

      <section className="space-y-3">
        <h2>7. Retention periods for personal data</h2>
        <p>
          Personal data is stored until the purposes of processing are achieved or until the user
          withdraws consent.
        </p>
        <p>
          The user may withdraw consent at any time by sending a notice to{' '}
          <a className={linkClass} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2>8. Rights of personal data subjects</h2>
        <p>The user has the right to:</p>
        <ul>
          <li>obtain information about their personal data;</li>
          <li>request rectification, blocking or deletion of data;</li>
          <li>withdraw consent to personal data processing;</li>
          <li>apply to competent authorities to protect their rights.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>9. Measures to protect personal data</h2>
        <p>
          The Operator takes necessary organisational and technical measures to protect personal data
          from unlawful access, alteration, disclosure or destruction.
        </p>
      </section>

      <section className="space-y-3">
        <h2>10. Final provisions</h2>
        <p>
          10.1. The user may obtain clarifications on personal data processing by contacting{' '}
          <a className={linkClass} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          10.2. The current version of the Policy is available at:{' '}
          <a className={linkClass} href={privacyUrl} target="_blank" rel="noopener noreferrer">
            {privacyUrl}
          </a>
          .
        </p>
        <p>10.3. The Policy remains in force indefinitely until replaced by a new version.</p>
      </section>
    </div>
  );
}
