# Testar redirecionamento do subdomínio www.registrese.mapc.com.br

# Teste com curl
Write-Host "Testando redirecionamento com curl..." -ForegroundColor Cyan
Write-Host ""
curl -I -L http://www.registrese.mapc.com.br

Write-Host ""
Write-Host "Testando domínio principal com curl..." -ForegroundColor Cyan
Write-Host ""
curl -I -L http://registrese.mapc.com.br

Write-Host ""
Write-Host "Verificação DNS para www.registrese.mapc.com.br:" -ForegroundColor Green
nslookup www.registrese.mapc.com.br

Write-Host ""
Write-Host "Verificação DNS para registrese.mapc.com.br:" -ForegroundColor Green
nslookup registrese.mapc.com.br
