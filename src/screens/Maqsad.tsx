import { Book } from "lucide-react";
import { DUMMY_DATA } from "../data/dummyData";
import { MaqsadI as MaqsadI } from "../interfaces/Maqsad";

interface MaqsadScreenProps {
  onNavigate: (screenName: string, params: any) => void;
  maqsads: MaqsadI[];
}

const MaqsadScreen: React.FC<MaqsadScreenProps> = ({ onNavigate, maqsads }) => (
  <div className="grid grid-cols-2 gap-4 p-4 mt-16 mb-20 dir-rtl">
    {maqsads?.map((maqsad) => (
      <button
        key={maqsad._id}
        onClick={() => onNavigate("books", { maqsadId: maqsad._id })}
        className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
      >
        <img src={maqsad.icon} />
        <span className="text-center font-bold">{maqsad.title}</span>
      </button>
    ))}
  </div>
);

export default MaqsadScreen;
