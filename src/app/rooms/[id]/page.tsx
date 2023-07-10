'use client'
import { FormEvent, useState } from "react";

import logoImg from "../../../../public/images/logoBlue.svg";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { ref, set, push } from "firebase/database";
import Image from "next/image";
import { RoomCode } from "@/components/RoomCode";
import emptyQuestionsImg from "../../../../public/images/empty-questions.svg";
import { useParams } from "next/navigation";
import { database } from "@/services/firebase";
import likeImg from "../../../../public/images/like.svg";
import { Question } from "@/components/Question";
import { useRoom } from "@/hooks/useRoom";


export default function Room () {
  const params = useParams();
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in.");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighligthed: false,
      isAnswered: false,
    };

    const questionRef = ref(database,`rooms/${roomId}/questions`)
    const newQuestionRef = push(questionRef);
    await set(newQuestionRef, question)

    setNewQuestion("");
  }

  return (
    <div className="">
      <header className="border-gray-200 border-y-2 p-6">
        <div className="max-w-[1200px] lg:flex lg:mx-auto lg:items-center lg:justify-between">
          <Image className="hidden lg:block lg:min-h-10" src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main className="px-6 max-w-[800px] lg:mx-auto">
        <div className="mt-8 mb-6 flex items-center flex-wrap gap-4">
          <h1 className="font-bold font-secondary text-black-700 text-2xl">{title}</h1>
          {questions.length > 0 && <span className="rounded-2xl bg-blue-500 lg:rounded-3xl py-2 px-4 text-white-100 font-medium text-sm">{questions.length} Question(s)</span>}
        </div>

        <form className="" onSubmit={handleSendQuestion}>
          <textarea
          className="w-full min-h-36 border-white-300 border-[0.5px] rounded-lg p-4 resize-y shadow "
            placeholder="What is your question?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <div className="flex justify-between items-center mt-4">
            {user ? (
              <div className="flex items-center">
                <Image className="rounded-[50%] w-6 h-6 lg:w-8 lg:h-8" src={user.avatar} width={32} height={32} alt={user?.name} />
                <span className="ml-2 text-black-700 font-medium text-xs lg:text-sm">{user.name}</span>
              </div>
            ) : (
              <span className="font-medium text-gray-500 text-sm">
                To ask a question, <button className="bg-transparent border-0 text-blue-500 underline text-base cursor-pointer font-medium">please login</button>
              </span>
            )}
            <Button customStyle="px-2 py-1 lg:p-2 bg-blue-500 text-white-100 hover:bg-blue-600 hover:text-white-200 mt-4" type="submit" isDisabled={!user}>
              Send question
            </Button>
          </div>
        </form>
        <div className="mt-4">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    className={``}
                    type="button"
                    aria-label="Give a like"
                  >
                    <span className="text-sm lg:text-base text-black-700">{`0`}</span>

                    <Image
                      className="h-4 w-4 lg:h-6 lg:w-6"
                      src={likeImg}
                      alt="Like"/>
                  </button>
                )}
              </Question>
            );
          })}
        </div>
        {questions.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-10">
            <Image className="mb-10" src={emptyQuestionsImg} alt="Astronauts" />
            <span className="font-secondary font-bold text-black-700">No questions yet</span>
            <span className="text-sm text-gray-500">Login and be the first asking questions!</span>
          </div>
        )}
      </main>
    </div>
  );
};