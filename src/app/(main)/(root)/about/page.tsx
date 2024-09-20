import { StatCards, TeamCards } from "@/components";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <article className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16">
        <section className="flex flex-col gap-6 lg:flex-[3]">
          <h1 className="text-4xl md:text-5xl font-poppins font-light text-center lg:text-left text-gray-800">
            Our Story
          </h1>
          <Separator className="bg-gray-300" />
          <div className="space-y-4 text-gray-600">
            <p className="font-light leading-relaxed">
              Launched in 2015, Amazin is South Asia's premier online shopping
              marketplace with an active presence in Bangladesh. Supported by a
              wide range of tailored marketing, data, and service solutions,
              Exclusive has 10,500 sellers and 300 brands and serves 3 million
              customers across the region.
            </p>
            <p className="font-light leading-relaxed">
              Amazin has more than 1 million products to offer, growing at a
              very fast pace. Exclusive offers a diverse assortment in
              categories ranging from consumer goods to electronics.
            </p>
          </div>
        </section>
        <div className="lg:flex-[2] flex items-center justify-center">
          <Image
            src="/about.png"
            width={400}
            height={400}
            alt="About Exclusive"
            priority
            className="rounded-lg shadow-xl object-cover w-full max-w-md"
          />
        </div>
      </article>

      <section className="mb-16">
        <h2 className="text-3xl font-poppins font-light text-center mb-8 text-gray-800">
          Our Impact
        </h2>
        <StatCards />
      </section>

      <section>
        <h2 className="text-3xl font-poppins font-light text-center mb-8 text-gray-800">
          Meet Our Team
        </h2>
        <TeamCards />
      </section>
    </div>
  );
}
