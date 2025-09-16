import { useState } from "react";

interface Mood {
  emoji: string;
  label: string;
  color: string;
}

const moods: Mood[] = [
  {
    emoji: "😊",
    label: "Жаргалтай",
    color: "bg-green-100",
  },
  {
    emoji: "😢",
    label: "Гунигтай",
    color: "bg-blue-100",
  },
  {
    emoji: "😐",
    label: "Яахав дээ",
    color: "bg-gray-100",
  },
  {
    emoji: "🤩",
    label: "Догдолсон",
    color: "bg-yellow-100",
  },
  {
    emoji: "😡",
    label: "Ууртай",
    color: "bg-red-100",
  },
  {
    emoji: "😴",
    label: "Ядарсан",
    color: "bg-purple-100",
  },
];

export const MoodSelector = ({ onSelect }: { onSelect: (mood: string) => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (mood: Mood) => {
    setSelected(mood.label);
    onSelect(mood.label);
  };

  return (
    <div className=" mx-auto  bg-white  p-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Сайн байна yy 👋</h1>
      <p className="text-lg text-gray-600 mb-8">Таны өнөөдөр хэр байв?</p>

      <div className="grid grid-cols-3 gap-6">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleSelect(mood)}
            className={`
              flex flex-col items-center justify-center p-6 rounded-2xl shadow-md 
              hover:scale-105 transition transform duration-200 
              ${selected === mood.label ? "ring-4 ring-blue-400" : "hover:ring-2 hover:ring-gray-300"}
              ${mood.color}
            `}
          >
            <span className="text-4xl mb-2">{mood.emoji}</span>
            <span className="font-medium text-gray-800">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
