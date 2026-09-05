import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { InlineCTA } from "@/components/InlineCTA";
import { SiteFooter } from "@/components/SiteFooter";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
  howToSchema,
} from "@/lib/seo";

const SLUG = "watermark-mykad-rental";

const URL = "https://imagemarker.app/en/blog/watermark-mykad-rental";

const HEADLINE =
  "Is It Safe to Send Your IC Copy to a Malaysian Landlord? How to Watermark It First";

const DESCRIPTION =
  "A landlord or agent asked for your MyKad copy on WhatsApp — before you have even seen the unit. When it is reasonable, when it is a red flag, what the PDPA actually says about individual landlords, and how to watermark the copy before you send it.";
const OG = "https://imagemarker.app/og/watermark-mykad-rental.png";

export default function WatermarkMyKadRentalEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "Watermark MyKad Before Sending to a Landlord — Malaysia Rental Guide",
      description: DESCRIPTION,
      canonical: URL,
      locale: "en_US",
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          url: URL,
          datePublished: "2026-09-06",
          dateModified: "2026-09-06",
          image: OG,
        }),
        blogBreadcrumb(HEADLINE, URL, "en"),
        howToSchema({
          name: "How to watermark your MyKad before sending it to a landlord",
          description:
            "Add a purpose-bound watermark to a MyKad photo entirely in your browser, before you send it to a landlord or property agent in Malaysia.",
          steps: [
            {
              name: "Confirm which stage you are at",
              text: "Property viewing rarely requires a copy — offer to show the original for sighting instead. At the tenancy agreement stage a copy is reasonable, so the watermark is the compromise.",
            },
            {
              name: "Open imagemarker.app/en/",
              text: "Open imagemarker.app/en/ on your phone or laptop. No install, no account. The image never leaves your device.",
            },
            {
              name: "Type the recipient, purpose and date",
              text: "For example: For [Landlord full name / Agency name] tenancy agreement only — [address] — 6 Sep 2026. Bind the copy to one landlord, one address and one date.",
            },
            {
              name: "Tile and set opacity",
              text: "Turn on tiled or repeat mode so the text covers the whole card, and set opacity to about 40-60% so the name, NRIC and photo underneath stay readable.",
            },
            {
              name: "Send the watermarked copy only",
              text: "Send the marked version through the same channel the landlord used to ask, then delete the clean original from your gallery so it cannot be forwarded by mistake later.",
            },
          ],
        }),
        faqSchema([
          {
            q: "Is it safe to send my IC copy online in Malaysia?",
            a: "Only when three things are true: the person asking has a legitimate reason (a signed tenancy agreement, KYC for a licensed bank), you know who they actually are, and the copy is watermarked with that recipient, purpose and date. A clean, unmarked IC scan sent to a stranger on WhatsApp is one of the highest-risk things you can do online, because a MyKad copy alone is enough to apply for loans, register SIMs and open accounts in your name. The watermark does not make the transfer risk-free, but it turns a copy that is usable anywhere into one that is visibly out of place anywhere else.",
          },
          {
            q: "Can a landlord in Malaysia legally demand a copy of my MyKad?",
            a: "They can ask, and at the tenancy agreement stage it is normal because they need to identify the person they are entering a contract with. But the request has to be reasonable for that specific purpose. Under the Personal Data Protection Act 2010, an organisation collecting personal data should collect only what is necessary. An individual landlord renting out a single unit for personal purposes may fall outside the PDPA entirely under the personal or household exemption — which means the Act does not force them to protect the copy either. That cuts both ways, and it is exactly why you should watermark before you send.",
          },
          {
            q: "When can I refuse to send my IC copy to an agent?",
            a: "At the viewing stage, easily. There is no contract, no obligation and no lawful purpose that needs a stored copy of your identity document just to walk through a unit. Offer to show the original for sighting when you meet in person, or a heavily watermarked copy marked \"For viewing appointment only\" if the appointment is remote. An agent who refuses to show a property unless you send the full IC copy first is asking for more than the situation requires.",
          },
          {
            q: "Should I black out my NRIC number when sending to a landlord?",
            a: "Not usually. The tenancy agreement identifies both parties by NRIC number, so masking it means signing a document with a number the landlord cannot verify against the copy. What you can mask is anything the landlord does not need for that specific unit — the address on the card if it is not needed for the contract, for example. The bigger lever is the watermark, which binds the copy to that one tenancy agreement and one date.",
          },
          {
            q: "What if the agent asks for my IC copy on WhatsApp before I have even seen the property?",
            a: "Treat that as a signal to slow down. There is no legitimate reason to collect a copy before any relationship exists, and it is one of the standard shapes of property listing fraud in Malaysia — a fake listing lifted from Facebook Marketplace or a real portal, an urgent request for IC and a booking fee, a person who never shows up to a viewing. Ask what the copy is for, verify the listing exists on the agency's official channel, and do not send a clean copy before you have physically seen the unit and met the landlord or a properly credentialled REN or REA agent.",
          },
          {
            q: "Does ImageMarker upload my MyKad to a server?",
            a: "No. Everything runs inside your browser, so the image never leaves your device and there is nothing on our side to store or leak. Switch on flight mode and the tool still works, which is the simplest way to prove it to yourself before you use it on an identity document.",
          },
        ]),
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/en/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/en/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time
              dateTime="2026-09-06"
              className="text-sm text-muted-foreground"
            >
              Published September 2026 &middot; 9 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              {HEADLINE}
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              The message arrives on WhatsApp before you have even seen the
              unit: <em>&quot;Boleh hantar copy IC dulu? Nak reserve the
              room.&quot;</em> The listing looks fine, the rent is reasonable,
              and the agent seems responsive. The whole thing costs you thirty
              seconds if you just send it — and one leaked identity if it goes
              wrong.
            </p>
            <p>
              Renting a room or a unit in Malaysia almost always involves
              handing over a MyKad copy at some point. That much is not
              avoidable. What is worth thinking about is <em>which point</em>,
              to <em>whom</em>, and what is written on the copy when it goes.
              This guide walks through when a landlord actually needs a copy,
              when they are asking for more than the situation requires, how
              the Personal Data Protection Act 2010 applies to individual
              landlords (the answer surprises most people), and how to
              watermark the copy before you send it — free, in your browser,
              without the file ever being uploaded anywhere.
            </p>
            <p>
              If you want the general playbook for MyKad copies across banks,
              telcos and employers as well, we cover that in{" "}
              <Link
                href="/en/blog/watermark-mykad-malaysia"
                className="text-primary hover:underline"
              >
                how to watermark your MyKad copy before you submit it
              </Link>
              . This article stays inside the rental scenario end to end.
            </p>

            <h2>What one MyKad copy really hands over</h2>
            <p>
              Most people underestimate how much a single IC photocopy gives
              away, because they read the NRIC number as an opaque serial. It
              is not. The format is <strong>YYMMDD-PB-###G</strong>, and every
              block is public knowledge:
            </p>
            <ul>
              <li>
                <strong>First six digits: your date of birth</strong> (YYMMDD),
                printed in plain sight.
              </li>
              <li>
                <strong>Next two digits: a place-of-birth code</strong>{" "}
                identifying the state you were born in.
              </li>
              <li>
                <strong>Last digit: gender</strong> — odd for male, even for
                female.
              </li>
            </ul>
            <p>
              Add the name, address and photograph printed on the front of the
              card, and one photocopy is a full identity package. It is enough
              for a syndicate to apply for personal loans in your name, to
              register prepaid SIMs used for scams that then trace back to
              you, or to open a mule account (<em>akaun keldai</em>) that scam
              proceeds pass through until it gets frozen with your name on it.
              The first sign most victims get is a debt collection call, a
              rejected loan application of their own, or a police report they
              did not file.
            </p>
            <p>
              None of these attacks need your physical card. They need a
              clean, unmarked scan. That is specifically the thing a watermark
              takes away, and it is why a copy sent to a stranger claiming to
              be a landlord is genuinely riskier than most people treat it as.
            </p>

            <h2>The PDPA and individual landlords: the part nobody tells you</h2>
            <p>
              Malaysia&apos;s <strong>Personal Data Protection Act 2010</strong>{" "}
              is the reason most people think their IC copy is protected. It
              is worth reading closely.
            </p>
            <p>
              The Act regulates processing of personal data in{" "}
              <strong>commercial transactions</strong>, and its general
              principle is that data should be collected for a lawful purpose
              directly related to the organisation&apos;s activity, only to
              the extent necessary. That gives you real standing when you deal
              with a bank, a licensed real estate agency, or a professional
              property management company. Those are commercial actors, they
              are data users under the Act, and the 2024 amendments (in force
              through 2025) strengthened the regime further with breach
              notification and mandatory data protection officers for
              qualifying data users.
            </p>
            <p>
              But the Act also has an exemption for personal data{" "}
              <strong>processed by an individual only for personal,
              family or household affairs</strong>, including recreational
              purposes. A person renting out a spare room in their own house,
              or the second unit they own as a personal investment, may sit
              inside that exemption. And the Personal Data Protection
              Commissioner has published tenancy-related guidance clarifying
              when landlords are considered data users — the short version is
              that the further you get from &quot;a business renting out
              units&quot; and the closer you get to &quot;one person renting
              out one room&quot;, the weaker your PDPA-based demands become
              on that landlord.
            </p>
            <p>
              This cuts two ways. On one hand, an individual landlord may not
              be under the same statutory duty to secure your IC copy that a
              real estate agency is under. On the other hand, they may not
              have the systems either — a copy of your IC on a personal
              WhatsApp account gets backed up to Google Drive or iCloud,
              lives in the phone gallery of whoever they share the login
              with, and travels with the phone if it gets sold or stolen.
            </p>
            <p>
              None of this is a reason to refuse to sign a tenancy agreement.
              It is a reason to <strong>send a copy that only works for one
              specific tenancy</strong> — which is what watermarking does.
            </p>

            <h2>Every stage of a rental, and what the landlord actually needs</h2>
            <p>
              The single most useful distinction is <em>which stage of the
              rental process</em> you are at when the request arrives.
              Different stages need different things.
            </p>

            <h3>Stage 1 — Enquiry and property viewing</h3>
            <p>
              The landlord or agent needs nothing on paper at this stage.
              None. You are not yet in a relationship where they have a
              lawful purpose for keeping your identity document. What they
              need is to confirm you are a real prospect, and a name and phone
              number is enough for that.
            </p>
            <p>
              If the appointment is in person, the safest answer to &quot;can
              I have a copy of your IC first?&quot; is &quot;I&apos;ll bring
              the original to the viewing.&quot; If they want to note down the
              number for a viewing log, they can copy it from the original in
              front of you and hand the card back — a{" "}
              <strong>sighting</strong>, not a stored copy. If the appointment
              is remote (you are overseas and asking a friend or agent to view
              on your behalf), send a heavily watermarked copy specifically
              marked <em>&quot;For [agent] viewing appointment on [date]
              only&quot;</em>, not a clean scan.
            </p>
            <p>
              An agent or landlord who refuses to show a property unless you
              send the unmarked IC copy first is signalling something. In the
              best case, they are lazy and want a form-of-ID on file for
              their own convenience. In the worst case, the listing is not
              theirs to rent out and the IC copy is the entire product — this
              is a known pattern with fake listings scraped from Facebook
              Marketplace and iProperty.
            </p>

            <h3>Stage 2 — Booking fee / earnest deposit</h3>
            <p>
              This is the highest-risk stage, and it is where most rental scams
              happen. The typical shape: you see the unit (or a photo of it),
              the agent asks for a booking fee — often one month&apos;s rent
              — to hold it, and asks for a copy of your IC to draw up the
              paperwork. Then the earnest deposit vanishes, the agent goes
              silent, and your IC copy is now in an unknown gallery.
            </p>
            <p>
              Two things reduce the risk here to a level that is manageable
              rather than reckless:
            </p>
            <ul>
              <li>
                <strong>Verify the person, not just the listing.</strong> If
                the person claims to be a REN (Real Estate Negotiator) or
                REA, their registration number can be checked against the
                Board of Valuers, Appraisers, Estate Agents and Property
                Managers (BOVAEP / LPPEH) public register. If the person
                claims to be the owner, the sale and purchase document or a
                copy of the title showing their name is a normal thing to ask
                to see — you are about to hand over money and identity to
                them, they can show it in return.
              </li>
              <li>
                <strong>Insist on a proper earnest deposit receipt</strong>
                — issued in the name of the licensed agency (not a personal
                bank account), noting the unit address, the amount, and the
                condition that it is applied to the first month&apos;s rent
                or refundable if the tenancy does not proceed. Only then does
                the IC copy travel, watermarked with{" "}
                <em>&quot;For [agency] earnest deposit — [address] — [date]
                only&quot;</em>.
              </li>
            </ul>

            <h3>Stage 3 — Tenancy agreement</h3>
            <p>
              This is the point at which a copy is genuinely reasonable. The
              agreement identifies both parties by NRIC number, both parties
              sign, and both parties keep a copy. A landlord needs to be able
              to confirm the person named in the document is the person in
              front of them.
            </p>
            <p>
              Watermark this copy with the landlord&apos;s full name (or the
              agency&apos;s registered name), the unit address, the phrase
              &quot;tenancy agreement only&quot;, and the date of signing.
              That is the copy that gets attached to the executed agreement.
              If the address is already spelled out inside the tenancy
              agreement, there is no need for the IC copy to travel any
              further than that.
            </p>

            <InlineCTA
              tool="watermark"
              position="mid_article"
              location={SLUG}
              lang="en"
            />

            <h3>Stage 4 — Move-in, utility transfer, tenancy stamping</h3>
            <p>
              A well-organised handover asks for an IC copy at most once more
              — for LHDN stamping of the tenancy agreement, or for utility
              account transfers where the utility company itself is the data
              user (TNB, Air Selangor, Indah Water). Where the utility
              company asks in its own name, that is a separate transaction
              with a separate purpose, so the watermark should name the
              utility, not the landlord.
            </p>
            <p>
              What is <em>not</em> reasonable at this stage is the landlord
              asking for extra copies &quot;in case&quot;, or asking to keep
              your original card &quot;for the file&quot;. Extra copies do
              not have extra purposes; they just have extra places to leak.
            </p>

            <h3>Stage 5 — During the tenancy and renewal</h3>
            <p>
              You should not be sending new IC copies during a normal
              tenancy. The landlord already has a copy attached to the signed
              agreement. If they claim to have lost it and want a fresh scan
              a year in, that is worth pausing on — an old copy on file at
              the point where a scam actor took over the landlord&apos;s
              account is more common than most people realise.
            </p>
            <p>
              At renewal, if a new agreement is being signed, a fresh
              watermarked copy with the new date is normal. If the tenancy
              is simply continuing on the old terms, nothing new is needed.
            </p>

            <h3>Stage 6 — Move-out and deposit refund</h3>
            <p>
              The deposit refund is a common re-request point. A landlord
              might ask for a bank account slip and, sometimes, an updated
              IC copy for &quot;records&quot;. The bank slip is fine; the
              new IC copy is not — the agreement they already have on file
              is the record they need. If they insist, watermark it{" "}
              <em>&quot;For [landlord] deposit refund only — [date]&quot;</em>{" "}
              and move on. What actually reduces risk here is including your
              bank account details on the same paper as the deposit refund
              instruction, so that document itself has a fixed purpose.
            </p>

            <h2>What to write on the watermark</h2>
            <p>
              Three things, in every rental context: the <strong>recipient</strong>,
              the <strong>purpose</strong>, and the <strong>date</strong>. For
              renting specifically, adding the <strong>unit address</strong>{" "}
              is a fourth block worth writing in, because it locks the copy
              even harder to one specific tenancy.
            </p>
            <ul>
              <li>
                <strong>Weak:</strong> &quot;COPY&quot; or &quot;SALINAN
                SAHAJA&quot;. True of every photocopy ever made. It names
                nobody, limits nothing, never expires.
              </li>
              <li>
                <strong>Weak:</strong> &quot;For rental&quot;. Which rental?
                A copy that says &quot;for rental&quot; is a copy that fits
                the next scam too.
              </li>
              <li>
                <strong>Strong:</strong> &quot;For Ahmad bin Ismail — tenancy
                agreement — Unit A-12-3, [address] — 6 Sep 2026&quot;. One
                landlord, one unit, one purpose, one date.
              </li>
            </ul>
            <p>
              Write the landlord&apos;s full legal name or the agency&apos;s
              registered trading name — not a nickname, not just
              &quot;landlord&quot;. If the copy ever resurfaces attached to a
              different transaction, the mismatch is obvious on its face.
            </p>

            <h2>How to watermark your MyKad in about a minute</h2>
            <p>
              The safe way to protect an identity document online is to never
              put it online in the first place.{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>{" "}
              runs <strong>entirely inside your browser</strong> — the image
              is processed on your own device and is never sent to a server.
              For a document like this, that property matters more than any
              feature.
            </p>
            <ol>
              <li>
                <strong>Open{" "}
                  <Link href="/en/" className="text-primary hover:underline">
                    imagemarker.app/en/
                  </Link>
                </strong>{" "}
                on your phone or laptop. No install, no account.
              </li>
              <li>
                <strong>Add the photo or scan of your MyKad.</strong> It
                stays on your device the whole time.
              </li>
              <li>
                <strong>Type the recipient, purpose, address and date</strong>,
                for example &quot;For [Landlord full name] tenancy agreement
                — Unit A-12-3, [address] — 6 Sep 2026&quot;.
              </li>
              <li>
                <strong>Turn on tiled / repeat mode.</strong> A single mark in
                one corner is one crop away from gone. Tiled coverage cannot
                be removed without visibly wrecking the image.
              </li>
              <li>
                <strong>Set opacity to about 40&ndash;60%.</strong> Legible,
                but light enough that the name, NRIC and photo underneath
                stay readable so the landlord can identify you against the
                document.
              </li>
              <li>
                <strong>Check before you send.</strong> Zoom in — if the
                landlord cannot read a field they need, they will ask for a
                redo and the whole exercise costs you time instead of saving
                it.
              </li>
              <li>
                <strong>Send the marked copy only</strong>, then delete the
                clean original from your gallery and downloads so it cannot
                be forwarded by accident later.
              </li>
            </ol>
            <p>
              One quick test for any online tool you use for this: turn on
              flight mode first. If it still works offline, the processing is
              genuinely happening on your device. If it stalls, your IC was
              going to be uploaded.
            </p>

            <h2>Rental scam patterns that use IC copies</h2>
            <p>
              These are not hypotheticals. They are the specific shapes
              consumer reports to the Ministry of Housing (KPKT), MCMC and
              Bank Negara routinely describe.
            </p>
            <ul>
              <li>
                <strong>The scraped listing.</strong> A real property is
                listed on iProperty or PropertyGuru. A fake agent scrapes the
                photos and re-lists on Facebook Marketplace or Mudah at a
                lower price. Urgency is manufactured (&quot;two other people
                interested&quot;), the IC copy and booking fee are asked for
                over WhatsApp, and there is never a viewing. Countermeasure:
                cross-check the listing on the official portal, and refuse
                to send anything before physically seeing the unit.
              </li>
              <li>
                <strong>The look-alike agent.</strong> Someone impersonates a
                real REN, sometimes even using their photo and name. If you
                are asked to bank in to a personal account rather than the
                agency&apos;s corporate account, or if the WhatsApp number is
                not the one on the agency&apos;s official website, treat that
                as the whole answer.
              </li>
              <li>
                <strong>The Malaysia-Singapore rental scam.</strong>{" "}
                Common with rooms marketed to Singapore-based Malaysians
                looking for a place in JB. Same pattern — remote enquiry,
                pressure to send IC and deposit before viewing — with the
                extra friction of the border making it easier to defer a
                viewing indefinitely.
              </li>
              <li>
                <strong>The IC-for-loan-application scam.</strong> The
                &quot;landlord&quot; asks for a clean, high-resolution copy
                of both sides of the IC. The unit does not exist. The copy
                is used to apply for personal loans and credit lines. This
                is why marking the copy specifically for a tenancy at a
                named unit is not paranoid — it is proportionate.
              </li>
              <li>
                <strong>The tenancy that never gets signed.</strong>{" "}
                Sometimes the &quot;agreement&quot; drags out for weeks,
                during which your IC copy sits in the landlord&apos;s
                gallery. If a booking has been paid and no draft agreement
                has arrived within a reasonable window, ask for the copy to
                be deleted in writing and stop the process.
              </li>
            </ul>

            <h2>Beyond the watermark: three more things worth doing</h2>
            <ul>
              <li>
                <strong>Strip the EXIF data</strong> from the photo before
                you send it. A phone photo of your IC usually carries GPS
                coordinates and a precise timestamp. Your MyKad already
                prints an address; the photo adds a second one — where you
                actually were when you took it, which for most people is
                home. Remove them with the{" "}
                <Link
                  href="/en/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF cleaner
                </Link>
                .
              </li>
              <li>
                <strong>Send the front of the card only</strong>, unless a
                specific process needs the back. Fewer fields in circulation,
                less to lose.
              </li>
              <li>
                <strong>Check your own credit records occasionally.</strong>{" "}
                CCRIS (through Bank Negara) and the private credit bureaus
                will show financing taken out in your name. Catching a fraud
                application within a month is the difference between a
                dispute and a debt.
              </li>
            </ul>

            <InlineCTA
              tool="exif-clean"
              position="mid_article"
              location={SLUG}
              lang="en"
            />

            <h2>If you are renting from overseas</h2>
            <p>
              Malaysians renting a place in KL, Penang or JB from Singapore,
              Australia or the UK are one of the highest-risk groups here,
              because the &quot;I can&apos;t view in person&quot; friction is
              the exact opening rental scams need. If you cannot travel back
              to view before signing, at least the following:
            </p>
            <ul>
              <li>
                Send someone you personally know to the unit — a family
                member, a trusted friend — for the physical viewing. Not the
                agent&apos;s friend.
              </li>
              <li>
                Video-call from inside the unit. The person on the other end
                should be walking through the actual rooms with you, opening
                windows and cupboards on request. A static photo tour is not
                a viewing.
              </li>
              <li>
                Do the tenancy agreement through a licensed agency with a
                real address, not a WhatsApp-only landlord. The extra fee is
                the price of accountability.
              </li>
              <li>
                Sign digitally with a service that time-stamps and both
                parties can access afterwards. A photograph of a signed page
                on WhatsApp is not the same thing.
              </li>
              <li>
                Watermark every copy of your IC that leaves your device with
                the address of the specific unit, not just the agency name.
              </li>
            </ul>

            <h2>What to say when you push back</h2>
            <p>
              Most people never push back because they think it makes them
              look like a difficult tenant. It does not. It makes you look
              like someone who reads the paperwork, which is exactly the kind
              of tenant a legitimate landlord wants. Three phrases that do
              most of the work:
            </p>
            <ul>
              <li>
                <em>&quot;Happy to show my original IC at the viewing —
                I&apos;ll send a watermarked copy once we&apos;re at the
                agreement stage.&quot;</em>
              </li>
              <li>
                <em>&quot;What is the copy used for, and how long do you
                keep it?&quot;</em> — the two questions the PDPA General
                Principle already entitles you to have answered when the
                other side is a data user.
              </li>
              <li>
                <em>&quot;I&apos;ll send it once the earnest deposit receipt
                is issued in the agency&apos;s name.&quot;</em>
              </li>
            </ul>

            <h2>FAQ</h2>
            <p>
              <strong>
                Q: Is it safe to send my IC copy online in Malaysia?
              </strong>
              <br />A: Only when three things are true: the person asking has
              a legitimate reason (a signed tenancy agreement, KYC for a
              licensed bank), you know who they actually are, and the copy is
              watermarked with that recipient, purpose and date. A clean,
              unmarked IC scan sent to a stranger on WhatsApp is one of the
              highest-risk things you can do online, because a MyKad copy
              alone is enough to apply for loans, register SIMs and open
              accounts in your name.
            </p>
            <p>
              <strong>
                Q: Can a landlord in Malaysia legally demand a copy of my
                MyKad?
              </strong>
              <br />A: They can ask, and at the tenancy agreement stage it
              is normal — they need to identify the person they are
              entering a contract with. But the request has to be reasonable
              for that specific purpose. An individual landlord renting out
              a single unit for personal purposes may fall outside the PDPA
              entirely under its personal or household exemption, which cuts
              both ways: they may not have the same duty to protect your
              copy that an agency does, so watermarking before sending is
              proportionate rather than paranoid.
            </p>
            <p>
              <strong>
                Q: When can I refuse to send my IC copy to an agent?
              </strong>
              <br />A: At the viewing stage, easily. There is no contract,
              no obligation and no lawful purpose that needs a stored copy
              of your identity document just to walk through a unit. Offer
              to show the original for sighting in person, or a heavily
              watermarked copy marked &quot;For viewing appointment
              only&quot; if the appointment is remote.
            </p>
            <p>
              <strong>
                Q: Should I black out my NRIC number when sending to a
                landlord?
              </strong>
              <br />A: Not usually. The tenancy agreement identifies both
              parties by NRIC number, so masking it means signing a document
              with a number the landlord cannot verify against the copy. The
              bigger lever is the watermark, which binds the copy to that
              one tenancy agreement and one date.
            </p>
            <p>
              <strong>
                Q: What if the agent asks for my IC copy on WhatsApp before I
                have even seen the property?
              </strong>
              <br />A: Treat that as a signal to slow down. There is no
              legitimate reason to collect a copy before any relationship
              exists, and it is one of the standard shapes of property
              listing fraud in Malaysia. Verify the listing on the
              agency&apos;s official channel, and do not send a clean copy
              before you have physically seen the unit and met the landlord
              or a properly credentialled agent.
            </p>
            <p>
              <strong>Q: Does ImageMarker upload my MyKad to a server?</strong>
              <br />A: No. Everything runs inside your browser, so the image
              never leaves your device and there is nothing on our side to
              store or leak. Switch on flight mode and the tool still
              works — the simplest way to prove it to yourself.
            </p>

            <h2>Before you hit send</h2>
            <p>
              Renting anywhere in Malaysia is going to involve handing over
              MyKad copies. What is written on those copies when they go is
              still your call. Do the viewing first, insist on a proper
              receipt before the deposit, keep clean scans off WhatsApp, and
              when a copy has to travel, watermark it so it only fits the
              tenancy it was made for. That is the difference between a copy
              that any scammer can reuse and a copy that a legitimate
              landlord can accept and no one else can.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Watermark your MyKad before you send it to a landlord.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free, no sign-up, 100% in your browser. Nothing is uploaded.
            </p>
            <Link
              href="/en/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Watermark My IC Free<ReadMoreArrow />
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            <a
              href="https://ko-fi.com/justinlee2061"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              &#9749; If this article helped you, buy me a coffee
            </a>
          </p>
        </article>
      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
