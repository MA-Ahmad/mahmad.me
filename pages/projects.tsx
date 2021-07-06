import React from "react";
import { NextPage } from "next";
import {
  LeftProjectLayoutLarge,
  ProjectLayoutMed,
  RightProjectLayoutLarge
} from "../containers/projectLayout";
import { projectsList } from "../containers/projectData";
import Layout from "components/layout";

const title = "Projects 📚";
const subtitle =
  "A selection of projects I've worked on, during my career as a software developer.";

const Projects: NextPage = () => {
  return (
    <Layout title={title} description={subtitle}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-gray-300">
        <div className="divide-y divide-gray-800">
          <div className="pb-6 space-y-2 md:space-y-5 ">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              {title}
            </h1>
            <p className="font-normal tracking-tight sm:w-9/12 md:w-10/12 lg:w-9/12 text-base md:text-lg ">
              {subtitle}
            </p>
          </div>
          <div className="space-y-6 xl:space-y-10 ">
            {projectsList.map((project, index) => (
              <>
                <ProjectLayoutMed project={project} />
                {index % 2 === 0 ? (
                  <LeftProjectLayoutLarge project={project} />
                ) : (
                  <RightProjectLayoutLarge project={project} />
                )}
              </>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
