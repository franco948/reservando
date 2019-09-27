
var expect = chai.expect;

var restauranteTest = null;

describe('Tests para reservarHorario', function () {
  // Inicializar un Listado desde cero
  beforeEach(function () {
    restauranteTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", 
      ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
  });

  it('Eliminar horario del arreglo de horarios', function () {
    
    // ARRANGE
    var cantidadHorariosAnterior = restauranteTest.horarios.length;
    var cantidadHorariosActual = 0;
    
    // ACT
    restauranteTest.reservarHorario('13:00');
    cantidadHorariosActual = restauranteTest.horarios.length;

    // ASSERT
    expect(cantidadHorariosActual).to.equal(cantidadHorariosAnterior - 2);
  });

});


