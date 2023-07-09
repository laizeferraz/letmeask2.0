'use client'
import illustrationImg from "../../public/images/illustration.svg"
import logoBlue from "../../public/images/logoBlue.svg"
import googleImg from "../../public/images/google-icon.svg"
import enter from "../../public/images/enterWhite.svg"
import Image from "next/image";
import { Button } from "@/components/Button"
import { useViewport } from "@/hooks/useViewport";
import  {useRouter} from "next/navigation"
import { HomeMobile } from "@/components/HomeMobile"
import { useAuth } from "@/hooks/useAuth"
import { FormEvent, useState } from "react"
import { database } from "@/services/firebase"
import { get, ref } from "firebase/database"

export default function Home() {
  const router = useRouter()
  const { width } = useViewport()
  const breakpoint = 1024

  const [roomCode, setRoomCode] = useState('')

  const {user, signInWithGoogle} = useAuth()

  async function handleSignInAndCreateRoom () {
    if (!user) {
      await signInWithGoogle()
    }
    router.push('/rooms/create')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()
    if (roomCode.trim() === '') {
      return
    }
    const roomRef = await get(ref(database, `rooms/${roomCode}`))
    if (!roomRef.exists()) {
      alert('Room does not exist.')
      return
    }
    if (roomRef.val().endedAt) {
      alert('Room already closed.')
      return
    }
    router.push(`/rooms/${roomCode}`)
  }
  return (
    <>
      {breakpoint >= width ? 
        <HomeMobile onChange={event => setRoomCode(event.target.value)} onSubmit={handleJoinRoom} onClick={handleSignInAndCreateRoom} value={roomCode} />
      : ( 
      <div className="flex min-h-screen items-stretch"> 
        <aside className="basis-[45%] flex flex-col px-20 py-28 bg-blue-500">
        <Image className="max-w-[320px] max-h-[413-px]" src={illustrationImg} alt="Questions and Answers illustration." />
        <p className="text-white-200 text-4xl font-bold mt-10 leading-10 font-secondary">Create live Q&amp;A rooms</p>
        <p className="text-white-200 text-2xl mt-10 leading-8">Answer room questions in real time.</p>
      </aside>
    <main className="flex items-center justify-center px-8 basis-[55%]">
      <div className="flex flex-col w-full max-w-[320px] text-center items-stretch">
        <Image className="self-center" src={logoBlue} alt="Letmeask" />
        <Button onClick={handleSignInAndCreateRoom} customStyle="bg-red-500 text-white-100 hover:bg-red-600 hover:text-white-200 mt-16">
          <Image className="items-center" src={googleImg} alt="Google logo" />
          Create your room with Google
        </Button>
        <div className="text-gray-400 before:grow before:bg-gray-400 before:mr-4 before:h-[1px] text-xs my-6 flex items-center before:content-[''] after:content-[''] after:bg-gray-400 after:grow after:h-[1px] after:ml-4">or enter in a room</div>
        <form onSubmit={handleJoinRoom}>
          <input
            className='h-[50px] w-full rounded-lg border-gray-400 border-[0.5px] px-4'
            type="text"
            placeholder="Type the room code"
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
          />
          <Button customStyle="bg-blue-500 text-white-100 hover:bg-blue-600 hover:text-white-200 mt-4"><Image src={enter} alt="enter icon" />Enter in a room</Button>
        </form>
      </div>
    </main>
    </div>
    )}
    </>
  )
}
