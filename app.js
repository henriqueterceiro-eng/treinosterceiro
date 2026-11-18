(() => {
  'use strict';

  const DB_KEY = 'terceiro_treinos';
  const SCHEMA = 2;
  const IMAGE_ROOT = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const EXERCISES = {
    supino_maq: {
      name: 'Supino na máquina', equipment: 'Chest press', muscle: 'Peito', secondary: ['Tríceps', 'Ombros'], pattern: 'empurrar', type: 'compound',
      image: 'Machine_Bench_Press', defaultKg: 30, increment: 2.5, rest: 120, range: [8, 12],
      cues: ['Apoie toda a coluna no encosto.', 'Desça com controle e mantenha os cotovelos abaixo dos ombros.', 'Pare a série quando a técnica começar a mudar.']
    },
    supino_inclinado: {
      name: 'Supino inclinado na máquina', equipment: 'Incline chest press', muscle: 'Peito', secondary: ['Tríceps', 'Ombros'], pattern: 'empurrar', type: 'compound',
      image: 'Incline_Chest_Press', defaultKg: 25, increment: 2.5, rest: 120, range: [8, 12],
      cues: ['Regule o banco para as mãos iniciarem na linha alta do peito.', 'Mantenha escápulas apoiadas.', 'Empurre sem perder o contato dos pés com o chão.']
    },
    peck_deck: {
      name: 'Voador peck deck', equipment: 'Pec deck', muscle: 'Peito', pattern: 'adução', type: 'isolation',
      image: 'Butterfly', defaultKg: 25, increment: 2.5, rest: 90, range: [10, 15],
      cues: ['Mantenha o peito aberto e os ombros baixos.', 'Aproxime os braços sem bater as almofadas.', 'Volte até sentir alongamento confortável.']
    },
    puxada: {
      name: 'Puxada frontal', equipment: 'Lat pulldown', muscle: 'Costas', secondary: ['Bíceps'], pattern: 'puxar vertical', type: 'compound',
      image: 'Wide-Grip_Lat_Pulldown', defaultKg: 35, increment: 2.5, rest: 120, range: [8, 12],
      cues: ['Inicie baixando as escápulas.', 'Puxe a barra em direção à parte alta do peito.', 'Evite transformar o movimento em uma remada.']
    },
    remada_bx: {
      name: 'Remada baixa', equipment: 'Seated cable row', muscle: 'Costas', secondary: ['Bíceps'], pattern: 'puxar horizontal', type: 'compound',
      image: 'Seated_Cable_Rows', defaultKg: 30, increment: 2.5, rest: 120, range: [8, 12],
      cues: ['Mantenha o tronco estável.', 'Puxe os cotovelos para trás sem elevar os ombros.', 'Controle a volta até estender os braços.']
    },
    remada_art: {
      name: 'Remada articulada', equipment: 'Chest supported row', muscle: 'Costas', secondary: ['Bíceps'], pattern: 'puxar horizontal', type: 'compound',
      image: 'T-Bar_Row_with_Handle', defaultKg: 25, increment: 2.5, rest: 120, range: [8, 12],
      cues: ['Mantenha o peito no apoio.', 'Conduza os cotovelos para trás.', 'Evite encolher os ombros no final.']
    },
    shoulder_maq: {
      name: 'Desenvolvimento na máquina', equipment: 'Shoulder press', muscle: 'Ombros', secondary: ['Tríceps'], pattern: 'empurrar vertical', type: 'compound',
      image: 'Machine_Shoulder_(Military)_Press', defaultKg: 20, increment: 2.5, rest: 120, range: [8, 12],
      cues: ['Ajuste o assento para as pegadas iniciarem perto dos ombros.', 'Mantenha costelas e lombar apoiadas.', 'Suba sem travar os cotovelos com força.']
    },
    elev_lat_cabo: {
      name: 'Elevação lateral', equipment: 'Cabo ou halteres', muscle: 'Ombros', pattern: 'abdução', type: 'isolation',
      image: 'Dumbbell_Lateral_Raise', defaultKg: 8, increment: 1, rest: 75, range: [12, 20],
      cues: ['Conduza o movimento pelos cotovelos.', 'Eleve até uma amplitude confortável.', 'Use carga que não exija balanço do tronco.']
    },
    face_pull: {
      name: 'Face pull', equipment: 'Polia com corda', muscle: 'Ombros', pattern: 'puxar horizontal', type: 'isolation',
      image: 'Face_Pull', defaultKg: 15, increment: 2.5, rest: 75, range: [12, 20],
      cues: ['Puxe a corda na direção do rosto.', 'Finalize com as mãos separadas e ombros baixos.', 'Não incline o tronco para trás.']
    },
    tri_polia: {
      name: 'Tríceps na corda', equipment: 'Polia alta', muscle: 'Tríceps', pattern: 'extensão de cotovelo', type: 'isolation',
      image: 'Triceps_Pushdown_-_Rope_Attachment', defaultKg: 20, increment: 2.5, rest: 75, range: [10, 15],
      cues: ['Mantenha os cotovelos próximos ao corpo.', 'Estenda sem mover os ombros.', 'Controle o retorno até pouco acima de 90 graus.']
    },
    tri_maquina: {
      name: 'Tríceps na máquina', equipment: 'Triceps extension', muscle: 'Tríceps', pattern: 'extensão de cotovelo', type: 'isolation',
      image: 'Bench_Dips', defaultKg: 20, increment: 2.5, rest: 75, range: [10, 15],
      cues: ['Alinhe os cotovelos com o eixo da máquina.', 'Estenda com controle.', 'Evite deixar a pilha de pesos bater.']
    },
    scott: {
      name: 'Rosca Scott', equipment: 'Máquina ou barra W', muscle: 'Bíceps', pattern: 'flexão de cotovelo', type: 'isolation',
      image: 'Preacher_Curl', defaultKg: 15, increment: 2.5, rest: 75, range: [10, 15],
      cues: ['Mantenha os braços apoiados.', 'Suba sem tirar o peito do banco.', 'Desça com controle sem hiperestender o cotovelo.']
    },
    rosca_polia: {
      name: 'Rosca na polia', equipment: 'Polia baixa', muscle: 'Bíceps', pattern: 'flexão de cotovelo', type: 'isolation',
      image: 'Cable_Curl', defaultKg: 15, increment: 2.5, rest: 75, range: [10, 15],
      cues: ['Fixe os cotovelos ao lado do corpo.', 'Evite impulsionar com o quadril.', 'Controle toda a descida.']
    },
    leg_press: {
      name: 'Leg press 45°', equipment: 'Leg press', muscle: 'Quadríceps', secondary: ['Glúteos'], pattern: 'agachar', type: 'compound',
      image: 'Leg_Press', defaultKg: 80, increment: 5, rest: 150, range: [8, 12],
      cues: ['Mantenha pés e joelhos na mesma direção.', 'Desça somente até manter quadril e lombar apoiados.', 'Empurre distribuindo a força por todo o pé.']
    },
    hack_squat: {
      name: 'Agachamento no hack', equipment: 'Hack squat', muscle: 'Quadríceps', secondary: ['Glúteos'], pattern: 'agachar', type: 'compound',
      image: 'Hack_Squat', defaultKg: 40, increment: 5, rest: 150, range: [8, 12],
      cues: ['Apoie toda a coluna.', 'Mantenha joelhos acompanhando a direção dos pés.', 'Use amplitude que preserve controle e conforto.']
    },
    extensora: {
      name: 'Cadeira extensora', equipment: 'Leg extension', muscle: 'Quadríceps', pattern: 'extensão de joelho', type: 'isolation',
      image: 'Leg_Extensions', defaultKg: 30, increment: 2.5, rest: 90, range: [10, 15],
      cues: ['Alinhe o joelho ao eixo da máquina.', 'Estenda com controle sem tirar o quadril do banco.', 'Desça sem deixar a pilha bater.']
    },
    mesa_flex: {
      name: 'Mesa flexora', equipment: 'Lying leg curl', muscle: 'Posteriores', pattern: 'flexão de joelho', type: 'isolation',
      image: 'Lying_Leg_Curls', defaultKg: 25, increment: 2.5, rest: 90, range: [10, 15],
      cues: ['Mantenha quadril apoiado.', 'Aproxime os calcanhares sem acelerar.', 'Controle a volta até quase estender os joelhos.']
    },
    stiff_smith: {
      name: 'Stiff no Smith', equipment: 'Smith machine', muscle: 'Posteriores', secondary: ['Glúteos'], pattern: 'dobradiça', type: 'compound',
      image: 'Romanian_Deadlift', defaultKg: 30, increment: 5, rest: 150, range: [8, 12],
      cues: ['Leve o quadril para trás com joelhos levemente flexionados.', 'Mantenha a barra próxima às pernas.', 'Pare a descida antes de perder a posição neutra da coluna.']
    },
    hip_thrust: {
      name: 'Elevação pélvica', equipment: 'Máquina ou Smith', muscle: 'Glúteos', secondary: ['Posteriores'], pattern: 'extensão de quadril', type: 'compound',
      image: 'Barbell_Hip_Thrust', defaultKg: 40, increment: 5, rest: 120, range: [8, 12],
      cues: ['Apoie a parte alta das costas.', 'Suba até alinhar tronco e coxas.', 'Evite terminar o movimento arqueando a lombar.']
    },
    abdutora: {
      name: 'Cadeira abdutora', equipment: 'Hip abduction', muscle: 'Glúteos', pattern: 'abdução de quadril', type: 'isolation',
      image: 'Thigh_Abductor', defaultKg: 30, increment: 2.5, rest: 75, range: [12, 20],
      cues: ['Mantenha o tronco estável.', 'Abra as pernas sem impulso.', 'Controle a volta sem fechar completamente.']
    },
    panturrilha: {
      name: 'Panturrilha em pé', equipment: 'Hack ou máquina', muscle: 'Panturrilhas', pattern: 'flexão plantar', type: 'isolation',
      image: 'Standing_Calf_Raises', defaultKg: 40, increment: 5, rest: 90, range: [10, 15],
      cues: ['Desça o calcanhar com controle.', 'Suba o máximo que conseguir sem dobrar os joelhos.', 'Faça uma pausa curta no alto.']
    },
    crunch_cabo: {
      name: 'Abdominal na polia', equipment: 'Polia alta', muscle: 'Core', pattern: 'flexão de tronco', type: 'isolation',
      image: 'Cable_Crunch', defaultKg: 20, increment: 2.5, rest: 60, range: [10, 15],
      cues: ['Aproxime costelas e pelve.', 'Mantenha o quadril estável.', 'Volte devagar sem puxar a corda com os braços.']
    },
    crossover: {
      name: 'Crossover na polia', equipment: 'Polias', muscle: 'Peito', pattern: 'adução', type: 'isolation',
      image: 'Cable_Crossover', defaultKg: 15, increment: 2.5, rest: 90, range: [10, 15],
      cues: ['Mantenha o peito aberto e os ombros baixos.', 'Aproxime as mãos sem transformar o movimento em empurrão.', 'Controle a volta até sentir alongamento confortável.']
    },
    pullover_polia: {
      name: 'Pullover na polia', equipment: 'Polia alta', muscle: 'Costas', pattern: 'puxar vertical', type: 'isolation',
      image: 'Straight-Arm_Pulldown', defaultKg: 20, increment: 2.5, rest: 90, range: [10, 15],
      cues: ['Mantenha os braços quase estendidos.', 'Leve a barra em direção às coxas usando as costas.', 'Evite compensar com a lombar.']
    },
    desenv_halteres: {
      name: 'Desenvolvimento com halteres', equipment: 'Banco e halteres', muscle: 'Ombros', secondary: ['Tríceps'], pattern: 'empurrar vertical', type: 'compound',
      image: 'Dumbbell_Shoulder_Press', defaultKg: 10, increment: 1, rest: 120, range: [8, 12],
      cues: ['Mantenha pés firmes e costas apoiadas.', 'Inicie com os halteres próximos aos ombros.', 'Suba sem bater os halteres no topo.']
    },
    elev_lat_maq: {
      name: 'Elevação lateral na máquina', equipment: 'Lateral raise machine', muscle: 'Ombros', pattern: 'abdução', type: 'isolation',
      image: 'Side_Lateral_Raise', defaultKg: 15, increment: 2.5, rest: 75, range: [12, 20],
      cues: ['Alinhe os ombros ao eixo da máquina.', 'Conduza o movimento pelos cotovelos.', 'Evite elevar os ombros em direção às orelhas.']
    },
    crucifixo_inverso: {
      name: 'Crucifixo inverso', equipment: 'Peck deck invertido', muscle: 'Ombros', secondary: ['Costas'], pattern: 'puxar horizontal', type: 'isolation',
      image: 'Reverse_Flyes', defaultKg: 20, increment: 2.5, rest: 75, range: [12, 20],
      cues: ['Apoie o peito e mantenha os ombros baixos.', 'Abra os braços sem impulsionar o tronco.', 'Controle o retorno.']
    },
    agachamento_smith: {
      name: 'Agachamento no Smith', equipment: 'Smith machine', muscle: 'Quadríceps', secondary: ['Glúteos'], pattern: 'agachar', type: 'compound',
      image: 'Smith_Machine_Squat', defaultKg: 30, increment: 5, rest: 150, range: [8, 12],
      cues: ['Posicione os pés para manter equilíbrio durante toda a descida.', 'Mantenha joelhos na direção dos pés.', 'Use amplitude confortável e controlada.']
    },
    extensora_unilateral: {
      name: 'Extensora unilateral', equipment: 'Leg extension', muscle: 'Quadríceps', pattern: 'extensão de joelho', type: 'isolation',
      image: 'Leg_Extensions', defaultKg: 15, increment: 2.5, rest: 75, range: [10, 15],
      cues: ['Trabalhe uma perna por vez.', 'Mantenha quadril e costas apoiados.', 'Use a mesma amplitude nos dois lados.']
    },
    cadeira_flex: {
      name: 'Cadeira flexora', equipment: 'Seated leg curl', muscle: 'Posteriores', pattern: 'flexão de joelho', type: 'isolation',
      image: 'Seated_Leg_Curl', defaultKg: 25, increment: 2.5, rest: 90, range: [10, 15],
      cues: ['Alinhe o joelho ao eixo da máquina.', 'Mantenha quadril e costas apoiados.', 'Flexione os joelhos sem acelerar a volta.']
    },
    flexora_unilateral: {
      name: 'Flexora unilateral em pé', equipment: 'Standing leg curl', muscle: 'Posteriores', pattern: 'flexão de joelho', type: 'isolation',
      image: 'Standing_Leg_Curl', defaultKg: 12.5, increment: 2.5, rest: 75, range: [10, 15],
      cues: ['Mantenha o quadril apontado para frente.', 'Trabalhe uma perna por vez sem balançar.', 'Controle a volta até quase estender o joelho.']
    },
    stiff_halteres: {
      name: 'Stiff com halteres', equipment: 'Halteres', muscle: 'Posteriores', secondary: ['Glúteos'], pattern: 'dobradiça', type: 'compound',
      image: 'Romanian_Deadlift_With_Dumbbells', defaultKg: 12, increment: 2, rest: 150, range: [8, 12],
      cues: ['Leve o quadril para trás mantendo os halteres perto das pernas.', 'Mantenha joelhos levemente flexionados.', 'Pare antes de perder a posição neutra da coluna.']
    },
    glute_bridge: {
      name: 'Glute bridge na máquina', equipment: 'Glute drive', muscle: 'Glúteos', secondary: ['Posteriores'], pattern: 'extensão de quadril', type: 'compound',
      image: 'Barbell_Glute_Bridge', defaultKg: 35, increment: 5, rest: 120, range: [8, 12],
      cues: ['Apoie os pés por inteiro.', 'Suba o quadril até alinhar tronco e coxas.', 'Evite finalizar arqueando a lombar.']
    },
    abducao_cabo: {
      name: 'Abdução de quadril no cabo', equipment: 'Polia baixa', muscle: 'Glúteos', pattern: 'abdução de quadril', type: 'isolation',
      image: 'Cable_Hip_Abduction', defaultKg: 7.5, increment: 2.5, rest: 60, range: [12, 20],
      cues: ['Mantenha o tronco estável.', 'Afaste a perna sem girar o quadril.', 'Controle o retorno sem perder a tensão.']
    },
    panturrilha_sentado: {
      name: 'Panturrilha sentada', equipment: 'Seated calf raise', muscle: 'Panturrilhas', pattern: 'flexão plantar', type: 'isolation',
      image: 'Seated_Calf_Raise', defaultKg: 30, increment: 5, rest: 90, range: [10, 15],
      cues: ['Apoie a ponta dos pés com os joelhos flexionados.', 'Desça os calcanhares com controle.', 'Faça uma pausa curta no alto.']
    },
    crunch_maquina: {
      name: 'Abdominal na máquina', equipment: 'Abdominal machine', muscle: 'Core', pattern: 'flexão de tronco', type: 'isolation',
      image: 'Machine_Crunch', defaultKg: 20, increment: 2.5, rest: 60, range: [10, 15],
      cues: ['Aproxime costelas e pelve.', 'Evite puxar com os braços.', 'Retorne devagar mantendo o abdômen ativo.']
    }
  };

  const ALTERNATIVES = {
    supino_maq: ['supino_inclinado'], supino_inclinado: ['supino_maq'],
    peck_deck: ['crossover'], crossover: ['peck_deck'],
    puxada: ['pullover_polia'], pullover_polia: ['puxada'],
    remada_bx: ['remada_art'], remada_art: ['remada_bx'],
    shoulder_maq: ['desenv_halteres'], desenv_halteres: ['shoulder_maq'],
    elev_lat_cabo: ['elev_lat_maq'], elev_lat_maq: ['elev_lat_cabo'],
    face_pull: ['crucifixo_inverso'], crucifixo_inverso: ['face_pull'],
    tri_polia: ['tri_maquina'], tri_maquina: ['tri_polia'],
    scott: ['rosca_polia'], rosca_polia: ['scott'],
    leg_press: ['hack_squat', 'agachamento_smith'],
    hack_squat: ['leg_press', 'agachamento_smith'],
    agachamento_smith: ['leg_press', 'hack_squat'],
    extensora: ['extensora_unilateral'], extensora_unilateral: ['extensora'],
    mesa_flex: ['cadeira_flex', 'flexora_unilateral'],
    cadeira_flex: ['mesa_flex', 'flexora_unilateral'],
    flexora_unilateral: ['mesa_flex', 'cadeira_flex'],
    stiff_smith: ['stiff_halteres'], stiff_halteres: ['stiff_smith'],
    hip_thrust: ['glute_bridge'], glute_bridge: ['hip_thrust'],
    abdutora: ['abducao_cabo'], abducao_cabo: ['abdutora'],
    panturrilha: ['panturrilha_sentado'], panturrilha_sentado: ['panturrilha'],
    crunch_cabo: ['crunch_maquina'], crunch_maquina: ['crunch_cabo']
  };

  const MUSCLE_VIEW = {
    Peito: 'front', Costas: 'back', Ombros: 'front', Tríceps: 'back', Bíceps: 'front',
    Quadríceps: 'front', Posteriores: 'back', Glúteos: 'back', Panturrilhas: 'back', Core: 'front'
  };

  const PLANS = {
    2: {
      id: 'full-body-2', name: 'Corpo inteiro 2×', summary: 'Duas sessões completas, simples e eficientes.',
      sessions: [
        session('F1', 'Corpo inteiro A', 'Base e técnica', [
          item('leg_press', 3), item('supino_maq', 3), item('remada_bx', 3), item('mesa_flex', 2), item('elev_lat_cabo', 2), item('crunch_cabo', 2)
        ]),
        session('F2', 'Corpo inteiro B', 'Força equilibrada', [
          item('stiff_smith', 3), item('puxada', 3), item('supino_inclinado', 3), item('extensora', 2), item('scott', 2), item('panturrilha', 3)
        ])
      ]
    },
    3: {
      id: 'full-body-3', name: 'Corpo inteiro 3×', summary: 'Frequência alta com sessões enxutas.',
      sessions: [
        session('F1', 'Corpo inteiro A', 'Agachar + empurrar', [
          item('leg_press', 3), item('supino_maq', 3), item('remada_bx', 3), item('mesa_flex', 2), item('elev_lat_cabo', 2)
        ]),
        session('F2', 'Corpo inteiro B', 'Dobradiça + puxar', [
          item('stiff_smith', 3), item('puxada', 3), item('shoulder_maq', 3), item('extensora', 2), item('tri_polia', 2), item('panturrilha', 2)
        ]),
        session('F3', 'Corpo inteiro C', 'Volume e controle', [
          item('hack_squat', 3), item('supino_inclinado', 3), item('remada_art', 3), item('hip_thrust', 2), item('scott', 2), item('crunch_cabo', 2)
        ])
      ]
    },
    4: {
      id: 'upper-lower-4', name: 'Superior / inferior 4×', summary: 'Cada grupo principal aparece duas vezes no ciclo.',
      sessions: [
        session('S1', 'Superior A', 'Empurrar com base', [
          item('supino_maq', 4), item('remada_bx', 3), item('shoulder_maq', 2), item('puxada', 2), item('tri_polia', 2), item('scott', 2)
        ]),
        session('I1', 'Inferior A', 'Quadríceps e controle', [
          item('leg_press', 3), item('stiff_smith', 3), item('extensora', 2), item('mesa_flex', 2), item('panturrilha', 3), item('crunch_cabo', 2)
        ]),
        session('S2', 'Superior B', 'Puxar e estabilizar', [
          item('puxada', 3), item('supino_inclinado', 4), item('remada_art', 2), item('elev_lat_cabo', 3), item('scott', 2), item('tri_maquina', 2)
        ]),
        session('I2', 'Inferior B', 'Posteriores e glúteos', [
          item('hack_squat', 3), item('hip_thrust', 3), item('mesa_flex', 3), item('extensora', 2), item('abdutora', 2), item('panturrilha', 3)
        ])
      ]
    },
    5: {
      id: 'balanced-5', name: 'Equilibrado 5×', summary: 'Mais prática por semana sem concentrar volume.',
      sessions: [
        session('P1', 'Empurrar', 'Peito, ombros e tríceps', [
          item('supino_maq', 3), item('supino_inclinado', 3), item('shoulder_maq', 2), item('elev_lat_cabo', 3), item('tri_polia', 3)
        ]),
        session('P2', 'Puxar', 'Costas e bíceps', [
          item('puxada', 3), item('remada_art', 3), item('remada_bx', 2), item('face_pull', 2), item('scott', 3)
        ]),
        session('P3', 'Pernas A', 'Quadríceps', [
          item('leg_press', 3), item('hack_squat', 3), item('extensora', 3), item('mesa_flex', 2), item('panturrilha', 3)
        ]),
        session('P4', 'Superior misto', 'Técnica e volume', [
          item('supino_inclinado', 3), item('puxada', 3), item('remada_bx', 2), item('elev_lat_cabo', 2), item('tri_maquina', 2), item('rosca_polia', 2)
        ]),
        session('P5', 'Pernas B', 'Posteriores e glúteos', [
          item('stiff_smith', 3), item('hip_thrust', 3), item('mesa_flex', 3), item('abdutora', 2), item('panturrilha', 3), item('crunch_cabo', 2)
        ])
      ]
    }
  };

  function item(id, sets) { return { id, sets }; }
  function session(id, name, focus, exercises) { return { id, name, focus, exercises }; }

  const state = {
    view: 'today',
    readiness: 3,
    openExercise: null,
    rest: null,
    restInterval: null,
    installPrompt: null,
    toastTimer: null
  };

  function freshDB() {
    return {
      schema: SCHEMA,
      profile: { name: 'Terceiro', goal: 'hypertrophy', days: 4, experience: 'intermediate', sessionMinutes: 60 },
      rotationIndex: 0,
      historico: [],
      pesos: {},
      swaps: {},
      active: null,
      treinoAtivo: null,
      ultimoTreino: null,
      preferences: { vibration: true }
    };
  }

  function loadDB() {
    try {
      const raw = JSON.parse(localStorage.getItem(DB_KEY) || 'null');
      const db = normalizeDB(raw);
      localStorage.setItem(DB_KEY, JSON.stringify(db));
      return db;
    } catch (error) {
      console.warn('Falha ao ler os dados locais', error);
      return freshDB();
    }
  }

  function normalizeDB(raw) {
    const base = freshDB();
    if (!raw || typeof raw !== 'object') return base;
    const db = {
      ...base,
      ...raw,
      profile: { ...base.profile, ...(raw.profile || {}) },
      preferences: { ...base.preferences, ...(raw.preferences || {}) },
      historico: Array.isArray(raw.historico) ? raw.historico : [],
      pesos: raw.pesos && typeof raw.pesos === 'object' ? raw.pesos : {},
      swaps: raw.swaps && typeof raw.swaps === 'object' ? raw.swaps : {}
    };
    db.profile.days = clamp(Number(db.profile.days) || 4, 2, 5);
    db.profile.sessionMinutes = [40, 55, 70].includes(Number(db.profile.sessionMinutes)) ? Number(db.profile.sessionMinutes) : 55;

    if (!raw.schema || raw.schema < SCHEMA) {
      const legacyOrder = ['A', 'B', 'C', 'D'];
      const oldIndex = legacyOrder.indexOf(raw.ultimoTreino);
      if (oldIndex >= 0) db.rotationIndex = (oldIndex + 1) % PLANS[4].sessions.length;
      db.migratedAt = new Date().toISOString();
      db.treinoAtivo = null;
      db.active = null;
    }

    db.schema = SCHEMA;
    const plan = PLANS[db.profile.days];
    db.rotationIndex = clamp(Number(db.rotationIndex) || 0, 0, plan.sessions.length - 1);
    return db;
  }

  function saveDB(db) {
    db.schema = SCHEMA;
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  function currentPlan(db = loadDB()) {
    return PLANS[db.profile.days] || PLANS[4];
  }

  function currentSession(db = loadDB()) {
    const plan = currentPlan(db);
    return plan.sessions[db.rotationIndex % plan.sessions.length];
  }

  function prescription(exerciseId, baseSets, profile) {
    const ex = EXERCISES[exerciseId];
    let sets = baseSets;
    let [low, high] = ex.range;
    let rest = ex.rest;

    if (profile.goal === 'strength') {
      if (ex.type === 'compound') {
        low = 4; high = 6; rest = Math.max(rest, 180);
      } else {
        low = 8; high = 12; rest = Math.max(rest, 90);
      }
    }
    if (profile.goal === 'health') {
      sets = Math.min(2, sets);
      low = 8; high = 12; rest = Math.min(120, Math.max(75, rest));
    }
    if (profile.experience === 'beginner') sets = Math.min(sets, 2);
    return { sets, low, high, rest };
  }

  function effectiveSession(definition, profile) {
    const maxExercises = profile.sessionMinutes <= 40 ? 5 : profile.sessionMinutes <= 55 ? 6 : 7;
    return {
      ...definition,
      exercises: definition.exercises.slice(0, maxExercises).map(slot => {
        const swappedId = slot.swapId || slot.id;
        return { ...slot, id: swappedId, ...prescription(swappedId, slot.sets, profile) };
      })
    };
  }

  function uid() {
    return globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }

  function startWorkout() {
    const db = loadDB();
    if (db.active) return;
    const definition = effectiveSession(currentSession(db), db.profile);
    const active = {
      id: uid(),
      sessionId: definition.id,
      name: definition.name,
      focus: definition.focus,
      startedAt: new Date().toISOString(),
      readiness: state.readiness,
      exercises: definition.exercises.map(slot => {
        const suggestion = suggestLoad(slot.id, slot.low, slot.high, db);
        return {
          exerciseId: slot.id,
          sourceExerciseId: slot.id,
          targetLow: slot.low,
          targetHigh: slot.high,
          targetSets: slot.sets,
          rest: slot.rest,
          recommendation: suggestion.reason,
          sets: Array.from({ length: slot.sets }, () => ({ kg: suggestion.kg, reps: '', rir: 2, done: false }))
        };
      })
    };
    db.active = active;
    saveDB(db);
    state.openExercise = active.exercises[0]?.exerciseId || null;
    render();
    toast('Sessão iniciada. Primeira série: técnica antes da carga.');
  }

  function historyExercises(entry) {
    if (Array.isArray(entry.exercises)) return entry.exercises;
    if (!entry.registros || typeof entry.registros !== 'object') return [];
    return Object.entries(entry.registros).map(([exerciseId, record]) => ({
      exerciseId,
      name: record.nome || EXERCISES[exerciseId]?.name || exerciseId,
      muscle: EXERCISES[exerciseId]?.muscle || 'Outros',
      sets: (record.pesos || []).map((kg, index) => ({
        kg: Number(kg) || 0,
        reps: Number(record.reps?.[index]) || 0,
        rir: null,
        done: true
      }))
    }));
  }

  function lastExerciseRecord(exerciseId, db) {
    const ordered = [...db.historico].sort((a, b) => new Date(b.ts || b.endedAt) - new Date(a.ts || a.endedAt));
    for (const entry of ordered) {
      const found = historyExercises(entry).find(ex => ex.exerciseId === exerciseId);
      if (found?.sets?.length) return found;
    }
    return null;
  }

  function suggestLoad(exerciseId, low, high, db = loadDB()) {
    const ex = EXERCISES[exerciseId];
    const last = lastExerciseRecord(exerciseId, db);
    if (!last) {
      const legacy = Number(db.pesos?.[exerciseId]);
      return { kg: legacy || ex.defaultKg, reason: legacy ? 'Carga trazida do app anterior' : 'Carga inicial — ajuste na primeira série' };
    }
    const valid = last.sets.filter(set => Number(set.kg) > 0 && Number(set.reps) > 0);
    if (!valid.length) return { kg: ex.defaultKg, reason: 'Ajuste livre na primeira série' };
    const kg = median(valid.map(set => Number(set.kg)));
    const hitTop = valid.every(set => Number(set.reps) >= high);
    const missedLow = valid.some(set => Number(set.reps) < low);
    const rirKnown = valid.filter(set => set.rir !== null && set.rir !== '' && Number.isFinite(Number(set.rir)));
    const controlled = !rirKnown.length || median(rirKnown.map(set => Number(set.rir))) >= 1;
    if (hitTop && controlled) return { kg: roundLoad(kg + ex.increment, ex.increment), reason: `Faixa completa: subir ${formatKg(ex.increment)} kg` };
    if (missedLow) return { kg: Math.max(0, roundLoad(kg - ex.increment, ex.increment)), reason: 'Repetições abaixo da faixa: reduzir um passo' };
    return { kg: roundLoad(kg, ex.increment), reason: 'Manter a carga e buscar mais repetições' };
  }

  function finishWorkout() {
    const db = loadDB();
    const active = db.active;
    if (!active) return;
    const completedSets = active.exercises.flatMap(ex => ex.sets).filter(set => set.done);
    if (!completedSets.length) {
      toast('Conclua pelo menos uma série antes de salvar.');
      return;
    }
    const endedAt = new Date();
    const exercises = active.exercises
      .filter(ex => ex.sets.some(set => set.done))
      .map(ex => ({
        exerciseId: ex.exerciseId,
        name: EXERCISES[ex.exerciseId]?.name || ex.exerciseId,
        muscle: EXERCISES[ex.exerciseId]?.muscle || 'Outros',
        sets: ex.sets.filter(set => set.done).map(set => ({ kg: Number(set.kg), reps: Number(set.reps), rir: Number(set.rir), done: true }))
      }));
    const totalSets = active.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const volume = completedSets.reduce((sum, set) => sum + (Number(set.kg) || 0) * (Number(set.reps) || 0), 0);
    const entry = {
      id: active.id,
      ts: endedAt.toISOString(),
      startedAt: active.startedAt,
      endedAt: endedAt.toISOString(),
      durationMin: Math.max(1, Math.round((endedAt - new Date(active.startedAt)) / 60000)),
      sessionId: active.sessionId,
      sessionName: active.name,
      readiness: active.readiness,
      exercises,
      completedSets: completedSets.length,
      totalSets,
      volume,
      partial: completedSets.length < totalSets
    };
    db.historico.unshift(entry);
    if (db.historico.length > 300) db.historico.length = 300;
    exercises.forEach(ex => {
      const last = ex.sets[ex.sets.length - 1];
      if (last) db.pesos[ex.exerciseId] = last.kg;
    });
    const plan = currentPlan(db);
    db.rotationIndex = (db.rotationIndex + 1) % plan.sessions.length;
    db.ultimoTreino = active.sessionId;
    db.active = null;
    saveDB(db);
    stopRest();
    state.openExercise = null;
    render();
    toast(`${active.name} salvo: ${completedSets.length} séries concluídas.`);
  }

  function discardWorkout() {
    const db = loadDB();
    db.active = null;
    saveDB(db);
    stopRest();
    closeDialog();
    state.openExercise = null;
    render();
    toast('Sessão descartada. O histórico anterior continua intacto.');
  }

  function render() {
    const db = loadDB();
    renderHeader(db);
    updateNav();
    const app = $('#app');
    if (state.view === 'today') app.innerHTML = renderToday(db);
    if (state.view === 'progress') app.innerHTML = renderProgress(db);
    if (state.view === 'plan') app.innerHTML = renderPlan(db);
    if (state.view === 'settings') app.innerHTML = renderSettings(db);
  }

  function renderHeader(db) {
    const now = new Date();
    const sessions = sessionsInDays(db, 7);
    $('#header-meta').innerHTML = `<strong>${titleCase(now.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''))}</strong><small>${now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '')} · ${sessions} treino${sessions === 1 ? '' : 's'} em 7 dias</small>`;
  }

  function updateNav() {
    $$('.nav-item').forEach(button => {
      const active = button.dataset.view === state.view;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  function renderToday(db) {
    if (db.active) return renderActiveWorkout(db);
    const plan = currentPlan(db);
    const definition = effectiveSession(currentSession(db), db.profile);
    const weekly = sessionsInDays(db, 7);
    const goal = goalLabel(db.profile.goal);
    const duration = estimatedDuration(definition, db.profile);
    const preview = definition.exercises.map((slot, index) => {
      const ex = EXERCISES[slot.id];
      const suggestion = suggestLoad(slot.id, slot.low, slot.high, db);
      return `<li>
        <span class="exercise-order">${String(index + 1).padStart(2, '0')}</span>
        <span><strong>${escapeHtml(ex.name)}</strong><small>${slot.sets} × ${slot.low}–${slot.high} · ${escapeHtml(ex.muscle)}</small></span>
        <b>${formatKg(suggestion.kg)}<small> kg</small></b>
      </li>`;
    }).join('');
    return `<div class="page today-page">
      <section class="session-hero">
        <div class="hero-rail"><span>${escapeHtml(definition.id)}</span><span>${db.rotationIndex + 1}/${plan.sessions.length}</span></div>
        <div class="hero-copy">
          <p>Próxima sessão</p>
          <h1>${escapeHtml(definition.name)}</h1>
          <div class="hero-tags"><span>${escapeHtml(definition.focus)}</span><span>≈ ${duration} min</span><span>${escapeHtml(goal)}</span></div>
        </div>
        <div class="hero-progress" aria-label="${weekly} treinos nos últimos sete dias">
          <span style="--progress:${Math.min(100, weekly / db.profile.days * 100)}%"><b>${weekly}</b><small>de ${db.profile.days}</small></span>
          <p>ritmo<br>semanal</p>
        </div>
      </section>

      <section class="readiness-panel" aria-labelledby="readiness-title">
        <div><h2 id="readiness-title">Como você chega hoje?</h2><p>Isso fica registrado junto da sessão.</p></div>
        <div class="readiness-scale" role="group" aria-label="Prontidão de 1 a 5">
          ${[1, 2, 3, 4, 5].map(value => `<button type="button" data-readiness="${value}" class="${state.readiness === value ? 'is-selected' : ''}" aria-label="Prontidão ${value} de 5">${value}</button>`).join('')}
        </div>
      </section>

      <button class="primary-action start-action" type="button" data-action="start-workout">
        <span>Iniciar ${escapeHtml(definition.name)}</span><small>${definition.exercises.length} exercícios · sugestão baseada no último treino</small>
      </button>

      <section class="section-block">
        <div class="section-heading"><div><p>Roteiro</p><h2>O que vem hoje</h2></div><span>${definition.exercises.reduce((sum, ex) => sum + ex.sets, 0)} séries</span></div>
        <ol class="preview-list">${preview}</ol>
      </section>

      ${renderTodayInsight(db)}
    </div>`;
  }

  function renderTodayInsight(db) {
    if (!db.historico.length) {
      return `<aside class="insight-card"><span class="insight-mark">i</span><div><strong>Comece calibrando</strong><p>Na primeira semana, ajuste as cargas para terminar a maioria das séries com 1–3 repetições na reserva.</p></div></aside>`;
    }
    const last = [...db.historico].sort((a, b) => new Date(b.ts) - new Date(a.ts))[0];
    const lastName = last.sessionName || `Treino ${last.letra || ''}`.trim();
    const days = Math.max(0, Math.floor((Date.now() - new Date(last.ts).getTime()) / 86400000));
    return `<aside class="insight-card"><span class="insight-mark">↗</span><div><strong>Última sessão: ${escapeHtml(lastName)}</strong><p>${days === 0 ? 'Feita hoje' : days === 1 ? 'Feita ontem' : `Há ${days} dias`} · ${historyExercises(last).reduce((sum, ex) => sum + ex.sets.length, 0)} séries registradas.</p></div></aside>`;
  }

  function renderActiveWorkout(db) {
    const active = db.active;
    const doneSets = active.exercises.reduce((sum, ex) => sum + ex.sets.filter(set => set.done).length, 0);
    const totalSets = active.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const pct = totalSets ? Math.round(doneSets / totalSets * 100) : 0;
    const elapsed = formatElapsed(new Date() - new Date(active.startedAt));
    const cards = active.exercises.map((record, index) => renderExerciseCard(record, index, active)).join('');

    return `<div class="page workout-page">
      <section class="workout-strip">
        <div><p>Sessão em andamento</p><h1>${escapeHtml(active.name)}</h1><span>${escapeHtml(active.focus)} · <b id="elapsed-time">${elapsed}</b></span></div>
        <div class="progress-dial" style="--progress:${pct}%"><strong>${pct}%</strong><small>${doneSets}/${totalSets}</small></div>
      </section>
      <div class="workout-progress"><span style="width:${pct}%"></span></div>
      <p class="workout-guidance">Registre a série real. RIR é quantas repetições ainda caberiam com boa técnica.</p>
      <section class="exercise-stack">${cards}</section>
      <div class="finish-panel">
        <div><strong>${doneSets} séries concluídas</strong><span>${totalSets - doneSets} restantes</span></div>
        <button class="primary-action" type="button" data-action="finish-workout" ${doneSets ? '' : 'disabled'}>Salvar sessão</button>
        <button class="danger-link" type="button" data-action="confirm-discard">Descartar sessão</button>
      </div>
    </div>`;
  }

  function renderExerciseCard(record, index, active) {
    const ex = EXERCISES[record.exerciseId] || { name: record.exerciseId, equipment: '', muscle: 'Outros', cues: [], increment: 1, image: null };
    const completed = record.sets.filter(set => set.done).length;
    const open = state.openExercise === record.exerciseId;
    const allDone = completed === record.sets.length;
    const image = ex.image ? `${IMAGE_ROOT}${ex.image}/0.jpg` : '';
    const rows = record.sets.map((set, setIndex) => `<div class="set-row ${set.done ? 'is-done' : ''}">
      <span class="set-number">${setIndex + 1}</span>
      <label><span>kg</span><input inputmode="decimal" type="number" min="0" step="${ex.increment || 1}" value="${escapeAttr(set.kg)}" data-set-field="kg" data-exercise="${escapeAttr(record.exerciseId)}" data-set="${setIndex}" ${set.done ? 'disabled' : ''}></label>
      <label><span>reps</span><input inputmode="numeric" type="number" min="1" max="99" value="${escapeAttr(set.reps)}" placeholder="${record.targetLow}" data-set-field="reps" data-exercise="${escapeAttr(record.exerciseId)}" data-set="${setIndex}" ${set.done ? 'disabled' : ''}></label>
      <label><span>RIR</span><select data-set-field="rir" data-exercise="${escapeAttr(record.exerciseId)}" data-set="${setIndex}" ${set.done ? 'disabled' : ''}>
        ${[0, 1, 2, 3, 4].map(rir => `<option value="${rir}" ${Number(set.rir) === rir ? 'selected' : ''}>${rir}</option>`).join('')}
      </select></label>
      <button type="button" class="set-check ${set.done ? 'is-done' : ''}" data-action="toggle-set" data-exercise="${escapeAttr(record.exerciseId)}" data-set="${setIndex}" aria-label="${set.done ? 'Reabrir' : 'Concluir'} série ${setIndex + 1}">${set.done ? '✓' : ''}</button>
    </div>`).join('');

    return `<article class="exercise-card ${open ? 'is-open' : ''} ${allDone ? 'is-complete' : ''}" id="exercise-${escapeAttr(record.exerciseId)}">
      <button class="exercise-summary" type="button" data-action="toggle-exercise" data-exercise="${escapeAttr(record.exerciseId)}" aria-expanded="${open}">
        <span class="exercise-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="exercise-title"><strong>${escapeHtml(ex.name)}</strong><small>${record.sets.length} × ${record.targetLow}–${record.targetHigh} · descanso ${formatRest(record.rest)}</small></span>
        <span class="exercise-count">${completed}/${record.sets.length}</span>
        <span class="chevron" aria-hidden="true">⌄</span>
      </button>
      <div class="exercise-body" ${open ? '' : 'hidden'}>
        <div class="exercise-intro">
          <div class="exercise-media">${image ? `<img src="${image}" alt="Demonstração de ${escapeAttr(ex.name)}" loading="lazy" onerror="this.parentElement.classList.add('image-failed');this.remove()">` : ''}<span>${initials(ex.name)}</span></div>
          <div><p>${escapeHtml(ex.equipment)}</p><strong>${escapeHtml(record.recommendation)}</strong><small>${escapeHtml(ex.pattern)}</small></div>
        </div>
        ${renderMuscleOverview(ex, record.exerciseId)}
        <div class="set-head"><span>Série</span><span>Carga</span><span>Reps</span><span>RIR</span><span>Feita</span></div>
        <div class="set-list">${rows}</div>
        <button class="add-set" type="button" data-action="add-set" data-exercise="${escapeAttr(record.exerciseId)}">+ adicionar série</button>
      </div>
    </article>`;
  }

  function renderMuscleOverview(ex, exerciseId) {
    const secondary = Array.isArray(ex.secondary) ? ex.secondary : ex.secondary ? [ex.secondary] : [];
    return `<button class="muscle-overview" type="button" data-action="exercise-info" data-exercise="${escapeAttr(exerciseId)}">
      ${renderAnatomyMap(ex, true)}
      <span class="muscle-copy"><small>Áreas trabalhadas</small><strong>${escapeHtml(ex.muscle)}</strong><em>${secondary.length ? `Auxiliares: ${escapeHtml(secondary.join(' + '))}` : 'Foco isolado'}</em></span>
      <b>ver mapa</b>
    </button>`;
  }

  function renderAnatomyMap(ex, compact = false) {
    const preferred = MUSCLE_VIEW[ex.muscle] || 'front';
    if (compact) return `<span class="anatomy-map is-compact">${bodyFigure(preferred, ex)}<small>${preferred === 'front' ? 'frente' : 'costas'}</small></span>`;
    return `<div class="anatomy-map is-detailed"><div>${bodyFigure('front', ex)}<span>Frente</span></div><div>${bodyFigure('back', ex)}<span>Costas</span></div></div>`;
  }

  function bodyFigure(side, ex) {
    const cls = muscle => muscleRegionClass(muscle, ex);
    const common = `<g class="body-base">
      <circle cx="50" cy="15" r="10"/><path d="M44 25h12l2 8H42z"/>
      <path d="M38 31Q50 27 62 31L69 66 62 102H38L31 66z"/>
      <path d="M34 34Q23 36 19 49L8 91q-2 8 5 10l7-5 12-36 8-18z"/>
      <path d="M66 34q11 2 15 15l11 42q2 8-5 10l-7-5-12-36-8-18z"/>
      <path d="M39 99l-7 50 1 60h14l3-57 1-53z"/>
      <path d="M61 99l7 50-1 60H53l-3-57-1-53z"/>
    </g>`;
    const front = `<g class="${cls('Ombros')}"><ellipse cx="32" cy="40" rx="7" ry="9"/><ellipse cx="68" cy="40" rx="7" ry="9"/></g>
      <g class="${cls('Peito')}"><path d="M39 39q10-5 10 12v12q-11 1-15-7z"/><path d="M61 39q-10-5-10 12v12q11 1 15-7z"/></g>
      <g class="${cls('Bíceps')}"><path d="M22 51q7-3 8 6l-6 22q-5 5-9 0z"/><path d="M78 51q-7-3-8 6l6 22q5 5 9 0z"/></g>
      <g class="${cls('Core')}"><path d="M43 65h6v11h-7zm8 0h6l1 11h-7zm-9 13h7v10h-8zm9 0h7l1 10h-8zm-10 12h8v9H39zm10 0h8l2 9H51z"/></g>
      <g class="${cls('Quadríceps')}"><path d="M39 105q9 4 9 17l-4 35q-7 8-11-2l2-35z"/><path d="M61 105q-9 4-9 17l4 35q7 8 11-2l-2-35z"/></g>
      <g class="${cls('Panturrilhas')}"><path d="M35 164q10 1 9 15l-3 22q-8 6-9-3z"/><path d="M65 164q-10 1-9 15l3 22q8 6 9-3z"/></g>`;
    const back = `<g class="${cls('Ombros')}"><ellipse cx="32" cy="40" rx="7" ry="9"/><ellipse cx="68" cy="40" rx="7" ry="9"/></g>
      <g class="${cls('Costas')}"><path d="M38 39q12-5 12 8v43q-10 1-16-16z"/><path d="M62 39q-12-5-12 8v43q10 1 16-16z"/></g>
      <g class="${cls('Tríceps')}"><path d="M25 49q7 1 5 11l-6 21q-6 2-8-5l6-23z"/><path d="M75 49q-7 1-5 11l6 21q6 2 8-5l-6-23z"/></g>
      <g class="${cls('Glúteos')}"><path d="M38 94q12-5 12 9v12q-13 7-17-4z"/><path d="M62 94q-12-5-12 9v12q13 7 17-4z"/></g>
      <g class="${cls('Posteriores')}"><path d="M37 116q11-4 11 9l-4 35q-8 5-11-5z"/><path d="M63 116q-11-4-11 9l4 35q8 5 11-5z"/></g>
      <g class="${cls('Panturrilhas')}"><path d="M35 164q10 0 9 14l-3 24q-9 3-9-5z"/><path d="M65 164q-10 0-9 14l3 24q9 3 9-5z"/></g>`;
    return `<svg class="body-figure" viewBox="0 0 100 220" aria-hidden="true" focusable="false">${common}${side === 'back' ? back : front}</svg>`;
  }

  function muscleRegionClass(muscle, ex) {
    const secondary = Array.isArray(ex.secondary) ? ex.secondary : ex.secondary ? [ex.secondary] : [];
    if (muscle === ex.muscle) return 'muscle-region is-primary';
    if (secondary.includes(muscle)) return 'muscle-region is-secondary';
    return 'muscle-region';
  }

  function renderProgress(db) {
    const history = [...db.historico].sort((a, b) => new Date(b.ts) - new Date(a.ts));
    const weekSessions = sessionsInDays(db, 7);
    const weekEntries = history.filter(entry => Date.now() - new Date(entry.ts).getTime() < 7 * 86400000);
    const weekSets = weekEntries.reduce((sum, entry) => sum + historyExercises(entry).reduce((s, ex) => s + ex.sets.length, 0), 0);
    const weekVolume = weekEntries.reduce((sum, entry) => sum + entryVolume(entry), 0);
    const consistency = db.profile.days ? Math.min(100, Math.round(weekSessions / db.profile.days * 100)) : 0;

    if (!history.length) {
      return `<div class="page"><div class="page-title"><p>Progresso</p><h1>Seu histórico começa na primeira série.</h1></div>
        <div class="empty-state"><span>↗</span><h2>Ainda não há treinos salvos</h2><p>Conclua uma sessão para ver volume, frequência, melhores marcas e evolução de carga.</p><button class="primary-action" data-action="go-home">Ir para o treino</button></div></div>`;
    }

    return `<div class="page progress-page">
      <div class="page-title"><p>Progresso</p><h1>O que está avançando</h1><span>Últimos 7 dias comparados ao seu plano</span></div>
      <section class="metric-board">
        <div class="metric-main"><span>Consistência</span><strong>${consistency}<small>%</small></strong><div><i style="width:${consistency}%"></i></div><p>${weekSessions} de ${db.profile.days} sessões</p></div>
        <div class="metric-small"><span>Séries</span><strong>${weekSets}</strong><small>em 7 dias</small></div>
        <div class="metric-small"><span>Volume</span><strong>${compactNumber(weekVolume)}</strong><small>kg movidos</small></div>
      </section>

      <section class="section-block chart-block">
        <div class="section-heading"><div><p>Trabalho total</p><h2>Volume por sessão</h2></div><span>últimas 8</span></div>
        ${renderVolumeChart(history.slice(0, 8).reverse())}
      </section>

      <section class="section-block">
        <div class="section-heading"><div><p>Distribuição</p><h2>Séries por grupo</h2></div><span>7 dias</span></div>
        <div class="muscle-bars">${renderMuscleBars(weeklyMuscleSets(db), db.profile.goal)}</div>
      </section>

      <section class="section-block">
        <div class="section-heading"><div><p>Melhores marcas</p><h2>Força estimada</h2></div><span>e1RM</span></div>
        <div class="record-list">${renderRecords(history)}</div>
      </section>

      <section class="section-block">
        <div class="section-heading"><div><p>Diário</p><h2>Sessões recentes</h2></div><span>${history.length} total</span></div>
        <div class="history-list">${history.slice(0, 12).map(renderHistoryEntry).join('')}</div>
      </section>
    </div>`;
  }

  function renderVolumeChart(entries) {
    const values = entries.map(entry => entryVolume(entry));
    const max = Math.max(...values, 1);
    const bars = entries.map((entry, index) => {
      const height = Math.max(7, Math.round(values[index] / max * 100));
      const date = new Date(entry.ts);
      return `<div class="volume-bar"><span style="height:${height}%"><b>${compactNumber(values[index])}</b></span><small>${date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</small></div>`;
    }).join('');
    return `<div class="volume-chart" role="img" aria-label="Volume dos últimos ${entries.length} treinos">${bars}</div>`;
  }

  function weeklyMuscleSets(db) {
    const result = {};
    db.historico
      .filter(entry => Date.now() - new Date(entry.ts).getTime() < 7 * 86400000)
      .forEach(entry => historyExercises(entry).forEach(ex => {
        const muscle = ex.muscle || EXERCISES[ex.exerciseId]?.muscle || 'Outros';
        result[muscle] = (result[muscle] || 0) + ex.sets.length;
        const definition = EXERCISES[ex.exerciseId];
        const secondary = Array.isArray(definition?.secondary) ? definition.secondary : definition?.secondary ? [definition.secondary] : [];
        secondary.forEach(group => { result[group] = (result[group] || 0) + ex.sets.length * 0.5; });
      }));
    return result;
  }

  function renderMuscleBars(data, goal) {
    const muscles = ['Peito', 'Costas', 'Quadríceps', 'Posteriores', 'Glúteos', 'Ombros', 'Bíceps', 'Tríceps', 'Panturrilhas', 'Core'];
    const target = goal === 'health' ? 6 : goal === 'strength' ? 10 : 12;
    return muscles.map(muscle => {
      const value = data[muscle] || 0;
      const pct = Math.min(100, value / target * 100);
      return `<div class="muscle-row"><span>${muscle}</span><div><i style="width:${pct}%"></i></div><b>${value}</b></div>`;
    }).join('');
  }

  function renderRecords(history) {
    const best = {};
    history.forEach(entry => historyExercises(entry).forEach(ex => ex.sets.forEach(set => {
      const score = estimated1RM(set.kg, set.reps);
      if (!best[ex.exerciseId] || score > best[ex.exerciseId].score) best[ex.exerciseId] = { score, kg: set.kg, reps: set.reps, name: ex.name || EXERCISES[ex.exerciseId]?.name };
    })));
    const items = Object.values(best).sort((a, b) => b.score - a.score).slice(0, 6);
    if (!items.length) return '<p class="muted-copy">Registre carga e repetições para calcular suas marcas.</p>';
    return items.map((record, index) => `<div class="record-row"><span>${index + 1}</span><div><strong>${escapeHtml(record.name || 'Exercício')}</strong><small>${formatKg(record.kg)} kg × ${record.reps} reps</small></div><b>${formatKg(record.score)}<small> kg</small></b></div>`).join('');
  }

  function renderHistoryEntry(entry) {
    const date = new Date(entry.ts);
    const exercises = historyExercises(entry);
    const sets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const name = entry.sessionName || entry.nomeT || `Treino ${entry.letra || ''}`.trim();
    return `<article class="history-entry"><time datetime="${escapeAttr(entry.ts)}"><strong>${date.getDate()}</strong><span>${date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</span></time><div><strong>${escapeHtml(name)}</strong><small>${exercises.length} exercícios · ${sets} séries${entry.partial ? ' · parcial' : ''}</small></div><b>${compactNumber(entryVolume(entry))}<small> kg</small></b></article>`;
  }

  function renderPlan(db) {
    const plan = currentPlan(db);
    const muscleSets = planMuscleSets(plan, db.profile);
    return `<div class="page plan-page">
      <div class="page-title"><p>Plano atual</p><h1>${escapeHtml(plan.name)}</h1><span>${escapeHtml(plan.summary)}</span></div>
      <section class="plan-note"><span>${db.profile.days}×</span><div><strong>${goalLabel(db.profile.goal)}</strong><p>${db.profile.sessionMinutes} min por sessão · ${experienceLabel(db.profile.experience)}</p></div><button type="button" data-view="settings">Editar</button></section>
      <section class="section-block">
        <div class="section-heading"><div><p>Ciclo</p><h2>Próximas sessões</h2></div><span>ordem contínua</span></div>
        <div class="plan-sessions">${plan.sessions.map((sessionDef, index) => renderPlanSession(sessionDef, index, db)).join('')}</div>
      </section>
      <section class="section-block">
        <div class="section-heading"><div><p>Volume planejado</p><h2>Séries ponderadas por ciclo</h2></div><span>referência</span></div>
        <div class="muscle-bars">${renderPlanMuscleBars(muscleSets, db.profile.goal)}</div>
        <p class="method-caption">Cada série vale 1 para o grupo principal e 0,5 para grupos auxiliares. É um guia, não uma obrigação: consistência e recuperação vêm primeiro.</p>
      </section>
      <aside class="method-card"><span>2026</span><div><strong>Plano baseado em evidência atual</strong><p>Prioriza prática frequente, amplitude confortável, progressão e volume adequado ao objetivo — sem exigir falha em toda série.</p><button type="button" data-view="settings" data-scroll="method">Ver método e fontes</button></div></aside>
    </div>`;
  }

  function renderPlanSession(sessionDef, index, db) {
    const effective = effectiveSession(sessionDef, db.profile);
    const isNext = index === db.rotationIndex;
    return `<article class="plan-session ${isNext ? 'is-next' : ''}">
      <header><span>${escapeHtml(sessionDef.id)}</span><div><strong>${escapeHtml(sessionDef.name)}</strong><small>${escapeHtml(sessionDef.focus)}</small></div>${isNext ? '<b>próxima</b>' : ''}</header>
      <ol>${effective.exercises.map(slot => {
        const ex = EXERCISES[slot.id];
        return `<li><span>${escapeHtml(ex.name)}</span><b>${slot.sets} × ${slot.low}–${slot.high}</b></li>`;
      }).join('')}</ol>
    </article>`;
  }

  function planMuscleSets(plan, profile) {
    const result = {};
    plan.sessions.forEach(def => effectiveSession(def, profile).exercises.forEach(slot => {
      const ex = EXERCISES[slot.id];
      result[ex.muscle] = (result[ex.muscle] || 0) + slot.sets;
      const secondary = Array.isArray(ex.secondary) ? ex.secondary : ex.secondary ? [ex.secondary] : [];
      secondary.forEach(group => { result[group] = (result[group] || 0) + slot.sets * 0.5; });
    }));
    return result;
  }

  function renderPlanMuscleBars(data, goal) {
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const range = goal === 'health' ? [4, 8] : goal === 'strength' ? [6, 10] : [8, 14];
    return entries.map(([muscle, value]) => {
      const pct = Math.min(100, value / range[1] * 100);
      const label = value < range[0] ? 'base' : value <= range[1] ? 'na faixa' : 'alto';
      return `<div class="muscle-row"><span>${muscle}<small>${label}</small></span><div><i style="width:${pct}%"></i></div><b>${Number.isInteger(value) ? value : value.toFixed(1)}</b></div>`;
    }).join('');
  }

  function renderSettings(db) {
    return `<div class="page settings-page">
      <div class="page-title"><p>Ajustes</p><h1>Seu treino, suas regras</h1><span>Alterar o plano não apaga nenhuma sessão anterior.</span></div>
      <form class="settings-form" id="settings-form">
        <label><span>Nome</span><input name="name" value="${escapeAttr(db.profile.name)}" maxlength="30"></label>
        <label><span>Objetivo principal</span><select name="goal">
          <option value="hypertrophy" ${db.profile.goal === 'hypertrophy' ? 'selected' : ''}>Ganhar massa</option>
          <option value="strength" ${db.profile.goal === 'strength' ? 'selected' : ''}>Ganhar força</option>
          <option value="health" ${db.profile.goal === 'health' ? 'selected' : ''}>Saúde e consistência</option>
        </select></label>
        <label><span>Dias por ciclo</span><select name="days">
          ${[2, 3, 4, 5].map(value => `<option value="${value}" ${db.profile.days === value ? 'selected' : ''}>${value} dias</option>`).join('')}
        </select></label>
        <label><span>Tempo disponível</span><select name="sessionMinutes">
          <option value="40" ${db.profile.sessionMinutes === 40 ? 'selected' : ''}>Até 40 min</option>
          <option value="55" ${db.profile.sessionMinutes === 55 ? 'selected' : ''}>Até 55 min</option>
          <option value="70" ${db.profile.sessionMinutes === 70 ? 'selected' : ''}>Até 70 min</option>
        </select></label>
        <label><span>Experiência</span><select name="experience">
          <option value="beginner" ${db.profile.experience === 'beginner' ? 'selected' : ''}>Começando agora</option>
          <option value="intermediate" ${db.profile.experience === 'intermediate' ? 'selected' : ''}>Já treino com regularidade</option>
          <option value="advanced" ${db.profile.experience === 'advanced' ? 'selected' : ''}>Avançado</option>
        </select></label>
        <label class="toggle-row"><span><b>Vibração do timer</b><small>Avisa quando o descanso termina</small></span><input type="checkbox" name="vibration" ${db.preferences.vibration ? 'checked' : ''}></label>
        <button class="primary-action" type="submit">Salvar e recalcular plano</button>
      </form>

      <section class="settings-group">
        <div class="section-heading"><div><p>Seus dados</p><h2>Backup local</h2></div></div>
        <p>O app não envia seu histórico a nenhum servidor. Exporte uma cópia antes de trocar de celular.</p>
        <div class="settings-actions"><button type="button" data-action="export-data">Exportar backup</button><button type="button" data-action="import-data">Importar backup</button></div>
        <button class="install-button" type="button" data-action="install-app">Instalar este app no celular</button>
      </section>

      <section class="settings-group method-section" id="method">
        <div class="section-heading"><div><p>Como o app decide</p><h2>Método e fontes</h2></div><span>rev. 2026</span></div>
        <details open><summary>Progressão de carga</summary><p>Quando todas as séries chegam ao topo da faixa com pelo menos uma repetição na reserva, a próxima sessão sugere um pequeno aumento. Se a faixa mínima não é alcançada, sugere reduzir um passo.</p></details>
        <details><summary>Volume e frequência</summary><p>O plano distribui os grupos principais ao longo do ciclo. Para hipertrofia, usa uma faixa prática próxima de 8–14 séries diretas por grupo; o app mostra o volume sem tratá-lo como uma meta rígida.</p></details>
        <details><summary>Falha, RIR e descanso</summary><p>Falhar em toda série não é obrigatório. O registro de RIR ajuda a calibrar esforço. Exercícios compostos recebem mais descanso; isoladores, menos — sempre com liberdade para adicionar tempo.</p></details>
        <div class="source-list">
          <a href="https://pubmed.ncbi.nlm.nih.gov/41843416/" target="_blank" rel="noreferrer">ACSM Position Stand 2026 <span>↗</span></a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/41343037/" target="_blank" rel="noreferrer">Volume e frequência — meta-regressão 2026 <span>↗</span></a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/38970765/" target="_blank" rel="noreferrer">Proximidade da falha e RIR <span>↗</span></a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/39205815/" target="_blank" rel="noreferrer">Intervalo entre séries <span>↗</span></a>
          <a href="https://www.who.int/publications/i/item/9789240015128" target="_blank" rel="noreferrer">Diretrizes de atividade física da OMS <span>↗</span></a>
        </div>
        <p class="health-note">Este app apoia o registro de treino e não substitui avaliação de profissional de saúde ou educação física. Dor aguda, tontura ou mal-estar são sinais para interromper a sessão.</p>
      </section>
      <footer class="app-footer">Terceiro v2.1 · histórico local · atualizado em 2026</footer>
    </div>`;
  }

  function handleClick(event) {
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) {
      state.view = viewButton.dataset.view;
      render();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      if (viewButton.dataset.scroll) setTimeout(() => $(`#${viewButton.dataset.scroll}`)?.scrollIntoView(), 0);
      return;
    }

    const readiness = event.target.closest('[data-readiness]');
    if (readiness) {
      state.readiness = Number(readiness.dataset.readiness);
      $$('.readiness-scale button').forEach(button => button.classList.toggle('is-selected', button === readiness));
      return;
    }

    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    if (action === 'go-home') { state.view = 'today'; render(); window.scrollTo(0, 0); }
    if (action === 'start-workout') startWorkout();
    if (action === 'toggle-exercise') toggleExercise(actionButton.dataset.exercise);
    if (action === 'toggle-set') toggleSet(actionButton.dataset.exercise, Number(actionButton.dataset.set));
    if (action === 'add-set') addSet(actionButton.dataset.exercise);
    if (action === 'finish-workout') confirmFinish();
    if (action === 'confirm-discard') confirmDiscard();
    if (action === 'discard-workout') discardWorkout();
    if (action === 'close-dialog') closeDialog();
    if (action === 'exercise-info') openExerciseInfo(actionButton.dataset.exercise);
    if (action === 'swap-exercise') openSwap(actionButton.dataset.exercise);
    if (action === 'choose-swap') chooseSwap(actionButton.dataset.exercise, actionButton.dataset.replacement);
    if (action === 'add-rest') addRest(30);
    if (action === 'skip-rest') stopRest();
    if (action === 'export-data') exportData();
    if (action === 'import-data') $('#import-file').click();
    if (action === 'install-app') installApp();
  }

  function handleInput(event) {
    const field = event.target.closest('[data-set-field]');
    if (!field) return;
    const db = loadDB();
    const record = db.active?.exercises.find(ex => ex.exerciseId === field.dataset.exercise);
    const set = record?.sets[Number(field.dataset.set)];
    if (!set || set.done) return;
    const key = field.dataset.setField;
    set[key] = key === 'reps' ? field.value : Number(field.value);
    saveDB(db);
  }

  function handleSubmit(event) {
    if (event.target.id !== 'settings-form') return;
    event.preventDefault();
    const form = new FormData(event.target);
    const db = loadDB();
    const oldDays = db.profile.days;
    db.profile = {
      name: String(form.get('name') || 'Terceiro').trim() || 'Terceiro',
      goal: String(form.get('goal') || 'hypertrophy'),
      days: clamp(Number(form.get('days')) || 4, 2, 5),
      sessionMinutes: Number(form.get('sessionMinutes')) || 55,
      experience: String(form.get('experience') || 'intermediate')
    };
    db.preferences.vibration = form.get('vibration') === 'on';
    if (oldDays !== db.profile.days) db.rotationIndex = 0;
    saveDB(db);
    render();
    toast('Plano recalculado. Seu histórico foi preservado.');
  }

  function toggleExercise(exerciseId) {
    state.openExercise = state.openExercise === exerciseId ? null : exerciseId;
    render();
    if (state.openExercise) setTimeout(() => $(`#exercise-${CSS.escape(exerciseId)}`)?.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' }), 0);
  }

  function toggleSet(exerciseId, setIndex) {
    const db = loadDB();
    const record = db.active?.exercises.find(ex => ex.exerciseId === exerciseId);
    const set = record?.sets[setIndex];
    if (!set) return;
    if (!set.done && (!Number(set.kg) || !Number(set.reps))) {
      toast('Informe carga e repetições antes de concluir a série.');
      const input = $(`[data-set-field="${!Number(set.kg) ? 'kg' : 'reps'}"][data-exercise="${CSS.escape(exerciseId)}"][data-set="${setIndex}"]`);
      input?.focus();
      return;
    }
    set.done = !set.done;
    saveDB(db);
    if (set.done) startRest(record.rest, EXERCISES[exerciseId]?.name || 'Próxima série');
    state.openExercise = exerciseId;
    render();
  }

  function addSet(exerciseId) {
    const db = loadDB();
    const record = db.active?.exercises.find(ex => ex.exerciseId === exerciseId);
    if (!record) return;
    const last = record.sets[record.sets.length - 1] || { kg: EXERCISES[exerciseId]?.defaultKg || 0, rir: 2 };
    record.sets.push({ kg: last.kg, reps: '', rir: 2, done: false, extra: true });
    saveDB(db);
    state.openExercise = exerciseId;
    render();
  }

  function startRest(seconds, exerciseName) {
    stopRest(false);
    state.rest = { remaining: seconds, total: seconds, label: exerciseName };
    updateRestDock();
    state.restInterval = setInterval(() => {
      if (!state.rest) return;
      state.rest.remaining -= 1;
      updateRestDock();
      if (state.rest.remaining <= 0) {
        const db = loadDB();
        if (db.preferences.vibration && navigator.vibrate) navigator.vibrate([180, 80, 180]);
        stopRest();
        toast('Descanso concluído. Próxima série.');
      }
    }, 1000);
  }

  function updateRestDock() {
    const dock = $('#rest-dock');
    if (!state.rest) { dock.hidden = true; return; }
    dock.hidden = false;
    $('#rest-time').textContent = formatRest(state.rest.remaining);
    $('#rest-next').textContent = state.rest.label;
    const deg = Math.max(0, state.rest.remaining / state.rest.total * 360);
    $('.rest-disc', dock).style.setProperty('--rest-angle', `${deg}deg`);
  }

  function addRest(seconds) {
    if (!state.rest) return;
    state.rest.remaining += seconds;
    state.rest.total += seconds;
    updateRestDock();
  }

  function stopRest(hide = true) {
    clearInterval(state.restInterval);
    state.restInterval = null;
    if (hide) state.rest = null;
    updateRestDock();
  }

  function confirmFinish() {
    const db = loadDB();
    const active = db.active;
    if (!active) return;
    const done = active.exercises.reduce((sum, ex) => sum + ex.sets.filter(set => set.done).length, 0);
    const total = active.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    openDialog(`<div class="dialog-icon">✓</div><h2>Salvar esta sessão?</h2><p>${done} de ${total} séries foram concluídas. ${done < total ? 'Ela ficará marcada como parcial.' : 'Treino completo.'}</p><div class="dialog-actions"><button type="button" data-action="close-dialog">Continuar treinando</button><button type="button" class="primary-action" data-action="close-and-finish">Salvar sessão</button></div>`, dialog => {
      $('[data-action="close-and-finish"]', dialog)?.addEventListener('click', () => { closeDialog(); finishWorkout(); }, { once: true });
    });
  }

  function confirmDiscard() {
    openDialog(`<div class="dialog-icon warning">!</div><h2>Descartar a sessão atual?</h2><p>As séries desta sessão serão apagadas. Seus treinos já salvos não serão alterados.</p><div class="dialog-actions"><button type="button" data-action="close-dialog">Cancelar</button><button type="button" class="danger-button" data-action="discard-workout">Descartar sessão</button></div>`);
  }

  function openExerciseInfo(exerciseId) {
    const ex = EXERCISES[exerciseId];
    if (!ex) return;
    const secondary = Array.isArray(ex.secondary) ? ex.secondary : ex.secondary ? [ex.secondary] : [];
    openDialog(`<p class="dialog-kicker">Mapa corporal</p><h2>${escapeHtml(ex.name)}</h2>
      <div class="anatomy-detail">${renderAnatomyMap(ex)}<div class="anatomy-legend"><span><i class="primary"></i><b>Principal</b>${escapeHtml(ex.muscle)}</span>${secondary.length ? `<span><i class="secondary"></i><b>Auxiliares</b>${escapeHtml(secondary.join(' + '))}</span>` : ''}</div></div>
      <p class="movement-label">${escapeHtml(ex.equipment)} · ${escapeHtml(ex.pattern)}</p>
      <h3 class="cue-title">Pontos de execução</h3><ul class="cue-list">${ex.cues.map(cue => `<li>${escapeHtml(cue)}</li>`).join('')}</ul>
      <div class="dialog-actions"><button type="button" data-action="close-dialog">Voltar</button><button type="button" class="primary-action" data-action="swap-exercise" data-exercise="${escapeAttr(exerciseId)}">Trocar exercício</button></div>`);
  }

  function openSwap(exerciseId) {
    const current = EXERCISES[exerciseId];
    if (!current) return;
    const db = loadDB();
    const used = new Set(db.active?.exercises.map(ex => ex.exerciseId) || []);
    const candidateIds = ALTERNATIVES[exerciseId] || [];
    const availableIds = candidateIds.filter(id => EXERCISES[id] && !used.has(id));
    const blocked = candidateIds.filter(id => used.has(id)).length;
    const list = availableIds.map(id => {
      const ex = EXERCISES[id];
      return `<button type="button" class="swap-option" data-action="choose-swap" data-exercise="${escapeAttr(exerciseId)}" data-replacement="${escapeAttr(id)}"><span>${initials(ex.name)}</span><div><strong>${escapeHtml(ex.name)}</strong><small>${escapeHtml(ex.equipment)} · ${escapeHtml(ex.pattern)}</small></div><b>trocar</b></button>`;
    }).join('');
    const empty = blocked
      ? 'As alternativas equivalentes já aparecem nesta sessão. Mantive o treino sem duplicidade.'
      : 'Ainda não há outra alternativa equivalente cadastrada para este movimento.';
    openDialog(`<p class="dialog-kicker">Mesma função, sem repetir</p><h2>Trocar ${escapeHtml(current.name)}</h2><p>Mostramos apenas exercícios de <b>${escapeHtml(current.pattern)}</b> que ainda não estão nesta sessão.</p><div class="swap-list">${list || `<p class="swap-empty">${empty}</p>`}</div><div class="dialog-actions"><button type="button" data-action="close-dialog">Cancelar</button></div>`);
  }

  function chooseSwap(currentId, replacementId) {
    const db = loadDB();
    const active = db.active;
    const record = active?.exercises.find(ex => ex.exerciseId === currentId);
    const replacement = EXERCISES[replacementId];
    if (!record || !replacement || record.sets.some(set => set.done)) {
      toast('Só é possível trocar antes de concluir séries deste exercício.');
      closeDialog();
      return;
    }
    const duplicate = active.exercises.some(ex => ex !== record && ex.exerciseId === replacementId);
    if (duplicate) {
      toast('Esse exercício já está na sessão. Escolha outra alternativa.');
      closeDialog();
      return;
    }
    const p = prescription(replacementId, record.targetSets, db.profile);
    const suggestion = suggestLoad(replacementId, p.low, p.high, db);
    record.exerciseId = replacementId;
    record.targetLow = p.low;
    record.targetHigh = p.high;
    record.rest = p.rest;
    record.recommendation = suggestion.reason;
    record.sets = Array.from({ length: p.sets }, () => ({ kg: suggestion.kg, reps: '', rir: 2, done: false }));
    saveDB(db);
    state.openExercise = replacementId;
    closeDialog();
    render();
    toast(`Exercício trocado por ${replacement.name}.`);
  }

  function openDialog(html, afterOpen) {
    const dialog = $('#app-dialog');
    $('#dialog-content').innerHTML = html;
    if (!dialog.open) dialog.showModal();
    afterOpen?.(dialog);
  }

  function closeDialog() {
    const dialog = $('#app-dialog');
    if (dialog.open) dialog.close();
  }

  function exportData() {
    const db = loadDB();
    const blob = new Blob([JSON.stringify({ app: 'Terceiro', exportedAt: new Date().toISOString(), data: db }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `terceiro-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast('Backup exportado. Guarde o arquivo em local seguro.');
  }

  async function importData(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const incoming = parsed.data || parsed;
      if (!incoming || !Array.isArray(incoming.historico)) throw new Error('Formato inválido');
      if (!confirm('Importar este backup substituirá os dados atuais deste aparelho. Continuar?')) return;
      saveDB(normalizeDB(incoming));
      state.view = 'today';
      render();
      toast('Backup importado com sucesso.');
    } catch (error) {
      console.error(error);
      toast('Não foi possível importar: arquivo inválido.');
    } finally {
      $('#import-file').value = '';
    }
  }

  async function installApp() {
    if (state.installPrompt) {
      state.installPrompt.prompt();
      await state.installPrompt.userChoice;
      state.installPrompt = null;
      return;
    }
    openDialog('<div class="dialog-icon">+</div><h2>Instalar no celular</h2><p>No iPhone, toque em Compartilhar e depois em “Adicionar à Tela de Início”. No Android, abra o menu do navegador e escolha “Instalar app”.</p><div class="dialog-actions"><button type="button" class="primary-action" data-action="close-dialog">Entendi</button></div>');
  }

  function sessionsInDays(db, days) {
    return db.historico.filter(entry => Date.now() - new Date(entry.ts || entry.endedAt).getTime() < days * 86400000).length;
  }

  function entryVolume(entry) {
    if (Number(entry.volume) > 0) return Number(entry.volume);
    return historyExercises(entry).reduce((sum, ex) => sum + ex.sets.reduce((setSum, set) => setSum + (Number(set.kg) || 0) * (Number(set.reps) || 0), 0), 0);
  }

  function estimatedDuration(definition, profile) {
    const sets = definition.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const averageRest = definition.exercises.reduce((sum, ex) => sum + ex.rest * ex.sets, 0) / Math.max(1, sets);
    return Math.min(profile.sessionMinutes, Math.max(25, Math.round((sets * (45 + averageRest) + definition.exercises.length * 60) / 60 / 5) * 5));
  }

  function estimated1RM(kg, reps) {
    const weight = Number(kg) || 0;
    const repetitions = clamp(Number(reps) || 0, 0, 30);
    return weight && repetitions ? weight * (1 + repetitions / 30) : 0;
  }

  function median(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function roundLoad(value, step) {
    return Math.round(value / step) * step;
  }

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function formatKg(value) { return Number(value || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 }); }
  function compactNumber(value) { return Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(value) || 0); }
  function formatRest(seconds) { const value = Number(seconds) || 0; return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`; }
  function formatElapsed(milliseconds) { return formatRest(Math.max(0, Math.floor(milliseconds / 1000))); }
  function goalLabel(goal) { return ({ hypertrophy: 'Ganho de massa', strength: 'Força', health: 'Saúde e consistência' })[goal] || 'Ganho de massa'; }
  function experienceLabel(value) { return ({ beginner: 'iniciante', intermediate: 'intermediário', advanced: 'avançado' })[value] || 'intermediário'; }
  function initials(value) { return String(value).split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase(); }
  function titleCase(value) { return String(value).charAt(0).toUpperCase() + String(value).slice(1); }
  function prefersReducedMotion() { return matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]); }
  function escapeAttr(value) { return escapeHtml(value); }

  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('is-visible');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => element.classList.remove('is-visible'), 3200);
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('input', handleInput);
  document.addEventListener('change', handleInput);
  document.addEventListener('submit', handleSubmit);
  $('#import-file').addEventListener('change', event => importData(event.target.files?.[0]));
  $('#app-dialog').addEventListener('click', event => { if (event.target === $('#app-dialog')) closeDialog(); });
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); state.installPrompt = event; });

  setInterval(() => {
    const db = loadDB();
    if (!db.active || state.view !== 'today') return;
    const timer = $('#elapsed-time');
    if (timer) timer.textContent = formatElapsed(new Date() - new Date(db.active.startedAt));
  }, 1000);

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Service worker', error)));
  }

  render();
})();
