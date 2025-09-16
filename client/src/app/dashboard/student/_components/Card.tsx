import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}
  >
    {children}
  </div>
);

export default Card;
