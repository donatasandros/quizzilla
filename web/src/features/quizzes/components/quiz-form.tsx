import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import * as React from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
  FormProvider,
  useFormState,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useCreateQuiz } from "../api/use-create-quiz";

import { Button } from "@/web/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
import { Input } from "@/web/components/ui/input";
import { Label } from "@/web/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/web/components/ui/select";
import { Switch } from "@/web/components/ui/switch";
import { cn } from "@/web/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  description: z.string().min(1, "Quiz description is required"),
  questions: z
    .array(
      z.object({
        content: z.string().min(1, "Question content is required"),
        timeLimit: z
          .number()
          .min(5, "Time limit must be at least 5 seconds")
          .max(120, "Time limit cannot exceed 120 seconds"),
        answerType: z.enum(["single", "multiple"], {
          errorMap: () => ({ message: "Please select an answer type" }),
        }),
        answers: z
          .array(
            z.object({
              content: z.string().min(1, "Answer content is required"),
              isCorrect: z.boolean(),
            }),
          )
          .min(2, "At least two answers are required")
          .max(4, "Maximum of four answers allowed")
          .superRefine((answers, ctx) => {
            const correctAnswers = answers.filter((answer) => answer.isCorrect);
            if (correctAnswers.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "At least one answer must be correct",
              });
            }
          }),
        mediaUrl: z.string().optional(),
        backgroundColor: z
          .string()
          .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {
            message:
              "Invalid background color format. Use a hex code (e.g., #FFFFFF)",
          })
          .min(1, "Background color is required"),
      }),
    )
    .min(1, "At least one question is required"),
});

type FormValues = z.infer<typeof formSchema>;

function getTextColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate perceived luminance (human eye favors green)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose black or white based on luminance
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function AnswerForm({
  questionIndex,
  answerIndex,
  removeAnswer,
  count,
}: {
  questionIndex: number;
  answerIndex: number;
  removeAnswer: (index: number) => void;
  count: number;
}) {
  const { control, watch, setValue } = useFormContext<FormValues>();
  const answerType = watch(`questions.${questionIndex}.answerType`);
  const isCorrect = watch(
    `questions.${questionIndex}.answers.${answerIndex}.isCorrect`,
  );

  const handleCorrectChange = (checked: boolean) => {
    if (answerType === "single") {
      const answers = watch(`questions.${questionIndex}.answers`);
      answers.forEach((answer, index) => {
        if (index !== answerIndex) {
          setValue(
            `questions.${questionIndex}.answers.${index}.isCorrect`,
            false,
          );
        }
      });
    }
    setValue(
      `questions.${questionIndex}.answers.${answerIndex}.isCorrect`,
      checked,
    );
  };

  return (
    <div className="relative">
      <Controller
        control={control}
        name={`questions.${questionIndex}.answers.${answerIndex}.content`}
        render={({ field }) => (
          <input
            className="h-20 w-full rounded-lg px-4 text-lg outline-0 group-[.darker]:bg-white/20 group-[.darker]:text-white group-[.lighter]:bg-black/20 group-[.lighter]:text-black group-[.darker]:placeholder:text-white/50 group-[.lighter]:placeholder:text-black/50"
            placeholder="Answer..."
            {...field}
          />
        )}
      />
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Switch checked={isCorrect} onCheckedChange={handleCorrectChange} />
        {count > 2 && (
          <Button
            variant="destructive"
            size="icon"
            type="button"
            onClick={() => removeAnswer(answerIndex)}
          >
            <Trash />
          </Button>
        )}
      </div>
    </div>
  );
}

