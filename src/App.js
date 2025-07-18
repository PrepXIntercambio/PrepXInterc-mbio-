import React, { useState, useEffect, createContext, useContext, useCallback, useRef, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {
    Search, Briefcase, Plane, Globe, ChevronLeft, ChevronRight, Menu, Lightbulb, X,
    MessageCircle, Bookmark, CalendarClock, PlusCircle, ListChecks, ArrowLeft, Handshake,
    FileSignature, Newspaper, Stamp, ShieldCheck, Ticket, Siren, FolderKanban, ArrowUp,
    PartyPopper, Lock, Clock, Copy, Save, Home, Star, CheckCircle, Mail, Info, Building,
    Users, Headset, Mic, StopCircle, Volume2, Palette, UploadCloud, Link2, DollarSign,
    Map, BookOpen, Glasses, Gamepad2, Store, LogOut, Eye, EyeOff, Backpack, ChevronUp,
    ChevronDown, BookUser as Passport, Languages, BedDouble, Milestone, Wallet, ShoppingBag,
    MapPin, Check, GraduationCap, Video, Image as ImageIcon, ThumbsUp, AlertTriangle,
    UserCheck, Building2, Camera, Music, BrainCircuit, Puzzle, Play, Pause, RefreshCw,
    Target, PenSquare, FolderOpen, Coins, FolderPlus, Compass, Award, Sparkles, Instagram, Linkedin,
    ArrowRight, Bot, Folder, ArrowDown, Hand, MessageSquarePlus, AlertCircle, Calculator, Send, Wifi, Utensils, Route, HeartPulse, Bell, User, Building as Agency, ExternalLink, Moon, Sun, Download, Trash2, Edit, CheckSquare, Square, Mail as MailIcon, Plus, Minus, Tv2, GripVertical, FileDown, Cloud, SunDim, HelpCircle
} from 'lucide-react';

// --- Firebase Mock Initialization ---
let app, auth, db, provider;
try {
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    provider = new GoogleAuthProvider();
} catch (error) {
    console.error("Firebase initialization failed. Using mock setup.", error);
}

// --- Knowledge Base for Jei AI ---
const KNOWLEDGE_BASE = `
# O Manual de Operações de Intercâmbio Global 2025: Um Guia Estratégico para o Mercado Brasileiro

## Parte I: O Funil da Jornada do Estudante: da Prospecção à Colocação
Esta seção inaugural estabelece a estrutura de processos internos para a agência, conectando metodologias de vendas e atendimento ao contexto específico e de alto impacto da gestão de programas de intercâmbio internacional. O objetivo é criar um padrão de excelência que alinhe as expectativas do estudante com a realidade, garantindo não apenas a conversão, mas a satisfação e o sucesso do intercambista.

### O Funil de Vendas de Intercâmbio: Uma Estrutura para a Conversão
#### O Protocolo de Pré-Atendimento do SDR: Qualificação e Análise de Perfil
A função do Sales Development Representative (SDR) no setor de intercâmbio transcende a simples qualificação de leads; ela representa o primeiro e mais crítico ponto de contato para o gerenciamento das expectativas do estudante. Este protocolo visa transformar o contato inicial de um script reativo para uma conversa diagnóstica, estabelecendo uma base de confiança e realismo desde o início.

##### Estrutura de Qualificação de Leads
A função primordial do SDR é realizar uma triagem criteriosa dos contatos que chegam à agência, garantindo que o tempo da equipe de consultores especialistas seja investido em prospects com real potencial de conversão. Para o mercado de intercâmbio, essa qualificação deve ser profunda e multifacetada, utilizando uma matriz de critérios específicos:
- **Capacidade Financeira:** A abordagem inicial deve ser sutil, mas eficaz, para aferir o orçamento do estudante. Perguntas como "Você já tem uma ideia do investimento que pretende fazer nesta experiência?" ou "Para te ajudar a encontrar as melhores opções, qual faixa de orçamento devemos considerar?" ajudam a direcionar a conversa sem serem invasivas.
- **Intenção do Programa:** É fundamental identificar o objetivo principal do intercâmbio. Trata-se de um curso de idiomas, um programa de estudo e trabalho, trabalho voluntário, ensino médio (high school) ou um curso universitário? Cada modalidade possui pré-requisitos, custos e processos de visto distintos.
- **Horizonte de Tempo:** A urgência e a flexibilidade do estudante são fatores determinantes. Um lead que pretende viajar em três meses tem necessidades diferentes de um que planeja para o próximo ano. Essa informação qualifica a prioridade do atendimento.
- **Perfil do Estudante:** Coletar dados demográficos essenciais como idade, formação acadêmica e experiência profissional é crucial. Um recém-formado buscando experiência de trabalho tem um perfil diferente de um adolescente em seu primeiro intercâmbio.

##### Análise de Perfil para Escolha do Destino
O SDR deve atuar como um analista de perfil preliminar, realizando uma primeira análise de "compatibilidade" entre o estudante e os possíveis destinos. O SDR pode utilizar um "Questionário de Persona" para guiar a conversa e entender as motivações intrínsecas do cliente. Este questionário ajuda a alinhar a "vibe" do estudante com as características dos destinos.
**Exemplo de Questionário de Persona para SDRs:**
1. **O que você mais busca nesta experiência no exterior?**
   (A) Acelerar minha carreira com experiência de trabalho internacional.
   (B) Viver uma imersão cultural profunda e aprender um novo idioma com calma.
   (C) Aventurar-me na natureza e ter um estilo de vida mais tranquilo e ao ar livre.
   (D) Estudar em uma instituição de prestígio e ter uma vida acadêmica intensa.
2. **Como você descreveria seu final de semana ideal?**
   (A) Em eventos de networking, feiras urbanas e jantares em restaurantes badalados.
   (B) Explorando museus, cafés históricos e livrarias.
   (C) Fazendo trilhas, visitando praias e parques nacionais.
   (D) Em bibliotecas, grupos de estudo e eventos no campus universitário.
Com base nas respostas, o SDR pode fazer uma pré-qualificação de destino. Um perfil predominantemente "A" pode se alinhar melhor com centros como Dubai ou Toronto, enquanto um perfil "C" pode ser mais compatível com a Nova Zelândia ou a Cidade do Cabo.

#### A Venda Consultiva: O Papel do Consultor Especialista
O papel do consultor é consolidar a transição de "agente de viagens" para "consultor estratégico de vida".
**Construindo o Pitch de Venda Consultivo:**
1. **Diagnosticar o Sonho Central:** Qual é a motivação mais profunda do estudante?
2. **Apresentar o Destino como a Solução Estratégica:** Apresentar o destino como o cenário ideal para a realização daquele objetivo.
3. **Utilizar o "Empilhamento de Argumentos":** Construir um caso lógico e convincente. Exemplo para a Irlanda: "Na Irlanda, você terá um ambiente de imersão total no inglês, com a permissão de trabalho de 20 horas semanais para ajudar a custear a experiência, e tudo isso em um país que serve como uma base incrível e de baixo custo para explorar toda a Europa."
4. **Abordar Objeções com Transparência:** Antecipar e abordar proativamente os desafios. Exemplo: "É importante que você saiba que encontrar acomodação em Dublin é um dos maiores desafios. O mercado é competitivo e os preços são altos. É por isso que nosso pacote inclui um suporte robusto de acomodação."

## Parte II: O Dossiê de Destinos Globais

### África do Sul
- **Cidades Principais:** Cidade do Cabo, Joanesburgo.
- **Perfil:** Excelente custo-benefício, combina educação de qualidade com diversidade cultural e natural. Moeda (Rand - ZAR) desvalorizada em relação ao Real. Brasileiros não necessitam de visto para estadias de até 90 dias. Atraente para trabalho voluntário.
- **Vistos (2025):**
  - **Até 90 dias:** Não precisa de visto. Necessário passaporte válido e Certificado Internacional de Vacinação contra febre amarela.
  - **Acima de 90 dias:** Necessário aplicar para um **Study Visa** antes da viagem no Brasil.
  - **Permissão de Trabalho:** O Study Visa permite trabalho part-time.
- **Custo de Vida (Cidade do Cabo):** Total mensal estimado de R 9.064 a R 14.964 (ZAR), sem mensalidade do curso.
- **Acomodação:** Opções são residências estudantis, homestay e quartos compartilhados. Mercado competitivo.
- **Segurança:** Percepção similar à do Brasil, exige atenção constante. Evitar andar sozinho à noite e exibir objetos de valor.

### Alemanha
- **Cidades Principais:** Berlim, Hamburgo, Munique, Frankfurt.
- **Perfil:** Foco em carreira e educação superior. Universidades públicas com taxas baixas ou inexistentes. Permissão de trabalho e possibilidade de ficar 18 meses após a graduação para buscar emprego.
- **Vistos (2025):**
  - **Até 90 dias:** Não precisa de visto.
  - **Acima de 90 dias:** Entrar sem visto e solicitar a **Autorização de Residência (Aufenthaltserlaubnis)** em até 90 dias na Alemanha.
  - **Documentação Essencial:** Carta de admissão, **conta bloqueada (*Sperrkonto*)** com €11.208 por ano, e seguro saúde obrigatório.
  - **Permissão de Trabalho:** Estudantes podem trabalhar até 140 dias completos ou 280 meios-dias por ano.
- **Custo de Vida (Berlim):** Total mensal estimado de €829 a €1.430.
- **Acomodação:** Mais comum é o apartamento compartilhado (WG - Wohngemeinschaft). Mercado muito competitivo, buscar com meses de antecedência.

### Austrália
- **Cidades Principais:** Sydney, Melbourne, Brisbane, Gold Coast, Adelaide, Perth.
- **Perfil:** Alta qualidade de vida, sistema educacional de excelência e permissão para trabalhar.
- **Vistos (2025):**
  - **Visto de Estudante (Subclass 500):** Aplicação online via ImmiAccount. Processo competitivo devido a limites de matrículas.
  - **Documentação Essencial:** Passaporte, **Confirmation of Enrolment (CoE)**, comprovação financeira, e seguro saúde obrigatório **(OSHC)**.
  - **Permissão de Trabalho:** Máximo de **48 horas por quinzena** durante o período letivo. Horas ilimitadas nas férias.
- **Custo de Vida (Sydney):** Total mensal estimado de A$2,380 a A$3,620.
- **Acomodação:** Mercado extremamente competitivo e caro.

### Argentina
- **Cidades Principais:** Buenos Aires, Córdoba.
- **Perfil:** Acessível e culturalmente rico. Universidades públicas gratuitas e de prestígio (UBA).
- **Vistos (2025):**
  - **Até 90 dias:** Não precisa de visto, pode entrar com RG.
  - **Acima de 90 dias:** **ALERTA:** Governo intensificou a fiscalização. A recomendação oficial é **solicitar o visto de estudante no Brasil, antes da viagem**.
  - **Permissão de Trabalho:** Visto de estudante **não autoriza** trabalho remunerado.
- **Custo de Vida (Buenos Aires):** Total mensal estimado de US$548 a US$1,000. Instabilidade econômica e alta inflação.
- **Saúde:** Sistema público gratuito, mas com filas. Muitos contratam plano privado (*prepaga*).

### Canadá
- **Cidades Principais:** Toronto, Vancouver, Montreal, Calgary.
- **Perfil:** Alta qualidade de vida, multicultural, cidades seguras. Vias de imigração pós-estudo.
- **Vistos (2025):**
  - **Permissão de Estudos (Study Permit):** Obrigatório para cursos acima de 6 meses. Aplicação online no site do IRCC.
  - **Permissão de Trabalho:** Até 20 horas por semana durante as aulas.
  - **Mudança Crítica 2025:** Permissão de trabalho para cônjuges será restrita apenas a parceiros de estudantes de **mestrado e doutorado**.
- **Custo de Vida (Toronto):** Total mensal estimado de CAD$1,706 a CAD$2,656. Crise de habitação em Toronto e Vancouver.
- **Saúde:** Sistema provincial, varia por província. Em Ontário (Toronto), estudantes contratam plano privado (UHIP). Em British Columbia (Vancouver), inscrevem-se no plano provincial (MSP) pagando taxa.

### Estados Unidos
- **Cidades Principais:** Nova York, Los Angeles, Boston, Miami.
- **Perfil:** Destino icônico, universidades renomadas. Alto custo e regras de visto restritivas.
- **Vistos (2025):**
  - **Visto de Estudante (F-1):** Processo complexo com entrevista presencial.
  - **Permissão de Trabalho:** **Extremamente restritiva**. Trabalho fora do campus geralmente proibido no primeiro ano. O foco não deve ser contar com trabalho para se manter.
- **Custo de Vida (Nova York):** Total mensal estimado de US$2,632 a US$4,232.
- **Saúde:** Sistema privado e **extremamente caro**. Seguro saúde abrangente é exigido pelas escolas.

### Emirados Árabes Unidos
- **Cidade Principal:** Dubai.
- **Perfil:** Moderno, seguro, multicultural. Ambiente de negócios dinâmico.
- **Vistos (2025):**
  - **Visto de Estudante:** Para cursos acima de 90 dias, a própria escola facilita o processo.
  - **Permissão de Trabalho:** Permitido para estudantes universitários em regime de meio período.
`;

// --- i18n (Internationalization & Translations) ---
const translations = {
    pt: {
        // Geral
        hey: "Hey,",
        preparatorio: "Preparatório",
        planejamento: "Planejamento",
        days: "d", hours: "h", minutes: "m", seconds: "s",
        in_construction: "Em construção...",
        terms_and_conditions: "Termos de Uso e Privacidade",
        terms_for_students: "Termos para Intercambistas",
        terms_for_agencies: "Termos para Agências",
        copyright: `© ${new Date().getFullYear()} OnliPrep. Todos os direitos reservados.`,
        countdown_title: "Contagem regressiva para o seu intercâmbio!",
        back: "Voltar",
        avancar: "Avançar",
        ok: "OK",
        email: "E-mail",
        sua_senha: "Sua senha",
        entrar: "Entrar",
        fazer_cadastro: "Fazer cadastro",
        salvar: "Salvar",
        praticar_mais: "Praticar mais",
        permitir: "Permitir",
        agora_nao: "Agora não",
        notificacoes_titulo: "Fique por dentro!",
        notificacoes_texto: "Gostaria de receber dicas e lembretes importantes sobre sua jornada?",
        nao_mostrar_novamente: "Não mostrar novamente",
        flight_info: "Informações do seu voo, atualizações de status e check-in rápido.",

        // Auth & Landing Page
        auth_login: "Login",
        auth_register: "Cadastro",
        auth_slogan: "Sua jornada de intercâmbio inteligente",
        auth_iam_student: "Sou Intercambista",
        auth_iam_agency: "Sou Agência",
        login_with_google: "Continuar com o Google",
        landing_main_title: "Chegou seu aliado na preparação e planejamento do seu intercâmbio.",
        landing_main_subtitle: "Aliado é quem soma. O OnliPrep não substitui seu consultor, ele caminha junto — e entra em cena quando você mais precisar, na palma da sua mão.",
        value_prop_1_title: "Jornada Organizada",
        value_prop_1_text: "Uma linha do tempo inteligente que se adapta ao seu perfil e destino, garantindo que você não perca nenhum prazo e saiba exatamente o próximo passo.",
        value_prop_2_title: "Inteligência & Experiência",
        value_prop_2_text: "Nossa IA, turbinada pelo Gemini, cruza dados de fontes oficiais com a experiência prática de quem já viveu tudo isso, entregando a informação que você precisa.",
        value_prop_3_title: "Seu Suporte, Sempre ON",
        value_prop_3_text: "Somos a peça que faltava na engrenagem. Quando sua agência ou consultor estiverem ocupados, o OnliPrep está aqui, pronto para te ajudar.",
        partners_title: "Parceiros de jornada",

        // Registration Screen
        register_title: "Cadastro rápido",
        full_name: "Nome completo",
        age: "Idade",
        password: "Crie sua senha",
        confirm_password: "Confirme sua senha",
        password_helper: "Mínimo 8 caracteres, com maiúscula e números.",
        captcha_label: "Verificação: não sou um robô",
        terms_agree: "Eu li e concordo com os",
        terms_marketing: "Aceito receber novidades e publicidade.",
        or_separator: "OU",

        // Onboarding Funnel
        onboarding_intro_title: "Vamos nos conhecer melhor?",
        onboarding_intro_text: "Para personalizar sua jornada, precisamos de algumas informações. Prometemos que será rápido!",
        gender_title: "Qual seu gênero?",
        gender_male: "Masculino",
        gender_female: "Feminino",
        gender_other: "Outro",
        gender_other_placeholder: "Prefiro especificar",
        age_title: "Qual sua idade?",
        first_exchange_title: "Será seu primeiro intercâmbio?",
        yes: "Sim",
        no: "Não",
        previous_experience_title: "Conte-nos sobre sua experiência anterior",
        previous_destination_placeholder: "Para onde você foi?",
        previous_date_placeholder: "Quando foi?",
        dream_destination_title: "Qual é o destino dos seus sonhos?",
        status_title: "Seu status hoje é:",
        status_researching: "Ainda pesquisando...",
        status_closed: "Fechei! E agora?",
        status_packing: "De malas prontas!",
        almost_there_title: "Quase lá!",
        departure_date_label: "Qual sua previsão de embarque?",
        start_journey_button: "Começar minha jornada",
        sending_data: "Enviando seus dados...",
        data_sent_success: "Sucesso! Bem-vindo(a)!",
        data_sent_error: "Ocorreu um erro. Tente novamente.",
        creating_your_dashboard: "Criando seu dashboard...",

        // Dashboard & Tools
        home: "Início",
        home_info: "Sua página inicial com acesso rápido a tudo.",
        journey: "Jornada",
        journey_info: "Um guia passo a passo para te levar até o seu sonho, desde a decisão até a sua formatura no exterior.",
        preparatorio_title: "Preparatório",
        preparatorio_info: "Aprenda e se divirta enquanto se prepara. Ferramentas, jogos e dicas para você chegar voando no destino.",
        bate_volta: "Bate Volta",
        bate_volta_info: "Acesso rápido a informações essenciais do seu destino. Tudo que você precisa na palma da sua mão.",
        premium: "Premium",
        premium_info: "Desbloqueie funcionalidades exclusivas, descontos e suporte prioritário para uma jornada ainda mais completa.",
        welcome_title_dynamic: "Estávamos te esperando, {name}!",
        welcome_subtitle: "O menu mapa te levará pra onde você quiser. Explore!",
        welcome_button: "Explorar Dashboard",
        folder: "Pasta",
        folder_info: "Acesse todos os seus documentos e dicas salvas em um só lugar.",
        currency: "Câmbio",
        currency_info: "Converta moedas e veja as cotações mais recentes para o seu planejamento.",
        calculator: "Calc",
        calculator_info: "Calcule os custos do seu intercâmbio para um planejamento financeiro sem surpresas.",
        timezone: "Fuso",
        timezone_info: "Veja a hora exata no seu destino e nunca mais se confunda com o fuso horário.",
        agenda: "Agenda",
        agenda_info: "Organize suas datas e tarefas importantes para não perder nenhum prazo.",
        
        // Modal Titles
        folder_modal_title: "Meus Documentos",
        currency_modal_title: "Conversor de Moedas",
        calculator_modal_title: "Calculadora de Investimento",
        timezone_modal_title: "Fuso Horário",
        agenda_modal_title: "Minha Agenda",
        flight_info_modal_title: "Informações do Voo",
        teacher_ana_modal_title: "Teacher Ana - Prática de Inglês",
        personalized_checklist_title: "✨ Checklist Personalizado",

        // Folder Modal
        folder_search_placeholder: "Procurar em pastas...",
        folder_instruction_title: "Organize suas dicas!",
        folder_instruction_text: "Arraste e solte para reordenar. Suas alterações são salvas automaticamente. Use o botão de download para gerar um PDF!",
        new_folder: "Nova Pasta",
        new_document: "Novo Documento",
        create_folder_title: "Criar Nova Pasta",
        folder_name_placeholder: "Nome da pasta",
        create: "Criar",
        save_to_folder_title: "Salvar em...",
        select_folder: "Selecione uma pasta",

        // Agenda Modal
        edit_task: "Editar Tarefa",
        update_task: "Atualizar Tarefa",
        
        // Jei AI Chat
        jei_prompt_placeholder: "Tire uma dúvida rápida...",
        jei_search_button: "Perguntar ao Jei",
        jei_thinking: "Jei está pensando...",
        jei_response_title: "Resposta do Jei",

        // Teacher Ana
        teacher_ana_prompt: "✨ Gerar nova frase para praticar",
        teacher_ana_generating: "Gerando frase...",

        // Personalized Checklist
        checklist_prompt: "Seu intercâmbio está cada vez mais perto! Gostaria de um checklist personalizado para te ajudar a organizar os próximos passos?",
        checklist_button: "✨ Sim, criar meu checklist!",
        checklist_generating: "Criando seu checklist personalizado...",

        // Premium Section
        premium_unlock_title: "Desbloqueie o Premium",
        premium_unlock_text: "Assista a um vídeo rápido para ter um gostinho do Premium por 20 minutos.",
        premium_unlock_button: "Desbloquear Acesso",
        premium_unlocked_text: "Acesso Premium temporário ativado!",
        premium_timer_text: "Tempo restante:",
        premium_subscribe_now: "Assinar Agora",
        premium_search_destination: "Pesquise um destino para ver o conteúdo",
        premium_accommodation: "Acomodação",
        premium_work: "Trabalho",
        premium_culture: "Imersão Cultural",
        premium_first_week: "Primeira Semana",
        premium_see_more: "Veja +",
        premium_courses: "Cursos",
        premium_pre_departure_meeting: "Reunião Pré-Embarque",
        premium_vouchers: "Vouchers de Desconto",
        premium_rate_agency: "Avalie sua Agência",
        premium_rate_consultant: "Como foi sua experiência com seu consultor?",
        premium_your_feedback: "Seu feedback",
        premium_send_feedback: "Enviar Avaliação",
        premium_feedback_sent: "Avaliação enviada! Obrigado.",

        // Other
        tip_of_the_day: "Dica do Dia",
        tip_of_the_day_info: "Receba uma dica valiosa sobre seu destino todos os dias.",
        teacher_ana: "Teacher Ana",
        teacher_ana_info: "Sua professora particular de inglês para acelerar seu aprendizado.",
        help_info: "Precisa de ajuda urgente? Contate nosso suporte emergencial.",
        currency_source: "Fonte: Dados simulados (Banco Central do Brasil)",
        currency_last_updated: "Atualizado:",
        currency_partner_title: "Compre moeda com nosso parceiro!",
        currency_unlock_prompt: "Assista um vídeo para desbloquear",
        currency_unlocking: "Desbloqueando...",
        currency_coupon_code: "ONLIPREP2CAMBIO",
        investment_item_name: "Nome do Item",
        investment_item_value: "Valor",
        investment_add_item: "Adicionar Item",
        investment_total: "Total Estimado",
        timezone_your_location: "Sua Localização",
        timezone_destination: "Destino",
        agenda_departure_date: "Data de Embarque",
        agenda_add_task: "Adicionar nova tarefa",
        agenda_task_name: "Nome da tarefa",
        agenda_task_date: "Data",
        agenda_completed_tasks: "Tarefas Realizadas",
        flight_info_prompt: "Adicione os dados do seu voo para receber atualizações e facilitar o check-in.",
        flight_airline: "Companhia Aérea",
        flight_number: "Número do Voo",
        flight_checkin_button: "Check-in Online",
        calculator_planning_info: "Use esta calculadora para planejar seus gastos. Para uma estimativa de custos, use nossa pesquisa inteligente abaixo.",
        calculator_search_label: "✨ Qual o custo médio de...",
        calculator_search_placeholder: "Ex: Aluguel de 1 quarto em Dublin",
        calculator_search_button: "Pesquisar Custo",
        calculator_search_result_title: "Custo estimado para {item}",
        calculator_search_result_source: "Fonte: Gemini (dados simulados)",
    },
    en: {
        // For brevity, only essential EN keys are included
        hey: "Hey,",
        journey: "Journey",
        preparatorio_title: "Prep Course",
        bate_volta: "Day Trip",
        premium: "Premium",
        folder: "Folder",
        currency: "Currency",
        calculator: "Calc",
        timezone: "Timezone",
        teacher_ana: "Teacher Ana",
        agenda: "Agenda",
    }
};


// --- KNOWLEDGE BASE & MOCK DATA ---
const mockDatabase = {
    destinations: {
        "África do Sul": ["Cidade do Cabo", "Joanesburgo"], "Alemanha": ["Berlim", "Munique", "Hamburgo", "Frankfurt"], "Argentina": ["Buenos Aires", "Córdoba"], "Austrália": ["Sydney", "Melbourne", "Brisbane", "Gold Coast", "Adelaide", "Perth"], "Canadá": ["Toronto", "Vancouver", "Montreal", "Calgary"], "Emirados Árabes Unidos": ["Dubai"], "Espanha": ["Madri", "Barcelona"], "Estados Unidos": ["Nova Iorque", "Los Angeles", "Boston", "Miami"], "Inglaterra": ["Londres", "Manchester"], "Irlanda": ["Dublin", "Cork"], "Malta": ["St. Julian's"], "Nova Zelândia": ["Auckland"],
    },
    weather: {
        "Dublin, Irlanda": { temp: 14, icon: Cloud },
        "Toronto, Canadá": { temp: 22, icon: SunDim },
        "Sydney, Austrália": { temp: 18, icon: Sun },
        "Nova Iorque, Estados Unidos": {temp: 25, icon: Sun }
    },
    valueSlides: [
        { icon: Compass, titleKey: 'value_prop_1_title', textKey: 'value_prop_1_text' },
        { icon: BrainCircuit, titleKey: 'value_prop_2_title', textKey: 'value_prop_2_text' },
        { icon: Handshake, titleKey: 'value_prop_3_title', textKey: 'value_prop_3_text' },
    ],
    partners: ["WEGO Intercâmbios", "Itaú", "Wise", "TM"],
    tips: {
     "Irlanda": [
        "Sempre tenha um guarda-chuva à mão, o tempo em Dublin muda a cada 5 minutos!",
        "A melhor pint de Guinness está no Gravity Bar, no topo da Guinness Storehouse.",
        "Use o Leap Card para economizar no transporte público.",
        "Os penhascos de Moher são um passeio de um dia imperdível saindo de Dublin."
      ],
      "Canadá": [
        "Prepare-se para o frio! Um bom casaco de inverno é essencial.",
        "Tim Hortons é uma instituição canadense. Experimente um 'Double-Double'.",
        "A gorjeta (tip) é geralmente de 15-20% em restaurantes.",
        "Explore os parques nacionais, a natureza do Canadá é deslumbrante."
      ]
    },
    journeyTasks: [
        { step: 1, task: "Definir destino e tipo de curso", daysBefore: 240 },
        { step: 2, task: "Aplicar para o Passaporte", daysBefore: 180 },
        { step: 3, task: "Pesquisar e aplicar para o Visto", daysBefore: 120 },
        { step: 4, task: "Comprar passagens aéreas", daysBefore: 90 },
        { step: 5, task: "Contratar seguro viagem", daysBefore: 60 },
        { step: 6, task: "Agendar exame médico", daysBefore: 50 },
        { step: 7, task: "Confirmar acomodação inicial", daysBefore: 30 },
        { step: 8, task: "Fazer check-in online", daysBefore: 1 },
    ],
    premiumContent: {
        'accommodation': Array.from({ length: 8 }, (_, i) => ({ id: `acc-${i}`, title: `Guia de Acomodação #${i + 1}`, locked: i > 0 })),
        'work': Array.from({ length: 8 }, (_, i) => ({ id: `work-${i}`, title: `Dicas de Trabalho #${i + 1}`, locked: i > 0 })),
        'culture': Array.from({ length: 8 }, (_, i) => ({ id: `cult-${i}`, title: `Imersão Cultural #${i + 1}`, locked: true })),
        'first_week': Array.from({ length: 8 }, (_, i) => ({ id: `week-${i}`, title: `1ª Semana: Guia #${i + 1}`, locked: i > 0 })),
    }
};

// --- Contexts ---
const LanguageContext = createContext(null);
const useLanguage = () => useContext(LanguageContext);
const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('pt');
    const t = useCallback((key, replacements = {}) => {
        let translation = (translations[language]?.[key] || translations['pt']?.[key]) || key;
        for (const placeholder in replacements) {
            translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return translation;
    }, [language]);

    const value = { language, setLanguage, t };
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

const AppContext = createContext(null);
const useApp = () => useContext(AppContext);
const AppProvider = ({ children }) => {
    const [screen, setScreen] = useState('auth');  
    const [authFlowStep, setAuthFlowStep] = useState('registration');
    const [userData, setUserData] = useState(null);
    const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
    const [toast, setToast] = useState(null);
    const [savedItems, setSavedItems] = useState([]);
    const [agendaItems, setAgendaItems] = useState([]);
    const [showTips, setShowTips] = useState(true);

    const showToast = (message, icon = Info, duration = 5000, actions = []) => {
        setToast({ message, icon, id: Date.now(), actions });
    };

    const handleLogin = (user) => {
        setUserData({
            name: user.displayName || "Novo Usuário",
            email: user.email,
            photoURL: user.photoURL || `https://i.pravatar.cc/80?u=${user.uid}`,
            ...user
        });
        if (user.isNew) {
            setIsFirstTimeUser(true);  
            setAuthFlowStep('onboarding-funnel');
            setScreen('auth-flow');
        } else {
            setIsFirstTimeUser(false);
            setScreen('dashboard');
        }
    };
    
    const handleGoogleLogin = () => {
        const mockUser = {
            displayName: "Usuário Teste",
            email: "teste@google.com",
            photoURL: `https://i.pravatar.cc/80?u=google-test`,
            uid: '12345',
            isNew: true
        };
        handleLogin(mockUser);
    };
    
    const handleEmailLogin = (e) => {
        e.preventDefault();
        const mockUser = {
            name: "Usuário Antigo",
            email: e.target.elements.email.value,
            photoURL: `https://i.pravatar.cc/80?u=old-user`,
            uid: '67890',
            destinationCountry: 'Irlanda',
            destination: 'Dublin, Irlanda',
            departureDate: '2025-12-31',
            isNew: false
        };
        handleLogin(mockUser);
    }

    const completeOnboarding = (onboardingData) => {
        setUserData(prev => ({ ...prev, ...onboardingData }));
        setScreen('dashboard');
    };
    
    const logout = () => {
        setUserData(null);
        setScreen('auth');
        setAuthFlowStep('registration');
    };

    const goBack = () => {
        if (screen === 'dashboard') {
            setScreen('auth');
        } else if (screen.startsWith('terms-') || screen === 'auth-flow') {
            setScreen('auth');
        }
    }

    const saveItem = (item) => {
        setSavedItems(prev => [...prev, {id: Date.now(), ...item, isNew: true}]);
        showToast("Salvo na sua pasta!", CheckCircle, 3000);
    }
    
    const addAgendaItem = (item) => {
        setAgendaItems(prev => [...prev, {id: `user-${Date.now()}`, ...item, completed: false, completedAt: null, isJourneyTask: false}]);
    }

    const updateAgendaItem = (id, updatedData) => {
        setAgendaItems(prev => prev.map(item => item.id === id ? {...item, ...updatedData} : item));
    }

    const toggleAgendaItem = (id) => {
        setAgendaItems(prev => prev.map(item => item.id === id ? {...item, completed: !item.completed, completedAt: !item.completed ? new Date().toISOString() : null} : item));
    }
    
    useEffect(() => {
        if(userData?.departureDate) {
            const journeyRelatedTasks = mockDatabase.journeyTasks.map(task => {
                const taskDate = new Date(userData.departureDate + "T00:00:00");
                taskDate.setDate(taskDate.getDate() - task.daysBefore);
                return {
                    id: `journey-${task.step}`,
                    name: task.task,
                    date: taskDate.toISOString().split('T')[0],
                    completed: false,
                    completedAt: null,
                    isJourneyTask: true
                }
            });
            const departureTask = {
                id: 'journey-departure',
                name: "Dia do Embarque!",
                date: userData.departureDate,
                completed: false,
                completedAt: null,
                isJourneyTask: true,
                icon: Plane
            };
            const userTasks = agendaItems.filter(item => !item.isJourneyTask);
            setAgendaItems([...journeyRelatedTasks, departureTask, ...userTasks]);
        }
    }, [userData?.departureDate]);

    const value = {  
        screen, userData, isFirstTimeUser, toast, authFlowStep, savedItems, agendaItems, showTips,
        setScreen, setUserData, setIsFirstTimeUser, showToast, setToast, setAuthFlowStep,
        handleLogin, handleGoogleLogin, handleEmailLogin, completeOnboarding, logout, goBack, saveItem,
        addAgendaItem, toggleAgendaItem, setSavedItems, setShowTips, updateAgendaItem
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- UI Components ---
const LoadingScreen = ({ text }) => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#FBF9F6] animate-fade-in">
        <div className="w-64">
            <div className="relative w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] rounded-full animate-loading-bar-full"></div>
            </div>
            {text && <p className="text-center text-[#192A56] font-semibold mt-4 animate-pulse">{text}</p>}
        </div>
    </div>
);

const AppLogo = ({ className }) => (
    <div className={`text-center ${className}`}>
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter relative inline-flex items-center">
            <span className="text-[#192A56] font-light animate-text-gradient-bg">Onli</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2BE2] via-[#4169E1] to-[#4B0082] animate-text-gradient-fg">Prep</span>
        </h1>
    </div>
);

const ValuePropositionCard = ({ icon, title, text }) => {
    const Icon = icon;
    return (
        <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8A2BE2] to-[#4169E1] rounded-full flex items-center justify-center mx-auto mb-5 text-white shadow-lg">
                <Icon className="w-8 h-8"/>
            </div>
            <h3 className="text-xl font-bold text-[#192A56] mb-2">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{text}</p>
        </div>
    );
};

const Footer = () => {
    const { t } = useLanguage();
    const { setScreen } = useApp();
    return (
        <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-[#192A56] text-white p-8 mt-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tighter relative inline-flex items-center mb-4">
                        <span className="font-light text-white/80">Onli</span>
                        <span className="text-white">Prep</span>
                    </h1>
                    <p className="text-slate-300 text-sm">{t('auth_slogan')}</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-slate-100">{t('terms_and_conditions')}</h4>
                    <ul className="space-y-2">
                        <li><button onClick={() => setScreen('terms-student')} className="text-slate-200 hover:text-white transition-colors">{t('terms_for_students')}</button></li>
                        <li><button onClick={() => setScreen('terms-agency')} className="text-slate-200 hover:text-white transition-colors">{t('terms_for_agencies')}</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-slate-100">Social</h4>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white transition-colors"><Linkedin size={24} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white transition-colors"><Instagram size={24} /></a>
                    </div>
                </div>
            </div>
            <div className="text-center text-slate-400 text-xs mt-8 pt-8 border-t border-slate-600">
                {t('copyright')}
            </div>
        </footer>
    );
};

// --- Auth & Onboarding Screens ---
const AuthScreen = () => {
    const { t } = useLanguage();
    const { setScreen, setAuthFlowStep, handleEmailLogin, handleGoogleLogin } = useApp();

    const handleRegisterClick = () => {
        setAuthFlowStep('registration');
        setScreen('auth-flow');
    };
    
    const handleAgencyClick = () => {
        alert('Agency flow coming soon!');
    };

    return (
        <div className="w-full min-h-full flex flex-col bg-[#FBF9F6]">
            <div className="flex-grow overflow-y-auto px-4 pt-4">
                <header className="w-full max-w-lg mx-auto">
                    <form onSubmit={handleEmailLogin} className="flex items-center justify-center gap-2 mb-4">
                        <input name="email" type="email" placeholder={t('email')} className="w-full text-sm py-2 px-3 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 flex-1" required />
                        <input name="password" type="password" placeholder={t('sua_senha')} className="w-full text-sm py-2 px-3 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 flex-1" required />
                        <button type="submit" className="font-semibold text-[#192A56] bg-transparent rounded-lg transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5 text-sm py-2 px-4">{t('entrar')}</button>
                    </form>
                </header>
                
                <div className="flex flex-col items-center justify-center pt-8 md:pt-12 relative animate-fade-slide-up">
                    <div className="w-full max-w-4xl z-10 flex flex-col items-center text-center">
                        <AppLogo />
                        <p className="text-slate-600 mt-2 mb-8 text-lg">{t('auth_slogan')}</p>
                        <div className="w-full p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#8A2BE2]/10 via-[#4169E1]/10 to-[#4B0082]/10 mb-8">
                            <h2 className="text-[#192A56] text-2xl md:text-3xl font-bold text-center">{t('landing_main_title')}</h2>
                            <p className="text-slate-600 text-center mt-2">{t('landing_main_subtitle')}</p>
                        </div>
                        
                        <div className="text-center text-sm text-[#192A56] font-semibold mb-2">{t('fazer_cadastro')}:</div>
                        <div className="flex justify-center items-center gap-4 text-base font-semibold text-[#192A56] mb-4">
                            <button onClick={handleRegisterClick} className="hover:underline">{t('auth_iam_student')}</button>
                            <span className="text-slate-300">|</span>
                            <button onClick={handleAgencyClick} className="hover:underline">{t('auth_iam_agency')}</button>
                        </div>
                        <button type="button" onClick={handleGoogleLogin} className="inline-flex items-center justify-center font-semibold text-gray-700 bg-white py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-gray-300 hover:bg-gray-50 w-full max-w-xs mb-16">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.861 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                            {t('login_with_google')}
                        </button>

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                            {mockDatabase.valueSlides.map(slide => (
                                <ValuePropositionCard key={slide.titleKey} icon={slide.icon} title={t(slide.titleKey)} text={t(slide.textKey)} />
                            ))}
                        </div>
                        
                        <div className="w-full max-w-5xl">
                            <h3 className="text-2xl font-bold text-[#192A56] mb-6">{t('partners_title')}</h3>
                            <div className="bg-[#192A56] p-8 rounded-2xl relative">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                                    {mockDatabase.partners.map(partner => (
                                        <div key={partner} className="text-center text-2xl font-bold text-white/70 filter grayscale brightness-200">{partner}</div>
                                    ))}
                                </div>
                                <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/40"><ChevronLeft/></button>
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/40"><ChevronRight/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const RegistrationScreen = () => {
    const { t } = useLanguage();
    const { handleGoogleLogin, handleLogin, setScreen } = useApp();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
    const inputClasses = "w-full py-3 px-5 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
    const googleButtonClasses = "inline-flex items-center justify-center font-semibold text-gray-700 bg-white py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-gray-300 hover:bg-gray-50 w-full mb-4";
    const primaryButtonClasses = "font-semibold text-white bg-[#192A56] transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none h-14 w-14 group rounded-full shadow-lg";

    const isPasswordValid = useMemo(() => {
        if (!password) return true;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasMinLength = password.length >= 8;
        return hasUpperCase && hasNumber && hasMinLength;
    }, [password]);

    const doPasswordsMatch = useMemo(() => {
        return password === confirmPassword;
    }, [password, confirmPassword]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!isPasswordValid || !doPasswordsMatch || !isCaptchaChecked) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }
        const mockUser = {
            displayName: e.target.elements.fullName.value,
            email: "mock@email.com",
            photoURL: `https://i.pravatar.cc/80?u=${e.target.elements.fullName.value}`,
            uid: Math.random().toString(36).substring(7),
            isNew: true
        };
        handleLogin(mockUser);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="font-title-elegant text-center text-4xl text-[#192A56] mb-8">{t('register_title')}</h2>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full">
                <button type="button" onClick={handleGoogleLogin} className={googleButtonClasses}>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.861 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                    {t('login_with_google')}
                </button>
                <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-slate-300"></div>
                    <span className="flex-shrink mx-4 text-slate-500 text-xs">{t('or_separator')}</span>
                    <div className="flex-grow border-t border-slate-300"></div>
                </div>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <input name="fullName" type="text" placeholder={t('full_name')} className={inputClasses} required />
                    <input name="age" type="number" placeholder={t('age')} className={inputClasses} required />
                    <div className="relative">
                        <input type={isPasswordVisible ? "text" : "password"} placeholder={t('password')} className={`${inputClasses} ${!isPasswordValid && password ? '!border-amber-500' : ''}`} value={password} onChange={e => setPassword(e.target.value)} required />
                        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500">
                            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {!isPasswordValid && password && <p className="text-xs text-amber-600">{t('password_helper')}</p>}
                    <div className="relative">
                        <input type={isConfirmPasswordVisible ? "text" : "password"} placeholder={t('confirm_password')} className={`${inputClasses} ${!doPasswordsMatch && confirmPassword ? '!border-amber-500' : ''}`} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        <button type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500">
                            {isConfirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {!doPasswordsMatch && confirmPassword && <p className="text-xs text-amber-600">As senhas não conferem.</p>}
                    
                    <div className="pt-2 space-y-3">
                        <label onClick={() => setIsCaptchaChecked(!isCaptchaChecked)} className="flex items-center text-sm text-slate-600 cursor-pointer">
                            <div className="w-5 h-5 mr-2 border-2 border-slate-300 rounded flex items-center justify-center">
                                {isCaptchaChecked && <Check size={16} className="text-purple-600" />}
                            </div>
                            {t('captcha_label')}
                        </label>
                        <label className="flex items-center text-sm text-slate-600"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2" required/>{t('terms_agree')} <button type="button" onClick={() => setScreen('terms-student')} className="underline ml-1 hover:text-[#192A56]">{t('terms_for_students')}</button></label>
                        <label className="flex items-center text-sm text-slate-600"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"/>{t('terms_marketing')}</label>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className={primaryButtonClasses} disabled={!isPasswordValid || !doPasswordsMatch || !isCaptchaChecked}>
                            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const OnboardingFunnel = () => {
    const { t } = useLanguage();
    const { completeOnboarding } = useApp();
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        gender: '',
        otherGender: '',
        age: '',
        firstExchange: null,
        prevDestination: '',
        prevDate: '',
        dreamDestination: 'Irlanda',
        status: '',
        departureDate: '',
    });
    const inputClasses = "w-full py-3 px-5 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
    const primaryButtonClasses = "font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";
    
    const totalSteps = 6;

    const handleNext = useCallback(() => {
        setTimeout(() => setStep(prev => Math.min(prev + 1, totalSteps)), 200);
    }, []);

    const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelection = (field, value, autoNext = true) => {
        setFormData(prev => ({...prev, [field]: value}));
        if (autoNext) {
            handleNext();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        await new Promise(res => setTimeout(res, 2500));
        
        completeOnboarding({
            destination: `${mockDatabase.destinations[formData.dreamDestination][0]}, ${formData.dreamDestination}`,
            destinationCountry: formData.dreamDestination,
            departureDate: formData.departureDate,
            ...formData
        });
        
        setIsSubmitting(false);
    };

    const progress = (step / totalSteps) * 100;

    if (isSubmitting) {
        return <LoadingScreen text={t('creating_your_dashboard')} />;
    }

    const renderStep = () => {
        const genderOptions = [
            { key: 'gender_male', value: t('gender_male') },
            { key: 'gender_female', value: t('gender_female') },
            { key: 'gender_other', value: t('gender_other') },
        ];

        const statusOptions = [
            { key: 'status_researching', value: t('status_researching') },
            { key: 'status_closed', value: t('status_closed') },
            { key: 'status_packing', value: t('status_packing') },
        ];

        switch (step) {
            case 0: return (
                <div className="text-center animate-fade-in">
                    <h2 className="font-title-elegant text-4xl text-[#192A56] mb-4">{t('onboarding_intro_title')}</h2>
                    <p className="text-slate-600 mb-8">{t('onboarding_intro_text')}</p>
                    <button onClick={handleNext} className={`${primaryButtonClasses} px-8`}>{t('avancar')}</button>
                </div>
            );
            case 1: return (
                <div className="w-full animate-fade-in">
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('gender_title')}</h3>
                    <div className="space-y-3">
                        {genderOptions.map(option => (
                            <button key={option.key} onClick={() => handleSelection('gender', option.value, option.value !== t('gender_other'))} className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${formData.gender === option.value ? 'bg-purple-100 border-purple-500' : 'bg-white border-slate-300 hover:border-purple-300'}`}>
                                {option.value}
                            </button>
                        ))}
                        {formData.gender === t('gender_other') && (
                            <input type="text" name="otherGender" value={formData.otherGender} onChange={handleChange} placeholder={t('gender_other_placeholder')} className={`${inputClasses} mt-3 animate-fade-in`} autoFocus onBlur={handleNext} />
                        )}
                    </div>
                </div>
            );
            case 2: return (
                <div className="w-full animate-fade-in">
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('age_title')}</h3>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className={`${inputClasses} text-center text-2xl`} placeholder="00" autoFocus />
                </div>
            );
            case 3: return (
                <div className="w-full animate-fade-in">
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('first_exchange_title')}</h3>
                    <div className="flex gap-4 mb-4">
                        <button onClick={() => handleSelection('firstExchange', true)} className={`w-full p-4 rounded-lg border-2 transition-colors ${formData.firstExchange === true ? 'bg-purple-100 border-purple-500' : 'bg-white border-slate-300 hover:border-purple-300'}`}>{t('yes')}</button>
                        <button onClick={() => handleSelection('firstExchange', false, false)} className={`w-full p-4 rounded-lg border-2 transition-colors ${formData.firstExchange === false ? 'bg-purple-100 border-purple-500' : 'bg-white border-slate-300 hover:border-purple-300'}`}>{t('no')}</button>
                    </div>
                    {formData.firstExchange === false && (
                        <div className="space-y-3 animate-fade-in">
                            <h4 className="font-title-elegant text-2xl text-[#192A56] text-center mt-6">{t('previous_experience_title')}</h4>
                            <input type="text" name="prevDestination" value={formData.prevDestination} onChange={handleChange} placeholder={t('previous_destination_placeholder')} className={inputClasses} />
                            <input type="text" name="prevDate" value={formData.prevDate} onChange={handleChange} placeholder={t('previous_date_placeholder')} className={inputClasses} onBlur={handleNext} />
                        </div>
                    )}
                </div>
            );
            case 4: return (
                 <div className="w-full animate-fade-in">
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('dream_destination_title')}</h3>
                    <select name="dreamDestination" value={formData.dreamDestination} onChange={(e) => {handleChange(e); handleNext()}} className={inputClasses}>
                        {Object.keys(mockDatabase.destinations).map(country => <option key={country} value={country}>{country}</option>)}
                    </select>
                </div>
            );
            case 5: return (
                <div className="w-full animate-fade-in">
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('status_title')}</h3>
                    <div className="space-y-3">
                        {statusOptions.map(option => (
                            <button key={option.key} onClick={() => handleSelection('status', option.value)} className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${formData.status === option.value ? 'bg-purple-100 border-purple-500' : 'bg-white border-slate-300 hover:border-purple-300'}`}>
                                {option.value}
                            </button>
                        ))}
                    </div>
                </div>
            );
            case 6: return (
                <form onSubmit={handleSubmit} className="w-full animate-fade-in">
                    <h2 className="font-title-elegant text-4xl text-[#192A56] mb-4 text-center">{t('almost_there_title')}</h2>
                    <label className="font-semibold text-[#192A56] block mb-2 text-center">{t('departure_date_label')}</label>
                    <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} className={inputClasses} required />
                    <button type="submit" className={`${primaryButtonClasses} w-full mt-6`}>{t('start_journey_button')}</button>
                </form>
            );
            default: return <div>Step not found</div>;
        }
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col h-full p-4">
             <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full relative flex-grow flex flex-col justify-center">
                <div className="flex-grow flex items-center justify-center">
                    {renderStep()}
                </div>
            </div>
            <div className="relative flex items-center justify-center pt-8">
                 {step > 0 && (
                    <button onClick={handleBack} className="absolute left-0 bottom-0 p-3 rounded-full hover:bg-slate-200/50 transition-colors z-20">
                        <ChevronLeft className="w-6 h-6 text-slate-600" />
                    </button>
                )}
                <div className="w-full bg-slate-200 rounded-full h-2.5 mx-16">
                    <div className="bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                  {step > 0 && step < totalSteps && (
                    <button onClick={handleNext} className="absolute right-0 bottom-0 p-3 rounded-full hover:bg-slate-200/50 transition-colors z-20">
                        <ChevronRight className="w-6 h-6 text-slate-600" />
                    </button>
                )}
            </div>
        </div>
    );
};


const AuthFlowScreen = () => {
    const { authFlowStep, goBack } = useApp();
    return (
        <div className="w-full h-full bg-[#FBF9F6] flex flex-col relative overflow-y-auto">
            <button onClick={goBack} className="absolute top-4 left-4 p-3 rounded-full hover:bg-slate-200/50 transition-colors z-20">
                <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="flex-1 w-full flex items-center justify-center transition-transform duration-500 ease-in-out">
                 {authFlowStep === 'registration' && <RegistrationScreen />}
                 {authFlowStep === 'onboarding-funnel' && <OnboardingFunnel />}
            </div>
        </div>
    );
}

const TermsScreen = ({ type }) => {
    const { t, language } = useLanguage();
    const { goBack } = useApp();
    const title = type === 'student' ? t('terms_for_students') : t('terms_for_agencies');
    const content = {
        student_pt: "Aqui vão os termos e condições detalhados para os intercambistas... 1. Aceitação dos Termos. 2. Descrição do Serviço. 3. Responsabilidades do Usuário...",
        agency_pt: "Aqui vão os termos e condições detalhados para as agências parceiras... 1. Acordo de Parceria. 2. Uso da Plataforma. 3. Confidencialidade...",
        student_en: "Here are the detailed terms and conditions for students... 1. Acceptance of Terms. 2. Service Description. 3. User Responsibilities...",
        agency_en: "Here are the detailed terms and conditions for partner agencies... 1. Partnership Agreement. 2. Platform Usage. 3. Confidentiality...",
    };
    const currentContent = content[`${type}_${language}`] || content[`${type}_pt`];

    return (
         <div className="w-full h-full bg-[#FBF9F6] flex flex-col relative overflow-y-auto">
            <header className="p-4 flex items-center border-b border-slate-200">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200/50 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                </button>
                <h1 className="text-xl font-bold text-[#192A56] mx-auto">{title}</h1>
            </header>
            <main className="flex-1 p-8 prose max-w-4xl mx-auto">
                <h2>{title}</h2>
                <p>{currentContent}</p>
            </main>
        </div>
    );
};


// --- Dashboard Components ---
const WeatherWidget = ({ destination }) => {
    const weatherData = mockDatabase.weather[destination] || { temp: '--', icon: HelpCircle };
    const Icon = weatherData.icon;
    return (
        <div className="flex items-center gap-1 text-slate-500">
            <Icon size={16} />
            <span className="text-sm font-semibold">{weatherData.temp}°C</span>
        </div>
    )
}

const DashboardHeader = ({ userData, onBack, showBackButton }) => {
    const { t, language, setLanguage } = useLanguage();
    const { setUserData } = useApp();
    const photoInputRef = useRef(null);

    const handlePhotoClick = () => photoInputRef.current.click();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setUserData(prev => ({...prev, photoURL: event.target.result}));
            reader.readAsDataURL(file);
        }
    };
    
    const lang = language.toUpperCase();

    return (
        <header className="bg-[#FBF9F6] p-4">
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {showBackButton && (
                         <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200/50">
                             <ArrowLeft size={20} className="text-slate-600" />
                         </button>
                    )}
                    <input type="file" ref={photoInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <button onClick={handlePhotoClick} className="relative flex-shrink-0">
                        <img src={userData?.photoURL} alt="User" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/E2E8F0/4A5568?text=${(userData?.name || 'U').charAt(0)}`; }} />
                    </button>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                           <h2 className="text-lg font-bold text-[#192A56]">{t('hey')} {userData?.name?.split(' ')[0]}</h2>
                           <button onClick={() => setLanguage(l => l === 'pt' ? 'en' : 'pt')} className="font-semibold text-slate-500 hover:text-[#192A56] text-xs px-1 py-0.5 rounded-md border border-slate-300 flex items-center gap-1">
                               <span className={lang === 'PT' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold' : ''}>PT</span>
                               <span>|</span>
                               <span className={lang === 'EN' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold' : ''}>EN</span>
                           </button>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} />
                                <p className="text-sm font-medium">{userData?.destination || '...'}</p>
                            </div>
                            <WeatherWidget destination={userData.destination} />
                        </div>
                    </div>
                </div>
                 <button onClick={() => alert("Notifications!")} className="p-2 rounded-full hover:bg-slate-200/50 transition-colors relative">
                     <Bell size={24} className="text-[#192A56]/80" />
                 </button>
            </div>
        </header>
    );
};

const CountdownBar = ({ userData }) => {
    const { t } = useLanguage();
    const calculateTimeLeft = useCallback(() => {
        if (!userData?.departureDate) return { d: 0, h: 0, m: 0, s: 0 };
        const difference = +new Date(userData.departureDate + "T00:00:00") - +new Date();
        if (difference <= 0) return { d: 0, h: 0, m: 0, s: 0 };
        return {
            d: Math.floor(difference / (1000 * 60 * 60 * 24)),
            h: Math.floor((difference / (1000 * 60 * 60)) % 24),
            m: Math.floor((difference / 1000 / 60) % 60),
            s: Math.floor((difference / 1000) % 60),
        };
    }, [userData?.departureDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-2 flex items-center justify-center text-center">
            <div className="flex flex-col items-center">
                <span className="text-xs mb-1">{t('countdown_title')}</span>
                <div className="inline-flex items-baseline gap-2 font-mono">
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">{String(timeLeft.d).padStart(2, '0')}</span>
                        <span className="text-[9px] opacity-70">dias</span>
                    </div>
                    <span>:</span>
                     <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">{String(timeLeft.h).padStart(2, '0')}</span>
                        <span className="text-[9px] opacity-70">horas</span>
                    </div>
                    <span>:</span>
                     <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">{String(timeLeft.m).padStart(2, '0')}</span>
                        <span className="text-[9px] opacity-70">min</span>
                    </div>
                    <span>:</span>
                     <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">{String(timeLeft.s).padStart(2, '0')}</span>
                        <span className="text-[9px] opacity-70">seg</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SpecialIconsBar = ({ onIconClick }) => {
    const { t } = useLanguage();
    const scrollRef = useRef(null);

    const icons = [
        { id: 'folder', icon: Folder, label: t('folder') },
        { id: 'currency', icon: Coins, label: t('currency') },
        { id: 'calculator', icon: Calculator, label: t('calculator') },
        { id: 'timezone', icon: Clock, label: t('timezone') },
        { id: 'agenda', icon: CalendarClock, label: t('agenda') },
        { id: 'teacher_ana', icon: Glasses, label: t('teacher_ana') },
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction * 150, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-[#FBF9F6]/80 backdrop-blur-sm shadow-sm border-y border-slate-200/80 relative group">
            <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity bg-slate-100/50 hover:bg-slate-100 rounded-full">
                <ChevronLeft size={20} />
            </button>
            <div ref={scrollRef} className="max-w-7xl mx-auto flex justify-start sm:justify-center items-center py-0.5 px-1 overflow-x-auto custom-scrollbar">
                {icons.map(item => (
                    <div key={item.id} className="relative flex-shrink-0">
                        <button onClick={() => onIconClick(item.id)} className="p-2 rounded-lg hover:bg-slate-200/50 transition-colors flex flex-col items-center text-[#192A56]/80 hover:text-[#192A56] w-20">
                            <item.icon size={22} />
                            <span className="text-[10px] font-semibold mt-0.5 text-center">{item.label}</span>
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity bg-slate-100/50 hover:bg-slate-100 rounded-full">
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

const DashboardBottomNav = ({ onNavigate, activeSection }) => {
    const { t } = useLanguage();
    const navItems = [
        { id: 'home', icon: Home, title: t('home') },
        { id: 'journey', icon: Milestone, title: t('journey') },
        { id: 'preparatorio', icon: Compass, title: t('preparatorio_title') },
        { id: 'bate_volta', icon: Map, title: t('bate_volta') },
        { id: 'premium', icon: Star, title: t('premium') },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-700 p-1 shadow-top z-40 md:hidden">
            <div className="max-w-7xl mx-auto flex justify-around items-center text-white">
                {navItems.map(item => (
                    <div
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        onKeyDown={(e) => e.key === 'Enter' && onNavigate(item.id)}
                        role="button"
                        tabIndex="0"
                        className={`flex flex-col items-center justify-center gap-0.5 w-full transition-colors duration-300 py-1 rounded-lg relative cursor-pointer ${activeSection === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    >
                        <item.icon size={22} />
                        <span className="text-[10px] font-semibold">{item.title}</span>
                    </div>
                ))}
            </div>
        </nav>
    );
};

