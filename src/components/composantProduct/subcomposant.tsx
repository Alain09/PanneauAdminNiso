"use client"
import React from 'react'

import { ComposantCatalogue, } from '@/type'
import { Trash2 } from 'lucide-react';
import { Input } from '../ui/input';

interface Structure {
    remote: (id: string) => void;
    composant: ComposantCatalogue;
    index: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Subcomposant({ remote, composant, handleChange, index }: Structure) {

    return (
        <div className='flex items-center gap-x-6'>
            <div className="border border-gray-100 shadow  rounded-lg bg-white shadow-gray-100 p-6 w-full h-fit">
                <div className="">
                    { /* Product */}
                    <div className="flex items-center gap-x-10 mb-5 mx-5 pb-5 border-b border-b-gray-100">
                        <label className="text-md font-normal w-[120px]">Product</label>
                        <Input
                            id='product'
                            type="text"
                            className="shadow shadow-gray-50  w-full h-[45px]"
                            value={composant.product}
                            name='product'
                            data-section-index={index}
                            onChange={handleChange}
                        />
                    </div>
                    { /* quantity */}
                    <div className="flex items-center gap-x-10 mb-5 mx-5 pb-5 border-b border-b-gray-100">
                        <label className="text-md font-normal w-[120px]">Quantité</label>
                        <Input
                            id='quantity'
                            type="number"
                            className="shadow shadow-gray-50  w-full h-[45px]"
                            value={composant.quantity}
                            name='quantity'
                            data-section-index={index}
                            onChange={handleChange}
                        />
                    </div>
                    { /* Image */}
                    <div className="flex items-center gap-x-10 mx-5">
                        <label className="text-md font-normal w-[120px]">Image</label>
                        <Input
                            id='image'
                            type="file"
                            className="shadow shadow-gray-50  w-full h-[45px]"
                            name='image'
                            data-section-index={index}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const event = {
                                        target: {
                                            name: 'image',
                                            value: e.target.files[0],
                                            dataset: { sectionIndex: index }
                                        }
                                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                                    handleChange(event);
                                }
                            }}
                            accept="image/*"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-[#FF4000] hover:bg-[#FF4000]/90 rounded-full cursor-pointer p-2"
                onClick={() => { remote(composant.id) }}
            >
                <Trash2 className="w-4 h-4 text-white" />
            </div>
        </div>
    )
}

export default Subcomposant