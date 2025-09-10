const Pages = ({datalength,pageno,setpageno}) => {
    const totalmatches=datalength;
    console.log(datalength);
    const totalpages = Math.ceil(totalmatches / 30);
    // console.log(pagno);
    
    const pags=()=>{
        const items=[];
        for(let i=1;i<=totalpages;i++){
            items.push(
                <li 
                    key={i} 
                    onClick={()=>setpageno(i)}
                    className={`px-[14px] py-2 w-10 h-10 border border-white/10 rounded-lg backdrop-blur-3xl cursor-pointer transition-colors duration-300 whitespace-nowrap 
                    ${pageno === i ? "bg-[#ffcc00] text-black font-bold" : "text-white hover:bg-[#ffcc00] hover:text-black"}`}>
                        {i}
                </li>
            );
        }
        return items;
    };
  return (
    <div className="page-strip bottom-0  fixed w-full ">
        <ul className="datelist flex  mx-auto w-2xs overflow-x-scroll gap-1.5 my-1.5 scrollbar-hide">
            {pags()}
        </ul>
    </div>
  )
}

export default Pages;