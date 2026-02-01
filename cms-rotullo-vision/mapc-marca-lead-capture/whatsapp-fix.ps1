Set-Location "I:\Meu Drive\Clientes\MAPC\LP-MAPC\mapc-marca-lead-capture"
git add src/lib/evolution-api.ts src/lib/config.ts
git commit -m "fix: Corrige URL e configuração da Evolution API para envio de WhatsApp"
git push origin main
Write-Output "Correções da Evolution API enviadas com sucesso!"
