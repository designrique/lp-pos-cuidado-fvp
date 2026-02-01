#!/bin/bash

# Script para garantir que as funções Netlify sejam copiadas corretamente
echo "📦 Copiando funções Netlify para a pasta de build..."

# Garantir que o diretório de destino exista
mkdir -p dist/.netlify/functions

# Copiar todas as funções 
cp -r netlify/functions/* dist/.netlify/functions/

# Garantir que _redirects seja copiado
cp public/_redirects dist/

echo "✅ Funções Netlify copiadas com sucesso!"