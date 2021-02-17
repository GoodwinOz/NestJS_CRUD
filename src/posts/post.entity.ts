import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from 'src/modules/users/user.entity'


@Table
export class Post extends Model/*<Post>*/ {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    body: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number

    @BelongsTo(() => User)
    user: User
}