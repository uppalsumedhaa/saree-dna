import { redirect } from "next/navigation";

// /quiz always enters at Q1.
export default function QuizIndex() {
  redirect("/quiz/1");
}
