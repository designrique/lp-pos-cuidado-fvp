// Script para copiar funções Netlify para a pasta de build
import fs from 'fs';
import path from 'path';

console.log("📦 Copiando funções Netlify para a pasta de build...");

// Função para criar diretório recursivamente
function mkdirSync(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

// Função para copiar arquivo
function copyFileSync(source, target) {
  let targetFile = target;

  // Se o target for um diretório, um arquivo será criado dentro do diretório
  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    targetFile = path.join(target, path.basename(source));
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

// Função para copiar diretório recursivamente
function copyFolderSync(source, target) {
  // Criar diretório target se não existir
  if (!fs.existsSync(target)) {
    mkdirSync(target);
  }

  // Copiar recursivamente
  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(file => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        // Copiar diretório recursivamente
        copyFolderSync(curSource, curTarget);
      } else {
        // Copiar arquivo
        copyFileSync(curSource, curTarget);
      }
    });
  }
}

// Diretórios fonte e destino
const sourceDir = path.resolve('./netlify/functions');
const targetDir = path.resolve('./dist/.netlify/functions');
const redirectsSource = path.resolve('./public/_redirects');
const redirectsTarget = path.resolve('./dist/_redirects');

// Criar diretório de destino se não existir
mkdirSync(targetDir);

// Copiar funções Netlify
try {
  copyFolderSync(sourceDir, targetDir);
  console.log("✅ Funções Netlify copiadas com sucesso!");
} catch (err) {
  console.error("❌ Erro ao copiar funções Netlify:", err);
}

// Copiar arquivo _redirects
try {
  copyFileSync(redirectsSource, redirectsTarget);
  console.log("✅ Arquivo _redirects copiado com sucesso!");
} catch (err) {
  console.error("❌ Erro ao copiar arquivo _redirects:", err);
}

console.log("🚀 Configuração de build concluída!");