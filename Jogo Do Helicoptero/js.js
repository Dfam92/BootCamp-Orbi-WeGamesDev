function Start()
{
	$("#inicio").hide();

	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	
	var velocidadeInimigo1 = 5;
	var velocidadeInimigo2 = 5;
	var velocidadeAmigo = 3;
	var posicaoYInimigo1 = parseInt(Math.random() * 334);
	var podeAtirar = true;
	
	var jogo = {};
	var TECLA = 
		{
			W: 87,
			S: 83,
			A: 65,
			D: 68,
			SPACE: 32

		}
	
	jogo.pressionou = [];


	$(document).keydown(function(e){
	jogo.pressionou[e.which] = true;
	});
	
	
	$(document).keyup(function(e){
	jogo.pressionou[e.which] = false;
	});

	jogo.timer = setInterval(Loop,30);

	function Loop()
	{
		MoveFundo();
		MoveJogador();
		MoveInimigo1();
		MoveInimigo2();
		MoveAmigo();
		colisao();
	}


	function MoveFundo()
	{
		moveParaEsquerda = parseInt($("#fundoGame").css("background-position"));
		$("#fundoGame").css("background-position",moveParaEsquerda-1);
	}

	function MoveJogador() 
	{
		if (jogo.pressionou[TECLA.W]) {
			
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-10);
			if (topo<=0)
			{
				$("#jogador").css("top",topo);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+10);
			if (topo>=434) 
			{	
				$("#jogador").css("top",topo);	
			}
		}
		
		if (jogo.pressionou[TECLA.D]) {
			var movePlayerEsquerda = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",movePlayerEsquerda+10);
			if(movePlayerEsquerda >= 700)
			{
				$('#jogador').css("left",movePlayerEsquerda);
			}
		}

		if (jogo.pressionou[TECLA.A]) {
			var movePlayerEsquerda = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",movePlayerEsquerda-10);
			if(movePlayerEsquerda <= 0)
			{
				$('#jogador').css("left",movePlayerEsquerda);
			}
		}

		if (jogo.pressionou[TECLA.SPACE]) {
			Disparo();
		}
	}

	function MoveInimigo1() 
	{
		posicaoXInimigo1 = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoXInimigo1-velocidadeInimigo1);
		$("#inimigo1").css("top",posicaoYInimigo1);
		
		if (posicaoXInimigo1 <= 0) 
		{
			posicaoYInimigo1 = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoYInimigo1);
		}
	}

	function MoveInimigo2()
	{
		var posicaoXinimigo2 = parseInt($("#inimigo2").css("left"))
		$("#inimigo2").css("left",posicaoXinimigo2 - velocidadeInimigo2)

		if(posicaoXinimigo2 <= 0)
		{
			$("#inimigo2").css("left",775);
		}
	}

	function MoveAmigo()
	{
		var posicaoXAmigo = parseInt($("#amigo").css("left"))
		$("#amigo").css("left", posicaoXAmigo + velocidadeAmigo)
		if(posicaoXAmigo >= 900)
		{
			$("#amigo").css("left",0);
		}
	}

	function Disparo()
	{
		if(podeAtirar == true)
		{
			podeAtirar = false;

			playerTopPos = parseInt($("#jogador").css("top"));
			playerXPos = parseInt($("#jogador").css("left"));
			tiroXPos = playerXPos + 190;
			tiroTopoPos = playerTopPos + 40;
			$("#fundoGame").append("<div id='disparo'></div>")
			$("#disparo").css("top",tiroTopoPos);
			$("#disparo").css("left",tiroXPos);

			var tempoDisparo = window.setInterval(ExecutarDisparo,30);
			
		}
		function ExecutarDisparo()
		{
			posicaoXTiro = parseInt($("#disparo").css("left"));
			$("#disparo").css("left",posicaoXTiro + 15);
			if(posicaoXTiro >= 900)
			{
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo").remove();
				podeAtirar = true;
			}
		}
	}
	
}