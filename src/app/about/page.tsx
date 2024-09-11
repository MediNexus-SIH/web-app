import RevealAnimation from "@/components/framer-motion/revealAnimation";
import { SiteHeader2 } from "@/components/SiteHeader2";
import Link from "next/link";

export default function About() {
  return (
    <div>
      <SiteHeader2 />
      <RevealAnimation>
        <div className="min-h-screen p-8">
          {/* Mission Section */}
          <section className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Our Mission</h1>
            <p className="text-lg  mx-auto">
              Empowering pharmaceutical supply chains with advanced technology
              to ensure safe, efficient, and transparent drug distribution
              worldwide. We strive to create a seamless link between
              manufacturers, suppliers, and healthcare providers to promote
              efficiency and reliability in the healthcare industry.
            </p>
          </section>

          {/* Our Story Section */}
          <section className="py-16">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="max-w-4xl mx-auto">
              Founded with the vision to solve critical challenges in
              pharmaceutical supply chains, we recognized early on the pressing
              need for innovation. Issues like drug shortages, counterfeit
              medicines, and inefficient inventory management were hindering
              patient care. To address these, we built a platform that
              integrates blockchain technology, advanced analytics, and seamless
              batch tracking, revolutionizing how drugs are tracked, managed,
              and distributed.
            </p>
            <p className="mt-4 max-w-4xl mx-auto">
              Over the years, we have grown into a trusted partner for
              healthcare institutions, using our expertise to develop solutions
              that ensure transparency, compliance, and efficiency at every step
              of the pharmaceutical supply chain.
            </p>
          </section>

          {/* Our Technology Section */}
          <section className="py-16">
            <h2 className="text-2xl font-bold mb-6">Our Technology</h2>
            <p className="max-w-4xl mx-auto">
              At the core of our platform is a commitment to innovation. We
              leverage blockchain technology to ensure secure, immutable records
              for every transaction, providing unprecedented transparency across
              the supply chain. With real-time inventory tracking, detailed
              demand analysis, and integrated payment solutions, we enable
              stakeholders to make informed decisions and streamline operations.
            </p>
            <p className="mt-4 max-w-4xl mx-auto">
              Our batch tracking and recall management features offer full
              traceability from manufacturer to patient, ensuring the safety and
              integrity of pharmaceutical products. Coupled with advanced
              analytics, our system helps identify patterns, optimize inventory
              levels, and predict demand with accuracy, reducing waste and
              minimizing stock shortages.
            </p>
          </section>

          {/* Core Values Section */}
          <section className="py-16">
            <h2 className="text-2xl font-bold mb-6">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Trust</h3>
                <p className="mt-2">
                  We prioritize the safety and transparency of every transaction
                  to build lasting trust with our partners.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="mt-2">
                  Constantly pushing the boundaries of what technology can
                  achieve in healthcare supply chains.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Reliability</h3>
                <p className="mt-2">
                  Ensuring that every solution we provide is robust, scalable,
                  and capable of supporting critical healthcare needs.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Commitment</h3>
                <p className="mt-2">
                  Dedicated to improving global healthcare through technology
                  that enhances the efficiency of pharmaceutical distribution.
                </p>
              </div>
            </div>
          </section>

          {/* <LeadershipSection/> */}
          <section className="py-16 text-center">
            <p>
              Interested in joining us to revolutionize pharmaceutical
              logistics?{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact us
              </Link>
              .
            </p>
          </section>
        </div>
      </RevealAnimation>
    </div>
  );
}


const LeadershipSection = ()=>{
  return (
    <section className="py-16 ">
      <h2 className="text-2xl font-bold mb-6">Leadership Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center">
          <h3 className="text-xl font-semibold">Dhruv Dawar</h3>
          <p className="mt-2">Dumbo Dawar</p>
          <p className="mt-2">
            Dhruv, our team lead, may be new but brings strong leadership and
            enthusiasm, driving the team toward success in supply chain and
            pharmaceutical tech.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Arnav Singhal</h3>
          <p className="mt-2">Lambu No.1</p>
          <p className="mt-2">
            Arnav, a web development genius, builds scalable, high-performance
            platforms, ensuring our digital infrastructure is always top-tier.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Arnav Nigam</h3>
          <p className="mt-2">Nigga</p>
          <p className="mt-2">
            Arnav optimizes operations, ensuring smooth pharmaceutical
            distribution and efficient supply chain management.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Dharmeshwar Sharma</h3>
          <p className="mt-2">Fatty Dharmu</p>
          <p className="mt-2">
            Dharmeshwar leads app development, creating seamless, responsive
            platforms for real-time inventory management and tracking.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Aryav Gupta</h3>
          <p className="mt-2">Lambu No. 2</p>
          <p className="mt-2">
            Aryav powers our predictive capabilities with advanced machine
            learning and AI, improving demand forecasting and inventory
            optimization.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Ananya Mangal</h3>
          <p className="mt-2">Skill Issue</p>
          <p className="mt-2">
            Ananya integrates blockchain technology, ensuring secure,
            transparent tracking of transactions and inventory across the supply
            chain.
          </p>
        </div>
      </div>
    </section>
  );
}