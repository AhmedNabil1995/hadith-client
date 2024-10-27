import { ChevronLeft, ChevronRight } from "lucide-react";
import { DUMMY_DATA } from "../data/dummyData";

interface BooksScreenProps {
  onNavigate: (screenName: string, params: any) => void;
  maqsadId: number | undefined;
}

const BooksScreen: React.FC<BooksScreenProps> = ({ maqsadId, onNavigate }) => {
  const books = DUMMY_DATA.books.filter((book) => book.maqsadId === maqsadId);

  return (
    <div className="flex flex-col gap-4 p-4 mt-16 mb-20">
      {books.map((book) => (
        <button
          key={book.id}
          onClick={() =>
            onNavigate(book.hasFasl ? "fasls" : "categories", {
              bookId: book.id,
              faslId: null,
            })
          }
          className="bg-white rounded-lg shadow-md p-4 w-full text-right flex items-center justify-between"
        >
          <span className="block text-lg font-semibold">{book.name}</span>
          <ChevronLeft className="h-6 w-6" />
        </button>
      ))}
    </div>
  );
};

export default BooksScreen;
