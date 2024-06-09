"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { BookModal } from "./BookModal";

export const BookCard = ({ book }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative w-full max-w-sm rounded "
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
      >
        <div className="relative w-full h-fit" onClick={() => setIsOpen(true)}>
          <img
            src={book.image}
            alt={book.title}
            className="w-full cursor-pointer rounded-xl min-h-96"
            onLoad={() => setLoading(false)}
          />
        </div>
        <div className="flex flex-col gap-3 py-4 ">
          <div className="flex items-center justify-between gap-1">
            <h2 className="w-full text-xl font-bold text-white line-clamp-1">
              {book?.title}
            </h2>
            <div className="py-1 px-2 bg-[#161921] rounded-sm">
              <p className="text-sm font-bold text-white capitalize"></p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <BiUser className="text-lg font-bold text-white" />
              <p className="text-base font-bold text-white truncate">
                {book.authors && book?.authors[0]}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <BookModal book={book} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
