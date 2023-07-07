import illustrationImg from "../../public/images/illustration.svg"
import logoImg from "../../public/images/logo.svg"
import googleImg from "../../public/images/google-icon.svg"
import enter from "../../public/images/enter.svg"
import Image from "next/image";
import { Button } from "@/components/Button"

export default function Home() {
  return (
    <div>
      <aside>
        <Image src={illustrationImg} alt="Questions and Answers illustration." />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Answers room questions in real time.</p>
      </aside>
    <main className="flex min-h-screen items-center p-24">
      <div className="main-content">
        <Image src={logoImg} alt="Letmeask" />
        <button className="w-80 rounded-lg px-2 h-[49px] flex items-center justify-center gap-2 bg-red-500 text-white-100 hover:bg-red-600 hover:text-white-200">
          <Image src={googleImg} alt="Google logo" />
          Create your room with Google
        </button>
        <div className="">or enter in a room</div>
        <form>
          <input
            type="text"
            placeholder="Type the room code"
          />

          <Button className="w-80 rounded-lg px-2 h-[49px] flex items-center justify-center gap-2 bg-blue-500 text-white-100 hover:bg-blue-600 hover:text-white-200"><Image src={enter} alt="enter icon" />Enter in a room</Button>
        </form>
      </div>
    </main>
    </div>
  )
}
