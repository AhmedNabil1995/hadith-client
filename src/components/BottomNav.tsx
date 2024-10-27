import { Book, Search, Settings } from "lucide-react";

interface HeaderProps {
  setCurrentScreen: React.Dispatch<
    React.SetStateAction<{
      name: string;
      params: {};
    }>
  >;
}

const BottomNav: React.FC<HeaderProps> = ({ setCurrentScreen }) => (
  <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center">
    <button
      onClick={() => setCurrentScreen({ name: "maqsads", params: {} })}
      className="flex flex-col items-center"
    >
      <Book className="h-6 w-6" />
    </button>
    <button
      onClick={() => setCurrentScreen({ name: "search", params: {} })}
      className="flex flex-col items-center"
    >
      <Search className="h-6 w-6" />
    </button>
    <button
      onClick={() => setCurrentScreen({ name: "settings", params: {} })}
      className="flex flex-col items-center"
    >
      <Settings className="h-6 w-6" />
    </button>
  </div>
);

export default BottomNav;
