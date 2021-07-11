import React from "react";
import { motion } from "framer-motion";
import { stagger, fadeInUp } from "../../containers/framerAnimations";
import SocialIcons from "../layout/socialIcons";

const Main = () => {
  return (
    <motion.div initial="initial" animate="animate">
      <motion.div variants={stagger} className="md:space-y-3">
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl font-medium md:mb-5 leading-tight tracking-tight dark:text-gray-100 sm:leading-10 md:leading-14">
            Hey, I'm Ahmad 👋
          </h1>
        </motion.div>
        <motion.p
          variants={fadeInUp}
          className="mt-3 mb-6 md:mb-8 sm:w-9/12  text-gray-900 dark:text-gray-300 md:w-10/12 lg:w-full text-base md:text-lg font-medium "
        >
          I'm a Full Stack Developer and an open source lover from Pakistan 🇵🇰
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="mt-3 mb-6 md:mb-8 sm:w-9/12  text-gray-900 dark:text-gray-300 md:w-10/12 lg:w-full text-base md:text-lg font-medium "
        >
          This is my digital garden, where I write about the things I'm working
          on and share what I've learned.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <SocialIcons />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Main;
