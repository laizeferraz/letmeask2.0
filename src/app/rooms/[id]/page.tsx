'use client'
import { FormEvent, useState } from "react";

import logoImg from "../../../../public/images/logoBlue.svg";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { ref, set, push, remove } from "firebase/database";
import Image from "next/image";
import { RoomCode } from "@/components/RoomCode";
import { useParams } from "next/navigation";
import { database } from "@/services/firebase";
import { Question } from "@/components/Question";
import { useRoom } from "@/hooks/useRoom";
import { EmptyRoom } from "@/components/EmptyRoom";
import { ThumbsUpIcon } from "lucide-react";


export default function Room () {
  const params = useParams();
  const { user, signInWithGoogle } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { questions, title } = useRoom(roomId);


  async function handleSignIn () {
    if (!user) {
      await signInWithGoogle()
    }
  }

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
      isHighlighted: false,
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
          <Image className="hidden lg:block lg:min-h-10" src={logoImg} width={150} alt="Letmeask" />
          <div className="flex items-center gap-4">
            <RoomCode code={roomId} />
          </div>
        </div>
      </header>

      <main className="px-6 max-w-[800px] lg:mx-auto">
        <div className="mt-8 mb-6 flex items-center flex-wrap gap-4">
          <h1 className="font-bold font-secondary text-black-700 text-2xl">{title}</h1>
          {questions.length > 0 && <span className="rounded-2xl bg-blue-500 lg:rounded-3xl py-2 px-4 text-white-100 font-medium text-sm">{questions.length} Question(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            className="w-full min-h-36 border-white-300 border-[0.5px] rounded-lg p-4 resize-y shadow "
            placeholder="What is your question?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <div className="flex justify-between items-center mt-4">
            {user ? (
              <div className="flex items-center">
                <Image className="rounded-[50%] w-6 h-6 lg:w-8 lg:h-8" src={user.avatar} width={32} height={32} alt={user?.name}
                blurDataURL={'/images/like.svg'} />
                <span className="ml-2 text-black-700 font-medium text-xs lg:text-sm">{user.name}</span>
              </div>
            ) : (
              <span className="font-medium text-gray-500 text-sm">
                To ask a question or if you are the creator of this room, <button className="bg-transparent border-0 text-blue-500 underline text-base cursor-pointer font-medium"
                onClick={handleSignIn}>please login.</button>
              </span>
            )}
            <Button customStyle="px-2 py-1 lg:p-2 bg-blue-500 text-white-100 hover:bg-blue-600 hover:text-white-200 mt-4 disabled:opacity-25 disabled:cursor-not-allowed" type="submit" disabled={!user}>
              Send question
            </Button>
          </div>
        </form>
        {questions.length === 0 ? (
          <EmptyRoom text="Login and be the first asking questions!" />
        ): (
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
                    <ThumbsUpIcon className={`${question.likeId ? "stroke-blue-500" : "stroke-gray-500"} h-[20px] w-[20px] -mt-2 lg:h-[24px] lg:w-[24px]`} />
                  </button>
                )}
              </Question>
            );
          })}
        </div>
        )}
      </main>
    </div>
  );
};
