import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import { COUPON_CODES } from "@/types";

async function SalesBanner() {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

    if (!(sale?.isActive)) {
        return null
    }

    return (
        <div className="bg-gradient-to-r from-red-700 to to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
            <div className="container flex flex-wrap item-center justify-between">
                <div className="">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
                        {sale.title}
                    </h2>
                    <p className="text-left text-lg text-gray-300 font-semibold mb-6">
                        {sale.description}
                    </p>
                </div>
                {/*  */}
                <div className="flex items-center">
                    <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transorm hover:scale-105 transition duration-300">
                        <span className="font-bold text-base sm:text-xl">
                            Use code:{' '}
                            <span className="text-red-700">{sale.couponCode}{' '}</span>
                        </span>
                        <span className="mt-2 font-bold text-base sm:text-xl">
                            for {sale.discountAmount}% OFF
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesBanner
