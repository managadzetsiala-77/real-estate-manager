export default function Button({ color, children }) {
    const style =
    color == "orange"
      ? "bg-[#F93B1D] border-[#F93B1D]  text-white"
      : color == "white"
        ? "bg-white text-[#F93B1D] border-[#F93B1D]"
        : "text-[#808A93] bg-white border-[#808A93] hover:bg-[#808A93] hover:text-white hover: border-[#808A93]";

  return (
    <>
      <button
        className={`px-4 py-2.5 ${style} rounded-[10px] transition-all cursor-pointer text-[16px] font-medium border `}
      >
        {children}
      </button>
    </>
  );
}
