import Image from "next/image";
import Overline from "@/components/Overline";

interface SanityImage {
  asset?: { _id: string; url: string };
  alt?: string;
}

interface Props {
  overline?: string;
  body?: string;
  logoImage?: SanityImage;
}

const COPY = {
  overline: "Our Fiscal Sponsor",
  body: "NCPBA is a fiscally sponsored project of the Nevada County Resource Conservation District. NCRCD is a trusted local conservation authority with deep roots in Nevada County's land and water stewardship. Their partnership makes our work possible while we build toward full organizational independence.",
};

export default function FiscalSponsorBlock(props: Props) {
  const overline = props.overline ?? COPY.overline;
  const body = props.body ?? COPY.body;

  return (
    <section
      className="py-16 px-8 md:px-16"
      style={{ backgroundColor: "var(--color-deep-soil)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <Overline color="rgba(237,229,212,0.38)">{overline}</Overline>
        <div className="max-w-[700px]">
          <p
            className="text-[16px] leading-[1.75] mb-7"
            style={{ color: "rgba(237,229,212,0.68)", fontFamily: "var(--font-body)" }}
          >
            {body}
          </p>
          {props.logoImage?.asset?.url ? (
            <div className="w-40 h-16 rounded overflow-hidden relative">
              <Image
                src={props.logoImage.asset.url}
                alt={props.logoImage.alt ?? "Fiscal sponsor logo"}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div
              className="w-40 h-16 rounded flex items-center justify-center"
              style={{
                backgroundColor: "rgba(237,229,212,0.07)",
                border: "1px solid rgba(237,229,212,0.12)",
              }}
            >
              <span
                className="text-[12px]"
                style={{ color: "rgba(237,229,212,0.35)", fontFamily: "var(--font-body)" }}
              >
                NCRCD logo
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
