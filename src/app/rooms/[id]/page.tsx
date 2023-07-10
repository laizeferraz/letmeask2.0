'use client'
import { FormEvent, useState } from "react";

import logoImg from "../../../../public/images/logoBlue.svg";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { ref, set, push, remove } from "firebase/database";
import Image from "next/image";
import { RoomCode } from "@/components/RoomCode";
import emptyQuestionsImg from "../../../../public/images/empty-questions.svg";
import { useParams } from "next/navigation";
import { database } from "@/services/firebase";
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

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      //Remove like
      const likedRef = await ref(database, `rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
      remove(likedRef);
    } else {
      const likeRef = await ref(database, `rooms/${roomId}/questions/${questionId}/likes`)
      push(likeRef, {
        authorId: user?.id,
      });
    }
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
        {questions.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-10">
            <Image className="mb-10" src={emptyQuestionsImg} alt="Astronauts" />
            <span className="font-secondary font-bold text-black-700">No questions yet</span>
            <span className="text-sm text-gray-500">Login and be the first asking questions!</span>
          </div>
        )}
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
                    className={`flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors duration-200`}
                    type="button"
                    aria-label="Give a like"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    {question.likeCount > 0 && (
                      <span className="text-sm lg:text-base text-black-700">{question.likeCount}</span>
                    )}
                    <svg className="h-[20px] w-[20px] -mt-2 lg:h-[24px] lg:w-[24px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke={`${question.likeId ? "stroke-blue-500": "#737380"}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};