const WelcomePopup = ({ userData, onClose, t }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="relative p-8 rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:max-w-xl flex flex-col animate-slide-down bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
            <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20">
                <X size={24} />
            </button>
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{t('welcome_title_dynamic', {name: userData.name.split(' ')[0]})}</h3>
                <p className="text-base text-white/90 mb-6">{t('welcome_subtitle')}</p>
                <button onClick={onClose} className="font-semibold text-purple-600 bg-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-lg mx-auto">{t('welcome_button')}</button>
            </div>
        </div>
    </div>
);

// --- Modals ---
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-[#FBF9F6] w-full max-w-lg rounded-2xl shadow-xl animate-slide-up max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="font-bold text-lg text-[#192A56]">{title}</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200/50">
                    <X size={24} className="text-slate-600" />
                </button>
            </header>
            <main className="flex-grow p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    </div>
);

const FolderModal = ({ t, savedItems, setSavedItems }) => {
    const [search, setSearch] = useState('');
    const [customFolders, setCustomFolders] = useState([]);
    const [expandedFolders, setExpandedFolders] = useState({ 'tips': true });
    const pdfRef = useRef();
    const secondaryButtonClasses = "font-semibold text-[#192A56] bg-transparent transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5 px-3 py-3 rounded-lg";

    const allFolders = useMemo(() => {
        const baseFolders = [
            { id: 'tips', name: t('tip_of_the_day'), icon: Lightbulb, items: savedItems.filter(i => i.type === 'tip') },
            { id: 'planning', name: t('planejamento'), icon: Wallet, items: savedItems.filter(i => i.type === 'planning') },
            { id: 'jei', name: t('jei_response_title'), icon: Bot, items: savedItems.filter(i => i.type === 'jei') },
            { id: 'documents', name: t('folder_modal_title'), icon: FileSignature, items: savedItems.filter(i => i.type === 'document') },
        ];
        const customItems = customFolders.map(f => ({...f, items: savedItems.filter(i => i.folderId === f.id)}));
        return [...baseFolders, ...customItems];
    }, [savedItems, customFolders, t]);

    const filteredFolders = useMemo(() => {
        const lowerCaseSearch = search.toLowerCase();
        if (!search) return allFolders;
        return allFolders
            .map(folder => ({
                ...folder,
                items: folder.items.filter(item => 
                    item.content && item.content.toLowerCase().includes(lowerCaseSearch)
                )
            }))
            .filter(folder => folder.items.length > 0 || folder.name.toLowerCase().includes(lowerCaseSearch));
    }, [search, allFolders]);

    const toggleFolder = (id) => {
        setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const createNewFolder = () => {
        const newFolderName = prompt(t('folder_name_placeholder'));
        if (newFolderName && newFolderName.trim() !== '') {
            setCustomFolders(prev => [...prev, { id: `folder-${Date.now()}`, name: newFolderName.trim(), icon: Folder, items: [] }]);
        }
    };

    const deleteItem = (id) => {
        setSavedItems(prev => prev.filter(item => item.id !== id));
    };
    
    const generatePdf = () => {
        if (!window.jspdf || !window.html2canvas) {
            alert("PDF libraries are still loading. Please try again in a moment.");
            return;
        }
        const { jsPDF } = window.jspdf;
        const input = pdfRef.current;
        window.html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const width = pdfWidth - 20;
            const height = width / ratio;
            pdf.addImage(imgData, 'PNG', 10, 10, width, height);
            pdf.save("onliprep_docs.pdf");
        });
    };

    return (
        <div className="bg-[#FCFBF8] p-4 rounded-lg shadow-inner">
            <div className="flex gap-2 mb-4">
                <input type="search" placeholder={t('folder_search_placeholder')} className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 flex-grow" value={search} onChange={e => setSearch(e.target.value)} />
                <button onClick={createNewFolder} className={secondaryButtonClasses} title={t('new_folder')}><FolderPlus size={20} /></button>
                <button onClick={generatePdf} className={secondaryButtonClasses} title={t('new_document')}><FileDown size={20} /></button>
            </div>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {filteredFolders.map(folder => (
                    <div key={folder.id} className="bg-white/60 rounded-lg">
                        <button onClick={() => toggleFolder(folder.id)} className="w-full flex items-center gap-3 p-3 text-[#192A56] font-semibold">
                            <ChevronDown size={20} className={`transition-transform ${expandedFolders[folder.id] ? 'rotate-0' : '-rotate-90'}`} />
                            <folder.icon size={20} />
                            <span>{folder.name} ({folder.items.length})</span>
                        </button>
                        {expandedFolders[folder.id] && (
                            <div className="pl-8 pr-4 pb-4 space-y-2">
                                {folder.items.length > 0 ? (
                                    folder.items.map(item => (
                                        <div key={item.id} className="w-full flex items-center gap-2 p-2 rounded-lg bg-slate-100 text-[#192A56]">
                                            <p className="text-sm font-medium truncate flex-grow">{item.content}</p>
                                            <button onClick={() => deleteItem(item.id)} className="p-1 text-slate-400 hover:text-red-500 rounded-full"><Trash2 size={14}/></button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 text-center p-2">Nenhum item aqui.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
             <div className="absolute -left-[9999px] top-auto" style={{width: '210mm'}}>
                  <div ref={pdfRef} className="p-8 bg-white text-black">
                      <h1 className="text-2xl font-bold text-[#192A56] mb-2">OnliPrep</h1>
                      <h2 className="text-xl font-semibold border-b pb-2 mb-4">Seus Itens Salvos</h2>
                      <ul className="list-disc pl-5 space-y-2">
                          {savedItems.map(item => <li key={`pdf-${item.id}`}>{item.content}</li>)}
                      </ul>
                  </div>
             </div>
        </div>
    );
};

const CalculatorModal = ({ t, onSave }) => {
    const [items, setItems] = useState([{ name: '', value: '' }]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const total = useMemo(() => items.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0), [items]);
    const inputClasses = "w-full py-3 px-5 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
    const primaryButtonClasses = "font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";
    const secondaryButtonClasses = "font-semibold text-[#192A56] bg-transparent py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5";

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => setItems([...items, { name: '', value: '' }]);
    const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

    const handleGeminiCostSearch = async () => {
        if (!searchQuery) return;
        setIsSearching(true);
        setSearchResult(null);

        const prompt = `Baseado em dados de custo de vida gerais, qual o custo médio estimado para "${searchQuery}"? Forneça um valor aproximado e a moeda (ex: EUR, USD, CAD). Responda de forma concisa em uma única linha, como: "Valor: 1200 EUR".`;
        
        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                const text = result.candidates[0].content.parts[0].text;
                const valueMatch = text.match(/(\d+(\.\d+)?)/);
                const currencyMatch = text.match(/[A-Z]{3}/);
                
                setSearchResult({
                    item: searchQuery,
                    value: valueMatch ? valueMatch[0] : "N/A",
                    currency: currencyMatch ? currencyMatch[0] : ""
                });
            } else {
                throw new Error("Resposta inválida da API");
            }
        } catch (error) {
            console.error("Error fetching Gemini cost data:", error);
            setSearchResult({ item: searchQuery, value: "Erro", currency: "" });
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div>
            <p className="text-sm text-slate-600 mb-4">{t('calculator_planning_info')}</p>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input type="text" placeholder={t('investment_item_name')} value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)} className={inputClasses} />
                        <input type="number" placeholder="0.00" value={item.value} onChange={e => handleItemChange(index, 'value', e.target.value)} className={`${inputClasses} w-32`} />
                        <button onClick={() => removeItem(index)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full"><Minus size={16} /></button>
                    </div>
                ))}
            </div>
            <button onClick={addItem} className="flex items-center gap-2 text-sm font-semibold text-purple-600 mt-4"><PlusCircle size={16} />{t('investment_add_item')}</button>
            <div className="mt-6 pt-4 border-t border-slate-300 flex justify-between items-center">
                <span className="font-bold text-lg text-[#192A56]">{t('investment_total')}:</span>
                <span className="font-bold text-xl text-[#192A56]">R$ {total.toFixed(2).replace('.',',')}</span>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200">
                <label className="font-bold text-[#192A56] flex items-center gap-2">{t('calculator_search_label')} <Sparkles size={16} className="text-amber-500" /></label>
                <div className="flex gap-2 mt-2">
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t('calculator_search_placeholder')} className={`${inputClasses} flex-grow`} />
                    <button onClick={handleGeminiCostSearch} className={`${primaryButtonClasses} !px-4`} disabled={isSearching}>
                        {isSearching ? <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin"></div> : <Search size={18}/>}
                    </button>
                </div>
                {searchResult && (
                    <div className="mt-4 p-4 bg-slate-100 rounded-lg animate-fade-in">
                        <h4 className="font-semibold text-[#192A56]">{t('calculator_search_result_title', {item: searchResult.item})}</h4>
                        <p className="text-2xl font-bold text-purple-600">{searchResult.value} {searchResult.currency}</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-slate-400">{t('calculator_search_result_source')}</p>
                            <button onClick={() => onSave({type: 'planning', content: `${searchResult.item}: ${searchResult.value} ${searchResult.currency}`})} className={`${secondaryButtonClasses} !text-xs !py-1 !px-2`}>{t('salvar')}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const CurrencyModal = ({t}) => {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState('BRL');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const inputClasses = "w-full py-3 px-5 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
    const secondaryButtonClasses = "font-semibold text-[#192A56] bg-transparent py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5";


    const rates = {
        'BRL': { name: 'Real Brasileiro', comercial: 1, turismo: 1 },
        'USD': { name: 'Dólar Americano', comercial: 0.185, turismo: 0.192 },
        'EUR': { name: 'Euro', comercial: 0.172, turismo: 0.178 },
        'GBP': { name: 'Libra Esterlina', comercial: 0.146, turismo: 0.151 },
        'CAD': { name: 'Dólar Canadense', comercial: 0.253, turismo: 0.261 },
        'AUD': { name: 'Dólar Australiano', comercial: 0.278, turismo: 0.287 },
    };

    const { comercial, turismo } = useMemo(() => {
        const amountInBRL = amount / rates[fromCurrency].comercial;
        const convertedComercial = amountInBRL * rates[toCurrency].comercial;
        const convertedTurismo = amountInBRL * rates[toCurrency].turismo;
        return { comercial: convertedComercial, turismo: convertedTurismo };
    }, [amount, fromCurrency, toCurrency, rates]);
    
    const handleUnlock = () => {
        setIsUnlocking(true);
        setTimeout(() => {
            setIsUnlocking(false);
            setIsUnlocked(true);
        }, 2000);
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={`${inputClasses} text-2xl`} />
                <div className="flex gap-2 items-center">
                    <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} className={inputClasses}>
                        {Object.keys(rates).map(c => <option key={c} value={c}>{c} - {rates[c].name}</option>)}
                    </select>
                    <ArrowRight size={20} className="text-slate-500 flex-shrink-0" />
                    <select value={toCurrency} onChange={e => setToCurrency(e.target.value)} className={inputClasses}>
                        {Object.keys(rates).map(c => <option key={c} value={c}>{c} - {rates[c].name}</option>)}
                    </select>
                </div>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg text-center grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs font-semibold text-slate-500">COMERCIAL</p>
                    <p className="text-2xl font-bold text-[#192A56]">{comercial.toFixed(2).replace('.',',')} <span className="text-lg font-semibold">{toCurrency}</span></p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500">TURISMO</p>
                    <p className="text-2xl font-bold text-[#192A56]">{turismo.toFixed(2).replace('.',',')} <span className="text-lg font-semibold">{toCurrency}</span></p>
                </div>
            </div>
            <p className="text-xs text-center text-slate-400 my-4">{t('currency_source')} | {t('currency_last_updated')} {new Date().toLocaleDateString()}</p>
            <div className="bg-slate-100 p-4 rounded-lg">
                <h4 className="font-bold text-[#192A56] text-center">{t('currency_partner_title')}</h4>
                <div className="flex justify-center mt-3">
                    {isUnlocked ? (
                         <div className={`${secondaryButtonClasses} bg-white text-green-600 border-green-600 animate-fade-in`}>{t('currency_coupon_code')}</div>
                    ) : (
                        <button onClick={handleUnlock} disabled={isUnlocking} className={`${secondaryButtonClasses} flex items-center gap-2 disabled:opacity-50`}>
                            {isUnlocking ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-[#192A56]"></div>
                                    {t('currency_unlocking')}
                                </>
                            ) : (
                                <>
                                    <Lock size={16} />
                                    {t('currency_unlock_prompt')}
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

const TimezoneModal = ({t, userData}) => {
    const timezones = { 
        'Europe/Dublin': 'Dublin', 
        'America/Toronto': 'Toronto', 
        'Australia/Sydney': 'Sydney',
        'America/New_York': 'Nova Iorque',
        'Europe/London': 'Londres',
        'Asia/Dubai': 'Dubai'
    };
    const [destinationTz, setDestinationTz] = useState(Object.keys(timezones).find(key => timezones[key] === userData?.destinationCountry) || 'Europe/Dublin');
    const [localTime, setLocalTime] = useState('');
    const [destinationTime, setDestinationTime] = useState('');
    const inputClasses = "w-full py-3 px-5 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
    
    useEffect(() => {
        const timer = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString('pt-BR'));
            setDestinationTime(new Date().toLocaleTimeString('pt-BR', { timeZone: destinationTz }));
        }, 1000);
        return () => clearInterval(timer);
    }, [destinationTz]);

    return (
        <div className="text-center">
            <div>
                <p className="text-lg text-slate-500">{t('timezone_your_location')}</p>
                <p className="text-5xl font-bold text-[#192A56] font-mono">{localTime}</p>
            </div>
            <div className="my-6">
                <ArrowDown size={24} className="mx-auto text-slate-400" />
            </div>
            <div>
                 <select value={destinationTz} onChange={e => setDestinationTz(e.target.value)} className={`${inputClasses} mb-2`}>
                    {Object.entries(timezones).map(([tz, city]) => <option key={tz} value={tz}>{city}</option>)}
                </select>
                <p className="text-5xl font-bold text-[#192A56] font-mono">{destinationTime}</p>
            </div>
        </div>
    )
}

const getTaskIcon = (taskName, customIcon) => {
    if (customIcon) return customIcon;
    const name = taskName.toLowerCase();
    if (name.includes('passaporte')) return Passport;
    if (name.includes('visto')) return Stamp;
    if (name.includes('passagens')) return Plane;
    if (name.includes('seguro')) return ShieldCheck;
    if (name.includes('médico')) return HeartPulse;
    if (name.includes('acomodação')) return BedDouble;
    if (name.includes('check-in')) return Ticket;
    return ListChecks;
}

const CalendarView = ({ tasks, onDateClick, selectedDate }) => {
    const [date, setDate] = useState(new Date(selectedDate));

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const tasksByDay = useMemo(() => {
        const map = {};
        tasks.forEach(task => {
            const taskDate = new Date(task.date + 'T00:00:00');
            if (taskDate.getMonth() === date.getMonth() && taskDate.getFullYear() === date.getFullYear()) {
                const day = taskDate.getDate();
                if (!map[day]) map[day] = { total: 0, completed: 0, icons: [] };
                map[day].total++;
                if (task.completed) map[day].completed++;
                const icon = getTaskIcon(task.name, task.icon)
                if (icon && !map[day].icons.includes(icon)) map[day].icons.push(icon);
            }
        });
        return map;
    }, [tasks, date]);

    const changeMonth = (offset) => {
        setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    }

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    return (
        <div className="bg-white p-4 rounded-lg shadow-inner">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100"><ChevronLeft size={20} /></button>
                <h4 className="font-bold text-[#192A56] text-lg">
                    {date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
                </h4>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100"><ChevronRight size={20} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500">
                {weekDays.map((day, index) => <div key={`weekday-${index}`}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const dayNumber = day + 1;
                    const dayTasks = tasksByDay[dayNumber];
                    const isSelected = new Date(selectedDate).getDate() === dayNumber && new Date(selectedDate).getMonth() === date.getMonth();
                    const isAllCompleted = dayTasks && dayTasks.total > 0 && dayTasks.total === dayTasks.completed;
                    const Icon = dayTasks?.icons[0];
                    
                    return (
                        <button 
                            key={dayNumber} 
                            onClick={() => onDateClick(new Date(date.getFullYear(), date.getMonth(), dayNumber))}
                            className={`w-full aspect-square rounded-full flex flex-col items-center justify-center text-sm transition-colors relative ${isSelected ? 'bg-purple-600 text-white' : 'hover:bg-slate-100'}`}
                        >
                            {Icon && <Icon size={14} className={isSelected ? 'text-white/80' : 'text-purple-500'}/>}
                            <span>{dayNumber}</span>
                            {dayTasks && (
                                <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isAllCompleted ? 'bg-green-500' : 'bg-gradient-to-tr from-purple-500 to-indigo-500'} ${isSelected ? 'ring-2 ring-white' : ''}`}></div>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

const AgendaModal = ({t, agendaItems, onToggle, onAddTask, onUpdateTask}) => {
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editingTask, setEditingTask] = useState(null);
    const inputClasses = "w-full py-3 px-5 rounded-lg border border-gray-300 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
    const primaryButtonClasses = "font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";
    const secondaryButtonClasses = "font-semibold text-[#192A56] bg-transparent py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5";


    const handleAddTask = (e) => {
        e.preventDefault();
        if(taskName && taskDate) {
            onAddTask({ name: taskName, date: taskDate });
            setTaskName('');
            setTaskDate('');
        }
    }

    const handleUpdateTask = (e) => {
        e.preventDefault();
        if (editingTask && editingTask.name && editingTask.date) {
            onUpdateTask(editingTask.id, { name: editingTask.name, date: editingTask.date });
            setEditingTask(null);
        }
    }
    
    const tasksForSelectedDate = agendaItems
        .filter(item => {
            const itemDate = new Date(item.date + "T00:00:00");
            return itemDate.toDateString() === selectedDate.toDateString() && !item.completed;
        })
        .sort((a,b) => new Date(a.date) - new Date(b.date));

    const completedTasks = agendaItems
        .filter(item => item.completed)
        .sort((a,b) => new Date(b.completedAt) - new Date(a.completedAt));

    if (editingTask) {
        return (
            <form onSubmit={handleUpdateTask} className="space-y-4">
                <h3 className="font-bold text-lg text-[#192A56]">{t('edit_task')}</h3>
                <input type="text" value={editingTask.name} onChange={e => setEditingTask({...editingTask, name: e.target.value})} className={inputClasses} required />
                <input type="date" value={editingTask.date} onChange={e => setEditingTask({...editingTask, date: e.target.value})} className={inputClasses} required />
                <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingTask(null)} className={`${secondaryButtonClasses} w-full`}>{t('back')}</button>
                    <button type="submit" className={`${primaryButtonClasses} w-full`}>{t('update_task')}</button>
                </div>
            </form>
        )
    }

    return (
        <div>
            <CalendarView tasks={agendaItems} selectedDate={selectedDate} onDateClick={setSelectedDate} />
            
            <div className="mt-6">
                <h4 className="font-bold text-[#192A56] mb-2">
                    Tarefas para {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                </h4>
                <div className="space-y-3">
                    {tasksForSelectedDate.length > 0 ? tasksForSelectedDate.map(item => {
                        const Icon = getTaskIcon(item.name, item.icon);
                        return (
                            <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                                <button onClick={() => onToggle(item.id)} className="flex-shrink-0">
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center cursor-pointer">
                                        {item.completed && <Check size={16} className="text-green-500" />}
                                    </div>
                                </button>
                                <Icon className="text-purple-600 flex-shrink-0" size={20} />
                                <div className="flex-grow">
                                    <p className={`font-semibold text-[#192A56]`}>{item.name}</p>
                                </div>
                                {new Date(item.date) < new Date() && !item.completed && <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" title="Atrasado!" />}
                                {!item.isJourneyTask && (
                                    <button onClick={() => setEditingTask(item)} className="p-1 text-slate-400 hover:text-[#192A56]"><Edit size={16} /></button>
                                )}
                            </div>
                        )
                    }) : (
                        <p className="text-sm text-slate-500 text-center p-4">Nenhuma tarefa pendente para esta data.</p>
                    )}
                </div>
            </div>
            
            <form onSubmit={handleAddTask} className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                 <h4 className="font-bold text-[#192A56]">{t('agenda_add_task')}</h4>
                 <input type="text" placeholder={t('agenda_task_name')} value={taskName} onChange={e => setTaskName(e.target.value)} className={inputClasses} required />
                 <input type="date" value={taskDate} onChange={e => setTaskDate(e.target.value)} className={inputClasses} required />
                 <button type="submit" className={`${primaryButtonClasses} w-full`}>{t('salvar')}</button>
            </form>

            {completedTasks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                    <h4 className="font-bold text-[#192A56] mb-2">{t('agenda_completed_tasks')}</h4>
                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                        {completedTasks.map(item => {
                            const Icon = getTaskIcon(item.name, item.icon);
                            return (
                                <div key={item.id} onClick={() => onToggle(item.id)} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-100 opacity-60">
                                    <CheckSquare size={20} className="text-green-500 flex-shrink-0" />
                                    <Icon className="text-slate-500 flex-shrink-0" size={20} />
                                    <div className="flex-grow">
                                        <p className={`font-semibold text-slate-500 line-through`}>{item.name}</p>
                                        <p className="text-xs text-slate-400">Concluído em: {new Date(item.completedAt).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

const LeftFloatingActionButtons = ({ onTipClick, onJeiClick }) => {
    const [isActionsOpen, setActionsOpen] = useState(false);

    const actions = [
        { id: 'tip', icon: Lightbulb, title: 'Dica Rápida', color: 'bg-yellow-400', action: onTipClick },
        { id: 'help', icon: Siren, title: 'Help!', color: 'bg-red-500', action: () => alert('Help!') },
    ];

    return (
        <div className="fixed bottom-24 md:bottom-5 left-4 z-40 flex flex-col items-center gap-3">
             {isActionsOpen && (
                <div className="flex flex-col items-center gap-3 animate-fade-in-fast">
                    {actions.map(action => (
                        <button key={action.id} onClick={action.action} className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${action.color} transform hover:scale-110 transition-transform`}>
                            <action.icon size={20} />
                        </button>
                    ))}
                </div>
            )}
            <button onClick={onJeiClick} className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Bot size={24} />
            </button>
            <button 
                onClick={() => setActionsOpen(!isActionsOpen)} 
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg text-white transform hover:scale-110 transition-transform"
            >
                <div className={`transition-transform duration-300 ${isActionsOpen ? 'rotate-45' : 'rotate-0'}`}>
                    <Plus size={24} />
                </div>
            </button>
        </div>
    );
};

const TipOfTheDayModal = ({ tip, onClose, onSave, t }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-[#FBF9F6] p-6 rounded-2xl shadow-xl max-w-sm w-full animate-slide-up relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-slate-200/50">
                <X size={20} className="text-slate-500" />
            </button>
            <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-yellow-500" size={24} />
                <h3 className="text-lg font-bold text-[#192A56]">{t('tip_of_the_day')}</h3>
            </div>
            <p className="text-slate-600 text-base leading-relaxed mb-6">{tip}</p>
            <button onClick={() => { onSave({type: 'tip', content: tip}); onClose(); }} className="font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full">{t('salvar')}</button>
        </div>
    </div>
);

const NotificationPermissionModal = ({ t, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-[102] flex items-center justify-center p-4">
        <div className="bg-[#FBF9F6] p-8 rounded-2xl shadow-xl max-w-sm w-full animate-slide-up text-center">
            <Bell size={40} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#192A56] mb-2">{t('notificacoes_titulo')}</h3>
            <p className="text-slate-600 mb-6">{t('notificacoes_texto')}</p>
            <div className="flex gap-4">
                <button onClick={() => onClose(false)} className="font-semibold text-[#192A56] bg-transparent py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5 w-full">{t('agora_nao')}</button>
                <button onClick={() => onClose(true)} className="font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full">{t('permitir')}</button>
            </div>
        </div>
    </div>
);

const ToastNotification = ({ t, toast, onClose }) => {
    if (!toast) return null;
    const Icon = toast.icon;
    return (
        <div className="fixed bottom-24 md:bottom-4 left-4 w-11/12 max-w-md bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 rounded-lg shadow-2xl z-[200] animate-slide-in-left">
            <div className="flex items-start gap-3">
                <Icon size={20} className="mt-1 flex-shrink-0" />
                <div className="flex-grow">
                    <p className="text-sm font-medium">{toast.message}</p>
                    {toast.actions && toast.actions.length > 0 && (
                        <div className="flex gap-2 mt-2">
                            {toast.actions.map(action => (
                                <button key={action.label} onClick={action.onClick} className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded">
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                 <button onClick={onClose} className="p-1 -m-1 rounded-full hover:bg-white/20">
                    <X size={16} />
                </button>
            </div>
        </div>
    )
}

const JourneySection = ({ agendaItems, onOpenAgenda }) => {
    const { t } = useLanguage();
    const upcomingTasks = agendaItems
        .filter(task => !task.completed)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-[#192A56] text-xl mb-4">Próximos Passos</h3>
            {upcomingTasks.length > 0 ? (
                <div className="space-y-4">
                    {upcomingTasks.map(task => (
                        <div key={task.id} className="flex items-center p-3 bg-slate-50 rounded-md">
                            <CalendarClock size={20} className="text-purple-500 mr-4" />
                            <div>
                                <p className="font-semibold text-[#192A56]">{task.name}</p>
                                <p className="text-sm text-slate-500">Prazo: {new Date(task.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                            </div>
                        </div>
                    ))}
                    <button onClick={onOpenAgenda} className="font-semibold text-[#192A56] bg-transparent py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5 w-full mt-4">Ver agenda completa</button>
                </div>
            ) : (
                <p className="text-center text-slate-500 py-4">Parabéns! Todas as tarefas da sua jornada estão em dia.</p>
            )}
        </div>
    );
};

const JeiSearchModal = ({ onSearch, onClose, t }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-start pt-4" onClick={onClose}>
            <form onSubmit={handleSearch} className="bg-white p-2 rounded-lg shadow-2xl flex items-center gap-2 w-full max-w-full" onClick={e => e.stopPropagation()}>
                <input 
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('jei_prompt_placeholder')}
                    className="w-full py-2 px-3 rounded-lg border-0 bg-white transition-all duration-200 font-medium text-[#192A56] focus:outline-none focus:ring-0 flex-grow"
                />
                <button type="submit" className="font-semibold text-white bg-[#192A56] p-3 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

const JeiResponseModal = ({ query, onSave, onClose, t }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchResponse = async () => {
            const prompt = `Com base no seguinte contexto, responda à pergunta do usuário. Seja direto e use as informações fornecidas.\n\nContexto:\n${KNOWLEDGE_BASE}\n\nPergunta do usuário: "${query}"\n\nResposta:`;
            
            try {
                let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
                const payload = { contents: chatHistory };
                const apiKey = ""; 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                
                const apiResponse = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!apiResponse.ok) {
                    throw new Error(`API request failed with status ${apiResponse.status}`);
                }

                const result = await apiResponse.json();
                
                if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                    setResponse(result.candidates[0].content.parts[0].text);
                } else {
                    setResponse("Desculpe, não consegui gerar uma resposta. Tente novamente.");
                }
            } catch (error) {
                console.error("Error fetching Gemini response:", error);
                setResponse("Ocorreu um erro ao buscar a resposta. Verifique sua conexão ou tente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchResponse();
    }, [query]);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-[#FCFBF8] w-full max-w-lg rounded-2xl shadow-xl animate-slide-up max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-slate-200">
                    <h3 className="font-bold text-lg text-[#192A56]">{t('jei_response_title')}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200/50">
                        <X size={24} className="text-slate-600" />
                    </button>
                </header>
                <main className="flex-grow p-6 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center text-center h-48">
                            <Bot size={40} className="text-purple-500 animate-bounce"/>
                            <p className="mt-4 text-[#192A56] font-semibold">{t('jei_thinking')}</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm text-slate-500 mb-2">Sua pergunta:</p>
                            <p className="font-semibold text-[#192A56] mb-4">"{query}"</p>
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{response}</p>
                        </div>
                    )}
                </main>
                {!isLoading && (
                    <footer className="p-4 border-t border-slate-200">
                        <button onClick={() => onSave({type: 'jei', content: `P: ${query}\nR: ${response}`})} className="font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg w-full">
                            {t('salvar')}
                        </button>
                    </footer>
                )}
            </div>
        </div>
    )
}

const PremiumSection = () => {
    const { t } = useLanguage();
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [rating, setRating] = useState(0);
    const [feedbackSent, setFeedbackSent] = useState(false);
    const scrollRefs = {
        accommodation: useRef(null),
        work: useRef(null),
        culture: useRef(null),
        first_week: useRef(null),
    };

    useEffect(() => {
        let timer;
        if (isUnlocked && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            setIsUnlocked(false);
        }
        return () => clearTimeout(timer);
    }, [isUnlocked, timeLeft]);

    const handleUnlock = () => {
        setTimeLeft(20 * 60); // 20 minutes
        setIsUnlocked(true);
    };

    const handleScroll = (key, direction) => {
        scrollRefs[key].current.scrollBy({ left: direction * 300, behavior: 'smooth' });
    };
    
    const handleRating = (rate) => {
        setRating(rate);
    }
    
    const handleSendFeedback = () => {
        setFeedbackSent(true);
        setTimeout(() => setFeedbackSent(false), 3000);
    }

    const renderCarousel = (titleKey, contentKey) => (
        <div>
            <h3 className="text-2xl font-bold text-[#192A56] mb-4">{t(titleKey)}</h3>
            <div className="relative">
                <button onClick={() => handleScroll(contentKey, -1)} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/50 rounded-full shadow-md hover:bg-white"><ChevronLeft/></button>
                <div ref={scrollRefs[contentKey]} className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                    {mockDatabase.premiumContent[contentKey].map(item => (
                        <div key={item.id} className="flex-shrink-0 w-64 h-64 bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between relative overflow-hidden">
                            {(item.locked && !isUnlocked) && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                                    <Lock size={40} className="text-yellow-400"/>
                                </div>
                            )}
                            <span className="text-xs font-semibold bg-yellow-400/30 text-yellow-800 px-2 py-1 rounded-full self-start">{t(titleKey)}</span>
                            <h4 className="text-lg font-bold text-[#192A56]">{item.title}</h4>
                            <button className="text-sm font-semibold text-purple-600 self-end">Ver mais</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => handleScroll(contentKey, 1)} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/50 rounded-full shadow-md hover:bg-white"><ChevronRight/></button>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-6 bg-gradient-to-br from-white via-[#FBF9F6] to-yellow-100/50 rounded-lg shadow-sm">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold tracking-tighter relative inline-flex items-center">
                    <span className="text-[#192A56] font-light">Onli</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600">Premium</span>
                    <Star className="w-8 h-8 ml-2 text-yellow-500" />
                </h2>
            </div>

            {!isUnlocked ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto mb-12">
                     <Lock size={40} className="text-yellow-500 mx-auto mb-4"/>
                     <h3 className="text-xl font-bold text-[#192A56] mb-2">{t('premium_unlock_title')}</h3>
                     <p className="text-slate-600 mb-6">{t('premium_unlock_text')}</p>
                     <button onClick={handleUnlock} className="font-semibold text-white bg-gradient-to-r from-yellow-500 to-amber-600 py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
                         {t('premium_unlock_button')}
                     </button>
                </div>
            ) : (
                 <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-8 text-center">
                     <p className="font-bold">{t('premium_unlocked_text')}</p>
                     <p>{t('premium_timer_text')} {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
                 </div>
            )}
            
            <div className="space-y-12">
                {renderCarousel('premium_accommodation', 'accommodation')}
                {renderCarousel('premium_work', 'work')}
                {renderCarousel('premium_culture', 'culture')}
                {renderCarousel('premium_first_week', 'first_week')}
            </div>
            
            <div className="mt-16 text-center">
                <a href="#" className="font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-700 py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform inline-block">
                    {t('premium_subscribe_now')}
                </a>
            </div>

            <div className="mt-16 pt-8 border-t-2 border-dashed border-slate-300 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-[#192A56] text-center mb-2">{t('premium_rate_agency')}</h3>
                <p className="text-slate-600 text-center mb-6">{t('premium_rate_consultant')}</p>
                {feedbackSent ? (
                     <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center font-semibold animate-fade-in">
                         {t('premium_feedback_sent')}
                     </div>
                ) : (
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} onClick={() => handleRating(star)}>
                                    <Star size={32} className={`transition-colors ${rating >= star ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
                                </button>
                            ))}
                        </div>
                        <textarea placeholder={t('premium_your_feedback')} className="w-full h-24 p-3 rounded-lg border border-slate-300 focus:ring-purple-500 focus:border-purple-500 transition"></textarea>
                        <button onClick={handleSendFeedback} className="font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all w-full mt-4 hover:bg-indigo-800">{t('premium_send_feedback')}</button>
                    </div>
                )}
            </div>
        </div>
    );
};


const DashboardScreen = () => {
    const { t } = useLanguage();
    const { userData, isFirstTimeUser, showToast, saveItem, savedItems, setSavedItems, toast, setToast, agendaItems, addAgendaItem, toggleAgendaItem, updateAgendaItem, showTips, setShowTips, goBack } = useApp();
    const [activeSection, setActiveSection] = useState('home');
    const [showWelcome, setShowWelcome] = useState(isFirstTimeUser);
    const [showPermission, setShowPermission] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [activeTip, setActiveTip] = useState(null);
    const [jeiQuery, setJeiQuery] = useState(null);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
    }, [activeSection]);

    useEffect(() => {
        if (isFirstTimeUser) {
            setTimeout(() => setShowPermission(true), 3000);
        }
    }, [isFirstTimeUser]);

    useEffect(() => {
        if (!showTips) return;
        const interval = setInterval(() => {
            const random = Math.random();
            if (random < 0.8) { 
                const tipsForDestination = mockDatabase.tips[userData.destinationCountry] || mockDatabase.tips["Irlanda"];
                const randomTip = tipsForDestination[Math.floor(Math.random() * tipsForDestination.length)];
                showToast(randomTip, Lightbulb, 10000, [
                    {label: t('salvar'), onClick: () => saveItem({type: 'tip', content: randomTip})},
                    {label: t('nao_mostrar_novamente'), onClick: () => setShowTips(false)}
                ]);
            }
        }, 600000); // 10 minutes
        return () => clearInterval(interval);
    }, [userData, saveItem, showToast, t, showTips, setShowTips]);

    if (!userData) return <LoadingScreen />;

    const handleOpenTipModal = () => {
        const tipsForDestination = mockDatabase.tips[userData.destinationCountry] || mockDatabase.tips["Irlanda"];
        const randomTip = tipsForDestination[Math.floor(Math.random() * tipsForDestination.length)];
        setActiveTip(randomTip);
    }

    const handleJeiSearch = (query) => {
        setShowSearchModal(false);
        setJeiQuery(query);
    }

    const renderModalContent = () => {
        switch(activeModal) {
            case 'folder': return <FolderModal t={t} savedItems={savedItems} setSavedItems={setSavedItems} />;
            case 'calculator': return <CalculatorModal t={t} onSave={saveItem} />;
            case 'currency': return <CurrencyModal t={t} />;
            case 'timezone': return <TimezoneModal t={t} userData={userData} />;
            case 'agenda': return <AgendaModal t={t} agendaItems={agendaItems} onToggle={toggleAgendaItem} onAddTask={addAgendaItem} onUpdateTask={updateAgendaItem} />;
            default: return null;
        }
    }
    
    const renderActiveSection = () => {
        switch(activeSection) {
            case 'home':
                return (
                  <div className="p-4">
                    <iframe className="w-full aspect-video rounded-lg shadow-lg" src="https://www.youtube.com/embed/UkmJGrEqWnY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                );
            case 'journey':
                return <JourneySection agendaItems={agendaItems} onOpenAgenda={() => setActiveModal('agenda')} />;
            case 'premium':
                return <PremiumSection />;
            default:
                return (
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <p className="text-center text-slate-500">{t('in_construction')}</p>
                    </div>
                );
        }
    }

    return (
        <div className="w-full h-dvh flex flex-col bg-slate-100">
            {showWelcome && <WelcomePopup userData={userData} onClose={() => setShowWelcome(false)} t={t} />}
            {showPermission && <NotificationPermissionModal t={t} onClose={(allowed) => { console.log("Notifications allowed:", allowed); setShowPermission(false); }} />}
            {activeModal && <Modal title={t(`${activeModal}_modal_title`)} onClose={() => setActiveModal(null)}>{renderModalContent()}</Modal>}
            {activeTip && <TipOfTheDayModal tip={activeTip} onClose={() => setActiveTip(null)} onSave={saveItem} t={t} />}
            {jeiQuery && <JeiResponseModal query={jeiQuery} onClose={() => setJeiQuery(null)} onSave={saveItem} t={t} />}
            {showSearchModal && <JeiSearchModal onSearch={handleJeiSearch} onClose={() => setShowSearchModal(false)} t={t} />}
            <ToastNotification toast={toast} onClose={() => setToast(null)} t={t} />
            
            <div ref={headerRef} className="fixed top-0 left-0 right-0 z-30 bg-slate-100 shadow-md">
                <DashboardHeader userData={userData} onBack={goBack} showBackButton={true} />
                {activeSection === 'home' ? (
                    <CountdownBar userData={userData} />
                ) : (
                    <SpecialIconsBar onIconClick={setActiveModal} />
                )}
            </div>
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24" style={{ marginTop: headerHeight }}>
                <div className="max-w-7xl mx-auto space-y-6">
                    {renderActiveSection()}
                </div>
            </main>

            <LeftFloatingActionButtons onTipClick={handleOpenTipModal} onJeiClick={() => setShowSearchModal(true)} />
            <DashboardBottomNav onNavigate={setActiveSection} activeSection={activeSection} />
        </div>
    );
};

// --- Main App Component ---
const Main = () => {
    const { screen } = useApp();
    switch (screen) {
        case 'auth': return <AuthScreen />;
        case 'auth-flow': return <AuthFlowScreen />;
        case 'dashboard': return <DashboardScreen />;
        case 'terms-student': return <TermsScreen type="student" />;
        case 'terms-agency': return <TermsScreen type="agency" />;
        default: return <AuthScreen />;
    }
}

function AppContent() {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const tailwindScriptId = 'tailwind-cdn';
        if (!document.getElementById(tailwindScriptId)) {
            const script = document.createElement('script');
            script.id = tailwindScriptId;
            script.src = 'https://cdn.tailwindcss.com';
            document.head.appendChild(script);
        }

        const scriptUrls = [
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
        ];

        scriptUrls.forEach(url => {
            const scriptId = url.split('/').pop();
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                script.src = url;
                script.async = true;
                document.body.appendChild(script);
            }
        });

        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                body { 
                    font-family: 'Inter', sans-serif; 
                    -webkit-font-smoothing: antialiased; 
                    background-color: #FBF9F6;
                }
                .font-title-elegant { font-family: 'Inter', sans-serif; font-weight: 300; }
                .shadow-top { box-shadow: 0 -4px 15px -1px rgb(0 0 0 / 0.1), 0 -2px 8px -2px rgb(0 0 0 / 0.1); }

                .custom-scrollbar::-webkit-scrollbar { height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #facc15; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #facc15 transparent; }

                @keyframes loading-bar-full { from { width: 0%; } to { width: 100%; } }
                .animate-loading-bar-full { animation: loading-bar-full 1.5s ease-in-out forwards; }
                
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0)} }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
                
                @keyframes fade-slide-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-slide-up { animation: fade-slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

                @keyframes text-gradient-anim-bg {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-text-gradient-bg { animation: text-gradient-anim-bg 1s 0.5s forwards; }
                
                @keyframes text-gradient-anim-fg {
                     0% { background-size: 200% 200%; background-position: 200% center; }
                     100% { background-size: 100% 100%; background-position: 0% center; }
                }
                .animate-text-gradient-fg { animation: text-gradient-anim-fg 1s 0.5s forwards; }

                @keyframes fade-in-fast { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-in-out forwards; }
                @keyframes slide-up-modal { from { transform: translateY(100%); } to { transform: translateY(0); } }
                .animate-slide-up-modal { animation: slide-up-modal 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                @keyframes slide-down { from { opacity: 0; transform: translateY(-20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .animate-slide-down { animation: slide-down 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                @keyframes slide-up { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                @keyframes slide-in-left { from { opacity: 0; transform: translateX(-100%); } to { opacity: 1; transform: translateX(0); } }
                .animate-slide-in-left { animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                .prose {
                    color: #374151; line-height: 1.7;
                }
                .prose h2 {
                    color: #192A56;
                }
            `}</style>
            <div className="w-full h-dvh antialiased flex flex-col">
                <div className="relative w-full flex-grow flex flex-col bg-[#FBF9F6]">
                    {isLoading ? <LoadingScreen /> : <Main />}
                </div>
            </div>
        </>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <AppProvider>
                <AppContent />
            </AppProvider>
        </LanguageProvider>
    );
}
