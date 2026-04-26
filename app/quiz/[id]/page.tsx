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

  const question = getQuestion(id);
  if (!question) notFound();

  return <QuestionView question={question} />;
}
