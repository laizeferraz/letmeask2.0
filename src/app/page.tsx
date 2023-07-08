'use client'
import illustrationImg from "../../public/images/illustration.svg"
import logoBlue from "../../public/images/logoBlue.svg"
import logoYellow from "../../public/images/logoYellow.svg" 
import googleImg from "../../public/images/google-icon.svg"
import enter from "../../public/images/enterWhite.svg"
import Image from "next/image";
import { Button } from "@/components/Button"
import { useViewport } from "@/hooks/useViewport";
import { HomeMobile } from "@/components/HomeMobile"

export default function Home() {
  const { width } = useViewport()
  const breakpoint = 1024
  return (
    <>
    
      {breakpoint >= width ? 
        <HomeMobile />
      : ( 
      <div className="flex min-h-screen"> 
        <aside className="basis-[45%] flex flex-col px-20 py-28 bg-blue-500">
        <Image className="max-w-[320px] max-h-[413-px]" src={illustrationImg} alt="Questions and Answers illustration." />
        <p className="text-white-200 text-4xl font-bold mt-10 leading-10 font-secondary">Create live Q&amp;A rooms</p>
        <p className="text-white-200 text-2xl mt-10 leading-8">Answer the room questions in real time.</p>
      </aside>
    <main className="flex items-center justify-center px-8 basis-[55%]">
      <div className="flex flex-col w-full max-w-[320px] text-center">
        <Image className="self-center mb-10" src={logoBlue} alt="Letmeask" />
        <Button customStyle="bg-red-500 text-white-100 hover:bg-red-600 hover:text-white-200">
          <Image className="items-center" src={googleImg} alt="Google logo" />
          Create your room with Google
        </Button>
        <div className="text-gray-400 before:grow before:bg-gray-400 before:mr-4 before:h-[1px] text-xs my-6 flex items-center before:content-[''] after:content-[''] after:bg-gray-400 after:grow after:h-[1px] after:ml-4">or enter in a room</div>
        <form>
          <input
            className='h-[50px] w-full rounded-lg border-gray-400 border-[0.5px] px-4'
            type="text"
            placeholder="Type the room code"
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
