import { useEffect, useState } from "react";
import { DUMMY_DATA } from "../data/dummyData";
import axios from "axios";
import { ScreenName, ScreenParams } from "../types";

interface CategoriesScreenProps {
  onNavigate: (screenName: ScreenName, params: ScreenParams) => void;
  bookId: number | undefined;
  faslId: number | undefined;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  faslId,
  bookId,
  onNavigate,
}) => {
  const [categories, setCategories] = useState<
    { category_name: string; category_id: number; hadith_no: number }[]
  >([]);
  const fetchCategories = async () => {
    const res = await axios.get(
      `https://hadith-smoky.vercel.app/api/hadiths/categories/${bookId}`
    );
    setCategories(res.data.categories || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 mt-16 mb-20">
      {categories.map((category) => (
        <button
          key={category.category_id}
          onClick={() =>
            onNavigate("hadiths", {
              categoryId: category.category_id,
              first_hadith_number: category.hadith_no,
            })
          }
          className="bg-white rounded-lg shadow-md p-4 w-full text-right"
        >
          <span className="block text-lg font-semibold">
            {category.category_name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoriesScreen;
