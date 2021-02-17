import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class User extends Model/*<User>*/ { //Adding arg. <User> will broke all model since sequelize 6.3.5
    //Fix issues - remove arg <User> / downgrade sequelize to v. ^5.22.0 & sequelize-typescript ^1.1.0
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: false,
    })
    gender: string
}