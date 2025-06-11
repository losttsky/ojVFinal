const oracledb = require("oracledb");
const { getConnection } = require("../db");

async function guardarMovimiento(data) {
  const connection = await getConnection();

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
      hojaResponsabilidad, // 👈 viene así del frontend
      articulos,
    } = data;

    // Guardar encabezado
    const insertEnc = `
  INSERT INTO Tb_Movimientos_Enc (
    Año_Movimiento, Codigo_Movimiento, Num_Movimiento,
    Fecha_Operacion, Usuario_Recibio, Tecnico_Entrego,
    Lugar_de_Entrega, Area_Administrativa, Nombre_Descargo,
    Lugar_Descargo, Hola_Responsabilidad, Inventario,
    Transporte, Dependencia, Municipio,
    Departamento, Tecnico_Cargado, Stock
  ) VALUES (
    :anio, 1, :num,
    TO_DATE(:fecha, 'YYYY-MM-DD'), :usuario, :tecnico,
    :lugar, :area, :descargo,
    :lugar_descargo, :holaResponsabilidad, :inventario,
    :transporte, :dependencia, :municipio,
    :departamento, :tecnico_cargado, :stock
  )
`;

    await connection.execute(insertEnc, {
      anio: anioMovimiento,
      num: numMovimiento,
      fecha: fechaOperacion,
      usuario: usuarioRecibido,
      tecnico: tecnicoEntrega,
      lugar: lugarEntrega,
      area,
      descargo: nombreDescargo,
      lugar_descargo: lugarDescargo,
      holaResponsabilidad: hojaResponsabilidad,
      inventario: "1", // puedes cambiar por valor real si quieres
      transporte: "1", // idem
      dependencia,
      municipio,
      departamento,
      tecnico_cargado: null, // ejemplo
      stock: "1", // ejemplo
    });

    // Guardar artículos
    const insertDet = `
      INSERT INTO Tb_Movimientos_Det (
        Año_Movimiento, Codigo_Movimiento, Num_Movimiento,
        Item_Movimiento, Codigo_Grupo, Codigo_Subgrupo, Codigo_Articulo,
        Cantidad, descripcion
      ) VALUES (
        :anio, 1, :num,
        :item, :grupo, :subgrupo, :articulo,
        :cantidad, :descripcion
      )
    `;

    for (let i = 0; i < articulos.length; i++) {
      const art = articulos[i];
      await connection.execute(insertDet, {
        anio: anioMovimiento,
        num: numMovimiento,
        item: i + 1,
        grupo: art.grupo,
        subgrupo: art.subgrupo,
        articulo: art.articulo,
        cantidad: art.cantidad,
        descripcion: art.descripcion,
      });
    }

    await connection.commit();
    console.log("✅ Movimiento guardado exitosamente");
  } catch (err) {
    await connection.rollback();
    console.error("❌ Error al guardar el movimiento:", err);
    throw err;
  } finally {
    await connection.close();
  }
}

module.exports = { guardarMovimiento };
