"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Category } from "@/sanity.types"
import { useRouter } from "next/navigation"

export default function CategoriesView({ categories }: { categories: Category[] }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const router = useRouter()

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            const selectedCategory = categories.find(category => (
                category.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            ))
            if (selectedCategory?.slug?.current) {
                setValue(selectedCategory?._id)
                router.push(`/category/${selectedCategory.slug.current}`)
                setOpen(false)
            }
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full sm:w-[200px] text-center sm:text-left sm:justify-between bg-primary-500 hover:opacity-85 hover:bg-primary-500 text-white hover:text-white"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "Select a category..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        className="h-9"
                        placeholder="Search a category..."
                        onKeyDown={handleKeyDown}
                    />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => {
                                        setValue(category._id === value ? "" : category._id)
                                        router.push(`/category/${category.slug?.current}`)
                                        setOpen(false)
                                    }}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === category._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
