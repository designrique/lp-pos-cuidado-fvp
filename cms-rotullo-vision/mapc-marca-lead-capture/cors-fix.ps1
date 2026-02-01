Set-Location "I:\Meu Drive\Clientes\MAPC\LP-MAPC\mapc-marca-lead-capture"
git add src/components/MauticDirectForm.tsx src/lib/cors-proxy.ts api/submit.js netlify/functions/submit-form.js _redirects
git commit -m "fix: Implementa solução para problema de CORS usando função serverless"
git push origin main
Write-Output "Correções de CORS enviadas com sucesso!"
