'use client'
import logoImg from "../../../../../public/images/logoBlue.svg";
import Image from "next/image";
import { RoomCode } from "@/components/RoomCode";
import emptyQuestionsImg from "../../../../../public/images/empty-questions.svg";
import { useParams } from "next/navigation";
import likeImg from "../../../../../public/images/like.svg";
import { Question } from "@/components/Question";
import { useRoom } from "@/hooks/useRoom";


export default function Room () {
  const params = useParams();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  return (
    <div className="">
      <header className="border-gray-200 border-y-2 p-6">
        <div className="max-w-[1200px] lg:flex lg:mx-auto lg:items-center lg:justify-between">
          <Image className="hidden lg:block lg:min-h-10" src={logoImg} alt="Letmeask" />
          <div className="flex items-center gap-2">
            <RoomCode code={params.id} />
            <button className="h-9 rounded-lg outline outline-2 outline-blue-500 bg-white-100 hover:bg-white-200 px-2 text-blue-600 ">End room</button>
          </div>
        </div>
      </header>

      <main className="px-6 max-w-[800px] lg:mx-auto">
        <div className="mt-8 mb-6 flex items-center flex-wrap gap-4">
          <h1 className="font-bold font-secondary text-black-700 text-2xl">{title}</h1>
          {questions.length > 0 && <span className="rounded-2xl bg-blue-500 lg:rounded-3xl py-2 px-4 text-white-100 font-medium text-sm">{questions.length} Question(s)</span>}
        </div>
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
