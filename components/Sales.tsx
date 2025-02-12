import { Sale } from "@/sanity.types"

function Sales({ sales }: { sales: Sale[] }) {
    return (
        <div>
            {sales[0].title}
        </div>
    )
}

export default Sales
