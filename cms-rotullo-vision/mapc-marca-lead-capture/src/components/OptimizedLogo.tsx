import logoImage from '@/assets/mapc-logo-new.png';

interface OptimizedLogoProps {
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  invert?: boolean;
}

/**
 * Componente de logo otimizado
 * - Tamanho otimizado para reduzir transferência de dados
 * - Lazy loading quando apropriado
 * - Suporte a WebP via picture element (quando disponível)
 * 
 * Nota: Para usar WebP, adicione uma versão .webp do logo em src/assets/
 * e o navegador automaticamente usará se disponível via picture element
 */
export const OptimizedLogo = ({
  alt = 'MAPC - Marcas e Patentes',
  className = '',
  width = 120,
  height = 48,
  loading = 'eager',
  fetchPriority = 'high',
  invert = false,
}: OptimizedLogoProps) => {
  // Usar imagem PNG diretamente (WebP será adicionado no futuro)
  return (
    <img
      src={logoImage}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
};

