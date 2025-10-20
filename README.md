# 🎓 Base64 - Apresentação Visual e Didática

Projeto educacional interativo para ensinar codificação Base64 de forma visual e prática.

## 🚀 Como Executar

### Instalação
```bash
npm install
```

### Executar em Modo Desenvolvimento
```bash
npm run dev
```

Acesse: `http://localhost:5173`

## 📚 O que o projeto ensina?

### 1️⃣ **Aba "O que é Base64?"**
- Explicação clara do conceito
- Alfabeto Base64 (64 caracteres)
- Processo passo-a-passo visual
- Casos de uso práticos

### 2️⃣ **Aba "Texto"**
- Digite qualquer texto
- Veja a conversão para ASCII
- Veja a conversão para Binário
- Veja o resultado em Base64
- Processo animado e colorido!

### 3️⃣ **Aba "Imagem"**
- Upload de qualquer imagem
- Explicação de como Base64 diferencia texto de imagem
- Mostra a estrutura do Data URL
- Tipo MIME identifica que é uma imagem
- Preview da imagem codificada

## 🎯 Conceitos Explicados

### Como Base64 diferencia Texto de Imagem?

**Base64 NÃO diferencia!** Ele apenas codifica bytes. A diferenciação acontece pelo **contexto**:

1. **Texto simples**: `SGVsbG8h` (apenas o Base64)
2. **Imagem**: `data:image/png;base64,iVBORw0KG...` (Data URL com tipo MIME)

O **tipo MIME** (`image/png`, `image/jpeg`, etc.) diz ao navegador que aqueles bytes decodificados são uma imagem!

## 🛠️ Tecnologias

- **React 18** - Framework UI
- **Vite** - Build tool ultrarrápido
- **CSS3** - Animações e gradientes modernos
- **JavaScript nativo** - `btoa()` e `FileReader` API

## 💡 Destaque para a Aula

### Pontos principais para apresentar:
1. ✅ Base64 usa apenas 64 caracteres seguros
2. ✅ Converte binário → texto (não criptografa!)
3. ✅ Aumenta tamanho em ~33%
4. ✅ Muito usado em APIs e web
5. ✅ O tipo MIME identifica o conteúdo, não o Base64

### Demonstração interativa:
- Digite seu nome e veja a conversão passo-a-passo
- Faça upload de uma foto e mostre como fica em Base64
- Copie o Base64 e cole em outro site/ferramenta

## 📖 Código Simples e Limpo

O código usa apenas conceitos básicos:
- `btoa()` - converte para Base64
- `atob()` - decodifica Base64
- `FileReader` - lê arquivos
- `charCodeAt()` - pega código ASCII

Tudo visual, animado e fácil de entender! 🎨

