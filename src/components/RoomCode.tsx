import Image from "next/image"
import copyImg from "../../public/images/copy.svg"

interface RoomCodeProps {
  code: string
}

export const RoomCode = ({code}: RoomCodeProps) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)
  }

  const ellipsify = (code: string): string => {
    if (code.length > 5) {
      return `${code.slice(0, 3)}...${code.slice(code.length - 3)}`;
    }
    return code;
  };

  return (
    <button className="h-10 rounded-[8px] overflow-hidden bg-white-100 border-blue-500 border-2 flex" onClick={copyRoomCodeToClipboard}>
      <div className="bg-blue-500 px-3 flex justify-center items-center h-full">
        <Image src={copyImg} alt="Copy room code" />
      </div>
      <span className=" self-center pr-4 pl-3 grow text-xs font-medium">Room #{ellipsify(code)}</span>
    </button>
  )
}
