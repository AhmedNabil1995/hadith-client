import { Book } from "lucide-react";
import { DUMMY_DATA } from "../data/dummyData";

interface MaqsadScreenProps {
  onNavigate: (screenName: string, params: any) => void;
}

const MaqsadScreen: React.FC<MaqsadScreenProps> = ({ onNavigate }) => (
  <div className="grid grid-cols-2 gap-4 p-4 mt-16 mb-20 dir-rtl">
    {DUMMY_DATA.maqsads.map((maqsad) => (
      <button
        key={maqsad.id}
        onClick={() => onNavigate("books", { maqsadId: maqsad.id })}
        className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
      >
        <Book className="h-12 w-12 mb-2" />
        <span className="text-center font-bold">{maqsad.name}</span>
      </button>
    ))}
  </div>
);

export default MaqsadScreen;
