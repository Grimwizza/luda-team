import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--bg-muted)", color: "var(--fg-muted)", borderTopColor: "var(--border)" }}
      className="border-t mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/LUDA-lite.gif"
              alt="Lakeville Ultimate Disc Association"
              width={80}
              height={80}
              unoptimized
              draggable={false}
              className="mb-3"
            />
            <p className="font-black text-sm" style={{ color: "var(--fg)" }}>The Crayons</p>
            <p className="text-sm mt-0.5">Lakeville Ultimate Disc Association</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--fg)" }}>
              Quick Links
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              {([
                ["/team",     "Team Roster"],
                ["/schedule", "Schedule"],
                ["/gallery",  "Gallery"],
                ["/board",    "Board"],
                ["/register", "Register"],
                ["/contact",  "Contact"],

              ] as [string, string][]).map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:opacity-80 transition-opacity w-fit"
                  style={{ color: "var(--accent)" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--fg)" }}>
              Follow Us
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://www.instagram.com/lakevillenorthultimate/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: "var(--fg)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/instagram-icon.png" alt="Instagram" className="w-4 h-4 rounded-sm" />
                @lakevillenorthultimate
              </a>
              <a
                href="https://www.band.us/band/101047291/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: "var(--fg)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/band-icon.png" alt="Band App" className="w-4 h-4 rounded-sm" />
                Band App — Team Chat
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  Invite Only
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          style={{ borderTopColor: "var(--border)" }}
          className="border-t mt-8 pt-6 text-xs text-center"
        >
          {"©"} {new Date().getFullYear()} LUDA.team {"·"} The Crayons {"·"} Lakeville Ultimate Disc Association
        </div>
      </div>
    </footer>
  );
}



