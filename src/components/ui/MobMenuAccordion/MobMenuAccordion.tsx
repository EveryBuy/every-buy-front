import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import styles from "./MobMenuAccordion.module.scss";

type MenuItem = {
  title: string;
  submenuItems: {
    title: string;
    href: string;
  }[];
};

export const MobMenuAccordion = ({ children }: { children: MenuItem }) => {
  return (
    <Accordion
      sx={{
        background: "inherit",
        border: "none",
        boxShadow: "none",
        // height: "40px",
      }}
    >
      <AccordionSummary
        sx={{
          background: "inherit",
          padding: 0,
          margin: 0,
          minHeight: "20px",
          "& .MuiAccordionSummary-content": { margin: 0 },
        }}
      >
        {children.title}
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {children.submenuItems.map((el, id) => {
            return (
              <li key={id}>
                <Link href={el.href}>{el.title}</Link>
              </li>
            );
          })}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};
