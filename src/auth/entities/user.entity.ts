import { Product } from "src/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {
        unique: true
    })
    email: string

    @Column('text', {
        select: false
    })
    password: string

    @Column('text')
    fullName: string

    @Column('bool', {
        default: true
    })
    isActive: boolean

    @Column('text',{
        array: true,
        default: ['user', 'admin', 'super']
    })
    roles: string[]

    @OneToMany(
        () => Product,
        (product) => product.user,
        { eager: true}
    )
    product: Product[]

    @BeforeInsert()
    checkFieldBeforeInsert(){
        this.email = this.email.toLowerCase().trim()
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate(){
        this.checkFieldBeforeInsert()
    }
}
