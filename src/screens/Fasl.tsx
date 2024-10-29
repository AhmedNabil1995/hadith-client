import { ChevronLeft } from "lucide-react";
import { DUMMY_DATA } from "../data/dummyData";
import { ScreenName, ScreenParams } from "../types";

interface FaslScreenProps {
  onNavigate: (screenName: ScreenName, params: ScreenParams) => void;
  bookId: number | undefined;
}

const FaslsScreen: React.FC<FaslScreenProps> = ({ bookId, onNavigate }) => {
  const fasls = DUMMY_DATA.fasls.filter((fasl) => fasl.bookId === bookId);

  return (
    <div className="flex flex-col gap-4 p-4 mt-16 mb-20">
      {fasls.map((fasl) => (
        <button
          key={fasl.id}
          onClick={() => onNavigate("categories", { faslId: fasl.id })}
          className="bg-white rounded-lg shadow-md p-4 w-full text-right flex items-center justify-between"
        >
          <span className="block text-lg font-semibold">{fasl.name}</span>
          <ChevronLeft className="h-6 w-6" />
        </button>
      ))}
    </div>
  );
};

export default FaslsScreen;
