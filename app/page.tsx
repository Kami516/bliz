"use client";

export default function Home() {
  return (
    <div className='bg-black text-white p-3 sm:p-5 my-10 sm:my-40 mx-auto max-w-5xl'>
      <div>
        <div className="flex items-center">
          <h1 className="text-lg sm:text-xl font-mono">$BLIZZ DETAILS</h1>
          <div className="ml-3 sm:ml-5 h-px flex-grow border-t border-dashed border-[#1F1F1F]"></div>
        </div>
        
        {/* First Row - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-5">
          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Market cap label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                MARKET CAP 
              </div>
            </div>
            
            {/* Price in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1 truncate">
                $385,345,234
              </div>
            </div>
          </div>
          
          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                USD PRICE
              </div>
            </div>
            
            {/* Price in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1 truncate">
                $4355.43
              </div>
            </div>
          </div>
          
          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                MARKET CAP
              </div>
            </div>
            
            {/* Value in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1 truncate">
                Infinity
              </div>
            </div>
          </div>

          {/* SECOND ROW */}

          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Market cap label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                TOTAL STAKED 
              </div>
            </div>
            
            {/* Price in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1 truncate">
                6543,3454 $BLIZZ
              </div>
            </div>
          </div>
          
          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                TOTAL VALUE LOCKED
              </div>
            </div>
            
            {/* Price in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1 truncate">
                $7654,435,324
              </div>
            </div>
          </div>
          
          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                AVAILABLE OPEN MARKET
              </div>
            </div>
            
            {/* Value in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1 truncate">
                23,4325,35 $BLIZZ
              </div>
            </div>
          </div> 
       </div>

          {/* THIRD ROW */}
          
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-5">
          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Market cap label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                PERCENTAGE STAKED 
              </div>
            </div>
            
            {/* Price in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1">
                75,456%
              </div>
            </div>
          </div>
          
          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                BURNED SUPPLY
              </div>
            </div>
            
            {/* Price in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1">
                543,345 $BLIZZ
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}