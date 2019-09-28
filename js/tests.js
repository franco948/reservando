
var expect = chai.expect;

// Variables Globales para testear
var restauranteTest = null;
var listadoTest = null;
var reservasTest = [];

describe('Tests para la clase restaurant', function () {
  // Inicializar un Listado desde cero
  beforeEach(function () {
    restauranteTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York",
      ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
  });

  describe('Tests para funcion reservarHorario', function () {
    it('Eliminar horario reservado del arreglo de horarios', function () {

      // ARRANGE
      var cantidadHorariosAnterior = restauranteTest.horarios.length;
      var cantidadHorariosActual = 0;

      // ACT
      restauranteTest.reservarHorario('13:00');
      cantidadHorariosActual = restauranteTest.horarios.length;

      // ASSERT
      expect(cantidadHorariosActual).to.equal(cantidadHorariosAnterior - 1);
      expect(restauranteTest.horarios).to.eql(["15:30", "18:00"]);
    });

    it('Reservar horario inexistente no modifica el arreglo de horarios', function () {
      // ARRANGE
      var cantidadHorariosAnterior = restauranteTest.horarios.length;
      var cantidadHorariosActual = 0;

      // ACT
      restauranteTest.reservarHorario('13:01');
      cantidadHorariosActual = restauranteTest.horarios.length;

      // ASSERT
      expect(cantidadHorariosActual).to.equal(cantidadHorariosAnterior);
      expect(restauranteTest.horarios).to.eql(["13:00", "15:30", "18:00"]);
    });

    it('Llamar a la funcion sin parametros no modifica el arreglo de horarios', function () {
      // ARRANGE
      var cantidadHorariosAnterior = restauranteTest.horarios.length;
      var cantidadHorariosActual = 0;

      // ACT
      restauranteTest.reservarHorario();
      cantidadHorariosActual = restauranteTest.horarios.length;

      // ASSERT
      expect(cantidadHorariosActual).to.equal(cantidadHorariosAnterior);
      expect(restauranteTest.horarios).to.eql(["13:00", "15:30", "18:00"]);
    });
  });

  describe('Tests para la funcion obtenerPuntuacion', function () {
    it('Llamar a la funcion devuelve el promedio', function () {

      // ARRANGE
      var puntuacionEsperada = 7.4; // [6, 7, 9, 10, 5] / 5;
      var puntuacionActual = 0;

      // ACT
      puntuacionActual = restauranteTest.obtenerPuntuacion();

      // ASSERT
      expect(puntuacionActual).to.equal(puntuacionEsperada);
    });

    it('Un restaurante sin calificaciones devuelve cero', function () {
      // ARRANGE
      var puntuacionEsperada = 0;
      var puntuacionActual = 0;

      restauranteTest.calificaciones = [];

      // ACT
      puntuacionActual = restauranteTest.obtenerPuntuacion();

      // ASSERT
      expect(puntuacionActual).to.equal(puntuacionEsperada);
    });
  });

  describe('Tests para la funcion calificar', function () {
    it('Agregar una calificacion incrementa la cantidad de calificaciones', function () {
      // ARRANGE
      var cantidadCalificacionesAnterior = restauranteTest.calificaciones.length;
      var cantidadCalificacionesActual = 0;
      var nuevaCalificacion = 9;
      
      // ACT
      restauranteTest.calificar(nuevaCalificacion);
      cantidadCalificacionesActual =  restauranteTest.calificaciones.length;

      // ASSERT
      expect(cantidadCalificacionesActual).to.equal(cantidadCalificacionesAnterior + 1);
      expect(restauranteTest.calificaciones).to.eql([6, 7, 9, 10, 5, nuevaCalificacion]);
    });

    it('Llamar a la funcion sin parametros no modifica el arreglo de calificaciones', function () {
      // ARRANGE
      var cantidadCalificacionesAnterior = restauranteTest.calificaciones.length;
      var cantidadCalificacionesActual = 0;
      
      // ACT
      restauranteTest.calificar();
      cantidadCalificacionesActual =  restauranteTest.calificaciones.length;

      // ASSERT
      expect(cantidadCalificacionesActual).to.equal(cantidadCalificacionesAnterior);
      expect(restauranteTest.calificaciones).to.eql([6, 7, 9, 10, 5]);
    });
  }); 
});