// Question Form Component
function QuestionForm({ index }: { index: number }) {
  const { control, watch } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
  });

  const addAnswer = () => {
    append({ content: "", isCorrect: false });
  };

  const removeAnswer = (index: number) => {
    remove(index);
  };

  const backgroundColor =
    watch(`questions.${index}.backgroundColor`) || "#FAE4EB"; // Default color
  const mediaUrl = watch(`questions.${index}.mediaUrl`);
  const textColor = getTextColor(backgroundColor);

  return (
    <>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div
            className={cn(
              "group flex flex-col items-center justify-center p-8",
              {
                darker: textColor === "#FFFFFF",
                lighter: textColor === "#000000",
              },
            )}
            style={{ backgroundColor }}
          >
            <Controller
              control={control}
              name={`questions.${index}.content`}
              render={({ field }) => (
                <div>
                  <input
                    placeholder="Question title..."
                    className="mb-4 w-full bg-transparent text-center text-3xl font-bold outline-none group-[.darker]:text-white group-[.lighter]:text-black group-[.darker]:placeholder:text-white/50 group-[.lighter]:placeholder:text-black/50"
                    {...field}
                  />
                </div>
              )}
            />
            {mediaUrl && (
              <img
                src={mediaUrl}
                alt="Question Media"
                className="mx-auto max-h-48 max-w-full rounded-lg object-cover"
              />
            )}
            <div className="mt-8 grid w-full grid-cols-2 gap-4">
              {fields.map((answer, Aindex) => (
                <AnswerForm
                  key={answer.id}
                  questionIndex={index}
                  answerIndex={Aindex}
                  removeAnswer={removeAnswer}
                  count={fields.length}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex gap-6">
        <Card className="h-fit w-xs">
          <CardHeader>
            <CardTitle>Quiz settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Quiz title</Label>
                  <Input placeholder="Enter quiz title" {...field} />
                </div>
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Quiz description</Label>
                  <Input placeholder="Enter quiz description" {...field} />
                </div>
              )}
            />
          </CardContent>
        </Card>
        <Card className="w-xs">
          <CardHeader>
            <CardTitle>Question settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Controller
              control={control}
              name={`questions.${index}.timeLimit`}
              defaultValue={30}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Time limit</Label>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(Number.parseInt(value))
                    }
                    value={field.value.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time limit" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 20, 30, 60, 90, 120].map((seconds) => (
                        <SelectItem key={seconds} value={seconds.toString()}>
                          {seconds} seconds
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <Controller
              control={control}
              name={`questions.${index}.answerType`}
              defaultValue="single"
              render={({ field }) => (
                <div>
                  Answer Type:
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select answer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="multiple">Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <Controller
              control={control}
              name={`questions.${index}.mediaUrl`}
              render={({ field }) => (
                <div>
                  Media URL:
                  <Input placeholder="Media URL" {...field} />
                </div>
              )}
            />
            <Controller
              control={control}
              name={`questions.${index}.backgroundColor`}
              defaultValue="#FAE4EB"
              render={({ field }) => (
                <div>
                  Background Color:
                  <Input type="color" {...field} />
                </div>
              )}
            />
          </CardContent>
        </Card>
        <div className="mt-2 flex gap-2">
          <Button variant="default" type="button" onClick={addAnswer}>
            Add answer
          </Button>
        </div>
      </div>
    </>
  );
}

export function QuizForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const navigate = useNavigate();

  const mutation = useCreateQuiz();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [
        {
          content: "",
          timeLimit: 30,
          answerType: "single",
          answers: [
            { content: "", isCorrect: false },
            { content: "", isCorrect: false },
          ],
          mediaUrl: undefined,
          backgroundColor: "#FAE4EB",
        },
      ],
    },
  });

  const loxas = useFormState({
    control: form.control,
  });

  React.useEffect(() => {
    const isEmpty = (obj: object) => Object.keys(obj).length === 0;

    if (isEmpty(loxas.errors)) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const collectErrorMessages = (errors: any): string[] => {
      const messages: string[] = [];
      for (const key in errors) {
        if (Object.hasOwn(errors, key)) {
          const error = errors[key];
          if (error && error.message) {
            messages.push(error.message);
          } else if (typeof error === "object") {
            messages.push(...collectErrorMessages(error));
          }
        }
      }
      return messages;
    };

    const errorMessages = collectErrorMessages(loxas.errors);

    if (errorMessages.length > 0) {
      toast.error(errorMessages.join(", "));
    }
  }, [loxas.errors]);

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: ({ data: { quizId } }) => {
        navigate({
          to: "/explore/$id",
          params: {
            id: quizId.toString(),
          },
        });
      },
    });
  };

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const addQuestion = () => {
    appendQuestion({
      content: "",
      timeLimit: 30,
      answerType: "single",
      answers: [
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
      ],
      mediaUrl: undefined,
      backgroundColor: "#FAE4EB",
    });

    setCurrentQuestionIndex(questionFields.length);
  };

  const removeQuestionHandler = () => {
    removeQuestion(currentQuestionIndex);
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  const nextSlide = () => {
    setCurrentQuestionIndex(
      Math.min(questionFields.length - 1, currentQuestionIndex + 1),
    );
  };

  const prevSlide = () => {
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormProvider {...form}>
            {questionFields.map(
              (field, index) =>
                index === currentQuestionIndex && (
                  <div key={field.id}>
                    <QuestionForm index={index} />
                  </div>
                ),
            )}
          </FormProvider>
          <div className="mt-4 flex gap-2">
            <Button variant="default" type="button" onClick={addQuestion}>
              Add question
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={removeQuestionHandler}
              disabled={questionFields.length === 1}
            >
              Delete question
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={prevSlide}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={nextSlide}
              disabled={currentQuestionIndex === questionFields.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="submit" className="w-full" size="lg">
            Create Quiz
          </Button>
        </div>
      </form>
    </div>
  );
}
