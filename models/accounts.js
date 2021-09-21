module.exports.model = (db, Sequelize) => {
    let model = {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        lastName: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        email: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        city: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        state: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        zip: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        address: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        address2: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        contact: {
            type: Sequelize.STRING(500),
            defaultValueValue: null,
        },
        image: {
            type: Sequelize.STRING(5000),
            defaultValueValue: null
        },
        token: {
            type: Sequelize.STRING(5000),
            defaultValueValue: null
        },
        password: {
            type: Sequelize.STRING(500),
            defaultValueValue: null
        },
        role: {
            type: Sequelize.STRING(500),
            defaultValueValue: 'user',
            values: ['user', 'admin' , 'anonymous']
        },

        accountType: {
            type: Sequelize.STRING(500),
            defaultValue: 'normal',
            values: ['normal', 'social']
        },
        area: {
            type: Sequelize.STRING(500),
            defaultValue: null
        },
        deletedBy: {
            type: Sequelize.STRING(500),
            defaultValue: null
        },
        deleteDone: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        isVarified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            values: [true, false]
        },
        createDate: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        updatedDate: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
    }

    return db.define('accounts', model, {
        db
    });
}
