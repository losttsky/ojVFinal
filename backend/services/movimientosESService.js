const oracledb = require('oracledb');
const connectionConfig = require('../db'); 

async function guardarMovimiento(data) {
  const connection = await oracledb.getConnection(connectionConfig);

  try {
    const {
      anioMovimiento,
      numMovimiento,
      fechaOperacion,
      usuarioRecibido,
      tecnicoEntrega,
      lugarEntrega,
      nombreDescargo,
      lugarDescargo,
      area,
      dependencia,
      municipio,
      departamento,
      observaciones,
      marca,
      modelo,
      serie,
      articulos
    } = data;

    // Insert encabezado
    await connection.execute(
      `INSERT INTO Tb_Movimientos_Enc (
        Año_Movimiento, Codigo_Movimiento, Num_Movimiento,
        Fecha_Operacion, usuario_recibio, tecnico_entrego,
        lugar_de_entrega, nombre_descargo, lugar_descargo,
        Area_administrativa, dependencia, municipio,
        departamento, observaciones, marca, modelo, serie
      ) VALUES (
        :anio, 1, :num,
        TO_DATE(:fecha, 'YYYY-MM-DD'), :usuario, :tecnico,
        :lugar, :descargo, :lugar_descargo,
        :area, :dependencia, :municipio,
        :departamento, :obs, :marca, :modelo, :serie
      )`,
      {
        anio: anioMovimiento,
        num: numMovimiento,
        fecha: fechaOperacion,
        usuario: usuarioRecibido,
        tecnico: tecnicoEntrega,
        lugar: lugarEntrega,
        descargo: nombreDescargo,
        lugar_descargo: lugarDescargo,
        area,
        dependencia,
        municipio,
        departamento,
        obs: observaciones,
        marca,
        modelo,
        serie
      }
    );

    // Insert artículos
    for (const [index, art] of articulos.entries()) {
      await connection.execute(
        `INSERT INTO Tb_Movimientos_Det (
          Año_Movimiento, Codigo_Movimiento, Num_Movimiento,
          Item_Movimiento, Codigo_Grupo, Codigo_Subgrupo, Codigo_Articulo,
          Cantidad, descripcion
        ) VALUES (
          :anio, 1, :num,
          :item, :grupo, :subgrupo, :articulo,
          :cantidad, :descripcion
        )`,
        {
          anio: anioMovimiento,
          num: numMovimiento,
          item: index + 1,
          grupo: art.grupo,
          subgrupo: art.subgrupo,
          articulo: art.articulo,
          cantidad: art.cantidad,
          descripcion: art.descripcion
        }
      );
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    await connection.close();
  }
}

module.exports = { guardarMovimiento };
