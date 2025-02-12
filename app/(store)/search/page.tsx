import { searchParamsProps } from "@/types"

async function SearchPage({ searchParams }: searchParamsProps) {
    const { query } = (await searchParams)
    return (
        <div>
            {query}
        </div>
    )
}

export default SearchPage
