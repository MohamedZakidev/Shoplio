import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: "sale",
    title: "Sale",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Sale title",
            type: "string"
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "discountAmount",
            title: "Discount Amount",
            type: "number",
            description: "Enter the discount amount in percentage or a fixed value"
        }),
        defineField({
            name: "couponCode",
            title: "Coupon Code",
            type: "string",
        }),
        defineField({
            name: "validFrom",
            title: "Valid From",
            type: "datetime",
        }),
        defineField({
            name: "validUntil",
            title: "Valid Until",
            type: "datetime",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Toggle this box to activate/deactivate the sale"
        }),
    ],
    preview: {
        select: {
            title: "title",
            discountAmount: "discountAmount",
            isActive: "isActive",
            couponCode: "couponCode",
        },
        prepare(select) {
            const { title, discountAmount, isActive, couponCode } = select;
            const status = isActive ? "Active" : "Inactive";
            return {
                title: title,
                subtitle: `${discountAmount}% off - Code: ${couponCode} | ${status}`
            }
        }
    }
})