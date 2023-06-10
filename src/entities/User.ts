import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn } from 'typeorm'
import { Post } from './Post'
import { Answer } from './Answers'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
        id: number

    @Column({ type: 'text' })
        name: string

    @Column({ type: 'text', unique: true })
        email: string

    @Column({ type: 'text' })
        password: string

    @Column({
        type: 'enum',
        enum: ['admin', 'user'],
        default: 'user'
    })
        role: string

    @Column({
        type: 'text'
    })
        location: string

    @OneToMany(() => Post, post => post.user)
        posts: Post[]

    @OneToMany(() => Post, post => post.user)
        answers: Answer[]

    @CreateDateColumn()
        created_at: Date

    @UpdateDateColumn()
        updated_at: Date
}
