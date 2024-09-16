import { Category } from "../schema/product.schema"

export class UpdateProductDto {
    readonly title: string
    readonly description: string
    readonly author: string
    readonly price: number
    readonly category: Category
}