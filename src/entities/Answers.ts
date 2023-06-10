import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { User } from './User'
import { Post } from './Post'

@Entity('answers')
export class Answer {
    @PrimaryGeneratedColumn()
        id: number

    @Column({
        type: 'text'
    })
        description: 'text'

    @CreateDateColumn()
        created_at: Date

    @UpdateDateColumn()
        updated_at: Date

    @ManyToOne(() => User, user => user.answers)
    @JoinColumn({ name: 'user_id' })
        user: User

    @ManyToOne(() => Post, post => post.answers)
    @JoinColumn({ name: 'post_id' })
        post: Post

}

