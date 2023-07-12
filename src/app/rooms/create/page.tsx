'use client'
import { FormEvent, useState } from "react";
import Link from "next/link";
import illustrationImg from "../../../../public/images/illustration.svg";
import logoImg from "../../../../public/images/logoBlue.svg";

import { Button } from "../../../components/Button";
import Image from "next/image";
import { getDatabase, ref, set, push } from "firebase/database";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function  CreateNewRoom () {
  const { user } = useAuth();
  const database = getDatabase();
  
  const [newRoom, setNewRoom] = useState('')
  const router = useRouter()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }
    const roomRef = ref(database, 'rooms');
    const newRoomRef = await push(roomRef)

    await set(newRoomRef, {
      title: newRoom,
      authorId: user?.id,
      authorName: user?.name,
    })

    router.push(`/rooms/admin/${newRoomRef.key}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen lg:items-stretch">
      <aside className="hidden lg:basis-[45%] lg:block flex-col px-20 py-28 bg-blue-500 items-stretch">
        <Image className="max-w-[320px] max-h-[413-px]" src={illustrationImg} alt="Questions and Answers illustration." />
        <p className="text-white-200 text-4xl font-bold mt-10 leading-10 font-secondary">Create live Q&amp;A rooms</p>
        <p className="text-white-200 text-2xl mt-10 leading-8">Answer room questions in real time.</p>
      </aside>
      <main className="flex items-center justify-center px-8 lg:basis-[55%]">
        <div className="flex flex-col w-full max-w-[320px] text-center items-stretch">
          <Image className="self-center" src={logoImg} alt="Letmeask" />
          <p className="text-2xl text-black-900 font-secondary font-bold mt-16 mb-6">Create new room</p>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              className='max-h-[50px] w-full rounded-lg border-gray-400 border-[0.5px] px-4 py-2 lg:h-[50px]'
              placeholder="Room name"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit" customStyle="bg-blue-500 text-white-100 hover:bg-blue-600 hover:text-white-200 mt-4">Create room</Button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            <Link className="text-blue-600 mr-1" href="/">Click here</Link>
            to enter in an existent room.
          </p>
        </div>
      </main>
    </div>
  );
};
