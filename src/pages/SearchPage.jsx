import { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("none");
  const [categories, setCategories] = useState([]);

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 200,
  });

  useEffect(() => {
    const infiniteScrollTimeout = setTimeout(async () => {
      try {
        const { data: books } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=10&startIndex=${page}`
        );

        const filteredData = books?.items.map((book) => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            pdf: book.accessInfo.pdf.isAvailable,
            publisher: book.volumeInfo.publisher,
            epub: book.accessInfo.epub.isAvailable,
            categories: book.volumeInfo.categories,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            image:
              book.volumeInfo.imageLinks?.thumbnail ??
              book.volumeInfo.imageLinks?.smallThumbnail,
            previewLink: book.volumeInfo.previewLink,
          };
        });

        const newCategories = filteredData.reduce((acc, book) => {
          const validCategories = (book.categories || []).filter(
            (category) => category !== undefined
          );
          return acc.concat(validCategories);
        }, []);
        const allCategories = categories.concat(newCategories);
        const uniqueCategories = [...new Set(allCategories)];

        setCategories(uniqueCategories);
        setData([...data, ...filteredData]);
        setPage((prev) => prev + 10);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    }, 1000);
    return () => clearTimeout(infiniteScrollTimeout);
  }, [inView]);

  return (
    <main className="flex flex-col min-h-full gap-10 px-8 py-16 sm:px-10 sm:py-3">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-white">
          Results {filter !== "none" && `- {${filter}}`}
        </h2>
        <select
          name="filter"
          id="filter"
          className="p-2 px-8 rounded-md outline-none max-w-64"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="none">None</option>
          {categories.map((category) => (
            <option value={category} className="truncate">
              {category}
            </option>
          ))}
        </select>
      </div>
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
        {data
          ?.filter((book) =>
            book.categories && filter !== "none"
              ? book.categories?.includes(filter)
              : book
          )
          .map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
      </section>
      <div className="flex justify-center w-full">
        <img
          src="/spinner.svg"
          alt="spinner"
          width={35}
          height={35}
          ref={ref}
        />
      </div>
    </main>
  );
};

export default SearchPage;
