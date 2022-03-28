module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto'; // esto debería estar en singular
    let cols = {
        producto_id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        producto_name: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rango: {
            type: dataTypes.DECIMAL(2,1),
            allowNull: false
        },
        type_name: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        
    };
    let config = {
        tableName: "Productos",
        timestamps: false,
    }

    const Producto = sequelize.define(alias,cols,config);

    return Producto
};