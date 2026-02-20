import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Multicorn',
  description:
    'How Multicorn collects, uses, and protects your data. Privacy policy for multicorn.ai and the Multicorn Shield SDK.',
  openGraph: {
    title: 'Privacy Policy — Multicorn',
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
                  <a href="https://multicorn.ai" className="text-primary hover:underline">
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
                <a href="mailto:rachelle@multicorn.ai" className="text-primary hover:underline">
                  rachelle@multicorn.ai
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
                <a href="mailto:rachelle@multicorn.ai" className="text-primary hover:underline">
                  rachelle@multicorn.ai
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
                with innovative solutions. The terms in this Privacy Notice govern your use of the
                AI Products within our Services.
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
        </div>
      </main>
      <Footer />
    </>
  )
}
