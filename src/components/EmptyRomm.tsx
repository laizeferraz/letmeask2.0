import Image from 'next/image'
import noQuestionsYet from '../../public/images/empty-questions.svg'

interface EmptyRoomProps {
  text: string;
}

export const EmptyRoom = ({text}: EmptyRoomProps) => {
  return(
    <div className="flex flex-col justify-center items-center mt-10">
            <Image className="mb-10" src={noQuestionsYet} alt="Astronauts" />
            <span className="font-secondary font-bold text-black-700">No questions yet...</span>
            <span className="text-sm text-gray-500">{text}</span>
          </div>
  )
}