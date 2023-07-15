'use client'
import Image from "next/image"
import { RoomCode } from "@/components/RoomCode"
import { useParams, useRouter } from "next/navigation"
import logoImg from "../../../../../public/images/logoBlue.svg"
import { Question } from "@/components/Question"
import { useRoom } from "@/hooks/useRoom"
import { database } from "@/services/firebase"
import { ref, remove, update } from "firebase/database"
import { useState } from "react"
import { CloseRoomModal } from "@/components/CloseRoomModal"
import { RemoveQuestionModal } from "@/components/RemoveQuestionModal"
import { CheckCircle2, MessageCircle, TrashIcon } from "lucide-react"
import { EmptyRoom } from "@/components/EmptyRomm"


export default function Room () {
  const router = useRouter()
  const params = useParams()
  const roomId = params.id
  const { questions, title } = useRoom(roomId)

  const [closeRoomModalIsOpen, setCloseRoomModalIsOpen] = useState(false)
  const [deleteQuestionModalIsOpen, setdeleteQuestionModalIsOpen] = useState(false)

  function closeCloseRoomModal() {
    setCloseRoomModalIsOpen(false)
  }

  function openCloseRoomModal() {
    setCloseRoomModalIsOpen(true) 
  }

  function closeDeleteQuestionModal() {
    setdeleteQuestionModalIsOpen(false)
  }
  function openDeleteQuestionModal() {
    setdeleteQuestionModalIsOpen(true)
  }

  async function handleCloseRoom() {
    const roomRef = ref(database, `rooms/${roomId}`)
    await update(roomRef,{
      closedAt: new Date(),
    });
    setCloseRoomModalIsOpen(false)
    router.push("/")
  }
  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`)
    await update(questionRef,{
      isAnswered: true,
      isHighlighted: false,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    const questionHighlightedRef = ref(database, `rooms/${roomId}/questions/${questionId}`)
    await update(questionHighlightedRef, {
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const deleteQuestionRef = ref(database, `rooms/${roomId}/questions/${questionId}`)
      await remove(deleteQuestionRef);
    }
  }

  return (
    <div className="">
      <header className="border-gray-200 border-y-2 p-6">
        <div className="max-w-[1200px] lg:flex lg:mx-auto lg:items-center lg:justify-between">
          <Image className="hidden lg:block lg:min-h-10" src={logoImg} alt="Letmeask" />
          <div className="flex items-center justify-between gap-2">
            <RoomCode code={params.id} />
            <button 
              className="h-9 rounded-lg outline outline-2 outline-blue-500 bg-white-100 hover:bg-white-200 px-1 lg:px-2 text-blue-600"
              type="button"
              onClick={openCloseRoomModal}
            >
              Close room
            </button>
            <CloseRoomModal isOpen={closeRoomModalIsOpen} closeModal={closeCloseRoomModal} handleCloseRoom={handleCloseRoom}/>
          </div>
        </div>
      </header>

      <main className="px-6 max-w-[800px] lg:mx-auto">
        <div className="mt-8 mb-6 flex items-center flex-wrap gap-4">
          <h1 className="font-bold font-secondary text-black-700 text-2xl">{title}</h1>
          {questions.length > 0 && <span className="rounded-2xl bg-blue-500 lg:rounded-3xl py-2 px-4 text-white-100 font-medium text-sm">{questions.length} Question(s)</span>}
        </div>
        {questions.length === 0 ? (
          <EmptyRoom text="Send the room code to your friends and start answering questions!" />
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
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 stroke-gray-500 hover:stroke-blue-500"/>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <MessageCircle className="h-5 w-5 lg:h-6 lg:w-6 stroke-gray-500 hover:stroke-blue-500"/>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={openDeleteQuestionModal}
                >
                  <TrashIcon className="h-5 w-5 lg:h-6 lg:w-6 stroke-gray-500 hover:stroke-red-500"/>
                <RemoveQuestionModal isOpen={deleteQuestionModalIsOpen} closeModal={closeDeleteQuestionModal} handleDeleteQuestion={() => handleDeleteQuestion(question.id)}/>
                </button>
              </Question>
            );
          })}
        </div>
        )}
      </main>
    </div>
  );
};
