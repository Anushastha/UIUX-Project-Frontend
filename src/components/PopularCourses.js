import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import LiIcon from "./LiIcon";
import "../styles/tailwind.css"

const Details = ({ courseName, detail1, detail2 }) => {
    const ref = useRef(null);

    return (
        <li ref={ref} className="tw-my-8 first:tw-mt-0 last:tw-mb-0 tw-w-[60%] tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-between md:tw-w-[80%]">
            <LiIcon reference={ref} />
            <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, type: "spring" }}
            >
                <p className="font-primary text-blue tw-text-2xl">{courseName}</p>
                <ul className="tw-list-disc tw-list-inside font-secondary text-blue tw-font-normal" style={{ fontSize: "18px" }}>
                    <li>{detail1}</li>
                    <li>{detail2}</li>
                </ul>
            </motion.div>
        </li>
    );
};

const PopularCourses = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    });

    return (
        <div className="tw-my-5">
            <div ref={ref} className="tw-w-[75%] tw-mx-auto tw-relative lg:tw-w-[90%] md:tw-w-full">
                <motion.div
                    style={{ scaleY: scrollYProgress }}
                    className="tw-absolute tw-left-9 tw-top-0 tw-w-[4px] tw-h-full tw-bg-blue tw-origin-top md:tw-w-[2px] md:tw-left-[30px] xs:tw-left-[20px]"
                />
                <ul className="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-between tw-ml-20 xs:tw-ml-2">
                    <Details
                        courseName="Bachelor of Business Administration (BBA)"
                        detail1="Focuses on business management, accounting, finance, marketing, and human resources."
                        detail2="Popular among students aspiring to become entrepreneurs or business professionals."
                    />
                    <Details
                        courseName="Bachelor of Science (B.Sc.) in Information Technology"
                        detail1="Covers areas like software development, network administration, and cyber security."
                        detail2="High demand due to the growing tech industry."
                    />
                    <Details
                        courseName="Bachelor of Engineering (B.E.)"
                        detail1="Various specializations such as Civil, Electrical, Mechanical, and Computer Engineering."
                        detail2="Popular among students interested in technical and engineering fields."
                    />

                    <Details
                        courseName="Master of Arts (M.A.) in Economics"
                        detail1="Focuses on economic theories, policies, and applied economics."
                        detail2="Prepares students for careers in research, academia, and policy-making."
                    />

                    <Details
                        courseName="Master of Science (M.Sc.) in Information Technology"
                        detail1="Advanced study in IT, focusing on research and specialized skills in technology."
                        detail2="High demand due to the tech industry's growth."
                    />

                    <Details
                        courseName="Master of Public Health (MPH)"
                        detail1="Focuses on public health practices, policies, and research."
                        detail2="Popular among students interested in healthcare administration and community health."
                    />
                </ul>
            </div>
        </div>
    );
};

export default PopularCourses;
