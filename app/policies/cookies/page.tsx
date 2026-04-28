import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | Multicorn',
  description: 'How Multicorn uses cookies and similar technologies on multicorn.ai.',
  openGraph: {
    title: 'Cookie Policy | Multicorn',
    description: 'How Multicorn uses cookies and similar technologies on multicorn.ai.',
    url: 'https://multicorn.ai/policies/cookies',
    siteName: 'Multicorn',
    type: 'website',
  },
}

export default function CookiePolicyPage() {
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
            Cookie policy
          </h1>
          <p className="mb-12 text-sm text-text-secondary">Last updated February 20, 2026</p>

          {/* ── INTRODUCTION ── */}
          <section className="mb-12">
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                This Cookie Policy explains how Multicorn AI Pty Ltd (&quot;
                <strong className="text-text-primary">Company</strong>,&quot; &quot;
                <strong className="text-text-primary">we</strong>,&quot; &quot;
                <strong className="text-text-primary">us</strong>,&quot; and &quot;
                <strong className="text-text-primary">our</strong>&quot;) uses cookies and similar
                technologies to recognize you when you visit our website at{' '}
                <a
                  href="https://multicorn.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://multicorn.ai
                </a>{' '}
                (&quot;<strong className="text-text-primary">Website</strong>&quot;). It explains
                what these technologies are and why we use them, as well as your rights to control
                our use of them.
              </p>
              <p>
                In some cases we may use cookies to collect personal information, or that becomes
                personal information if we combine it with other information.
              </p>
            </div>
          </section>

          {/* ── WHAT ARE COOKIES? ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">What are cookies?</h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Cookies are small data files that are placed on your computer or mobile device when
                you visit a website. Cookies are widely used by website owners in order to make
                their websites work, or to work more efficiently, as well as to provide reporting
                information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Multicorn AI Pty Ltd) are called
                &quot;first-party cookies.&quot; Cookies set by parties other than the website owner
                are called &quot;third-party cookies.&quot; Third-party cookies enable third-party
                features or functionality to be provided on or through the website (e.g.,
                advertising, interactive content, and analytics). The parties that set these
                third-party cookies can recognize your computer both when it visits the website in
                question and also when it visits certain other websites.
              </p>
            </div>
          </section>

          {/* ── WHY DO WE USE COOKIES? ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">Why do we use cookies?</h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                We use first- and third-party cookies for several reasons. Some cookies are required
                for technical reasons in order for our Website to operate, and we refer to these as
                &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies also
                enable us to track and target the interests of our users to enhance the experience
                on our Online Properties. Third parties serve cookies through our Website for
                advertising, analytics, and other purposes. This is described in more detail below.
              </p>
            </div>
          </section>

          {/* ── HOW CAN I CONTROL COOKIES? ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              How can I control cookies?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise
                your cookie rights by setting your preferences in the Cookie Preference Center. The
                Cookie Preference Center allows you to select which categories of cookies you accept
                or reject. Essential cookies cannot be rejected as they are strictly necessary to
                provide you with services.
              </p>
              <p>
                The Cookie Preference Center can be found in the notification banner and on our
                Website. If you choose to reject cookies, you may still use our Website though your
                access to some functionality and areas of our Website may be restricted. You may
                also set or amend your web browser controls to accept or refuse cookies.
              </p>
              <p>
                The specific types of first- and third-party cookies served through our Website and
                the purposes they perform are described in the table below (please note that the
                specific cookies served may vary depending on the specific Online Properties you
                visit):
              </p>
            </div>
          </section>

          {/* ── HOW CAN I CONTROL COOKIES ON MY BROWSER? ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              How can I control cookies on my browser?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                As the means by which you can refuse cookies through your web browser controls vary
                from browser to browser, you should visit your browser&apos;s help menu for more
                information. The following is information about how to manage cookies on the most
                popular browsers:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Internet Explorer
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Edge
                  </a>
                </li>
                <li>
                  <a
                    href="https://help.opera.com/en/latest/web-preferences/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Opera
                  </a>
                </li>
              </ul>
              <p>
                In addition, most advertising networks offer you a way to opt out of targeted
                advertising. If you would like to find out more information, please visit:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <a
                    href="https://optout.aboutads.info/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Advertising Alliance
                  </a>
                </li>
                <li>
                  <a
                    href="https://youradchoices.ca/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Advertising Alliance of Canada
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youronlinechoices.com/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    European Interactive Digital Advertising Alliance
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* ── WHAT ABOUT OTHER TRACKING TECHNOLOGIES? ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              What about other tracking technologies, like web beacons?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Cookies are not the only way to recognize or track visitors to a website. We may use
                other, similar technologies from time to time, like web beacons (sometimes called
                &quot;tracking pixels&quot; or &quot;clear gifs&quot;). These are tiny graphics
                files that contain a unique identifier that enables us to recognize when someone has
                visited our Website or opened an email including them. This allows us, for example,
                to monitor the traffic patterns of users from one page within a website to another,
                to deliver or communicate with cookies, to understand whether you have come to the
                website from an online advertisement displayed on a third-party website, to improve
                site performance, and to measure the success of email marketing campaigns. In many
                instances, these technologies are reliant on cookies to function properly, and so
                declining cookies will impair their functioning.
              </p>
            </div>
          </section>

          {/* ── FLASH COOKIES ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              Do you use Flash cookies or Local Shared Objects?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Websites may also use so-called &quot;Flash Cookies&quot; (also known as Local
                Shared Objects or &quot;LSOs&quot;) to, among other things, collect and store
                information about our use of our services, fraud prevention, and for other site
                operations.
              </p>
              <p>
                If you do not want Flash Cookies stored on your computer, you can adjust the
                settings of your Flash player to block Flash Cookies storage using the tools
                contained in the{' '}
                <a
                  href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website Storage Settings Panel
                </a>
                . You can also control Flash Cookies by going to the{' '}
                <a
                  href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Global Storage Settings Panel
                </a>{' '}
                and following the instructions (which may include instructions that explain, for
                example, how to delete existing Flash Cookies (referred to &quot;information&quot;
                on the Macromedia site), how to prevent Flash LSOs from being placed on your
                computer without your being asked, and (for Flash Player 8 and later) how to block
                Flash Cookies that are not being delivered by the operator of the page you are on at
                the time).
              </p>
              <p>
                Please note that setting the Flash Player to restrict or limit acceptance of Flash
                Cookies may reduce or impede the functionality of some Flash applications,
                including, potentially, Flash applications used in connection with our services or
                online content.
              </p>
            </div>
          </section>

          {/* ── TARGETED ADVERTISING ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              Do you serve targeted advertising?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Third parties may serve cookies on your computer or mobile device to serve
                advertising through our Website. These companies may use information about your
                visits to this and other websites in order to provide relevant advertisements about
                goods and services that you may be interested in. They may also employ technology
                that is used to measure the effectiveness of advertisements. They can accomplish
                this by using cookies or web beacons to collect information about your visits to
                this and other sites in order to provide relevant advertisements about goods and
                services of potential interest to you. The information collected through this
                process does not enable us or them to identify your name, contact details, or other
                details that directly identify you unless you choose to provide these.
              </p>
            </div>
          </section>

          {/* ── HOW OFTEN WILL YOU UPDATE? ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              How often will you update this Cookie Policy?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example,
                changes to the cookies we use or for other operational, legal, or regulatory
                reasons. Please therefore revisit this Cookie Policy regularly to stay informed
                about our use of cookies and related technologies.
              </p>
              <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>
            </div>
          </section>

          {/* ── FURTHER INFORMATION ── */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              Where can I get further information?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                If you have any questions about our use of cookies or other technologies, please
                email us at{' '}
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
