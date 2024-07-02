import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import LiIcon from "./LiIcon";
import "../styles/tailwind.css";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="tw-my-8 first:tw-mt-0 last:tw-mb-0 tw-w-[60%] tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-between md:tw-w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "tw-spring" }}
      >
        <h3 className="tw-capitalize tw-font-bold tw-text-2xl sm:tw-text-xl xs:tw-text-lg">
          {position} &nbsp;{" "}
          <a
            href={companyLink}
            target="_blank"
            className="tw-text-primary dark:tw-text-primaryDark tw-capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="tw-capitalize tw-font-medium tw-text-dark/75 xs:tw-text-sm">
          {time} | {address}
        </span>
        <p className="tw-font-medium tw-w-full md:tw-text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

const PopularCourses = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="tw-my-64">
      <div
        ref={ref}
        className="tw-w-[75%] tw-mx-auto tw-relative lg:tw-w-[90%] md:tw-w-full"
      >
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute tw-left-9 tw-top-0 tw-w-[4px] tw-h-full tw-bg-dark dark:tw-bg-light tw-origin-top 
                    md:tw-w-[2px] md:tw-left-[30px] xs:tw-left-[20px]
                    "
        />
        <ul className="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-between tw-ml-4 xs:tw-ml-2">
          <Details
            position="Intern"
            company="VIVIDIA INFOSYS"
            companyLink="www.google.com"
            time="2023-Present"
            address="Kathmandu"
            work="Having been working as an intern in Vividia Infosys with a team involved in React and Nextjs."
          />
          <Details
            position="Software Engineer"
            company="Google"
            companyLink="www.google.com"
            time="2022-Present"
            address="Mountain View, CA"
            work="Worked on a team responsible for developing new features for Google's
                        search engine, including improving the accuracy and relevance of search results and
                        developing new tools for data analysis and visualization."
          />
          <Details
            position="Software Engineer"
            company="Google"
            companyLink="www.google.com"
            time="2022-Present"
            address="Mountain View, CA"
            work="Worked on a team responsible for developing new features for Google's
                        search engine, including improving the accuracy and relevance of search results and
                        developing new tools for data analysis and visualization."
          />
          <Details
            position="Software Engineer"
            company="Google"
            companyLink="www.google.com"
            time="2022-Present"
            address="Mountain View, CA"
            work="Worked on a team responsible for developing new features for Google's
                        search engine, including improving the accuracy and relevance of search results and
                        developing new tools for data analysis and visualization."
          />
          <Details
            position="Software Engineer"
            company="Google"
            companyLink="www.google.com"
            time="2022-Present"
            address="Mountain View, CA"
            work="Worked on a team responsible for developing new features for Google's
                        search engine, including improving the accuracy and relevance of search results and
                        developing new tools for data analysis and visualization."
          />
        </ul>
      </div>
    </div>
  );
};

export default PopularCourses;
