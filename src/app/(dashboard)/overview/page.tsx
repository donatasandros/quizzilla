import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  DownloadCloudIcon,
  InfoIcon,
  PencilLineIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PerformanceChart } from "@/features/dashboard/components/performance-chart";

export default function Page() {
  return (
    <div className="mask-image-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0),_rgba(0,_0,_0,_1))] space-y-8">
      <section className="space-y-1">
        <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-gray-50">
          Welcome back, Donatas
        </h1>
        <p className="ddark:text-gray-400 text-gray-600 dark:text-gray-400">
          Track your progress, completed quizzes, and key stats at a glance.
        </p>
      </section>
      <section className="flex gap-4 max-md:flex-col md:gap-5">
        <div className="flex-1 space-y-2 rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-xs md:px-5 dark:border-gray-800 dark:bg-gray-950">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Quizzes played
          </p>
          <div className="flex items-end justify-between gap-x-4">
            <p className="text-3xl font-semibold whitespace-nowrap text-gray-900 dark:text-gray-50">
              10
            </p>
            <div className="flex h-6 items-center gap-x-1 rounded-md border border-gray-300 bg-white py-0.5 pr-2 pl-1.5 shadow-xs dark:border-gray-700 dark:bg-gray-950">
              <ArrowDownRightIcon className="text-error-500 dark:text-error-400 size-3" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                50%
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2 rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-xs md:px-5 dark:border-gray-800 dark:bg-gray-950">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Time spent
          </p>
          <div className="flex items-end justify-between gap-x-4">
            <p className="text-3xl font-semibold whitespace-nowrap text-gray-900 dark:text-gray-50">
              12h 30m
            </p>
            <div className="flex h-6 items-center gap-x-1 rounded-md border border-gray-300 bg-white py-0.5 pr-2 pl-1.5 shadow-xs dark:border-gray-700 dark:bg-gray-950">
              <ArrowUpRightIcon className="text-success-500 dark:text-success-400 size-3" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                10%
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2 rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-xs md:px-5 dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center gap-x-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Completed
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                  <InfoIcon className="size-4" />
                </TooltipTrigger>
                <TooltipContent>
                  Total number of quizzes you have finished.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-end justify-between gap-x-4">
            <p className="text-3xl font-semibold whitespace-nowrap text-gray-900 dark:text-gray-50">
              10
            </p>
            <div className="flex h-6 items-center gap-x-1 rounded-md border border-gray-300 bg-white py-0.5 pr-2 pl-1.5 shadow-xs dark:border-gray-700 dark:bg-gray-950">
              <ArrowUpRightIcon className="text-success-500 dark:text-success-400 size-3" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                30%
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-wrap gap-3 max-md:flex-col md:items-center">
        <Link
          href="/"
          className="flex flex-1 items-center gap-x-3 rounded-xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-950"
        >
          <div className="bg-brand-600 flex size-12 shrink-0 items-center justify-center rounded-[10px] shadow-xs">
            <PencilLineIcon className="dark:text-brand-200 size-6 text-white" />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Create a quiz
            </p>
            <p className="text-gray-600 md:whitespace-nowrap dark:text-gray-400">
              Design a new quiz with custom questions and settings.
            </p>
          </div>
        </Link>
        <div className="flex flex-1 items-center gap-x-3 rounded-xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-950">
          <div className="bg-brand-600 flex size-12 shrink-0 items-center justify-center rounded-[10px] shadow-xs">
            <PencilLineIcon className="dark:text-brand-200 size-6 text-white" />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Join a quiz
            </p>
            <p className="text-gray-600 md:whitespace-nowrap dark:text-gray-400">
              Enter a quiz code to participate in a quiz.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="md:rounded-xl md:border md:border-gray-200 md:bg-white md:p-6 md:shadow-xs md:dark:border-gray-800 md:dark:bg-gray-950">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Performance report
            </p>
            <Button variant="secondary" size="md">
              <DownloadCloudIcon />
              Export
            </Button>
          </div>
          <PerformanceChart />
        </div>
      </section>
    </div>
  );
}
