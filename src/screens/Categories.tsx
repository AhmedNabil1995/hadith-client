import { DUMMY_DATA } from "../data/dummyData";

interface CategoriesScreenProps {
  onNavigate: (screenName: string, params: any) => void;
  bookId: number | undefined;
  faslId: number | undefined;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  faslId,
  bookId,
  onNavigate,
}) => {
  const categories = DUMMY_DATA.categories.filter(
    (category) => category.faslId === faslId || category.bookId === bookId
  );

  return (
    <div className="flex flex-col gap-4 p-4 mt-16 mb-20">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onNavigate("hadiths", { categoryId: category.id })}
          className="bg-white rounded-lg shadow-md p-4 w-full text-right"
        >
          <span className="block text-lg font-semibold">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoriesScreen;
