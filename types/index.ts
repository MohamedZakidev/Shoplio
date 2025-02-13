export type searchParamsProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const COUPON_CODES = {
    BFRIDAY: "BFRIDAY",
    XMAS2024: "XMAS2024",
    XMAS2025: "XMAS2025",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;