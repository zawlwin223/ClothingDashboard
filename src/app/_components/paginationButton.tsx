// Rename this function as a named export:
export default function PaginationButton({
  setPage,
  page,
  totalPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  totalPage: number
}) {
  console.log(page, totalPage)
  return (
    <div className="w-full text-end">
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={`py-3 px-8 rounded-[5px] bg-gray-200 text-gray-500 ${
          page === 1 ? 'opacity-50 cursor-not-allowed' : ' cursor-pointer'
        }`}>
        Prev
      </button>
      <button
        disabled={page === totalPage}
        onClick={() => setPage((prev) => prev + 1)}
        className={`py-3 px-8 ms-2  rounded-[5px] bg-gray-200 text-gray-500 ${
          page === totalPage
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        }`}>
        Next
      </button>
    </div>
  )
}
