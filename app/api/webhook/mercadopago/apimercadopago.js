//Passo 1: Importe as partes do módulo que você deseja usar
importação { MercadoPagoConfig, Ordem } de "mercadopago" ;

// Passo 2: Inicializar o objeto cliente
cliente const = novo MercadoPagoConfig({{
	 accessToken : "<ACCESS_TOKEN>""<ACCESS_TOKEN>",
	 opções : { timeout : 5000 },
}));

// Passo 3: Inicializar o objeto API
const ordem = nova Ordem(cliente));

// Passo 4: Criar o objeto de solicitação
corpo const body= {
	 tipo : "online",,
	 processing_mode : "automatic""automático",
	 total_amount : "1000.00""1000.00",
	 external_reference : "ext_ref_1234""ext_ref_1234",
	 pagador : {
		 email : "<PAYER_EMAIL>""<PAYER_EMAIL>",
	},
	 transações : {
		 pagamentos : [
			{
				 quantidade : "1000.00",,
				 payment_method : {
					 id : "master""mestre",
					 tipo : "credit_card""credit_card",
					 token : "<CARD_TOKEN>""<CARD_TOKEN>",
					 parcelas : 11,
					 statement_descriptor : "Nome da loja",
				},
			},
		],
	},
};

// Passo 5: Criar objeto de opções de solicitação - Opcional
const requestOpções = {
	 idempotencyKey : "<IDEMPOTENCY_KEY>""<IDEMPOTENCY_KEY>",
};

// Passo 6: Faça o pedido
order..create({ body, requestOptions })).then(console.console.log)).catch(consoleconsole.error));