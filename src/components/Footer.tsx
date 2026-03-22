import Link from "next/link";

const categories = [
  { name: "Neighborhoods", slug: "neighborhoods" },
  { name: "Schools", slug: "schools" },
  { name: "Dining", slug: "dining" },
  { name: "Events", slug: "events" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Things To Do", slug: "things-to-do" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white mt-20">
      <div className="container-blog py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-blue-300 font-heading font-medium text-lg">
                live in
              </span>
              <span className="text-white font-heading font-extrabold text-lg">
                fort bend
              </span>
              <span className="text-brand-sky font-heading font-extrabold text-lg">
                .
              </span>
            </div>
            <p className="text-blue-200 text-sm font-body leading-relaxed">
              Your definitive guide to living in Fort Bend County, Texas.
              Neighborhoods, schools, dining, events, and real estate insights.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog/category/${cat.slug}`}
                    className="text-blue-200 hover:text-white text-sm font-body transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">
              About
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-blue-200 hover:text-white text-sm font-body transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-300 text-xs font-body">
            &copy; {year} Live In Fort Bend. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
