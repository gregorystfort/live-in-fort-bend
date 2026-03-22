import Link from "next/link";

const categories = [
  { name: "Neighborhoods", slug: "neighborhoods" },
  { name: "Schools", slug: "schools" },
  { name: "Dining", slug: "dining" },
  { name: "Events", slug: "events" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Things To Do", slug: "things-to-do" },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container-blog">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-1 group">
            <span className="text-slate-muted font-heading font-medium text-lg tracking-tight">
              live in
            </span>
            <span className="text-brand-navy font-heading font-extrabold text-lg tracking-tight">
              fort bend
            </span>
            <span className="text-brand-sky font-heading font-extrabold text-lg">
              .
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="px-3 py-2 text-sm font-body font-medium text-gray-600 hover:text-brand-sky transition-colors rounded-lg hover:bg-surface"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
