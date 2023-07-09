import Image from "next/image";
import illustrationImg from "../../public/images/illustration.svg"
import logoYellow from "../../public/images/logoYellow.svg" 
import googleImg from "../../public/images/google-icon.svg"
import enterBlack from "../../public/images/enterBlack.svg"
import { Button } from "./Button";
import { FormEvent } from "react";

interface HomeMobileProps {
  onSubmit: (event: FormEvent) => Promise<void>
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => Promise<void>
  value: string
}

export const HomeMobile = ({onSubmit, onChange, value, onClick}: HomeMobileProps) => {
  return (
        <div className="flex flex-col justify-center items-center bg-blue-500 p-2 min-h-screen">
        <Image className="self-center" src={logoYellow} alt="Yellow letmeask logo " />
        <Image className="max-w-[280px]" src={illustrationImg} alt="Questions and Answers illustration." />
        <div className="flex flex-col">
        <Button customStyle="bg-red-500 text-white-100 hover:bg-red-600 hover:text-white-200" onClick={onClick}>
          <Image className="items-center" src={googleImg} alt="Google logo" />
          Create your room with Google
        </Button>
        <div className="text-white-200 before:grow before:bg-white-200 before:mr-1 before:h-[1px] text-xs my-6 flex items-center before:content-[''] after:content-[''] after:bg-white-200 after:grow after:h-[1px] after:ml-1">or enter in a room</div>
        <form onSubmit={onSubmit}>
          <input
            className='max-h-[50px] w-full rounded-lg border-gray-400 border-[0.5px] px-4 py-2'
            type="text"
            placeholder="Type the room code"
            onChange={onChange}
            value={value}
          />
        <Button customStyle="bg-white-200 text-black-700 hover:bg-white-300 mt-4" type="submit">
          <Image src={enterBlack} alt="enter icon" />Enter in a room
        </Button>
        </form>
        </div>
      </div>
  )
}