# Sistema de Pagamentos - Tiosko

Este documento explica como configurar e usar o sistema de pagamentos integrado com **Stripe** e **Mercado Pago**.

## 🔧 Configuração

### Variáveis de Ambiente Necessárias

#### Stripe (Já Configurado)
As seguintes variáveis já estão configuradas no seu projeto:
- `STRIPE_SECRET_KEY` - Chave secreta do Stripe (servidor)
- `STRIPE_PUBLISHABLE_KEY` - Chave pública do Stripe (servidor)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Chave pública do Stripe (cliente)

#### Mercado Pago (Necessário Configurar)
Você precisa adicionar a seguinte variável de ambiente:

\`\`\`env
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
\`\`\`

**Como obter o Access Token do Mercado Pago:**
1. Acesse https://www.mercadopago.com.br/developers
2. Faça login na sua conta
3. Vá em "Suas integrações" > "Credenciais"
4. Copie o "Access Token" de produção ou teste
5. Adicione como variável de ambiente no Vercel ou no arquivo `.env.local`

## 💳 Métodos de Pagamento Disponíveis

### 1. Stripe
- **Cartões de crédito internacionais**
- Checkout embutido (Embedded Checkout)
- Processamento seguro com PCI compliance
- Suporta múltiplos cartões e métodos

### 2. Mercado Pago
- **PIX** - Pagamento instantâneo
- **Cartão de Crédito** - Nacional e internacional
- **Boleto Bancário** - Pagamento em até 3 dias úteis
- Redirecionamento para checkout do Mercado Pago

## 🛒 Fluxo de Compra

1. **Adicionar produtos ao carrinho** - Navegue pela loja e adicione produtos
2. **Revisar carrinho** - Veja os itens, quantidades e total em `/carrinho`
3. **Preencher dados** - Insira informações pessoais e endereço de entrega
4. **Escolher pagamento** - Selecione Stripe ou Mercado Pago
5. **Finalizar compra** - Complete o pagamento de forma segura

## 🔐 Segurança

- ✅ Validação de preços no servidor
- ✅ Preços armazenados de forma centralizada
- ✅ Cliente não pode manipular valores
- ✅ Dados sensíveis processados apenas no servidor
- ✅ Integração PCI-compliant com Stripe
- ✅ Tokens seguros do Mercado Pago

## 📱 Testando em Desenvolvimento

### Stripe - Cartões de Teste
\`\`\`
Número: 4242 4242 4242 4242
Data: Qualquer data futura (ex: 12/25)
CVV: Qualquer 3 dígitos (ex: 123)
\`\`\`

### Mercado Pago - Teste
Use as credenciais de teste disponíveis no painel do Mercado Pago Developer para simular pagamentos.

## 🚀 Deploy

### No Vercel
1. Conecte seu repositório GitHub ao Vercel
2. Adicione as variáveis de ambiente no painel do Vercel:
   - Settings > Environment Variables
   - Adicione `MERCADOPAGO_ACCESS_TOKEN`
   - Adicione `NEXT_PUBLIC_APP_URL` com a URL do seu projeto
3. Deploy será feito automaticamente

### Variáveis de Ambiente no Vercel
\`\`\`
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
MERCADOPAGO_ACCESS_TOKEN=APP_USR...
NEXT_PUBLIC_APP_URL=https://tiosko.vercel.app
\`\`\`

## 📝 Notas Importantes

1. **Preços em Centavos (Stripe)**: Os produtos têm `priceInCents` para processamento preciso
2. **Moeda**: Configurado para BRL (Real Brasileiro)
3. **Frete Grátis**: Pedidos acima de R$ 200,00
4. **Persistência**: Carrinho salvo no localStorage
5. **Webhooks**: Para produção, configure webhooks do Stripe e Mercado Pago para receber notificações de pagamento

## 🔄 Próximos Passos Recomendados

1. **Configurar Webhooks** - Para receber notificações de status de pagamento
2. **Adicionar Sistema de Pedidos** - Salvar pedidos em banco de dados
3. **Enviar E-mails** - Confirmação e rastreamento de pedidos
4. **Painel Admin** - Gerenciar pedidos e produtos
5. **Integração com Frete** - Correios ou transportadoras

## 🆘 Suporte

- Stripe: https://stripe.com/docs
- Mercado Pago: https://www.mercadopago.com.br/developers
- Vercel: https://vercel.com/docs
