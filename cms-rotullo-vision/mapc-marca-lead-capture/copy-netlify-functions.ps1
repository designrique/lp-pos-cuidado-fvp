# Script para garantir que as funções Netlify sejam copiadas corretamente
echo "📦 Copiando funções Netlify para a pasta de build..."

# Garantir que o diretório de destino exista
if (-not (Test-Path -Path "dist/.netlify/functions")) {
    New-Item -ItemType Directory -Path "dist/.netlify/functions" -Force
}

# Copiar todas as funções 
Copy-Item -Path "netlify/functions/*" -Destination "dist/.netlify/functions/" -Recurse -Force

# Garantir que _redirects seja copiado
Copy-Item -Path "public/_redirects" -Destination "dist/" -Force

echo "✅ Funções Netlify copiadas com sucesso!"