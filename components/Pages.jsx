"use client";

const Pages = ({ datalength, pageno, setpageno }) => {
  const totalmatches = datalength;
  const totalpages = Math.ceil(totalmatches / 30);

  const pags = () => {
    const items = [];
    for (let i = 1; i <= totalpages; i++) {
      items.push(
        <li
          key={i}
          onClick={() => setpageno(i)}
          className={`flex items-center justify-center px-[14px] py-2 w-10 h-10 border border-white/10 rounded-lg backdrop-blur-3xl cursor-pointer transition-colors duration-300 whitespace-nowrap 
          ${pageno === i ? "bg-[#ffcc00] text-black font-bold" : "text-white hover:bg-[#ffcc00] hover:text-black"}`}
        >
          {i}
        </li>
      );
    }
    return items;
  };

  if (totalpages <= 1) return null;

  return (
    <div className="page-strip bottom-0 fixed w-full z-40 bg-transparent py-2">
      <ul className="datelist flex justify-center mx-auto max-w-xs overflow-x-scroll gap-1.5 my-1.5 scrollbar-hide bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
        {pags()}
      </ul>
    </div>
  );
};

export default Pages;
