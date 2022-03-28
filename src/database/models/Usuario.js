module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario'; // esto debería estar en singular
    let cols = {
        usuario_id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        desarrollador: {
            type: dataTypes.INTEGER(1)
        }    
    };
    let config = {
        tableName: "Usuarios",
        timestamps: false,
    }

    const Usuario = sequelize.define(alias,cols,config);

    return Usuario
};