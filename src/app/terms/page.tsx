import RevealAnimation from "@/components/framer-motion/revealAnimation"
import { SiteHeader2 } from "@/components/SiteHeader2"

export default function Terms() {
  return (
    <div>
      <SiteHeader2 />
      <RevealAnimation>
        <div className="bg-background text-foreground">
          <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Terms and Conditions
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Welcome to our hospital inventory management, demand analysis,
                  order tracking, expiry tracking, and multi-hospital resource
                  sharing website. By accessing or using our website, you agree
                  to be bound by these terms and conditions.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold">User Responsibilities</h2>
                <p className="mt-2 text-muted-foreground">
                  As a user of our website, you are responsible for maintaining
                  the confidentiality of your account and password, and for
                  restricting access to your computer. You agree to be
                  responsible for all activities that occur under your account
                  or password. You must comply with all applicable laws, rules,
                  and regulations in connection with your use of the website.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold">Data Privacy</h2>
                <p className="mt-2 text-muted-foreground">
                  We take the privacy of your data seriously. We will collect
                  and use your personal information in accordance with our
                  Privacy Policy, which is available on our website. By using
                  our website, you consent to the collection and use of your
                  personal information as described in our Privacy Policy.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  Intellectual Property Rights
                </h2>
                <p className="mt-2 text-muted-foreground">
                  The website and its content, features, and functionality are
                  owned by our company and are protected by international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property or proprietary rights laws. You may not
                  modify, copy, distribute, transmit, display, reproduce, or
                  create derivative works from the website or its content.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold">Limitation of Liability</h2>
                <p className="mt-2 text-muted-foreground">
                  In no event shall our company be liable for any indirect,
                  special, incidental, or consequential damages, including but
                  not limited to, damages for loss of profits, goodwill, use,
                  data, or other intangible losses (even if our company has been
                  advised of the possibility of such damages), resulting from
                  your use of or inability to use the website or the performance
                  or non-performance of the website.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold">Dispute Resolution</h2>
                <p className="mt-2 text-muted-foreground">
                  Any dispute, controversy, or claim arising out of or relating
                  to these terms and conditions, or the breach, termination, or
                  validity thereof, shall be resolved by binding arbitration in
                  accordance with the rules of the American Arbitration
                  Association. The arbitration shall be conducted in the city
                  where our company&apos;s principal office is located, and the
                  arbitrator&apos;s decision shall be final and binding on the
                  parties.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  Changes to Terms and Conditions
                </h2>
                <p className="mt-2 text-muted-foreground">
                  We reserve the right to modify these terms and conditions at
                  any time. Any changes will be effective immediately upon
                  posting the revised terms and conditions on the website. Your
                  continued use of the website after any such changes
                  constitutes your acceptance of the new terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealAnimation>
    </div>
  );
}
