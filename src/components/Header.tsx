import { ChevronRight } from "lucide-react";

interface HeaderProps {
  title: string;
  onBack: () => void;
  showBack: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, showBack }) => (
  <div className="fixed top-0 left-0 right-0 h-16 bg-green-600 text-white flex items-center justify-between px-4 z-50">
    {showBack && (
      <button onClick={onBack} className="flex items-center">
        <ChevronRight className="h-6 w-6" />
      </button>
    )}
    <h1 className="text-xl font-bold text-center flex-1">{title}</h1>
    {showBack && <div className="w-6" />}
  </div>
);

export default Header;
