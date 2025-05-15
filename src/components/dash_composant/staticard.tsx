import React from 'react';
import { StatsCardProps } from '@/type';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';


export function Startscard({ title, value, description, icon }: StatsCardProps) {
    return (
        <div className=' relative'>
            <Card className="bg-white  dark:bg-gray-800 absolute w-full z-[10] ">
                <CardHeader className="flex flex-row items-center justify-between ">
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {title}
                    </CardTitle>
                    <div className="p-2 bg-orange-100  rounded-full">
                        {icon}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-gray-900 ">
                        {value}
                    </div>

                    <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                        {description}
                    </p>
                </CardContent>
            </Card>
            <Card className=" shadow-none    dark:bg-gray-800  absolute top-3 left-2 right-2   bg-[#FFECE5]">
                <CardHeader className="flex flex-row items-center justify-between ">
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {title}
                    </CardTitle>
                    <div className="p-2 bg-[#FFECE5]  rounded-full">
                        {icon}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-gray-900 ">
                        {value}
                    </div>

                    <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                        {description}
                    </p>
                </CardContent>
            </Card>


        </div>

    );
}