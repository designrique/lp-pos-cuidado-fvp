#!/bin/bash

# Script de teste para notificações de agendamento
# Uso: ./teste-agendamento.sh

API_URL="https://site-ariana-borges-final-production.up.railway.app/api/appointments"

echo "🧪 Testando criação de agendamento com notificações..."
echo "=================================================="
echo ""

# Dados do agendamento de teste
PAYLOAD='{
  "date": "2026-02-09T10:00:00-03:00",
  "clientName": "Henrique Pimentel",
  "clientEmail": "hdgpimentel@gmail.com",
  "serviceName": "Sessão Individual",
  "amount": 150,
  "status": "paid",
  "transactionId": "TEST_HENRIQUE_003"
}'

echo "📋 Dados do agendamento:"
echo "$PAYLOAD" | jq .
echo ""

echo "📤 Enviando requisição para $API_URL..."
echo ""

# Fazer a requisição
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

# Separar corpo e status code
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

echo "📥 Resposta HTTP: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" -eq 201 ]; then
    echo "✅ Agendamento criado com sucesso!"
    echo ""
    echo "📄 Detalhes:"
    echo "$HTTP_BODY" | jq .
    echo ""
    echo "📧 Emails que devem ter sido enviados:"
    echo "  1. Para Ariana Borges (institutoarianaborges@gmail.com)"
    echo "  2. Para o cliente (hdgpimentel@gmail.com)"
    echo ""
    echo "🔍 Verifique:"
    echo "  - Caixa de entrada de ambos os emails"
    echo "  - Pasta de spam"
    echo "  - Logs do Railway para confirmar envio"
    echo ""
else
    echo "❌ Erro ao criar agendamento"
    echo ""
    echo "Resposta:"
    echo "$HTTP_BODY"
    echo ""
fi

echo "=================================================="
echo "Teste concluído!"
