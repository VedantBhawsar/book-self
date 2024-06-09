import { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";

const LibraryPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let localBooks = localStorage.getItem("_bookmarked_books");
    localBooks = JSON.parse(localBooks);
    setData(localBooks);
  }, []);

  return (
    <main className="flex flex-col h-full gap-10 px-8 py-16 sm:px-10 sm:py-3">
      <h2 className="text-2xl font-bold text-white">Bookmarks</h2>
      {data?.length > 0 ? (
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
          {data?.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </section>
      ) : (
        <div className="flex items-center justify-center h-20 text-base text-neutral-100">
          <p>Bookmark is empty</p>
        </div>
      )}
    </main>
  );
};

export default LibraryPage;
