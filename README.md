# Terceiro — treino inteligente

Versão 2 do app de acompanhamento de treinos. Funciona como PWA, guarda os dados no próprio aparelho e migra automaticamente o histórico salvo pela versão anterior na chave `terceiro_treinos`.

## O que mudou

- planos adaptáveis para 2, 3, 4 ou 5 sessões por ciclo;
- objetivos de ganho de massa, força ou saúde/consistência;
- registro por série de carga, repetições e RIR;
- progressão dupla com sugestão de carga baseada no treino anterior;
- descanso específico por exercício, timer persistente e vibração opcional;
- troca de exercícios com alternativas do mesmo grupo ou padrão de movimento;
- volume semanal por grupo muscular, e1RM, histórico e consistência;
- backup/importação em JSON;
- funcionamento offline e instalação na tela inicial.

## Executar localmente

O service worker precisa de HTTP. Na pasta do projeto:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Depois abra `http://127.0.0.1:4173/`.

## Dados e migração

O app usa `localStorage` com a chave `terceiro_treinos`. Ao encontrar o formato antigo, preserva:

- `historico`;
- cargas em `pesos`;
- referência do último treino para posicionar a nova rotação.

A migração não altera o arquivo de origem. Antes de trocar de aparelho, use **Ajustes → Exportar backup**.

## Referências de treino

- [ACSM Position Stand 2026](https://pubmed.ncbi.nlm.nih.gov/41843416/)
- [Dose–resposta de volume e frequência (2026)](https://pubmed.ncbi.nlm.nih.gov/41343037/)
- [Proximidade da falha e RIR](https://pubmed.ncbi.nlm.nih.gov/38970765/)
- [Intervalo entre séries](https://pubmed.ncbi.nlm.nih.gov/39205815/)
- [Diretrizes de atividade física da OMS](https://www.who.int/publications/i/item/9789240015128)

O app é uma ferramenta de registro e organização. Não substitui avaliação individual de profissional de saúde ou educação física.
