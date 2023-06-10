import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { User } from './User'
import { Answer } from './Answers'

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
        id: number

    @Column({
        type: 'text'
    })
        title: 'text'

    @Column({
        type: 'text'
    })
        description: 'text'

    @CreateDateColumn()
        created_at: Date

    @UpdateDateColumn()
        updated_at: Date

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'user_id' })
        user: User

    @OneToMany(() => Answer, answers => answers.post)
        answers: Answer[]
}

