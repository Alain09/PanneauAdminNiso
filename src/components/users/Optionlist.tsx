"use client"
import React from 'react'
import { TontineOption } from '@/type'
import { Trash2 } from 'lucide-react'

interface Structre {
    opt: TontineOption
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setTexteDelete: React.Dispatch<React.SetStateAction<string | undefined>>
}

function Optionlist({ opt, setOpen ,setTexteDelete }: Structre) {
    return (
        <div className='flex items-center gap-x-6'>
            <div className="border border-gray-100 rounded-lg  bg-white shadow-gray-100 p-6 w-full h-fit  ">
                <div className="mb-2">
                    <div className="flex justify-between mb-2">
                        <span className="text-[14px] font-medium text-gray-600 "> Option:</span>
                        <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                            < span className="text-sm font-medium text-gray-50">{opt?.option.toString().padStart(2,"0")}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-[14px] font-medium text-gray-600">Quantité :</span>
                        <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                            < span className="text-sm font-medium text-gray-50" >{opt?.countOption.toString().padStart(2, "0")}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-[14px] font-medium text-gray-600 ">A payer par/S :</span>
                        <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                            < span className="text-sm font-medium text-gray-50" >{opt?.totalToPayByWeekOfThisOption} Fcfa</span>
                        </div>
                    </div>
                    <div className="flex flex-col mb-1">
                        <span className="text-[14px] font-medium text-gray-600 ">Les articles à prendre:</span>
                        <div className=" mt-4">
                            <div className=" p-2  w-full border border-gray-100 rounded-lg bg-gray-50" >
                                <div className=" flex flex-wrap gap-1 ">

                                    {opt?.components.map((item) => (
                                        <div key={item.id} className=" shadow-gray-100 px-2 py-1 w-fit border border-gray-200 rounded-md bg-white flex justify-center items-center" >
                                            < span className="text-sm font-medium text-gray-600" >{item.item}</span>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div className=" bg-[#FF4000]  rounded-full cursor-pointer p-2 "
                onClick={() => { setOpen(true);  setTexteDelete(`l'option ${opt.option} de ${opt.catégory}`) }}
            >
                <Trash2 className="w-4 h-4 text-white"
                />
            </div>

        </div>

    )
}

export default Optionlist