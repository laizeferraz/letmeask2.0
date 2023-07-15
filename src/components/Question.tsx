import Image from "next/image";
import { ReactNode } from "react";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};
export const Question = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) => {
  return (
    <div
      className={`${isHighlighted && "bg-blue-500/10"} rounded-[8px] shadow p-7 mb-4 ${isAnswered && 'bg-gray-200/50 border-0'} ${isHighlighted && "bg-blue-500/10 border-blue-600 border shadow"}`}
    >
      <p className="text-black-700">{content}</p>
      <footer className="flex justify-between items-center mt-7">
        <div className="flex items-center">
          <Image className="rounded-[50%] w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" width={32} height={32} src={author.avatar} alt={author.avatar} />
          <span className={`text-black-500 ml-2 text-xs lg:text-sm ${isHighlighted && "text-black-700"}`}>{author.name}</span>
        </div>
        <div className="flex gap-4">{children}</div>
      </footer>
    </div>
  );
};