describe('Tests para la clase Listado', function() {
  beforeEach(function () {
    restauranteTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York",
      ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
    listadoTest = new Listado([restauranteTest, 
      new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
      new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
    ]);
  });

  describe('Tests para la funcion buscarRestaurante', function() {
    it('Pasar el id de un restaunte existente devuelve el restaurante solicitado', function() {
      // ARRANGE
      var idBuscado = 1;
      var restauranteEsperado = restauranteTest;
      var restauranteActual = null;

      // ACT
      restauranteActual = listadoTest.buscarRestaurante(idBuscado);      

      // ASSERT
      expect(restauranteActual).to.equal(restauranteEsperado);
    });

    it('Pasar un id que no existe devuelve un mensaje', function() {
      // ARRANGE
      var idInexistente = 0;
      var mensajeActual = '';

      // ACT
      mensajeActual = listadoTest.buscarRestaurante(idInexistente);      

      // ASSERT
      expect(mensajeActual.toLowerCase()).to.have.string('no', 'encontrado');
    });    
  });

  describe('Tests para la funcion obtenerRestaurantes', function() {
    it('Devuelve todos los restaurantes sin filtrar', function() {
      // ARRANGE
      var cantidadRestaurantesEsperada = 3;
      var listadoRestaurantesActual = [];

      // ACT
      listadoRestaurantesActual = listadoTest.obtenerRestaurantes(null, null, null);

      // ASSERT
      expect(listadoRestaurantesActual.length).to.equal(cantidadRestaurantesEsperada);
    });

    it('Devuelve todos los restaurantes por un filtro de rubro', function() {
      // ARRANGE
      var cantidadRestaurantesEsperada = 2;      
      var listadoRestaurantesActual = [];
      var rubroAFiltrar = 'Asiática';

      // ACT
      listadoRestaurantesActual = listadoTest.obtenerRestaurantes(rubroAFiltrar, null, null);

      // ASSERT
      expect(listadoRestaurantesActual.length).to.equal(cantidadRestaurantesEsperada);
      expect(listadoRestaurantesActual[0].rubro).to.equal(rubroAFiltrar);
      expect(listadoRestaurantesActual[1].rubro).to.equal(rubroAFiltrar);
    });

    it('Devuelve todos los restaurantes por un filtro de ciudad', function() {
      // ARRANGE
      var cantidadRestaurantesEsperada = 1;      
      var listadoRestaurantesActual = [];
      var ciudadAFiltrar = 'Londres';

      // ACT
      listadoRestaurantesActual = listadoTest.obtenerRestaurantes(null, ciudadAFiltrar, null);

      // ASSERT
      expect(listadoRestaurantesActual.length).to.equal(cantidadRestaurantesEsperada);
      expect(listadoRestaurantesActual[0].ubicacion).to.equal(ciudadAFiltrar);
    });

    it('Devuelve todos los restaurantes por un filtro de horario', function() {
      // ARRANGE
      var cantidadRestaurantesEsperada = 1;      
      var listadoRestaurantesActual = [];
      var horarioAFiltrar = '13:00';

      // ACT
      listadoRestaurantesActual = listadoTest.obtenerRestaurantes(null, null, horarioAFiltrar);

      // ASSERT
      expect(listadoRestaurantesActual.length).to.equal(cantidadRestaurantesEsperada);
      expect(listadoRestaurantesActual[0].horarios).to.include.members([horarioAFiltrar]);
    });

    it('Devuelve todos los restaurantes por un filtro de rubro, ciudad y horario', function() {
      // ARRANGE
      var cantidadRestaurantesEsperada = 1;      
      var listadoRestaurantesActual = [];
      var rubroAFiltrar = 'Asiática';
      var ciudadAFiltrar = 'Nueva York';
      var horarioAFiltrar = '13:00';

      // ACT
      listadoRestaurantesActual = listadoTest.obtenerRestaurantes(rubroAFiltrar, ciudadAFiltrar, horarioAFiltrar);

      // ASSERT
      expect(listadoRestaurantesActual.length).to.equal(cantidadRestaurantesEsperada);
      expect(listadoRestaurantesActual[0].rubro).to.equal(rubroAFiltrar);
      expect(listadoRestaurantesActual[0].ubicacion).to.equal(ciudadAFiltrar);
      expect(listadoRestaurantesActual[0].horarios).to.include.members([horarioAFiltrar]);
    });

    it('Devuelve una lista vacia de restaurantes por un filtro de rubro inexistente', function() {
      // ARRANGE
      var cantidadRestaurantesEsperada = 0;      
      var listadoRestaurantesActual = [];
      var rubroAFiltrar = 'No existe';

      // ACT
      listadoRestaurantesActual = listadoTest.obtenerRestaurantes(rubroAFiltrar, null, null);

      // ASSERT
      expect(listadoRestaurantesActual.length).to.equal(cantidadRestaurantesEsperada);
    });
    
    it('Devuelve una lista vacia de restaurantes por un filtro de ciudad inexistente', function() {
      // ARRANGE
      var cantidadRestaurantesEsperada = 0;      
      var listadoRestaurantesActual = [];
      var ciudadAFiltrar = 'No existe';

      // ACT
      listadoRestaurantesActual = listadoTest.obtenerRestaurantes(null, ciudadAFiltrar, null);

      // ASSERT
      expect(listadoRestaurantesActual.length).to.equal(cantidadRestaurantesEsperada);
    });

    it('Devuelve una lista vacia de restaurantes por un filtro de horario inexistente', function() {
      // ARRANGE
      var cantidadRestaurantesEsperada = 0;      
      var listadoRestaurantesActual = [];
      var horarioAFiltrar = 'No existe';

      // ACT
      listadoRestaurantesActual = listadoTest.obtenerRestaurantes(null, null, horarioAFiltrar);

      // ASSERT
      expect(listadoRestaurantesActual.length).to.equal(cantidadRestaurantesEsperada);
    });
  });

});

