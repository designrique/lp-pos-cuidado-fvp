# Como configurar um formulário nativo no Mautic

Este guia explica como criar um formulário nativo no Mautic e integrá-lo à landing page do MAPC.

## 1. Criando o formulário no Mautic

1. **Acesse o painel do Mautic** (https://crm.mapc.com.br)

2. **Navegue até Componentes > Formulários**

3. **Clique em "Novo Formulário"**

4. **Configurações Básicas:**
   - **Nome:** Formulário de Contato Landing Page
   - **Descrição:** Formulário de captura de leads da landing page do MAPC
   - **Tipo:** Formulário Independente (Standalone Form)
   - **Ação ao Enviar com Sucesso:** Exibir mensagem
   - **Categoria:** Uncategorized (ou crie uma categoria específica)
   - **Use Theme style:** Sim (para usar a estilização que iremos configurar)

5. **Adicione os campos do formulário:**

   a. **Nome Completo**
      - Tipo: Texto (Text: Short answer)
      - Campo do contato: Na aba "Mapped field", selecione "First Name" e "Last Name"
      - Validação: Na aba "Validation", marque como obrigatório
      - Estilização: Na aba "Attributes", adicione "form-control" no campo "Input attributes" (não no Label attributes)

   b. **E-mail**
      - Tipo: Email
      - Campo do contato: Na aba "Mapped field", selecione "Email"
      - Validação: Na aba "Validation", marque como obrigatório
      - Estilização: Na aba "Attributes", adicione "form-control" no campo "Input attributes" (não no Label attributes)

   c. **Telefone/WhatsApp**
      - Tipo: Tel (Phone)
      - Campo do contato: Na aba "Mapped field", selecione "Phone"
      - Validação: Na aba "Validation", marque como obrigatório
      - Estilização: Na aba "Attributes", adicione "form-control" no campo "Input attributes" (não no Label attributes)

   d. **Empresa**
      - Tipo: Texto (Text: Short answer)
      - Campo do contato: Na aba "Mapped field", selecione "Company"
      - Validação: Na aba "Validation", deixe como opcional
      - Estilização: Na aba "Attributes", adicione "form-control" no campo "Input attributes" (não no Label attributes)

   e. **Serviço de Interesse**
      - Tipo: Lista suspensa (Select: Single choice)
      - Campo do contato: Na aba "Mapped field", crie um campo personalizado "servico_interesse" ou selecione se já existir
      - Opções: Na aba "Properties", adicione os itens com seus respectivos valores:
        * Label: "Registro de Marca" / Value: "registro-marca"
        * Label: "Registro de Patente" / Value: "registro-patente" 
        * Label: "Desenho Industrial" / Value: "desenho-industrial"
        * Label: "Busca de Anterioridade" / Value: "busca-anterioridade"
        * Label: "Monitoramento de Marca" / Value: "monitoramento-marca"
        * Label: "Renovação de Marca" / Value: "renovacao-marca"
        * Label: "Consultoria Geral" / Value: "consultoria-geral"
      - Validação: Na aba "Validation", marque como obrigatório
      - Estilização: Na aba "Attributes", adicione "form-control" no campo "Input attributes" (não no Label attributes)

   f. **Mensagem**
      - Tipo: Text: Paragraph (área de texto)
      - Campo do contato: Na aba "Mapped field", crie um campo personalizado "mensagem" do tipo texto longo (text area)
      - Validação: Na aba "Validation", deixe como opcional
      - Estilização: Na aba "Attributes", adicione "form-control" no campo "Input attributes" (não no Label attributes)
      - Comportamento: Na aba "Behavior", ative "Auto-fill data" para preencher automaticamente se disponível

   g. **Botão de Envio**
      - Tipo: Botão (Button)
      - Rótulo: "Solicitar Orçamento Gratuito"
      - Estilização: Na aba "Attributes", adicione "mauticform-button btn-hero w-full" no campo "Input attributes"

6. **Configurar Ações:**
   - **Enviar resultados do formulário:** Ative para receber emails quando o formulário for preenchido
   - **Modificar segmentos do contato:** Selecione a lista de leads do site para adicionar o contato
   - **Ajustar estágio do contato:** Selecione o primeiro estágio do funil (ID 1)
   - **Modificar tags do contato:** Adicione tags como "website", "formulario-contato"
   - **Gravar tags UTM:** Ative para capturar informações de campanhas UTM

7. **Salve o formulário**

## 2. Personalizando a aparência do formulário

1. **Clique em "Personalizar"** na página do formulário

2. **Importante sobre campos e valores:**
   - **Para listas suspensas, grupos de opções e checkboxes:**
     * O campo "Label" é o texto que será exibido para o usuário no formulário
     * O campo "Value" é o valor que será salvo no banco de dados do Mautic
     * É importante preencher ambos os campos para garantir que os dados sejam salvos corretamente
     * Para campos como "Serviço de Interesse", mantenha os valores consistentes com os usados no site
   
   - **Sobre a estilização de campos:**
     * "Input attributes": É aqui que você deve colocar a classe "form-control" para estilizar o campo de entrada
     * "Label attributes": Deixe em branco ou use para estilizar apenas os rótulos
     * "Field container attributes": Use para estilizar o contêiner do campo inteiro
   - A estilização incorreta (como colocar classes no local errado) pode fazer com que o formulário não tenha a aparência desejada

3. **Personalize o CSS global:**
   ```css
   .mauticform-label {
     display: block;
     margin-bottom: 0.5rem;
     font-weight: 500;
     font-size: 0.875rem;
   }
   
   .mauticform-input,
   .mauticform-textarea,
   .mauticform-selectbox {
     width: 100%;
     padding: 0.5rem;
     border-radius: 0.375rem;
     border: 1px solid #e2e8f0;
     background-color: white;
     font-size: 0.875rem;
     line-height: 1.25rem;
     transition: border-color 0.15s ease-in-out;
   }
   
   .mauticform-input:focus,
   .mauticform-textarea:focus,
   .mauticform-selectbox:focus {
     outline: none;
     border-color: #6366f1;
     box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
   }
   
   .mauticform-errormsg {
     color: #ef4444;
     font-size: 0.75rem;
     margin-top: 0.25rem;
   }
   
   .mauticform-button-wrapper {
     margin-top: 1.5rem;
   }
   
   .mauticform-button {
     display: inline-block;
     width: 100%;
     padding: 0.75rem 1.5rem;
     font-weight: 500;
     text-align: center;
     color: white;
     background: linear-gradient(to right, #6366f1, #8b5cf6);
     border: none;
     border-radius: 0.375rem;
     cursor: pointer;
     transition: opacity 0.15s ease-in-out;
   }
   
   .mauticform-button:hover {
     opacity: 0.9;
   }
   
   .mauticform-message {
     padding: 0.75rem;
     margin-bottom: 1rem;
     border-radius: 0.375rem;
   }
   
   .mauticform-error {
     background-color: #fee2e2;
     border: 1px solid #fecaca;
     color: #b91c1c;
   }
   
   .mauticform-row {
     margin-bottom: 1rem;
   }
   ```

3. **Salve as alterações**

## 3. Obtendo o ID do formulário

Depois de criar o formulário, você precisará do ID para integrar com a landing page:

1. Observe a URL do formulário no Mautic. Será algo como:
   `https://crm.mapc.com.br/s/forms/edit/X`

2. O número no final da URL (X) é o ID do formulário que você precisará.

## 4. Integrando o formulário na landing page

1. No Mautic, vá até o seu formulário e clique em "Preview" para ver o formulário

2. No menu à direita, você verá várias opções para integrar o formulário:
   - **Via JavaScript (recomendado)**: Copia o script JS que carregará o formulário automaticamente
   - **Via iFrame**: Para incorporação em um frame
   - **Manual (Self-hosted)**: Para maior personalização, mas requer atualização manual quando o formulário mudar

3. Selecione a opção "Embedded" > "Via JavaScript" e copie o código fornecido

4. No código da landing page, localize o arquivo `ContactModal.tsx`

5. Substitua pelo novo arquivo `ContactModal.mautic.tsx` que foi criado

6. Atualize o ID do formulário no componente:
   ```tsx
   // ID do formulário do Mautic - você deve substituir pelo ID correto
   const MAUTIC_FORM_ID = 'X'; // Substitua X pelo ID real do formulário
   ```

7. Opcionalmente, se preferir maior controle, use a opção "Self-hosted" que fornece o HTML completo do formulário, embora essa opção não se atualize automaticamente quando você alterar o formulário no Mautic

8. Pronto! O formulário do Mautic agora está integrado à landing page.

## Vantagens desta abordagem

1. **Campos personalizados nativos**: O Mautic já reconhece todos os campos corretamente
2. **Estágio automático**: O contato é colocado automaticamente no estágio correto
3. **Mensagens salvas corretamente**: O campo de mensagem é salvo diretamente no contato
4. **Manutenção mais simples**: Não é necessário manter código serverless para a integração
5. **Confiabilidade**: A integração é direta, sem intermediários que podem falhar

## Notas importantes

- Sempre que fizer alterações no formulário do Mautic, as mudanças refletirão automaticamente na landing page.
- Se quiser personalizar ainda mais a aparência, você pode editar o CSS no Mautic ou sobrescrever estilos no componente MauticForm.tsx.
- Você pode criar múltiplos formulários no Mautic para diferentes propósitos e usar o mesmo componente MauticForm.tsx com IDs diferentes.
