function Cajero()
{
  this.billetes = [];

  this.addBilletes = function(billete)
  {
    this.billetes.push(billete);
  }

  this.totalDinero = function()
  {
    var total = 0;
    for(bi of this.billetes)
    {
      total += bi.valor * bi.cantidad;
    }
    return total;
  }

  this.entregarDinero = function(cantidad)
  {
    var dinero = 0;
    var div = 0;
    var papeles = 0;

    var entregado = [];
    dinero = cantidad

    if(this.totalDinero() >= dinero)
    {
      for(var bi of this.billetes)
      {

        if(dinero > 0)
        {
          div = Math.floor(dinero / bi.valor);

          if(div > bi.cantidad)
          {
            papeles = bi.cantidad;
          }
          else
          {
            papeles = div;
          }

          entregado.push(new Billete(bi.valor, papeles));
          if(papeles > 0 && bi.cantidad >= papeles)
          {
            bi.entregar(papeles);
          }
          dinero = dinero - (bi.valor * papeles);
        }

      }
    }
    else
    {
      console.log("Solo tengo " + this.totalDinero());
    }

    return [dinero, entregado];
  }
}

class Billete
{
  constructor(valor, cantidad)
  {
    this.valor = valor;
    this.cantidad = cantidad;
  }

  entregar(cantidad)
  {
    this.cantidad -= cantidad;
    if(this.cantidad == 0)
    {
      console.log("Se me acabaron los billetes de " + this.valor);
    }
  }
}

function entregarDinero()
{
  var t = document.getElementById("dinero");
  var dinero = parseInt(t.value);
  var entregado = [];

  var result = cajero.entregarDinero(dinero);
  dinero = result[0];
  entregado = result[1];

  if(dinero > 0)
  {
    resultado.innerHTML = "Soy un cajero malo, he sido malo y no puedo darte esa cantidad :(";
  }
  else
  {
    resultado.innerHTML += "<hr />";
    for(var e of entregado)
    {
      if(e.cantidad > 0)
      {
        resultado.innerHTML += e.cantidad + " billetes de $" + e.valor + "<br />";
      }
    }
    resultado.innerHTML += "<strong>Total entregado: </strong>" + t.value;
  }
}

var cajero = new Cajero();
cajero.addBilletes(new Billete(100, 5));
cajero.addBilletes(new Billete(50, 10));
cajero.addBilletes(new Billete(20, 5));
cajero.addBilletes(new Billete(10, 10));
cajero.addBilletes(new Billete(5, 5));

var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");
b.addEventListener("click", entregarDinero);
