"use client";

export default function Stake() {
  return (
    <div className='bg-black text-white p-3 sm:p-5 my-10 sm:my-40 mx-auto max-w-5xl'>
      <div>
        {/* Header tabs - STAKE and BOND */}
        <div className="grid grid-cols-2 border-b border-[#1F1F1F]">
          <div className="py-3 text-center border-b-2 border-blue-600 font-mono bg-linear-to-b from-[#1F1F1F]/10 to-[#2234d1]/7">
            STAKE
          </div>
          <div className="py-3 text-center text-gray-500 font-mono hover:text-gray-300">
            BOND
          </div>
        </div>

        {/* Input field and MAX + STAKE buttons */}
        <div className="mt-6 mb-4">
          <div className="flex items-center">
            <div className="flex-grow relative">
              <input 
                type="text" 
                placeholder="Enter Amount" 
                className="w-full bg-[#0F0F0F] border border-[#1F1F1F] py-3 px-4 text-white placeholder-gray-600"
              />
            </div>
            <button className="bg-[#1F1F1F] hover:bg-[#1F1F1F]/85 px-4 py-3 ml-2 font-mono text-M h-[50px]">
              MAX
            </button>
            <button className="bg-[#2234d1] hover:bg-[#2234d1]/85 px-4 py-3 ml-2 font-mono text-M h-[50px]">
              STAKE $BLIZZ
            </button>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex mb-6 border-[#1F1F1F]">
          <button className="py-2 px-4 font-mono text-xs border bg-[#0F0F0F] border-[#1F1F1F] text-gray-400">
            STAKE
          </button>
          <button className="py-2 px-4 font-mono text-xs text-gray-500 hover:text-gray-300">
            REWARDS
          </button>
          <button className="py-2 px-4 font-mono text-xs text-gray-500 hover:text-gray-300">
            UNSTAKE
          </button>
          <button className="py-2 px-4 font-mono text-xs text-gray-500 hover:text-gray-300">
            COMPOUND
          </button>
        </div>

        <div className="border-t border-dashed border-[#1F1F1F] mt-5"></div>

        
        
        {/* First Row - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-5">
          <div className="border border-[#1F1F1F] bg-[#0F0F0F] p-0 relative h-20 sm:h-24 flex flex-col">
            {/* Dashed line through the middle of this div */}
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#1F1F1F]"></div>
            
            {/* Market cap label in the top half, centered vertically */}
            <div className="flex-1 flex items-center p-3 sm:p-4">
              <div className="text-[#868686] text-xs">
                $BLIZZ BALANCE
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
                STAKED BALANCE
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
                CLAIMABLE REWARDS
              </div>
            </div>
            
            {/* Value in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1 truncate">
              $4355.43
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
                NEXT EPOCH YIELD 
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
                NEXT EPOCH REWARD
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
                DAILY EWARDS
              </div>
            </div>
            
            {/* Value in the bottom half, centered vertically */}
            <div className="flex-1 flex items-center p-2 sm:p-3">
              <div className="text-base sm:text-xl ml-1 truncate">
              $4355.43
              </div>
            </div>
          </div> 
       </div>
      </div>
    </div>
  );
}