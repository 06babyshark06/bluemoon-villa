"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { faq } from "@/app/utils/faq";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function AccordionCustomIcon() {

  const [openOuter, setOpenOuter] = React.useState(null); // Tracks outer accordion state
  const [openInner, setOpenInner] = React.useState(null); // Tracks inner accordion state

  const handleOpenOuter = (id) => {
    setOpenOuter(openOuter === id ? null : id); // Toggle outer accordion
  };

  const handleOpenInner = (id) => {
    setOpenInner(openInner === id ? null : id); // Toggle inner accordion
  };

  return (
    <div className="w-full flex justify-center mt-9 py-10">
      <div className="w-3/4">
      {faq.map((item) => (
        <Accordion
          key={item.id}
          open={openOuter === item.id}
          icon={<Icon id={item.id} open={openOuter} />}
        >
          <AccordionHeader onClick={() => handleOpenOuter(item.id)}>
            {item.header}
          </AccordionHeader>
          {item.questions.map((question) => (
            <AccordionBody key={question.id}>
              <Accordion
                key={`inner-${question.id}`}
                open={openInner === question.id}
                icon={<Icon id={question.id} open={openInner} />}
                className="pl-6"
              >
                <AccordionHeader onClick={() => handleOpenInner(question.id)}>
                  {question.question}
                </AccordionHeader>
                <AccordionBody className="pl-4 text-xl text-black leading-loose">
                  <p style={{ whiteSpace: "pre-wrap" }}>{question.answer}</p>
                </AccordionBody>
              </Accordion>
            </AccordionBody>
          ))}
        </Accordion>
      ))}

      </div>
    </div>
  );
}
export default AccordionCustomIcon;