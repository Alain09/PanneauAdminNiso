import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { StatsCardProps } from '@/type'

function StatisCardUser({ title, value, icon }: StatsCardProps) {
  return (
    <div>
        <Card className="bg-white border border-gray-100   w-full h-[150px] ">
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
                </CardContent>
            </Card>

    </div>
  )
}

export default StatisCardUser