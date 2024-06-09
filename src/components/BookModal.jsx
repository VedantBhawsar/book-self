import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiBookMarkedLine } from "react-icons/ri";
import toast from "react-hot-toast";

export const BookModal = ({ book, isOpen, setIsOpen }) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  let localBooks = JSON.parse(localStorage.getItem("_bookmarked_books")) || [];
  const [isSaved, setIsSaved] = useState(
    localBooks.some((localBook) => localBook?.id === book?.id)
  );

  const handleSave = () => {
    if (!isSaved) {
      localStorage.setItem(
        "_bookmarked_books",
        JSON.stringify([...localBooks, book])
      );
      setIsSaved(true);
      toast.success("Book added!");
    } else {
      const updatedBooks = localBooks.filter(
        (localBook) => localBook.id !== book.id
      );
      localStorage.setItem("_bookmarked_books", JSON.stringify(updatedBooks));
      setIsSaved(false);
      toast.success("Book removed!");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="hs-overlay flex items-center fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-auto bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={toggleModal}
        >
          <motion.div
            initial={{
              opacity: 0,
              marginTop: 0,
            }}
            animate={{
              opacity: 1,
              marginTop: 7,
            }}
            className="m-3 transition-all ease-out mt-14 sm:max-w-5xl sm:w-full sm:mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex max-h-[90vh] flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex items-center justify-between px-4 py-3 border-b dark:border-neutral-700">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  {book.title}
                </h3>
                <button
                  type="button"
                  className="flex items-center justify-center text-sm font-semibold text-gray-800 border border-transparent rounded-full hs-dropup-toggle size-7 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                  onClick={toggleModal}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-3 p-4 overflow-y-auto sm:grid sm:grid-cols-4">
                <div className="col-span-1 mt-1 text-gray-800 dark:text-neutral-400">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full rounded-xl"
                  />
                </div>

                <div className="flex flex-col col-span-3 gap-3 p-3 mt-1 dark:text-neutral-300">
                  <h1 className="text-xl font-bold text-white">{book.title}</h1>
                  <p>
                    <span className="font-bold">Description: </span>
                    {book.description}
                  </p>
                  <p>
                    <span className="font-bold">Authors: </span>
                    {book.authors.map((author, index) => (
                      <span key={index}>{author}</span>
                    ))}
                  </p>
                  <p>
                    <span className="font-bold">Categories: </span>
                    {book.categories.map((author, index) => (
                      <span key={index}>{author}</span>
                    ))}
                  </p>
                  <p>
                    <span className="font-bold">Publisher: </span>
                    {book.publisher}
                  </p>
                  <p>
                    <span className="font-bold">No. of Pages: </span>
                    {book.pageCount}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end px-4 py-3 border-t gap-x-2 dark:border-neutral-700">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm hs-dropup-toggle gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                  onClick={toggleModal}
                >
                  Close
                </button>
                {isSaved ? (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-red-600 border border-transparent rounded-lg gap-x-2 hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={handleSave}
                  >
                    <RiBookMarkedLine className="text-xl" />
                    Remove to bookmark
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={handleSave}
                  >
                    <RiBookMarkedLine className="text-xl" />
                    Save to bookmark
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
