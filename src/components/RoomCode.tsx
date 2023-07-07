import Image from "next/image";
import copyImg from "../../public/images/copy.svg"

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="" onClick={copyRoomCodeToClipboard}>
      <div>
        <Image src={copyImg} alt="Copy room code" />
      </div>
      <span>Room #{props.code}</span>
    </button>
  )
}
