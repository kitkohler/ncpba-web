"use client";

import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={i}
          className="border-t"
          style={{ borderColor: "rgba(107,91,69,0.18)" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center py-5 text-left gap-4 bg-transparent border-none cursor-pointer"
          >
            <span
              className="text-[16px] font-semibold leading-snug"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-deep-soil)" }}
            >
              {item.question}
            </span>
            <span
              className="text-[20px] shrink-0 leading-none inline-block transition-transform duration-[280ms]"
              style={{
                color: "var(--color-ember)",
                transform: open === i ? "rotate(45deg)" : "none",
              }}
            >
              +
            </span>
          </button>
          <div className={`accordion-body${open === i ? " open" : ""}`}>
            <p
              className="text-[15px] leading-[1.78] pb-[22px]"
              style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      ))}
      {/* Bottom border */}
      <div className="border-t" style={{ borderColor: "rgba(107,91,69,0.18)" }} />
    </div>
  );
}
