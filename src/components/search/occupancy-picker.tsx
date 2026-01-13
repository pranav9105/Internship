"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import type { Occupancy } from "./stay-search-form";

interface OccupancyPickerProps {
    value: Occupancy;
    onChange: (value: Occupancy) => void;
}

export function OccupancyPicker({ value, onChange }: OccupancyPickerProps) {
    
    const handleUpdate = (field: keyof Occupancy, amount: number) => {
        const newValue = { ...value, [field]: Math.max(field === 'adults' || field === 'rooms' ? 1 : 0, value[field] + amount) };
        onChange(newValue);
    };

    return (
        <div className="space-y-4 p-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="adults" className="text-base">Adults</Label>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleUpdate('adults', -1)} disabled={value.adults <= 1}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-lg font-bold">{value.adults}</span>
                    <Button variant="outline" size="icon" onClick={() => handleUpdate('adults', 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                 <div>
                    <Label htmlFor="children" className="text-base">Children</Label>
                    <p className="text-xs text-muted-foreground">Ages 0-17</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleUpdate('children', -1)} disabled={value.children <= 0}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-lg font-bold">{value.children}</span>
                    <Button variant="outline" size="icon" onClick={() => handleUpdate('children', 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="rooms" className="text-base">Rooms</Label>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleUpdate('rooms', -1)} disabled={value.rooms <= 1}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-lg font-bold">{value.rooms}</span>
                    <Button variant="outline" size="icon" onClick={() => handleUpdate('rooms', 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