describe('Tests para la clase reserva', function() {
  beforeEach(function() {
    // Recordar que el mes, hora, minutos, segundos empiezan desde 0
    // El dia empieza desde 1
    var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"); // Descuento por grupo grande y codigo y adicional por viernes
    var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200"); // Descuento por codigo
    var reserva3 = new Reserva(new Date(2019, 9, 7, 11, 59), 2, 500, "DES15"); // Descuento por codigo
    var reserva4 = new Reserva(new Date(2019, 9, 7, 13, 01), 10, 100, ''); // Descuento por grupo grande
    var reserva5 = new Reserva(new Date(2019, 9, 6, 19, 0), 4, 250, ''); // Descuento por grupo grande y adicional por fin de semana
    var reserva6 = new Reserva(new Date(2019, 9, 6, 20, 0), 4, 250, ''); // Descuento por grupo grande y adicional por fin de semana
    var reserva7 = new Reserva(new Date(2019, 9, 7, 12, 0), 1, 1000, ''); // Adicional por franja horaria
    var reserva8 = new Reserva(new Date(2019, 9, 7, 13, 0), 1, 1000, ''); // Adicional por franja horaria
    var reserva9 = new Reserva(new Date(2019, 9, 7, 18, 59), 1, 500, ''); // Sin modificaciones
    var reserva0 = new Reserva(new Date(2019, 9, 7, 20, 01), 1, 500, ''); // Sin modificaciones
    reservasTest = [reserva1, reserva2, reserva3, reserva4, reserva5, 
                    reserva6, reserva7, reserva8, reserva9, reserva0];
   });

  describe('Tests para la funcion calcularPrecioBase', function() {
    it('Devuelve el precio base', function() {
      // ARRANGE
      var preciosEsperados = [2800, 300, 1000, 1000, 1000, 
                              1000, 1000, 1000, 500, 500];
      var preciosActuales = [];      

      // ACT
      preciosActuales = reservasTest.map(reserva => reserva.calcularPrecioBase());

      // ASSERT
      expect(preciosActuales).to.eql(preciosEsperados);
    });
  });

  describe('Tests para la funcion calcularPrecioFinal', function() {
    it('Devuelve el precio final', function() {
      // ARRANGE
      /* En la pagina web el precio final de la reserva 1 aparece como $2310, pero no se a que se debe*/
      var preciosEsperados = [2450, 100, 850, 850, 1100, 
                              1100, 1050, 1050, 500, 500];
      var preciosActuales = [];      

      // ACT
      preciosActuales = reservasTest.map(reserva => reserva.calcularPrecioFinal());

      // ASSERT
      expect(preciosActuales).to.eql(preciosEsperados);
    });
  });

  // TODO testear el resto de la funciones de la clase reserva
});

