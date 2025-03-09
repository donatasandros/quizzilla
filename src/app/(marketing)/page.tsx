import { ArrowRightIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { GridPattern } from "@/components/decorations/grid-pattern";
import { Button } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <React.Fragment>
      <section className="mx-auto max-w-[1280px] px-4 pt-24 md:px-8">
        <GridPattern
          highlight
          mask="radial-down"
          className="absolute top-0 left-1/2 z-[-1] -translate-x-1/2"
        />
        <div className="group mx-auto mb-4 flex w-fit cursor-pointer items-center gap-x-2 rounded-[10px] border border-gray-300 bg-white py-1 pr-2.5 pl-1 shadow-xs md:gap-x-3 dark:border-gray-700 dark:bg-gray-950">
          <div className="flex items-center gap-x-1.5 rounded-md border border-gray-300 bg-white px-1.5 py-0.5 shadow-xs md:px-2 dark:border-gray-700 dark:bg-gray-950">
            <div className="outline-brand-100 dark:outline-brand-900 w-fit animate-pulse overflow-hidden rounded-full outline-[3px]">
              <div className="bg-brand-500 size-1.5"></div>
            </div>
            <span className="text-xs font-medium text-gray-700 md:text-sm dark:text-gray-300">
              New feature
            </span>
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-xs font-medium text-gray-700 md:text-sm dark:text-gray-300">
              Check out the Rapid Fire mode
            </span>
            <ArrowRightIcon className="size-4 text-gray-500 group-hover:translate-x-1 dark:text-gray-400" />
          </div>
        </div>
        <div className="mb-8 space-y-4 text-center md:mb-12 md:space-y-6">
          <h1 className="text-4xl font-semibold text-gray-900 md:text-6xl dark:text-gray-50">
            Quiz smarter, learn faster
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-balance text-gray-600 md:text-xl dark:text-gray-400">
            Create quizzes in seconds, challenge friends, and test your
            knowledge - all in one seamless experience.
          </p>
        </div>
        <div className="mb-16 flex items-center justify-center gap-3 max-md:flex-col-reverse">
          <Button variant="secondary" size="lg" className="max-md:w-full">
            <PencilIcon />
            Create a quiz
          </Button>
          <Button variant="primary" size="lg" className="max-md:w-full">
            Play now
          </Button>
        </div>
        <div className="max-h-[360px] overflow-hidden max-md:px-8 sm:max-h-[496px]">
          <div className="overflow-hidden rounded-t-4xl border-x-2 border-t-2 border-gray-300 shadow-lg dark:border-gray-700">
            <div className="bg-white px-0.5 pt-0.5 dark:bg-gray-950">
              <div className="rounded-t-[28px] px-1 pt-1 shadow-[inset_0px_0px_4px_2px_rgba(10,13,18,0.03),inset_0px_0px_6px_2px_rgba(10,13,18,0.08)] dark:shadow-[inset_0px_0px_4px_2px_rgba(255,255,255,0.03),inset_0px_0px_6px_2px_rgba(255,255,255,0.08)]">
                <div className="overflow-hidden rounded-t-3xl border-x-2 border-t-2 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                  <Image
                    src="https://placehold.co/1200x496/png?text=Light+Desktop+Preview"
                    width={1200}
                    height={496}
                    alt="Hero image"
                    className="max-sm:hidden dark:hidden"
                  />
                  <Image
                    src="https://placehold.co/1200x496/131316/FFF/png?text=Dark+Desktop+Preview"
                    width={1200}
                    height={496}
                    alt="Hero image"
                    className="hidden max-sm:hidden dark:block"
                  />
                  <Image
                    src="https://placehold.co/270x580/png?text=Light+Mobile+Preview"
                    width={270}
                    height={580}
                    alt="Hero image"
                    className="w-full sm:hidden dark:hidden"
                  />
                  <Image
                    src="https://placehold.co/270x580/131316/FFF/png?text=Dark+Mobile+Preview"
                    width={270}
                    height={580}
                    alt="Hero image"
                    className="hidden w-full sm:hidden dark:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
