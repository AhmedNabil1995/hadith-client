import { ChevronLeft } from "lucide-react";
import { MaqsadI } from "../interfaces/Maqsad";

interface BooksScreenProps {
  onNavigate: (screenName: string, params: any) => void;
  maqsadId: number;
  maqsads: MaqsadI[];
}

const BooksScreen: React.FC<BooksScreenProps> = ({
  maqsadId,
  onNavigate,
  maqsads,
}) => {
  const books = maqsads.find((maqsad) => maqsad._id == maqsadId)?.ketab || [];
  return (
    <div className="flex flex-col gap-4 p-4 mt-16 mb-20">
      {books.map((book) => (
        <button
          key={book._id}
          onClick={() =>
            onNavigate("categories", {
              bookId: book._id,
            })
          }
          className="bg-white rounded-lg shadow-md p-4 w-full text-right flex items-center justify-between"
        >
          <span className="block text-lg font-semibold">{book.title}</span>
          <ChevronLeft className="h-6 w-6" />
        </button>
      ))}
    </div>
  );
};

export default BooksScreen;
