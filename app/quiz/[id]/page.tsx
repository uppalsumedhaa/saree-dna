import Link from "next/link";
import { notFound } from "next/navigation";
import QuestionView from "../QuestionView";
import { getQuestion, questions, TOTAL_QUESTIONS } from "../questions";

export function generateStaticParams() {
  return questions.map((q) => ({ id: String(q.id) }));
}

type Params = { id: string };

export default function QuizQuestionPage({ params }: { params: Params }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id < 1 || id > TOTAL_QUESTIONS) {
    notFound();
  }

  // Q1 is the design template. Q2–Q8 render a placeholder until the design
  // is approved and replicated.
  if (id !== 1) {
    return (
      <main className="flex min-h-[100svh] w-full flex-col items-center justify-center bg-stone-50 px-6 text-center text-stone-900">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-stone-500">
          Q{id} / {TOTAL_QUESTIONS}
        </p>
        <h1 className="mt-6 max-w-xl font-serif text-3xl font-medium leading-tight md:text-4xl">
          Coming soon.
        </h1>
        <p className="mt-3 max-w-md font-serif text-lg italic text-stone-500">
          This question is being styled.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block border border-stone-900/70 px-7 py-3 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-stone-900 transition-colors duration-200 hover:bg-stone-900 hover:text-white"
        >
          Home
        </Link>
      </main>
    );
  }

  const question = getQuestion(id);
  if (!question) notFound();

  return <QuestionView question={question} />;
}
