import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        example: '',
        description: 'Product Id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example: 't-shirt teslo',
        description: 'Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string

    @ApiProperty({
        example: 0,
        description: 'Price Id',
    })
    @Column('float', {
        default: 0
    })
    price: number

    @ApiProperty({
        example: 'blablablablablablablablablabla',
        description: 'description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'SLUG',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string

    @ApiProperty({
        example: 10,
        description: 'Stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number

    @ApiProperty({
        example: ['m', 'xl', 'xxl'],
        description: 'Sizes array',
        default: null
    })
    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty({
        example: 'women',
        description: 'gender',
    })
    @Column('text')
    gender: string

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tag: string[]

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[]


    @ManyToOne(
        ()=> User,
        (user) => user.product
    )
    user: User

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }
}
