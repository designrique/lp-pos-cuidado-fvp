// Script para manipular o formulário Mautic
(function() {
    console.log('Mautic Form Script carregado!');

    // Função para modificar o comportamento do formulário
    function enhanceMauticForm() {
        try {
            // 1. Esconder mensagens de erro por padrão
            const errorMessages = document.querySelectorAll('.mauticform-errorinfo');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
            });
            
            // 2. Ocultar qualquer mensagem de sucesso do Mautic
            const successMessages = document.querySelectorAll('.mauticform-message-success, .mauticform-message');
            successMessages.forEach(msg => {
                msg.style.display = 'none';
            });

            // 3. Configurar os botões de submit
            const submitButtons = document.querySelectorAll('.mauticform-button, .btn-default, button[type="submit"], input[type="submit"]');
            submitButtons.forEach(button => {
                console.log('Botão encontrado:', button);
                
                // Guardar o texto original
                const originalText = button.textContent || 'Enviar';
                button.setAttribute('data-original-text', originalText);
                
                // Adicionar evento de clique
                button.addEventListener('click', function(e) {
                    console.log('Botão clicado!');
                    
                    // Se o botão já estiver com classe submitting, não fazer nada
                    if (this.classList.contains('submitting-btn')) {
                        return;
                    }
                    
                    // Adicionar classe para estilização
                    this.classList.add('submitting-btn');
                    
                    // Guardar HTML original
                    const originalHTML = this.innerHTML;
                    this.setAttribute('data-original-html', originalHTML);
                    
                    // Substituir conteúdo
                    this.innerHTML = '<span style="opacity: 0;">Enviando...</span>';
                    
                    // Desabilitar o botão
                    this.disabled = true;
                    
                    // Enviar mensagem ao pai informando que está enviando
                    window.parent.postMessage({formSubmitting: true}, '*');
                    
                    // Iniciar um timeout de segurança para considerar o formulário como enviado
                    setTimeout(() => {
                        // Verificar se o formulário foi enviado (analisando o DOM)
                        const form = document.querySelector('form');
                        const successMsg = document.querySelector('.mauticform-message-success, .mauticform-message');
                        
                        // Se houver mensagem de sucesso ou o formulário não estiver mais visível, considerar enviado
                        if (successMsg || !form || form.style.display === 'none') {
                            console.log('Formulário enviado com sucesso (detectado via DOM)');
                            window.parent.postMessage({formSubmitted: true}, '*');
                        }
                    }, 3000);
                });
            });

            // 4. Observar envio do formulário
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    console.log('Formulário sendo enviado!');
                    
                    // Ocultar qualquer mensagem de sucesso do Mautic
                    setTimeout(() => {
                        document.querySelectorAll('.mauticform-message-success, .mauticform-message').forEach(msg => {
                            msg.style.display = 'none';
                        });
                        
                        // Enviar mensagem para o componente pai
                        window.parent.postMessage({formSubmitted: true}, '*');
                    }, 1000);
                });
            });

            // 5. Configurar validação de campos obrigatórios
            const formInputs = document.querySelectorAll('.mauticform-input, .mauticform-selectbox, .mauticform-textarea, .form-control');
            formInputs.forEach(input => {
                input.addEventListener('blur', function() {
                    const row = this.closest('.mauticform-row');
                    if (row) {
                        const errorMsg = row.querySelector('.mauticform-errorinfo');
                        if (errorMsg) {
                            if (this.value.trim() === '' && this.hasAttribute('required')) {
                                errorMsg.style.display = 'block';
                                row.classList.add('mauticform-has-error');
                            } else {
                                errorMsg.style.display = 'none';
                                row.classList.remove('mauticform-has-error');
                            }
                        }
                    }
                });
            });
            
            // 6. Adicionar observador para detectar se a mensagem de sucesso aparece
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList' || mutation.type === 'attributes') {
                        const successMsg = document.querySelector('.mauticform-message-success, .mauticform-message');
                        if (successMsg) {
                            console.log('Mensagem de sucesso detectada!');
                            // Ocultar a mensagem
                            successMsg.style.display = 'none';
                            // Notificar o componente pai
                            window.parent.postMessage({formSubmitted: true}, '*');
                        }
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true
            });

            console.log('Enhancements aplicados com sucesso!');
        } catch (error) {
            console.error('Erro ao aplicar melhorias:', error);
        }
    }

    // Executar as melhorias quando o DOM estiver carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhanceMauticForm);
    } else {
        enhanceMauticForm();
    }

    // Executar novamente após um tempo para garantir que todos os elementos foram carregados
    setTimeout(enhanceMauticForm, 1000);
    setTimeout(enhanceMauticForm, 2000);
    
    // Executar periodicamente para garantir que mensagens de sucesso sejam sempre ocultadas
    setInterval(() => {
        document.querySelectorAll('.mauticform-message-success, .mauticform-message').forEach(msg => {
            msg.style.display = 'none';
        });
    }, 500);
})();
