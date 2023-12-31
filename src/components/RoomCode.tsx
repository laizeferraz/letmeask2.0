import { Copy } from "lucide-react"

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
    <button className="h-10 rounded-[8px] overflow-hidden bg-white-100 border-blue-500 border-2 flex hover:bg-white-200" onClick={copyRoomCodeToClipboard}>
      <div className="bg-blue-500 px-3 flex justify-center items-center h-full hover:bg-blue-600">
        <Copy className="stroke-white-100 w-5 "/>
      </div>
      <span className="self-center pr-4 pl-3 grow text-xs font-medium">Room #{ellipsify(code)}</span>
    </button>
  )
}
