function NotFound(){
    return(
        <div className="mt-3 w-[100%]">
             <div className="flex flex-col w-[100%] justify-center items-center  border border-[#dfdee3] rounded  mb-4 mt-1 h-100">
                <div className=" bg-black border border-red-500 flex flex-col justify-center items-center w-150 h-50 rounded-[8px] shadow ">
                <div className=" bg-black border border-red-500 flex flex-col justify-center items-center w-150 h-50 rounded-[8px] shadow ">
                   <div className=" bg-[#1c1605] border border-yellow-500 rounded">
                   <h2 className=" text-[30px] text-yellow-500 py-3 px-5 rounded-[8px]">Page not found</h2>
                   </div>
                   <button className="mt-6 text-blue-600 cursor-pointer font-medium hover:text-blue-800" onClick={()=>{navigate(-1)}}>Back to Previous page</button>
                </div>
                </div>
             </div>
            
        </div>
    )
}
export default NotFound;