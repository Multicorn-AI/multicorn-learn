import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy: Multicorn',
  description:
    'How Multicorn collects, uses, and protects your data. Privacy policy for multicorn.ai and the Multicorn Shield SDK.',
  openGraph: {
    title: 'Privacy Policy: Multicorn',
    description:
      'How Multicorn collects, uses, and protects your data. Privacy policy for multicorn.ai and the Multicorn Shield SDK.',
    url: 'https://multicorn.ai/policies/privacy',
    siteName: 'Multicorn',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="w-full max-w-3xl">
          <Link
            href="/policies"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            All policies
          </Link>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Privacy policy
          </h1>
          <p className="mb-12 text-sm text-text-secondary">Last updated February 19, 2026</p>

          {/* ── INTRODUCTION ── */}
          <section className="mb-12">
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                This Privacy Notice for Multicorn AI Pty Ltd (doing business as Multicorn AI)
                (&quot;
                <strong className="text-text-primary">we</strong>,&quot; &quot;
                <strong className="text-text-primary">us</strong>,&quot; or &quot;
                <strong className="text-text-primary">our</strong>&quot;), describes how and why we
                might access, collect, store, use, and/or share (&quot;
                <strong className="text-text-primary">process</strong>&quot;) your personal
                information when you use our services (&quot;
                <strong className="text-text-primary">Services</strong>&quot;), including when you:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Visit our website at{' '}
                  <a
                    href="https://multicorn.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://multicorn.ai
                  </a>{' '}
                  or any website of ours that links to this Privacy Notice
                </li>
                <li>
                  Use Multicorn. Multicorn is a dual-product AI platform consisting of Shield, an
                  open-source SDK and hosted dashboard that provides permissions, consent, and
                  control infrastructure for AI agents, and Learn, an AI education platform helping
                  non-technical users understand and adopt AI tools safely.
                </li>
                <li>Engage with us in other related ways, including any marketing or events</li>
              </ul>
              <p>
                <strong className="text-text-primary">Questions or concerns?</strong> Reading this
                Privacy Notice will help you understand your privacy rights and choices. We are
                responsible for making decisions about how your personal information is processed.
                If you do not agree with our policies and practices, please do not use our Services.
                If you still have any questions or concerns, please contact us at{' '}
                <a href="mailto:legal@multicorn.ai" className="text-primary hover:underline">
                  legal@multicorn.ai
                </a>
                .
              </p>
            </div>
          </section>

          {/* ── SUMMARY OF KEY POINTS ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">Summary of key points</h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p className="italic">
                This summary provides key points from our Privacy Notice, but you can find out more
                details about any of these topics by clicking the link following each key point or
                by using our{' '}
                <a href="#table-of-contents" className="text-primary hover:underline">
                  table of contents
                </a>{' '}
                below to find the section you are looking for.
              </p>
              <p>
                <strong className="text-text-primary">
                  What personal information do we process?
                </strong>{' '}
                When you visit, use, or navigate our Services, we may process personal information
                depending on how you interact with us and the Services, the choices you make, and
                the products and features you use. Learn more about{' '}
                <a href="#information-we-collect" className="text-primary hover:underline">
                  personal information you disclose to us
                </a>
                .
              </p>
              <p>
                <strong className="text-text-primary">
                  Do we process any sensitive personal information?
                </strong>{' '}
                Some of the information may be considered &quot;special&quot; or
                &quot;sensitive&quot; in certain jurisdictions, for example your racial or ethnic
                origins, sexual orientation, and religious beliefs. We do not process sensitive
                personal information.
              </p>
              <p>
                <strong className="text-text-primary">
                  Do we collect any information from third parties?
                </strong>{' '}
                We do not collect any information from third parties.
              </p>
              <p>
                <strong className="text-text-primary">How do we process your information?</strong>{' '}
                We process your information to provide, improve, and administer our Services,
                communicate with you, for security and fraud prevention, and to comply with law. We
                may also process your information for other purposes with your consent. We process
                your information only when we have a valid legal reason to do so. Learn more about{' '}
                <a href="#how-we-process" className="text-primary hover:underline">
                  how we process your information
                </a>
                .
              </p>
              <p>
                <strong className="text-text-primary">
                  In what situations and with which parties do we share personal information?
                </strong>{' '}
                We may share information in specific situations and with specific third parties.
                Learn more about{' '}
                <a href="#sharing-personal-information" className="text-primary hover:underline">
                  when and with whom we share your personal information
                </a>
                .
              </p>
              <p>
                <strong className="text-text-primary">
                  How do you keep your information safe?
                </strong>{' '}
                We have adequate organizational and technical processes and procedures in place to
                protect your personal information. However, no electronic transmission over the
                internet or information storage technology can be guaranteed to be 100% secure, so
                we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized
                third parties will not be able to defeat our security and improperly collect,
                access, steal, or modify your information. Learn more about{' '}
                <a href="#information-safe" className="text-primary hover:underline">
                  how we keep your information safe
                </a>
                .
              </p>
              <p>
                <strong className="text-text-primary">What are your rights?</strong> Depending on
                where you are located geographically, the applicable privacy law may mean you have
                certain rights regarding your personal information. Learn more about{' '}
                <a href="#privacy-rights" className="text-primary hover:underline">
                  your privacy rights
                </a>
                .
              </p>
              <p>
                <strong className="text-text-primary">How do you exercise your rights?</strong> The
                easiest way to exercise your rights is by visiting{' '}
                <a href="mailto:legal@multicorn.ai" className="text-primary hover:underline">
                  legal@multicorn.ai
                </a>
                , or by contacting us. We will consider and act upon any request in accordance with
                applicable data protection laws.
              </p>
              <p>
                Want to learn more about what we do with any information we collect?{' '}
                <a href="#information-we-collect" className="text-primary hover:underline">
                  Review the Privacy Notice in full
                </a>
                .
              </p>
            </div>
          </section>

          {/* ── TABLE OF CONTENTS ── */}
          <section id="table-of-contents" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">Table of contents</h2>
            <nav>
              <ol className="list-decimal space-y-1 pl-6 text-base text-primary">
                <li>
                  <a href="#information-we-collect" className="hover:underline">
                    WHAT INFORMATION DO WE COLLECT?
                  </a>
                </li>
                <li>
                  <a href="#how-we-process" className="hover:underline">
                    HOW DO WE PROCESS YOUR INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#legal-bases" className="hover:underline">
                    WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#sharing-personal-information" className="hover:underline">
                    WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="hover:underline">
                    DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                  </a>
                </li>
                <li>
                  <a href="#ai-products" className="hover:underline">
                    DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
                  </a>
                </li>
                <li>
                  <a href="#social-logins" className="hover:underline">
                    HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                  </a>
                </li>
                <li>
                  <a href="#international-transfers" className="hover:underline">
                    IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                  </a>
                </li>
                <li>
                  <a href="#how-long-keep" className="hover:underline">
                    HOW LONG DO WE KEEP YOUR INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#information-safe" className="hover:underline">
                    HOW DO WE KEEP YOUR INFORMATION SAFE?
                  </a>
                </li>
                <li>
                  <a href="#minors" className="hover:underline">
                    DO WE COLLECT INFORMATION FROM MINORS?
                  </a>
                </li>
                <li>
                  <a href="#privacy-rights" className="hover:underline">
                    WHAT ARE YOUR PRIVACY RIGHTS?
                  </a>
                </li>
                <li>
                  <a href="#do-not-track" className="hover:underline">
                    CONTROLS FOR DO-NOT-TRACK FEATURES
                  </a>
                </li>
                <li>
                  <a href="#us-privacy-rights" className="hover:underline">
                    DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                  </a>
                </li>
                <li>
                  <a href="#other-regions" className="hover:underline">
                    DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
                  </a>
                </li>
                <li>
                  <a href="#updates" className="hover:underline">
                    DO WE MAKE UPDATES TO THIS NOTICE?
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:underline">
                    HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                  </a>
                </li>
                <li>
                  <a href="#review-update-delete" className="hover:underline">
                    HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                  </a>
                </li>
              </ol>
            </nav>
          </section>

          {/* ── 1. WHAT INFORMATION DO WE COLLECT? ── */}
          <section id="information-we-collect" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              1. What information do we collect?
            </h2>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-text-primary">
              Personal information you disclose to us
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We collect personal
                  information that you provide to us.
                </em>
              </p>
              <p>
                We collect personal information that you voluntarily provide to us when you register
                on the Services, express an interest in obtaining information about us or our
                products and Services, when you participate in activities on the Services, or
                otherwise when you contact us.
              </p>
              <p>
                <strong className="text-text-primary">Personal Information Provided by You.</strong>{' '}
                The personal information that we collect depends on the context of your interactions
                with us and the Services, the choices you make, and the products and features you
                use. The personal information we collect may include the following:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>names</li>
                <li>email addresses</li>
                <li>usernames</li>
                <li>passwords</li>
                <li>billing addresses</li>
                <li>contact or authentication data</li>
              </ul>
              <p>
                <strong className="text-text-primary">Sensitive Information.</strong> We do not
                process sensitive information.
              </p>
              <p>
                <strong className="text-text-primary">Payment Data.</strong> We may collect data
                necessary to process your payment if you choose to make purchases, such as your
                payment instrument number, and the security code associated with your payment
                instrument. All payment data is handled and stored by Stripe. You may find their
                privacy notice link(s) here:{' '}
                <a
                  href="https://stripe.com/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://stripe.com/privacy
                </a>
                .
              </p>
              <p>
                <strong className="text-text-primary">Social Media Login Data.</strong> We may
                provide you with the option to register with us using your existing social media
                account details, like your Facebook, X, or other social media account. If you choose
                to register in this way, we will collect certain profile information about you from
                the social media provider, as described in the section called &quot;
                <a href="#social-logins" className="text-primary hover:underline">
                  HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                </a>
                &quot; below.
              </p>
              <p>
                All personal information that you provide to us must be true, complete, and
                accurate, and you must notify us of any changes to such personal information.
              </p>
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-text-primary">
              Information automatically collected
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> Some information — such
                  as your Internet Protocol (IP) address and/or browser and device characteristics —
                  is collected automatically when you visit our Services.
                </em>
              </p>
              <p>
                We automatically collect certain information when you visit, use, or navigate the
                Services. This information does not reveal your specific identity (like your name or
                contact information) but may include device and usage information, such as your IP
                address, browser and device characteristics, operating system, language preferences,
                referring URLs, device name, country, location, information about how and when you
                use our Services, and other technical information. This information is primarily
                needed to maintain the security and operation of our Services, and for our internal
                analytics and reporting purposes.
              </p>
              <p>
                Like many businesses, we also collect information through cookies and similar
                technologies. You can find out more about this in our Cookie Notice:{' '}
                <Link href="/policies/cookies" className="text-primary hover:underline">
                  https://multicorn.ai/policies/cookies
                </Link>
                .
              </p>
              <p>The information we collect includes:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic,
                  usage, and performance information our servers automatically collect when you
                  access or use our Services and which we record in log files. Depending on how you
                  interact with us, this log data may include your IP address, device information,
                  browser type, and settings and information about your activity in the Services
                  (such as the date/time stamps associated with your usage, pages and files viewed,
                  searches, and other actions you take such as which features you use), device event
                  information (such as system activity, error reports (sometimes called &quot;crash
                  dumps&quot;), and hardware settings).
                </li>
                <li>
                  <em>Device Data.</em> We collect device data such as information about your
                  computer, phone, tablet, or other device you use to access the Services. Depending
                  on the device used, this device data may include information such as your IP
                  address (or proxy server), device and application identification numbers,
                  location, browser type, hardware model, Internet service provider and/or mobile
                  carrier, operating system, and system configuration information.
                </li>
              </ul>
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-text-primary">Google API</h3>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Our use of information received from Google APIs will adhere to{' '}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google API Services User Data Policy
                </a>
                , including the{' '}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy#limited-use"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Limited Use requirements
                </a>
                .
              </p>
            </div>
          </section>

          {/* ── 2. HOW DO WE PROCESS YOUR INFORMATION? ── */}
          <section id="how-we-process" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              2. How do we process your information?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We process your
                  information to provide, improve, and administer our Services, communicate with
                  you, for security and fraud prevention, and to comply with law. We process the
                  personal information for the following purposes listed below. We may also process
                  your information for other purposes only with your prior explicit consent.
                </em>
              </p>
              <p>
                <strong className="text-text-primary">
                  We process your personal information for a variety of reasons, depending on how
                  you interact with our Services, including:
                </strong>
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-text-primary">
                    To facilitate account creation and authentication and otherwise manage user
                    accounts.
                  </strong>{' '}
                  We may process your information so you can create and log in to your account, as
                  well as keep your account in working order.
                </li>
                <li>
                  <strong className="text-text-primary">
                    To deliver and facilitate delivery of services to the user.
                  </strong>{' '}
                  We may process your information to provide you with the requested service.
                </li>
                <li>
                  <strong className="text-text-primary">
                    To respond to user inquiries/offer support to users.
                  </strong>{' '}
                  We may process your information to respond to your inquiries and solve any
                  potential issues you might have with the requested service.
                </li>
                <li>
                  <strong className="text-text-primary">
                    To send administrative information to you.
                  </strong>{' '}
                  We may process your information to send you details about our products and
                  services, changes to our terms and policies, and other similar information.
                </li>
                <li>
                  <strong className="text-text-primary">To fulfill and manage your orders.</strong>{' '}
                  We may process your information to fulfill and manage your orders, payments,
                  returns, and exchanges made through the Services.
                </li>
                <li>
                  <strong className="text-text-primary">To request feedback.</strong> We may process
                  your information when necessary to request feedback and to contact you about your
                  use of our Services.
                </li>
                <li>
                  <strong className="text-text-primary">To protect our Services.</strong> We may
                  process your information as part of our efforts to keep our Services safe and
                  secure, including fraud monitoring and prevention.
                </li>
                <li>
                  <strong className="text-text-primary">To identify usage trends.</strong> We may
                  process information about how you use our Services to better understand how they
                  are being used so we can improve them.
                </li>
                <li>
                  <strong className="text-text-primary">
                    To save or protect an individual&apos;s vital interest.
                  </strong>{' '}
                  We may process your information when necessary to save or protect an
                  individual&apos;s vital interest, such as to prevent harm.
                </li>
              </ul>
            </div>
          </section>
          {/* ── 3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION? ── */}
          <section id="legal-bases" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              3. What legal bases do we rely on to process your information?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We only process your
                  personal information when we believe it is necessary and we have a valid legal
                  reason (i.e., legal basis) to do so under applicable law, like with your consent,
                  to comply with laws, to provide you with services to enter into or fulfill our
                  contractual obligations, to protect your rights, or to fulfill our legitimate
                  business interests.
                </em>
              </p>

              <p>
                <em>
                  <strong className="text-text-primary">
                    <u>If you are located in the EU or UK, this section applies to you.</u>
                  </strong>
                </em>
              </p>
              <p>
                The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the
                valid legal bases we rely on in order to process your personal information. As such,
                we may rely on the following legal bases to process your personal information:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-text-primary">Consent.</strong> We may process your
                  information if you have given us permission (i.e., consent) to use your personal
                  information for a specific purpose. You can withdraw your consent at any time.
                  Learn more about{' '}
                  <a href="#privacy-rights" className="text-primary hover:underline">
                    withdrawing your consent
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-text-primary">Performance of a Contract.</strong> We may
                  process your personal information when we believe it is necessary to fulfill our
                  contractual obligations to you, including providing our Services or at your
                  request prior to entering into a contract with you.
                </li>
                <li>
                  <strong className="text-text-primary">Legitimate Interests.</strong> We may
                  process your information when we believe it is reasonably necessary to achieve our
                  legitimate business interests and those interests do not outweigh your interests
                  and fundamental rights and freedoms. For example, we may process your personal
                  information for some of the purposes described in order to:
                  <ul className="mt-2 list-disc space-y-2 pl-6">
                    <li>
                      Analyze how our Services are used so we can improve them to engage and retain
                      users
                    </li>
                    <li>Diagnose problems and/or prevent fraudulent activities</li>
                    <li>
                      Understand how our users use our products and services so we can improve user
                      experience
                    </li>
                  </ul>
                </li>
                <li>
                  <strong className="text-text-primary">Legal Obligations.</strong> We may process
                  your information where we believe it is necessary for compliance with our legal
                  obligations, such as to cooperate with a law enforcement body or regulatory
                  agency, exercise or defend our legal rights, or disclose your information as
                  evidence in litigation in which we are involved.
                </li>
                <li>
                  <strong className="text-text-primary">Vital Interests.</strong> We may process
                  your information where we believe it is necessary to protect your vital interests
                  or the vital interests of a third party, such as situations involving potential
                  threats to the safety of any person.
                </li>
              </ul>

              <p>
                <em>
                  <strong className="text-text-primary">
                    <u>If you are located in Canada, this section applies to you.</u>
                  </strong>
                </em>
              </p>
              <p>
                We may process your information if you have given us specific permission (i.e.,
                express consent) to use your personal information for a specific purpose, or in
                situations where your permission can be inferred (i.e., implied consent). You can{' '}
                <a href="#privacy-rights" className="text-primary hover:underline">
                  withdraw your consent
                </a>{' '}
                at any time.
              </p>
              <p>
                In some exceptional cases, we may be legally permitted under applicable law to
                process your information without your consent, including, for example:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  If collection is clearly in the interests of an individual and consent cannot be
                  obtained in a timely way
                </li>
                <li>For investigations and fraud detection and prevention</li>
                <li>For business transactions provided certain conditions are met</li>
                <li>
                  If it is contained in a witness statement and the collection is necessary to
                  assess, process, or settle an insurance claim
                </li>
                <li>
                  For identifying injured, ill, or deceased persons and communicating with next of
                  kin
                </li>
                <li>
                  If we have reasonable grounds to believe an individual has been, is, or may be
                  victim of financial abuse
                </li>
                <li>
                  If it is reasonable to expect collection and use with consent would compromise the
                  availability or the accuracy of the information and the collection is reasonable
                  for purposes related to investigating a breach of an agreement or a contravention
                  of the laws of Canada or a province
                </li>
                <li>
                  If disclosure is required to comply with a subpoena, warrant, court order, or
                  rules of the court relating to the production of records
                </li>
                <li>
                  If it was produced by an individual in the course of their employment, business,
                  or profession and the collection is consistent with the purposes for which the
                  information was produced
                </li>
                <li>
                  If the collection is solely for journalistic, artistic, or literary purposes
                </li>
                <li>
                  If the information is publicly available and is specified by the regulations
                </li>
                <li>
                  We may disclose de-identified information for approved research or statistics
                  projects, subject to ethics oversight and confidentiality commitments
                </li>
              </ul>
            </div>
          </section>

          {/* ── 4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION? ── */}
          <section id="sharing-personal-information" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              4. When and with whom do we share your personal information?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We may share information
                  in specific situations described in this section and/or with the following third
                  parties.
                </em>
              </p>
              <p>
                <strong className="text-text-primary">
                  Vendors, Consultants, and Other Third-Party Service Providers.
                </strong>{' '}
                We may share your data with third-party vendors, service providers, contractors, or
                agents (&quot;<strong className="text-text-primary">third parties</strong>&quot;)
                who perform services for us or on our behalf and require access to such information
                to do that work. We have contracts in place with our third parties, which are
                designed to help safeguard your personal information. This means that they cannot do
                anything with your personal information unless we have instructed them to do it.
                They will also not share your personal information with any organization apart from
                us. They also commit to protect the data they hold on our behalf and to retain it
                for the period we instruct.
              </p>
              <p>The third parties we may share personal information with are as follows:</p>
              <ul className="list-disc space-y-4 pl-6">
                <li>
                  <strong className="text-text-primary">Cloud Computing Services</strong>
                  <br />
                  Amazon Web Services (AWS)
                </li>
                <li>
                  <strong className="text-text-primary">Invoice and Billing</strong>
                  <br />
                  Stripe
                </li>
                <li>
                  <strong className="text-text-primary">
                    User Account Registration and Authentication
                  </strong>
                  <br />
                  Google Sign-In
                </li>
                <li>
                  <strong className="text-text-primary">Web and Mobile Analytics</strong>
                  <br />
                  Plausible
                </li>
                <li>
                  <strong className="text-text-primary">Website Hosting</strong>
                  <br />
                  Vercel
                </li>
              </ul>
              <p>
                We also may need to share your personal information in the following situations:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-text-primary">Business Transfers.</strong> We may share or
                  transfer your information in connection with, or during negotiations of, any
                  merger, sale of company assets, financing, or acquisition of all or a portion of
                  our business to another company.
                </li>
              </ul>
            </div>
          </section>

          {/* ── 5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES? ── */}
          <section id="cookies" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              5. Do we use cookies and other tracking technologies?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We may use cookies and
                  other tracking technologies to collect and store your information.
                </em>
              </p>
              <p>
                We may use cookies and similar tracking technologies (like web beacons and pixels)
                to gather information when you interact with our Services. Some online tracking
                technologies help us maintain the security of our Services and your account, prevent
                crashes, fix bugs, save your preferences, and assist with basic site functions.
              </p>
              <p>
                We also permit third parties and service providers to use online tracking
                technologies on our Services for analytics and advertising, including to help manage
                and display advertisements, to tailor advertisements to your interests, or to send
                abandoned shopping cart reminders (depending on your communication preferences). The
                third parties and service providers use their technology to provide advertising
                about products and services tailored to your interests which may appear either on
                our Services or on other websites.
              </p>
              <p>
                To the extent these online tracking technologies are deemed to be a
                &quot;sale&quot;/&quot;sharing&quot; (which includes targeted advertising, as
                defined under the applicable laws) under applicable US state laws, you can opt out
                of these online tracking technologies by submitting a request as described below
                under section &quot;
                <a href="#us-privacy-rights" className="text-primary hover:underline">
                  DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </a>
                &quot;
              </p>
              <p>
                Specific information about how we use such technologies and how you can refuse
                certain cookies is set out in our Cookie Notice:{' '}
                <Link href="/policies/cookies" className="text-primary hover:underline">
                  https://multicorn.ai/policies/cookies
                </Link>
                .
              </p>
            </div>
          </section>

          {/* ── 6. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS? ── */}
          <section id="ai-products" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              6. Do we offer artificial intelligence-based products?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We offer products,
                  features, or tools powered by artificial intelligence, machine learning, or
                  similar technologies.
                </em>
              </p>
              <p>
                As part of our Services, we offer products, features, or tools powered by artificial
                intelligence, machine learning, or similar technologies (collectively, &quot;AI
                Products&quot;). These tools are designed to enhance your experience and provide you
                with new solutions. The terms in this Privacy Notice govern your use of the AI
                Products within our Services.
              </p>
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-text-primary">Our AI Products</h3>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>Our AI Products are designed for the following functions:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>AI automation</li>
                <li>AI deployment</li>
              </ul>
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-text-primary">
              How We Process Your Data Using AI
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                All personal information processed using our AI Products is handled in line with our
                Privacy Notice and our agreement with third parties. This ensures high security and
                safeguards your personal information throughout the process, giving you peace of
                mind about your data&apos;s safety.
              </p>
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-text-primary">How to Opt Out</h3>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                We believe in giving you the power to decide how your data is used. To opt out, you
                can:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Log in to your account settings and update your user account</li>
                <li>Contact us using the contact information provided</li>
              </ul>
            </div>
          </section>

          {/* ── 7. HOW DO WE HANDLE YOUR SOCIAL LOGINS? ── */}
          <section id="social-logins" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              7. How do we handle your social logins?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> If you choose to register
                  or log in to our Services using a social media account, we may have access to
                  certain information about you.
                </em>
              </p>
              <p>
                Our Services offer you the ability to register and log in using your third-party
                social media account details (like your Facebook or X logins). Where you choose to
                do this, we will receive certain profile information about you from your social
                media provider. The profile information we receive may vary depending on the social
                media provider concerned, but will often include your name, email address, friends
                list, and profile picture, as well as other information you choose to make public on
                such a social media platform.
              </p>
              <p>
                We will use the information we receive only for the purposes that are described in
                this Privacy Notice or that are otherwise made clear to you on the relevant
                Services. Please note that we do not control, and are not responsible for, other
                uses of your personal information by your third-party social media provider. We
                recommend that you review their privacy notice to understand how they collect, use,
                and share your personal information, and how you can set your privacy preferences on
                their sites and apps.
              </p>
            </div>
          </section>

          {/* ── 8. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY? ── */}
          <section id="international-transfers" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              8. Is your information transferred internationally?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We may transfer, store,
                  and process your information in countries other than your own.
                </em>
              </p>
              <p>
                Our servers are located in the United States. Regardless of your location, please be
                aware that your information may be transferred to, stored by, and processed by us in
                our facilities and in the facilities of the third parties with whom we may share
                your personal information (see &quot;
                <a href="#sharing-personal-information" className="text-primary hover:underline">
                  WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </a>
                &quot; above), including facilities in the United States, and other countries.
              </p>
              <p>
                If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or
                Switzerland, then these countries may not necessarily have data protection laws or
                other similar laws as comprehensive as those in your country. However, we will take
                all necessary measures to protect your personal information in accordance with this
                Privacy Notice and applicable law.
              </p>
              <p>European Commission&apos;s Standard Contractual Clauses:</p>
              <p>
                We have implemented measures to protect your personal information, including by
                using the European Commission&apos;s Standard Contractual Clauses for transfers of
                personal information between our group companies and between us and our third-party
                providers. These clauses require all recipients to protect all personal information
                that they process originating from the EEA or UK in accordance with European data
                protection laws and regulations. Our Standard Contractual Clauses can be provided
                upon request. We have implemented similar appropriate safeguards with our
                third-party service providers and partners and further details can be provided upon
                request.
              </p>
            </div>
          </section>

          {/* ── 9. HOW LONG DO WE KEEP YOUR INFORMATION? ── */}
          <section id="how-long-keep" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              9. How long do we keep your information?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We keep your information
                  for as long as necessary to fulfill the purposes outlined in this Privacy Notice
                  unless otherwise required by law.
                </em>
              </p>
              <p>
                We will only keep your personal information for as long as it is necessary for the
                purposes set out in this Privacy Notice, unless a longer retention period is
                required or permitted by law (such as tax, accounting, or other legal requirements).
                No purpose in this notice will require us keeping your personal information for
                longer than the period of time in which users have an account with us.
              </p>
              <p>
                When we have no ongoing legitimate business need to process your personal
                information, we will either delete or anonymize such information, or, if this is not
                possible (for example, because your personal information has been stored in backup
                archives), then we will securely store your personal information and isolate it from
                any further processing until deletion is possible.
              </p>
            </div>
          </section>

          {/* ── 10. HOW DO WE KEEP YOUR INFORMATION SAFE? ── */}
          <section id="information-safe" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              10. How do we keep your information safe?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We aim to protect your
                  personal information through a system of organizational and technical security
                  measures.
                </em>
              </p>
              <p>
                We have implemented appropriate and reasonable technical and organizational security
                measures designed to protect the security of any personal information we process.
                However, despite our safeguards and efforts to secure your information, no
                electronic transmission over the Internet or information storage technology can be
                guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,
                cybercriminals, or other unauthorized third parties will not be able to defeat our
                security and improperly collect, access, steal, or modify your information. Although
                we will do our best to protect your personal information, transmission of personal
                information to and from our Services is at your own risk. You should only access the
                Services within a secure environment.
              </p>
            </div>
          </section>

          {/* ── 11. DO WE COLLECT INFORMATION FROM MINORS? ── */}
          <section id="minors" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              11. Do we collect information from minors?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> We do not knowingly
                  collect data from or market to children under 18 years of age or the equivalent
                  age as specified by law in your jurisdiction.
                </em>
              </p>
              <p>
                We do not knowingly collect, solicit data from, or market to children under 18 years
                of age or the equivalent age as specified by law in your jurisdiction, nor do we
                knowingly sell such personal information. By using the Services, you represent that
                you are at least 18 or the equivalent age as specified by law in your jurisdiction
                or that you are the parent or guardian of such a minor and consent to such minor
                dependent&apos;s use of the Services. If we learn that personal information from
                users less than 18 years of age or the equivalent age as specified by law in your
                jurisdiction has been collected, we will deactivate the account and take reasonable
                measures to promptly delete such data from our records. If you become aware of any
                data we may have collected from children under age 18 or the equivalent age as
                specified by law in your jurisdiction, please contact us at{' '}
                <a href="mailto:legal@multicorn.ai" className="text-primary hover:underline">
                  legal@multicorn.ai
                </a>
                .
              </p>
            </div>
          </section>

          {/* ── 12. WHAT ARE YOUR PRIVACY RIGHTS? ── */}
          <section id="privacy-rights" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              12. What are your privacy rights?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> Depending on your state
                  of residence in the US or in some regions, such as the European Economic Area
                  (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow
                  you greater access to and control over your personal information. You may review,
                  change, or terminate your account at any time, depending on your country,
                  province, or state of residence.
                </em>
              </p>
              <p>
                In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights
                under applicable data protection laws. These may include the right (i) to request
                access and obtain a copy of your personal information, (ii) to request rectification
                or erasure; (iii) to restrict the processing of your personal information; (iv) if
                applicable, to data portability; and (v) not to be subject to automated
                decision-making. If a decision that produces legal or similarly significant effects
                is made solely by automated means, we will inform you, explain the main factors, and
                offer a simple way to request human review. In certain circumstances, you may also
                have the right to object to the processing of your personal information. You can
                make such a request by contacting us by using the contact details provided in the
                section &quot;
                <a href="#contact" className="text-primary hover:underline">
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </a>
                &quot; below.
              </p>
              <p>
                We will consider and act upon any request in accordance with applicable data
                protection laws.
              </p>
              <p>
                If you are located in the EEA or UK and you believe we are unlawfully processing
                your personal information, you also have the right to complain to your{' '}
                <a
                  href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Member State data protection authority
                </a>{' '}
                or{' '}
                <a
                  href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UK data protection authority
                </a>
                .
              </p>
              <p>
                If you are located in Switzerland, you may contact the{' '}
                <a
                  href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Federal Data Protection and Information Commissioner
                </a>
                .
              </p>
              <p>
                <strong className="text-text-primary">
                  <u>Withdrawing your consent:</u>
                </strong>{' '}
                If we are relying on your consent to process your personal information, which may be
                express and/or implied consent depending on the applicable law, you have the right
                to withdraw your consent at any time. You can withdraw your consent at any time by
                contacting us by using the contact details provided in the section &quot;
                <a href="#contact" className="text-primary hover:underline">
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </a>
                &quot; below or updating your preferences.
              </p>
              <p>
                However, please note that this will not affect the lawfulness of the processing
                before its withdrawal nor, when applicable law allows, will it affect the processing
                of your personal information conducted in reliance on lawful processing grounds
                other than consent.
              </p>
              <p>
                <strong className="text-text-primary">
                  <u>Opting out of marketing and promotional communications:</u>
                </strong>{' '}
                You can unsubscribe from our marketing and promotional communications at any time by
                clicking on the unsubscribe link in the emails that we send, or by contacting us
                using the details provided in the section &quot;
                <a href="#contact" className="text-primary hover:underline">
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </a>
                &quot; below. You will then be removed from the marketing lists. However, we may
                still communicate with you — for example, to send you service-related messages that
                are necessary for the administration and use of your account, to respond to service
                requests, or for other non-marketing purposes.
              </p>

              <h3 className="text-lg font-semibold text-text-primary">Account Information</h3>
              <p>
                If you would at any time like to review or change the information in your account or
                terminate your account, you can:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Log in to your account settings and update your user account.</li>
                <li>Contact us using the contact information provided.</li>
              </ul>
              <p>
                Upon your request to terminate your account, we will deactivate or delete your
                account and information from our active databases. However, we may retain some
                information in our files to prevent fraud, troubleshoot problems, assist with any
                investigations, enforce our legal terms and/or comply with applicable legal
                requirements.
              </p>
              <p>
                <strong className="text-text-primary">
                  <u>Cookies and similar technologies:</u>
                </strong>{' '}
                Most Web browsers are set to accept cookies by default. If you prefer, you can
                usually choose to set your browser to remove cookies and to reject cookies. If you
                choose to remove cookies or reject cookies, this could affect certain features or
                services of our Services. For further information, please see our Cookie Notice:{' '}
                <Link href="/policies/cookies" className="text-primary hover:underline">
                  https://multicorn.ai/policies/cookies
                </Link>
                .
              </p>
              <p>
                If you have questions or comments about your privacy rights, you may email us at{' '}
                <a href="mailto:legal@multicorn.ai" className="text-primary hover:underline">
                  legal@multicorn.ai
                </a>
                .
              </p>
            </div>
          </section>

          {/* ── 13. CONTROLS FOR DO-NOT-TRACK FEATURES ── */}
          <section id="do-not-track" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              13. Controls for do-not-track features
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Most web browsers and some mobile operating systems and mobile applications include
                a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your
                privacy preference not to have data about your online browsing activities monitored
                and collected. At this stage, no uniform technology standard for recognizing and
                implementing DNT signals has been finalized. As such, we do not currently respond to
                DNT browser signals or any other mechanism that automatically communicates your
                choice not to be tracked online. If a standard for online tracking is adopted that
                we must follow in the future, we will inform you about that practice in a revised
                version of this Privacy Notice.
              </p>
              <p>
                California law requires us to let you know how we respond to web browser DNT
                signals. Because there currently is not an industry or legal standard for
                recognizing or honoring DNT signals, we do not respond to them at this time.
              </p>
            </div>
          </section>

          {/* ── 14. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? ── */}
          <section id="us-privacy-rights" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              14. Do United States residents have specific privacy rights?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> If you are a resident of
                  California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky,
                  Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode
                  Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request
                  access to and receive details about the personal information we maintain about you
                  and how we have processed it, correct inaccuracies, get a copy of, or delete your
                  personal information. You may also have the right to withdraw your consent to our
                  processing of your personal information. These rights may be limited in some
                  circumstances by applicable law. More information is provided below.
                </em>
              </p>

              <h3 className="text-lg font-semibold text-text-primary">
                Categories of Personal Information We Collect
              </h3>
              <p>
                The table below shows the categories of personal information we have collected in
                the past twelve (12) months. The table includes illustrative examples of each
                category and does not reflect the personal information we collect from you. For a
                comprehensive inventory of all personal information we process, please refer to the
                section &quot;
                <a href="#information-we-collect" className="text-primary hover:underline">
                  WHAT INFORMATION DO WE COLLECT?
                </a>
                &quot;
              </p>

              {/* Categories table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border text-sm">
                  <thead>
                    <tr className="bg-surface-secondary">
                      <th className="border border-border px-4 py-3 text-left font-semibold text-text-primary">
                        Category
                      </th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-text-primary">
                        Examples
                      </th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-text-primary">
                        Collected
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-3">A. Identifiers</td>
                      <td className="border border-border px-4 py-3">
                        Contact details, such as real name, alias, postal address, telephone or
                        mobile contact number, unique personal identifier, online identifier,
                        Internet Protocol address, email address, and account name
                      </td>
                      <td className="border border-border px-4 py-3 text-center">YES</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">
                        B. Personal information as defined in the California Customer Records
                        statute
                      </td>
                      <td className="border border-border px-4 py-3">
                        Name, contact information, education, employment, employment history, and
                        financial information
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">
                        C. Protected classification characteristics under state or federal law
                      </td>
                      <td className="border border-border px-4 py-3">
                        Gender, age, date of birth, race and ethnicity, national origin, marital
                        status, and other demographic data
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">D. Commercial information</td>
                      <td className="border border-border px-4 py-3">
                        Transaction information, purchase history, financial details, and payment
                        information
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">E. Biometric information</td>
                      <td className="border border-border px-4 py-3">
                        Fingerprints and voiceprints
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">
                        F. Internet or other similar network activity
                      </td>
                      <td className="border border-border px-4 py-3">
                        Browsing history, search history, online behavior, interest data, and
                        interactions with our and other websites, applications, systems, and
                        advertisements
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">G. Geolocation data</td>
                      <td className="border border-border px-4 py-3">Device location</td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">
                        H. Audio, electronic, sensory, or similar information
                      </td>
                      <td className="border border-border px-4 py-3">
                        Images and audio, video or call recordings created in connection with our
                        business activities
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">
                        I. Professional or employment-related information
                      </td>
                      <td className="border border-border px-4 py-3">
                        Business contact details in order to provide you our Services at a business
                        level or job title, work history, and professional qualifications if you
                        apply for a job with us
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">J. Education Information</td>
                      <td className="border border-border px-4 py-3">
                        Student records and directory information
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">
                        K. Inferences drawn from collected personal information
                      </td>
                      <td className="border border-border px-4 py-3">
                        Inferences drawn from any of the collected personal information listed above
                        to create a profile or summary about, for example, an individual&apos;s
                        preferences and characteristics
                      </td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">
                        L. Sensitive personal Information
                      </td>
                      <td className="border border-border px-4 py-3"></td>
                      <td className="border border-border px-4 py-3 text-center">NO</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                We may also collect other personal information outside of these categories through
                instances where you interact with us in person, online, or by phone or mail in the
                context of:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Receiving help through our customer support channels;</li>
                <li>Participation in customer surveys or contests; and</li>
                <li>
                  Facilitation in the delivery of our Services and to respond to your inquiries.
                </li>
              </ul>
              <p>
                We will use and retain the collected personal information as needed to provide the
                Services or for:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Category A - As long as the user has an account with us</li>
              </ul>

              <h3 className="text-lg font-semibold text-text-primary">
                Sources of Personal Information
              </h3>
              <p>
                Learn more about the sources of personal information we collect in &quot;
                <a href="#information-we-collect" className="text-primary hover:underline">
                  WHAT INFORMATION DO WE COLLECT?
                </a>
                &quot;
              </p>

              <h3 className="text-lg font-semibold text-text-primary">
                How We Use and Share Personal Information
              </h3>
              <p>
                Learn more about how we use your personal information in the section, &quot;
                <a href="#how-we-process" className="text-primary hover:underline">
                  HOW DO WE PROCESS YOUR INFORMATION?
                </a>
                &quot;
              </p>

              <p>
                <strong className="text-text-primary">
                  Will your information be shared with anyone else?
                </strong>
              </p>
              <p>
                We may disclose your personal information with our service providers pursuant to a
                written contract between us and each service provider. Learn more about how we
                disclose personal information to in the section, &quot;
                <a href="#sharing-personal-information" className="text-primary hover:underline">
                  WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </a>
                &quot;
              </p>
              <p>
                We may use your personal information for our own business purposes, such as for
                undertaking internal research for technological development and demonstration. This
                is not considered to be &quot;selling&quot; of your personal information.
              </p>
              <p>
                We have not sold or shared any personal information to third parties for a business
                or commercial purpose in the preceding twelve (12) months. We have disclosed the
                following categories of personal information to third parties for a business or
                commercial purpose in the preceding twelve (12) months:
              </p>
              <p>
                The categories of third parties to whom we disclosed personal information for a
                business or commercial purpose can be found under &quot;
                <a href="#sharing-personal-information" className="text-primary hover:underline">
                  WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </a>
                &quot;
              </p>

              <h3 className="text-lg font-semibold text-text-primary">Your Rights</h3>
              <p>
                You have rights under certain US state data protection laws. However, these rights
                are not absolute, and in certain cases, we may decline your request as permitted by
                law. These rights include:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-text-primary">Right to know</strong> whether or not we are
                  processing your personal data
                </li>
                <li>
                  <strong className="text-text-primary">Right to access</strong> your personal data
                </li>
                <li>
                  <strong className="text-text-primary">Right to correct</strong> inaccuracies in
                  your personal data
                </li>
                <li>
                  <strong className="text-text-primary">Right to request</strong> the deletion of
                  your personal data
                </li>
                <li>
                  <strong className="text-text-primary">Right to obtain a copy</strong> of the
                  personal data you previously shared with us
                </li>
                <li>
                  <strong className="text-text-primary">Right to non-discrimination</strong> for
                  exercising your rights
                </li>
                <li>
                  <strong className="text-text-primary">Right to opt out</strong> of the processing
                  of your personal data if it is used for targeted advertising (or sharing as
                  defined under California&apos;s privacy law), the sale of personal data, or
                  profiling in furtherance of decisions that produce legal or similarly significant
                  effects (&quot;profiling&quot;)
                </li>
              </ul>
              <p>
                Depending upon the state where you live, you may also have the following rights:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Right to obtain a list of the categories of third parties to which we have
                  disclosed personal data (as permitted by applicable law, including
                  California&apos;s and Delaware&apos;s privacy law)
                </li>
                <li>
                  Right to obtain a list of specific third parties to which we have disclosed
                  personal data (as permitted by applicable law, including Oregon&apos;s privacy
                  law)
                </li>
                <li>
                  Right to limit use and disclosure of sensitive personal data (as permitted by
                  applicable law, including California&apos;s privacy law)
                </li>
                <li>
                  Right to opt out of the collection of sensitive data and personal data collected
                  through the operation of a voice or facial recognition feature (as permitted by
                  applicable law, including Florida&apos;s privacy law)
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-text-primary">
                How to Exercise Your Rights
              </h3>
              <p>
                To exercise these rights, you can contact us by visiting{' '}
                <a href="mailto:legal@multicorn.ai" className="text-primary hover:underline">
                  legal@multicorn.ai
                </a>
                , or by referring to the contact details at the bottom of this document.
              </p>
              <p>
                Under certain US state data protection laws, you can designate an authorized agent
                to make a request on your behalf. We may deny a request from an authorized agent
                that does not submit proof that they have been validly authorized to act on your
                behalf in accordance with applicable laws.
              </p>

              <h3 className="text-lg font-semibold text-text-primary">Request Verification</h3>
              <p>
                Upon receiving your request, we will need to verify your identity to determine you
                are the same person about whom we have the information in our system. We will only
                use personal information provided in your request to verify your identity or
                authority to make the request. However, if we cannot verify your identity from the
                information already maintained by us, we may request that you provide additional
                information for the purposes of verifying your identity and for security or
                fraud-prevention purposes.
              </p>
              <p>
                If you submit the request through an authorized agent, we may need to collect
                additional information to verify your identity before processing your request and
                the agent will need to provide a written and signed permission from you to submit
                such request on your behalf.
              </p>

              <h3 className="text-lg font-semibold text-text-primary">Appeals</h3>
              <p>
                Under certain US state data protection laws, if we decline to take action regarding
                your request, you may appeal our decision by emailing us at{' '}
                <a href="mailto:legal@multicorn.ai" className="text-primary hover:underline">
                  legal@multicorn.ai
                </a>
                . We will inform you in writing of any action taken or not taken in response to the
                appeal, including a written explanation of the reasons for the decisions. If your
                appeal is denied, you may contact your state attorney general to submit a complaint.
              </p>

              <h3 className="text-lg font-semibold text-text-primary">
                California &quot;Shine The Light&quot; Law
              </h3>
              <p>
                California Civil Code Section 1798.83, also known as the &quot;Shine The Light&quot;
                law permits our users who are California residents to request and obtain from us,
                once a year and free of charge, information about categories of personal information
                (if any) we disclosed to third parties for direct marketing purposes and the names
                and addresses of all third parties with which we shared personal information in the
                immediately preceding calendar year. If you are a California resident and would like
                to make such a request, please submit your request in writing to us using the
                contact information provided below.
              </p>
              <p>
                If you are under 18 years of age, reside in California, and have a registered
                account with the Services, you have the right to request removal of unwanted data
                that you publicly post on the Services. To request removal of such data, please
                contact us using the contact information provided below and include the email
                address associated with your account and a statement that you reside in California.
                We will make sure the data is not publicly displayed on the Services, but please be
                aware that the data may not be completely or comprehensively removed from all our
                systems (e.g., backups, etc.).
              </p>
            </div>
          </section>

          {/* ── 15. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS? ── */}
          <section id="other-regions" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              15. Do other regions have specific privacy rights?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> You may have additional
                  rights based on the country you reside in.
                </em>
              </p>

              <h3 className="text-lg font-semibold text-text-primary">Australia and New Zealand</h3>
              <p>
                We collect and process your personal information under the obligations and
                conditions set by Australia&apos;s Privacy Act 1988 and New Zealand&apos;s Privacy
                Act 2020 (Privacy Act).
              </p>
              <p>
                This Privacy Notice satisfies the notice requirements defined in both Privacy Acts,
                in particular: what personal information we collect from you, from which sources,
                for which purposes, and other recipients of your personal information.
              </p>
              <p>
                If you do not wish to provide the personal information necessary to fulfill their
                applicable purpose, it may affect our ability to provide our services, in
                particular:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Offer you the products or services that you want</li>
                <li>Respond to or help with your requests</li>
              </ul>
              <p>
                At any point, you have the right to request access to or correction of your personal
                information. You can make such a request by contacting us by using the contact
                details provided in the section &quot;
                <a href="#review-update-delete" className="text-primary hover:underline">
                  HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                </a>
                &quot;
              </p>
              <p>
                If you believe we are unlawfully processing your personal information, you have the
                right to submit a complaint about a breach of the Australian Privacy Principles to
                the{' '}
                <a
                  href="https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Office of the Australian Information Commissioner
                </a>{' '}
                and a breach of New Zealand&apos;s Privacy Act 2020 to the{' '}
                <a
                  href="https://www.privacy.org.nz/your-rights/making-a-complaint/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Office of New Zealand Privacy Commissioner
                </a>
                .
              </p>

              <h3 className="text-lg font-semibold text-text-primary">Republic of South Africa</h3>
              <p>
                At any time, you have the right to request access to or correction of your personal
                information. You can make such a request by contacting us by using the contact
                details provided in the section &quot;
                <a href="#review-update-delete" className="text-primary hover:underline">
                  HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                </a>
                &quot;
              </p>
              <p>
                If you are unsatisfied with the manner in which we address any complaint with regard
                to our processing of personal information, you can contact the office of the
                regulator, the Information Regulator (South Africa):
              </p>
              <ul className="list-none space-y-1 pl-6">
                <li>
                  General enquiries:{' '}
                  <a
                    href="mailto:enquiries@inforegulator.org.za"
                    className="text-primary hover:underline"
                  >
                    enquiries@inforegulator.org.za
                  </a>
                </li>
                <li>
                  Complaints (complete PAIA/POPIA form 5):{' '}
                  <a
                    href="mailto:PAIAComplaints@inforegulator.org.za"
                    className="text-primary hover:underline"
                  >
                    PAIAComplaints@inforegulator.org.za
                  </a>{' '}
                  &amp;{' '}
                  <a
                    href="mailto:POPIAComplaints@inforegulator.org.za"
                    className="text-primary hover:underline"
                  >
                    POPIAComplaints@inforegulator.org.za
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* ── 16. DO WE MAKE UPDATES TO THIS NOTICE? ── */}
          <section id="updates" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              16. Do we make updates to this notice?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                <em>
                  <strong className="text-text-primary">In Short:</strong> Yes, we will update this
                  notice as necessary to stay compliant with relevant laws.
                </em>
              </p>
              <p>
                We may update this Privacy Notice from time to time. The updated version will be
                indicated by an updated &quot;Revised&quot; date at the top of this Privacy Notice.
                If we make material changes to this Privacy Notice, we may notify you either by
                prominently posting a notice of such changes or by directly sending you a
                notification. We encourage you to review this Privacy Notice frequently to be
                informed of how we are protecting your information.
              </p>
            </div>
          </section>

          {/* ── 17. HOW CAN YOU CONTACT US ABOUT THIS NOTICE? ── */}
          <section id="contact" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              17. How can you contact us about this notice?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                If you have questions or comments about this notice, you may email us at{' '}
                <a href="mailto:legal@multicorn.ai" className="text-primary hover:underline">
                  legal@multicorn.ai
                </a>
                .
              </p>
            </div>
          </section>

          {/* ── 18. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU? ── */}
          <section id="review-update-delete" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              18. How can you review, update, or delete the data we collect from you?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Based on the applicable laws of your country or state of residence in the US, you
                may have the right to request access to the personal information we collect from
                you, details about how we have processed it, correct inaccuracies, or delete your
                personal information. You may also have the right to withdraw your consent to our
                processing of your personal information. These rights may be limited in some
                circumstances by applicable law. To request to review, update, or delete your
                personal information, please visit:{' '}
                <a href="mailto:legal@multicorn.ai" className="text-primary hover:underline">
                  legal@multicorn.ai
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
