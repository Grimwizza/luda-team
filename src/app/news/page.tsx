import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | The Crayons LUDA",
};

// Placeholder posts — replace with Notion CMS fetch
const POSTS = [
  {
    slug:    "spring-season-kickoff",
    title:   "Spring Season Kicks Off This Weekend!",
    date:    "May 1, 2026",
    excerpt: "The Crayons are back on the field! Here's everything you need to know about our spring league schedule, practice times, and what to bring.",
    tag:     "Announcement",
  },
  {
    slug:    "tournament-recap-april",
    title:   "Tournament Recap — April Invitational",
    date:    "April 22, 2026",
    excerpt: "We went 4-2 at the April Invitational and had an incredible time. Read the full recap from coach and players.",
    tag:     "Recap",
  },
  {
    slug:    "registration-open",
    title:   "2026 Registration Is Now Open",
    date:    "March 15, 2026",
    excerpt: "Sign up for the 2026 season! Registration closes April 1st. See the register page for cost breakdown and forms.",
    tag:     "Important",
  },
];

const tagColor: Record<string, string> = {
  Announcement: "#1A6B3C",
  Recap:        "#1A3C8B",
  Important:    "#D00000",
};

export default function NewsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-2" style={{ color: "var(--fg)" }}>Team News</h1>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        Updates and announcements from The Crayons. Powered by Notion CMS.
      </p>

      <div className="flex flex-col gap-6">
        {POSTS.map((post) => (
          <article
            key={post.slug}
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="border rounded-3xl p-7 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: tagColor[post.tag] ?? "#555" }}
              >
                {post.tag}
              </span>
              <span className="text-xs font-semibold" style={{ color: "var(--fg-muted)" }}>
                {post.date}
              </span>
            </div>
            <h2 className="text-xl font-black mb-2 leading-snug" style={{ color: "var(--fg)" }}>
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
              {post.excerpt}
            </p>
            <button
              style={{ color: "var(--accent)" }}
              className="text-sm font-bold underline underline-offset-2 hover:opacity-70"
            >
              Read more →
            </button>
          </article>
        ))}
      </div>

      {/* Notion CMS note */}
      <div
        style={{ backgroundColor: "var(--bg-muted)", borderColor: "var(--card-border)" }}
        className="mt-12 border rounded-3xl p-6 text-center"
      >
        <p className="font-bold" style={{ color: "var(--fg)" }}>📝 Notion CMS Integration Ready</p>
        <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
          Replace the placeholder posts array with a Notion API fetch using{" "}
          <code className="font-mono text-xs bg-black/10 px-1 py-0.5 rounded">@notionhq/client</code>.
        </p>
      </div>
    </div>
  );
}
