// Este arquivo centraliza todas as importações de imagens
// para facilitar atualizações e evitar problemas de cache

// Para atualizar a logo:
// 1. Substitua o arquivo físico em /src/assets/
// 2. Atualize a constante VERSION abaixo para forçar uma nova importação

// Versão atual - aumente este número sempre que atualizar a logo
export const VERSION = 3;

// Importamos diretamente a imagem do sistema de arquivos
import logoImageFile from './mapc-logo-new.png';

// Adicionamos o parâmetro de versão à URL para evitar cache
export const logoUrl = `${logoImageFile}?v=${VERSION}`;

// Exportamos a imagem original para uso em componentes que precisam do arquivo diretamente
export default logoImageFile;
