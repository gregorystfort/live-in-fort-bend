import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Live In Fort Bend - your guide to living in Fort Bend County, Texas.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-surface py-16">
        <div className="container-blog max-w-3xl">
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-charcoal mb-4">
            About Live In Fort Bend
          </h1>
          <p className="font-body text-lg text-slate-muted">
            Your definitive guide to Fort Bend County, Texas.
          </p>
        </div>
      </section>

      <section className="container-blog max-w-3xl py-12">
        <div className="prose prose-lg max-w-none font-body text-charcoal leading-relaxed space-y-6">
          <p>
            Fort Bend County is one of the most diverse and fastest-growing
            counties in the United States. From the tree-lined streets of Sugar
            Land to the historic charm of Richmond, from the master-planned
            communities of Fulshear to the vibrant culture of Missouri City -
            there is something for everyone here.
          </p>
          <p>
            <strong className="font-heading font-semibold">
              Live In Fort Bend
            </strong>{" "}
            was created to be the go-to resource for anyone living in, moving
            to, or curious about Fort Bend County. We cover everything that
            matters to residents and future residents:
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Neighborhoods</strong> - Deep dives into communities,
              what makes them unique, and who they are perfect for
            </li>
            <li>
              <strong>Schools</strong> - District updates, ratings, and
              enrollment insights
            </li>
            <li>
              <strong>Dining</strong> - Restaurant reviews, new openings, and
              hidden gems
            </li>
            <li>
              <strong>Events</strong> - Local happenings, festivals, and
              community gatherings
            </li>
            <li>
              <strong>Real Estate</strong> - Market updates, home buying tips,
              and neighborhood comparisons
            </li>
            <li>
              <strong>Things To Do</strong> - Activities, parks,
              entertainment, and family fun
            </li>
          </ul>
          <p>
            Whether you are a lifelong resident or just starting to explore
            what Fort Bend has to offer, we are here to help you discover
            why this is one of the best places to call home in Texas.
          </p>
        </div>
      </section>
    </>
  );
}
