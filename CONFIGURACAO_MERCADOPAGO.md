# Configuração do Mercado Pago - Tiosko

## Problema Comum: Erro 403 - PA_UNAUTHORIZED_RESULT_FROM_POLICIES

Este erro ocorre quando o Access Token não tem as permissões corretas ou quando há problemas com as URLs de redirecionamento.

## Passo a Passo para Configurar Corretamente

### 1. Criar uma Aplicação no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Faça login na sua conta Mercado Pago
3. Clique em **"Criar aplicação"**
4. Preencha os dados:
   - **Nome da aplicação**: Tiosko
   - **Tipo de pagamento**: Pagamentos online
   - **Solução**: Checkout Pro
   - **URL da loja**: Deixe em branco ou use sua URL de produção

### 2. Obter o Access Token

⚠️ **IMPORTANTE**: Use as credenciais corretas conforme o ambiente:

#### Para Testes (Desenvolvimento):
1. Vá em **Suas integrações > [Sua aplicação] > Credenciais**
2. Clique em **"Credenciais de teste"**
3. Copie o **Access Token de teste** (começa com `TEST-`)

#### Para Produção:
1. Vá em **Suas integrações > [Sua aplicação] > Credenciais**
2. Clique em **"Credenciais de produção"**
3. Copie o **Access Token de produção** (começa com `APP_USR-`)

**Nota**: O sistema aceita qualquer formato de Access Token válido fornecido pelo Mercado Pago. A validação é feita pela API oficial.

### 3. Configurar no Vercel

1. Acesse seu projeto no Vercel
2. Vá em **Settings > Environment Variables**
3. Adicione a variável:
   - **Name**: `MERCADOPAGO_ACCESS_TOKEN`
   - **Value**: Cole o Access Token obtido (com TEST- ou APP_USR-)
   - **Environment**: Selecione Production, Preview e Development

### 4. Configurar a URL do Aplicativo

1. No Vercel, adicione também:
   - **Name**: `NEXT_PUBLIC_APP_URL`
   - **Value**: Sua URL de produção (ex: `https://tiosko.vercel.app`)
   - ⚠️ **Deve ser HTTPS**, não HTTP

### 5. Verificar Permissões da Aplicação

1. No painel do Mercado Pago, vá em **Suas integrações > [Sua aplicação]**
2. Certifique-se de que as seguintes permissões estão habilitadas:
   - ✅ Criar e consultar preferências de pagamento
   - ✅ Processar pagamentos
   - ✅ Receber notificações de webhook

### 6. Testar a Integração

Para testar com credenciais de teste:
- Use cartões de teste do Mercado Pago: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards

## Checklist de Troubleshooting

- [ ] O Access Token está correto e completo?
- [ ] Está usando credenciais de teste (TEST-) ou produção (APP_USR-)?
- [ ] A variável `NEXT_PUBLIC_APP_URL` está configurada com HTTPS?
- [ ] A aplicação no Mercado Pago está ativa?
- [ ] As permissões da aplicação estão corretas?
- [ ] Você fez redeploy no Vercel após adicionar as variáveis?

## Soluções para Erro 403 Específico

### Causa 1: Credenciais de Teste em URL de Produção
Se você está usando `TEST-` token mas a URL `NEXT_PUBLIC_APP_URL` é de produção (https://seu-site.com), o Mercado Pago pode bloquear por política de segurança.

**Solução:** Use credenciais de produção (APP_USR-) quando estiver em produção.

### Causa 2: Conta Não Verificada
Credenciais de produção requerem que sua conta Mercado Pago esteja totalmente verificada.

**Solução:**
1. Acesse https://www.mercadopago.com.br
2. Complete a verificação de identidade
3. Aguarde aprovação (1-2 dias úteis)

### Causa 3: Campos Obrigatórios
O Mercado Pago exige informações específicas do pagador.

**Verificação:**
- ✅ Email válido do cliente
- ✅ Nome e sobrenome preenchidos
- ✅ Telefone com DDD válido (formato: (11) 99999-9999)
- ✅ URLs usando HTTPS (não HTTP)

### Recomendação: Teste Primeiro no Sandbox

1. Use `TEST-` token no ambiente local
2. Configure `NEXT_PUBLIC_APP_URL=http://localhost:3000`
3. Use cartões de teste do Mercado Pago
4. Após funcionar, migre para produção com APP_USR- token

## Documentação Oficial

- Criar aplicação: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/integrate-preferences
- Credenciais: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/credentials
- Cartões de teste: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards
