
var Reserva = function(horario, cantidadPersonas, precioPorPersona, codigoDescuento)
{
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.calcularPrecioBase = function()
{
    return this.cantidadPersonas * this.precioPorPersona;
}

Reserva.prototype.calcularPrecioFinal = function()
{
    return this.calcularPrecioBase() + this.calcularAdicionales() - this.calcularDescuentos();
}

Reserva.prototype.calcularAdicionales = function()
{
    return this.calcularAdicionalPorHorario() + this.calcularAdicionalPorFinDeSemana();
}

Reserva.prototype.calcularAdicionalPorHorario = function()
{
    var lasTrece = this.crearFechaConNuevaHora(12, 0, 0);
    var lasCatorce = this.crearFechaConNuevaHora(13, 0, 0);
    var lasVeinte = this.crearFechaConNuevaHora(19, 0, 0);
    var lasVeintiuno = this.crearFechaConNuevaHora(20, 0, 0);

    // TODO refactorizar en un metodo
    if ((this.horario >= lasTrece && this.horario <= lasCatorce) ||
        (this.horario >= lasVeinte && this.horario <= lasVeintiuno))
    {
        return this.calcularPrecioBase() * 0.05;
    }
    
    return 0;
}

Reserva.prototype.crearFechaConNuevaHora = function(horas, minutos, segundos)
{
    return new Date(this.horario.getFullYear(), this.horario.getMonth(), this.horario.getDate(), horas, minutos, segundos);
}

Reserva.prototype.calcularAdicionalPorFinDeSemana = function()
{
    var domingo = 0;
    var viernes = 5;
    var sabado = 6;
    var diaDeLaSemana = this.horario.getDay();

    if (diaDeLaSemana === domingo ||
        diaDeLaSemana === viernes ||
        diaDeLaSemana === sabado)
    {
        return this.calcularPrecioBase() * 0.10;
    }   
    
    return 0;
}

Reserva.prototype.calcularDescuentos = function()
{
    return this.calcularDescuentosPorGruposGrandes() + this.calcularDescuentosPorCodigo();
}

Reserva.prototype.calcularDescuentosPorGruposGrandes = function()
{
    var descuento = 0;

    if (this.cantidadPersonas > 8)
    {
        descuento = 0.15;        
    }
    else if (this.cantidadPersonas >= 7)
    {
        descuento = 0.10;
    }
    else if (this.cantidadPersonas >= 4)
    {
        descuento = 0.05;
    }

    return this.calcularPrecioBase() * descuento;
}

Reserva.prototype.calcularDescuentosPorCodigo = function()
{
    var descuento = 0;

    switch(this.codigoDescuento)
    {
        case 'DES15':
            descuento = 0.15;
            break;
        case 'DES200':
            return 200;
        case 'DES1':
            return this.precioPorPersona;
    }

    return this.calcularPrecioBase() * descuento;
}