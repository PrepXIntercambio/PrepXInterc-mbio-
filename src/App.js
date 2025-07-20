import React, { useState, useEffect, createContext, useContext, useCallback, useRef, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    ArrowRight, Bot, Folder, ArrowDown, Hand, MessageSquarePlus, AlertCircle, Calculator, Send, Wifi, Utensils, Route, HeartPulse, Bell, User, Building as Agency, ExternalLink, Moon, Sun, Download, Trash2, Edit, CheckSquare, Square, Mail as MailIcon, Plus, Minus, Tv2, GripVertical, FileDown, Cloud, SunDim, HelpCircle, Phone, MessageSquare, ThumbsDown, BarChart3, Settings, FileText, Filter, Crown
} from 'lucide-react';

// --- Firebase Mock Initialization ---
// Inicialização simulada do Firebase. Em um ambiente real, as configurações viriam de um arquivo seguro.
try {
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    initializeApp(firebaseConfig);
} catch (error) {
    console.error("Firebase initialization failed. Using mock setup.", error);
}

// --- KNOWLEDGE BASE & MOCK DATA (Expanded for Agency) ---
// Base de conhecimento para a IA e dados simulados para popular a aplicação.
const KNOWLEDGE_BASE = `A Prep-ON é uma ferramenta que chamamos de assistente ou app com o objetivo de ajudar futuros intercambistas a chegarem preparados no destino. Para isso, foi criada uma estrutura organizada pensando em cada usuário e o destino escolhido. A partir daí, uma linha do tempo é apresentada em ordem cronológica para não só ajudar na organização, mas também para ser um ambiente para alertar o futuro intercambista de situações ou coisas que faltam e que talvez ele tenha esquecido. Todas as dicas e orientações são geradas com fontes oficiais de consulados, imigrações, órgãos oficiais do governo, através de IA do Gemini, assim como com experiências práticas de quem já vivenciou tudo isso que está sendo informado. A ferramenta não substitui a importância do consultor, agência ou escolas, mas sim é mais uma peça na engrenagem, estando ali quando outras opções, por algum motivo, estiverem ocupadas. Um consultor também precisa ajudar milhares de clientes, e muitas vezes uma informação que pode ser difícil de encontrar na internet, no Prep-ON está ali na mão, ligado e pronto.`;

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
        auth_slogan: "Sua jornada de intercâmbio, <span class='font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>inteligente</span> e <span class='font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>conectada</span>.",
        auth_iam_student: "Sou Intercambista",
        auth_iam_agency: "Sou Agência",
        login_with_google: "Continuar com o Google",
        landing_main_title: "Seu intercâmbio, do <span class='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>sonho</span> ao <span class='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>embarque</span>, sem imprevistos.",
        landing_main_subtitle: "Somos a peça que faltava na engrenagem. O OnliPrep une a precisão da Inteligência Artificial com a experiência de quem já viveu o intercâmbio, garantindo que você esteja sempre um passo à frente.",
        value_prop_1_title: "Jornada Organizada",
        value_prop_1_text: "Uma linha do tempo inteligente que se adapta ao seu perfil e destino, garantindo que você não perca nenhum prazo e saiba exatamente o próximo passo.",
        value_prop_2_title: "Inteligência & Experiência",
        value_prop_2_text: "Nossa IA, turbinada pelo Gemini, cruza dados de fontes oficiais com a experiência prática de quem já viveu tudo isso, entregando a informação que você precisa.",
        value_prop_3_title: "Seu Suporte, Sempre ON",
        value_prop_3_text: "Seu consultor está ocupado? Sem problemas. O OnliPrep é seu assistente pessoal, pronto para te ajudar a qualquer hora, em qualquer lugar.",
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
        status_researching: "Pesquisando",
        status_closed: "Contrato assinado",
        status_packing: "De malas prontas",
        almost_there_title: "Quase lá!",
        departure_date_label: "Qual sua previsão de embarque?",
        start_journey_button: "Começar minha jornada",
        sending_data: "Enviando seus dados...",
        data_sent_success: "Sucesso! Bem-vindo(a)!",
        data_sent_error: "Ocorreu um erro. Tente novamente.",
        creating_your_dashboard: "Criando seu dashboard...",
        // Dashboard & Tools
        cases: "Cases",
        journey: "Jornada",
        preparatorio_title: "Preparatório",
        bate_volta: "Bate Volta",
        onlipremium: "OnliPremium",
        welcome_title_dynamic: "Estávamos te esperando, {name}!",
        welcome_subtitle: "O menu mapa te levará pra onde você quiser. Explore!",
        welcome_button: "Explorar Dashboard",
        folder: "Pasta",
        currency: "Câmbio",
        calculator: "Calc",
        timezone: "Fuso",
        agenda: "Agenda",
        // Modal Titles
        folder_modal_title: "Meus Documentos",
        currency_modal_title: "Conversor de Moedas",
        calculator_modal_title: "Calculadora de Investimento",
        timezone_modal_title: "Fuso Horário",
        agenda_modal_title: "Minha Agenda",
        teacher_ana_modal_title: "Teacher Ana - Prática de Inglês",
        jei_response_title: "Resposta do Jei",
        edit_task: "Editar Tarefa",
        update_task: "Atualizar Tarefa",
        agenda_add_task: "Adicionar nova tarefa",
        agenda_task_name: "Nome da tarefa",
        agenda_completed_tasks: "Tarefas Concluídas",
        folder_search_placeholder: "Buscar nos seus itens...",
        new_folder: "Nova Pasta",
        new_document: "Baixar como PDF",
        folder_name_placeholder: "Nome da nova pasta",
        calculator_planning_info: "Planeje seus gastos mensais. Use a busca inteligente para estimar custos.",
        investment_item_name: "Nome do item (ex: Aluguel)",
        investment_add_item: "Adicionar item",
        investment_total: "Total estimado",
        calculator_search_label: "Busca Inteligente de Custos",
        calculator_search_placeholder: "Ex: Custo de vida em Dublin",
        calculator_search_result_title: "Custo estimado para {item}:",
        calculator_search_result_source: "Fonte: Estimativa baseada em IA",
        currency_source: "Cotações apenas para referência",
        currency_last_updated: "Atualizado em:",
        currency_partner_title: "Desconto exclusivo com nosso parceiro",
        currency_coupon_code: "ONLIPREP10",
        currency_unlocking: "Desbloqueando...",
        currency_unlock_prompt: "Desbloquear cupom",
        timezone_your_location: "Sua localização",
        jei_thinking: "Jei está pensando...",
        jei_prompt_placeholder: "Pergunte qualquer coisa sobre seu intercâmbio...",

        // Premium Section
        premium_contact_agency_title: "Falar com a minha agência",
        premium_contact_reason: "Motivo do contato",
        premium_contact_reason_doubt: "Dúvida",
        premium_contact_reason_suggestion: "Sugestão",
        premium_contact_reason_praise: "Elogios",
        premium_contact_reason_complaint: "Reclamação",
        premium_contact_reason_urgency: "Urgência",
        premium_contact_message: "Sua mensagem",
        premium_contact_send: "Enviar",
        premium_contact_sent_success: "Sua mensagem foi enviada com sucesso!",
        premium_agency_select: "Selecione a agência",
        premium_eval_title: "Como você avalia sua experiência?",
        premium_eval_satisfied: "Satisfeito",
        premium_eval_ok: "Satisfeito, com ressalvas",
        premium_eval_unsatisfied: "Muito Insatisfeito",
        premium_eval_thanks: "Obrigado pelo seu feedback!",
        // Other
        tip_of_the_day: "Dica do Dia",
        teacher_ana: "Teacher Ana",
        // AGENCY LANDING PAGE
        agency_landing_title: "Eleve a <span class='text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500'>experiência</span> do seu intercambista.",
        agency_landing_subtitle: "O OnliPrep é o seu braço direito digital. Automatizamos a jornada do aluno e liberamos seus consultores para focarem no que fazem de melhor: vender sonhos.",
        agency_login_title: "Acesse seu painel",
        agency_name_placeholder: "Nome da Agência",
        agency_id_placeholder: "ID da Agência ou E-mail",
        agency_password_placeholder: "Sua senha",
        agency_login_button: "Entrar",
        agency_pricing_title: "Planos pensados para o <span class='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>sucesso</span> da sua agência",
        voucher_title: "Vouchers Individuais",
        voucher_subtitle: "Ideal para começar ou para demandas pontuais.",
        voucher_1_title: "Pacote Bronze",
        voucher_1_desc: "5 clientes",
        voucher_1_price: "R$ 50,00",
        voucher_2_title: "Pacote Prata",
        voucher_2_desc: "10 clientes",
        voucher_2_price: "R$ 70,00",
        voucher_3_title: "Pacote Ouro",
        voucher_3_desc: "20 clientes",
        voucher_3_price: "R$ 100,00",
        subscription_title: "Assinaturas Mensais",
        subscription_subtitle: "A melhor opção para crescimento e escala.",
        sub_1_title: "Plano Essencial",
        sub_1_price: "R$ 99,90",
        sub_1_features: ["Até 30 clientes/mês", "90 dias de OnliPremium", "Suporte via Chat"],
        sub_2_title: "Plano Performance",
        sub_2_price: "R$ 149,90",
        sub_2_features: ["Até 50 clientes/mês", "OnliPremium Vitalício", "Painel para Consultores", "Relatórios NPS"],
        most_popular: "Mais Popular",
        buy_button: "Comprar",
        subscribe_button: "Assinar",

        // AGENCY DASHBOARD
        agency_dashboard_home: "Início",
        agency_dashboard_clients: "Clientes",
        agency_dashboard_reports: "Relatórios",
        agency_dashboard_settings: "Configurações",
        agency_dashboard_nps: "NPS Mensal",
        agency_dashboard_recent_activity: "Atividades Recentes",
        agency_dashboard_no_activity: "Nenhuma atividade recente.",
        agency_dashboard_client_profile: "Perfil do Cliente",
        agency_dashboard_satisfaction: "Satisfação",
        agency_dashboard_journey_progress: "Progresso da Jornada",
        agency_dashboard_tasks_completed: "Tarefas Concluídas",
        agency_dashboard_tasks_pending: "Tarefas Pendentes",
        agency_dashboard_confirm_receipt: "Confirmar recebimento",
        agency_dashboard_send_content: "Enviar Conteúdo Personalizado",
        agency_dashboard_content_title: "Título do Conteúdo",
        agency_dashboard_video_link: "Link do Vídeo (YouTube, Vimeo, etc.)",
        agency_dashboard_message: "Mensagem para o aluno",
        agency_dashboard_send_whatsapp: "Enviar por WhatsApp",
        agency_dashboard_send_dashboard: "Enviar para o Dashboard",
        agency_dashboard_support_onliprep: "Suporte OnliPrep",
        agency_dashboard_talk_to_jei: "Falar com Jei",
        agency_dashboard_whatsapp_support: "Suporte via WhatsApp",
        agency_dashboard_churn_strategy: "Estratégia Anti-Churn",
        agency_dashboard_churn_text: "Baseado no NPS deste mês, recomendamos focar em [Ação Sugerida pela IA] para melhorar a satisfação dos clientes em fase de [Estágio do Funil]."
    },
    en: { /* ... */ }
};

const mockDatabase = {
    destinations: { "África do Sul": ["Cidade do Cabo", "Joanesburgo"], "Alemanha": ["Berlim", "Munique", "Hamburgo", "Frankfurt"], "Argentina": ["Buenos Aires", "Córdoba"], "Austrália": ["Sydney", "Melbourne", "Brisbane", "Gold Coast", "Adelaide", "Perth"], "Canadá": ["Toronto", "Vancouver", "Montreal", "Calgary"], "Emirados Árabes Unidos": ["Dubai"], "Espanha": ["Madri", "Barcelona"], "Estados Unidos": ["Nova Iorque", "Los Angeles", "Boston", "Miami"], "Inglaterra": ["Londres", "Manchester"], "Irlanda": ["Dublin", "Cork"], "Malta": ["St. Julian's", "Sliema"], "Nova Zelândia": ["Auckland"], },
    agencies: ["WEGO Intercâmbios", "CI Intercâmbio", "Experimento", "STB"],
    weather: { "Dublin, Irlanda": { temp: 14, icon: Cloud }, "Toronto, Canadá": { temp: 22, icon: SunDim }, "Sydney, Austrália": { temp: 18, icon: Sun }, "St. Julian's, Malta": { temp: 28, icon: Sun }, "Nova Iorque, Estados Unidos": {temp: 25, icon: Sun } },
    valueSlides: [ { icon: Compass, titleKey: 'value_prop_1_title', textKey: 'value_prop_1_text' }, { icon: BrainCircuit, titleKey: 'value_prop_2_title', textKey: 'value_prop_2_text' }, { icon: Handshake, titleKey: 'value_prop_3_title', textKey: 'value_prop_3_text' }, ],
    partners: ["WEGO Intercâmbios", "Itaú", "Wise", "TM"],
    tips: { "Irlanda": ["Sempre tenha um guarda-chuva à mão, o tempo em Dublin muda a cada 5 minutos!", "A melhor pint de Guinness está no Gravity Bar, no topo da Guinness Storehouse.", "Use o Leap Card para economizar no transporte público.", "Os penhascos de Moher são um passeio de um dia imperdível saindo de Dublin."], "Canadá": ["Prepare-se para o frio! Um bom casaco de inverno é essencial.", "Tim Hortons é uma instituição canadense. Experimente um 'Double-Double'.", "A gorjeta (tip) é geralmente de 15-20% em restaurantes.", "Explore os parques nacionais, a natureza do Canadá é deslumbrante."], "Malta": ["Não se esqueça do protetor solar! O sol em Malta é forte o ano todo.", "Explore as praias escondidas como St. Peter's Pool.", "Use o app da Bolt ou Uber para se locomover, é mais prático que o ônibus.", "A vida noturna em Paceville é agitada, mas vá com um grupo de amigos."] },
    journeyTasks: [ { step: 1, task: "Definir destino e tipo de curso", daysBefore: 240 }, { step: 2, task: "Aplicar para o Passaporte", daysBefore: 180 }, { step: 3, task: "Pesquisar e aplicar para o Visto", daysBefore: 120 }, { step: 4, task: "Comprar passagens aéreas", daysBefore: 90 }, { step: 5, task: "Contratar seguro viagem", daysBefore: 60 }, { step: 6, task: "Agendar exame médico", daysBefore: 50 }, { step: 7, task: "Confirmar acomodação inicial", daysBefore: 30 }, { step: 8, task: "Fazer check-in online", daysBefore: 1 }, ],
    journeySteps: { pesquisando: [ { id: 1, name: "Definir Sonho", icon: Lightbulb }, { id: 2, name: "Análise Financeira", icon: Wallet }, { id: 3, name: "Escolher Destino", icon: MapPin }, { id: 4, name: "Tipo de Visto", icon: Stamp }, { id: 5, name: "Escolher Agência", icon: Handshake }, { id: 6, name: "Assinar Contrato", icon: FileSignature }, ], contrato_assinado: [ { id: 1, name: "Pagamento Inicial", icon: Coins, completed: true }, { id: 2, name: "Matrícula Escola", icon: GraduationCap, completed: true }, { id: 3, name: "Passaporte", icon: Passport, completed: true }, { id: 4, name: "Aplicação Visto", icon: Stamp, completed: true }, { id: 5, name: "Comprovação Financeira", icon: FolderOpen, completed: false }, { id: 6, name: "Exames Médicos", icon: HeartPulse, completed: false }, { id: 7, name: "Compra Passagem", icon: Plane, completed: false }, { id: 8, name: "Seguro Viagem", icon: ShieldCheck, completed: false }, { id: 9, name: "Acomodação", icon: BedDouble, completed: false }, { id: 10, name: "Moeda Estrangeira", icon: Coins, completed: false }, { id: 11, name: "Reunião Pré-Embarque", icon: Users, completed: false }, { id: 12, name: "Fazer as Malas", icon: Backpack, completed: false }, ], de_malas_prontas: [ { id: 1, name: "Pagamento Final", icon: CheckCircle }, { id: 2, name: "Documentos Finais", icon: FileSignature }, { id: 3, name: "Passaporte OK", icon: Passport }, { id: 4, name: "Visto Aprovado", icon: Stamp }, { id: 5, name: "Finanças OK", icon: Wallet }, { id: 6, name: "Saúde OK", icon: HeartPulse }, { id: 7, name: "Passagem Comprada", icon: Plane }, { id: 8, name: "Seguro OK", icon: ShieldCheck }, { id: 9, name: "Acomodação OK", icon: BedDouble }, { id: 10, name: "Moeda Comprada", icon: Coins }, { id: 11, name: "Reunião OK", icon: Users }, { id: 12, name: "Malas Prontas", icon: Backpack }, ] },
    journeyContent: { 'Malta': { '4': { title: 'Visto para Malta', content: 'Para cursos de até 90 dias, brasileiros não precisam de visto. Acima disso, você entra como turista e aplica para a permissão de estudante já em Malta. É crucial levar todos os documentos organizados (carta da escola, comprovação financeira, seguro, etc.) para apresentar na imigração. Nosso time te dará o checklist completo!' }, '9': { title: 'Acomodação em Malta', content: 'Malta tem muitas opções, desde residências estudantis (ótimo para fazer amigos) a apartamentos compartilhados. St. Julian\'s e Sliema são populares, mas podem ser mais caros. Considere áreas como Msida ou Gzira para um melhor custo-benefício. Comece a procurar com pelo menos 2 meses de antecedência!' } }, 'default': { '4': { title: 'Tipo de Visto', content: 'Cada país tem sua regra. Visto de estudante, trabalho, turismo... a escolha certa depende do seu objetivo. Esse é um dos passos mais críticos, e um erro aqui pode custar caro. Vamos analisar seu perfil para definir a melhor estratégia.' }, '9': { title: 'Acomodação Inicial', content: 'Recomendamos fechar as primeiras 2 a 4 semanas de acomodação ainda no Brasil. Isso te dá segurança e tempo para procurar um lugar definitivo com calma quando chegar. Homestay (casa de família) é uma ótima opção para imersão cultural no início.' } } },
    premiumContent: { 'consultancy': Array.from({ length: 8 }, (_, i) => ({ id: `cons-${i}`, title: `Consultoria Exclusiva #${i + 1}`, locked: true })), },
    cases: [ { id: 1, name: "Mariana L.", destination: "Dublin, Irlanda", story: "Realizou o sonho de estudar e trabalhar na Europa, hoje é gerente de projetos.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop" }, { id: 2, name: "João P.", destination: "Toronto, Canadá", story: "Fez um curso de especialização e conseguiu imigrar através do programa de estudos.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" }, { id: 3, name: "Carla S.", destination: "Sydney, Austrália", story: "Aprendeu inglês na prática e viajou por todo o sudeste asiático nas férias.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" }, ],
    agencyStudents: [
        { id: 1, name: "Mariana L.", destination: "Dublin, Irlanda", status: 'de_malas_prontas', photoURL: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", nps: 5, journeyStatus: 95, email: "mariana.l@example.com", phone: "5511987654321", course: "Inglês Geral", period: "24 semanas", departure: "2025-09-15" },
        { id: 2, name: "João P.", destination: "Toronto, Canadá", status: 'contrato_assinado', photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", nps: 4, journeyStatus: 40, email: "joao.p@example.com", phone: "5521912345678", course: "Business English", period: "12 semanas", departure: "2025-10-01" },
        { id: 3, name: "Carla S.", destination: "Sydney, Austrália", status: 'de_malas_prontas', photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", nps: 5, journeyStatus: 90, email: "carla.s@example.com", phone: "5531998761234", course: "IELTS Prep", period: "8 semanas", departure: "2025-08-20" },
        { id: 4, name: "Pedro G.", destination: "St. Julian's, Malta", status: 'pesquisando', photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", nps: null, journeyStatus: 15, email: "pedro.g@example.com", phone: "5541987654321", course: "Curso de Férias", period: "4 semanas", departure: "2026-01-10" },
    ],
    npsData: [
        { month: 'Jan', nps: 8.5, reviews: 15 }, { month: 'Fev', nps: 8.8, reviews: 18 }, { month: 'Mar', nps: 9.1, reviews: 22 },
        { month: 'Abr', nps: 9.0, reviews: 20 }, { month: 'Mai', nps: 9.3, reviews: 25 }, { month: 'Jun', nps: 9.5, reviews: 28 },
    ]
};

// --- Contexts ---
// Contexto para gerenciamento de idioma e traduções.
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

// Contexto principal da aplicação para gerenciar estado global.
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
    const [agencyNotifications, setAgencyNotifications] = useState([]);

    // Função para exibir notificações toast.
    const showToast = (message, icon = Info, duration = 5000, actions = []) => {
        setToast({ message, icon, id: Date.now(), actions });
    };

    // Função para exibir notificações no dashboard da agência.
    const showAgencyNotification = (message, icon = Bell) => {
        const newNotif = { id: Date.now(), message, icon };
        setAgencyNotifications(prev => [newNotif, ...prev]);
        // Simula um alerta sonoro para feedback do usuário.
        console.log("PLAY_SOUND: new-notification.mp3");
    };
    
    // Gerencia o processo de login do usuário.
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
    
    // Simula login com Google.
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
    
    // Simula login com e-mail e senha.
    const handleEmailLogin = (e) => {
        e.preventDefault();
        const mockUser = {
            name: "Usuário Antigo",
            email: e.target.elements.email.value,
            photoURL: `https://i.pravatar.cc/80?u=old-user`,
            uid: '67890',
            destinationCountry: 'Malta',
            destination: 'St. Julian\'s, Malta',
            departureDate: '2025-12-31',
            status: 'de_malas_prontas',
            isNew: false
        };
        handleLogin(mockUser);
    }

    // Gerencia o login da agência.
    const handleAgencyLogin = () => {
        setScreen('agency-dashboard');
        setTimeout(() => showAgencyNotification("Nova avaliação de Mariana L. (5 estrelas)", Star), 2000);
    };

    // Finaliza o processo de onboarding do novo usuário.
    const completeOnboarding = (onboardingData) => {
        setUserData(prev => ({ ...prev, ...onboardingData }));
        setScreen('dashboard');
    };
    
    // Efetua o logout do usuário.
    const logout = () => {
        setUserData(null);
        setScreen('auth');
        setAuthFlowStep('registration');
    };

    // Navega para a tela anterior.
    const goBack = () => {
        if (screen === 'dashboard' || screen === 'agency-landing' || screen === 'agency-dashboard') {
            setScreen('auth');
        } else if (screen.startsWith('terms-') || screen === 'auth-flow') {
            setScreen('auth');
        }
    }

    // Salva um item na pasta do usuário.
    const saveItem = (item) => {
        setSavedItems(prev => [...prev, {id: Date.now(), ...item, isNew: true}]);
        showToast("Salvo na sua pasta!", CheckCircle, 3000);
    }
    
    // Funções para gerenciar a agenda do usuário.
    const addAgendaItem = (item) => {
        setAgendaItems(prev => [...prev, {id: `user-${Date.now()}`, ...item, completed: false, completedAt: null, isJourneyTask: false}]);
    }
    const updateAgendaItem = (id, updatedData) => {
        setAgendaItems(prev => prev.map(item => item.id === id ? {...item, ...updatedData} : item));
    }
    const toggleAgendaItem = (id) => {
        setAgendaItems(prev => prev.map(item => item.id === id ? {...item, completed: !item.completed, completedAt: !item.completed ? new Date().toISOString() : null} : item));
    }
    
    // Efeito para popular a agenda com tarefas da jornada quando a data de embarque é definida.
    useEffect(() => {
        if(userData?.departureDate && mockDatabase.journeyTasks) {
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
        screen, setScreen,  
        userData, setUserData,  
        isFirstTimeUser, setIsFirstTimeUser,  
        toast, showToast, setToast,  
        authFlowStep, setAuthFlowStep,  
        savedItems, setSavedItems,  
        agendaItems, addAgendaItem, toggleAgendaItem, updateAgendaItem,
        showTips, setShowTips,
        handleLogin, handleGoogleLogin, handleEmailLogin,  
        completeOnboarding, logout, goBack, saveItem,
        handleAgencyLogin, agencyNotifications, setAgencyNotifications, showAgencyNotification
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
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter relative inline-flex items-center font-serif">
            <span className="text-[#192A56] font-light">Onli</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2BE2] via-[#4169E1] to-[#4B0082]">Prep</span>
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
                    <h1 className="text-4xl font-extrabold tracking-tighter relative inline-flex items-center mb-4 font-serif">
                        <span className="font-light text-white/80">Onli</span>
                        <span className="text-white">Prep</span>
                    </h1>
                    <p className="text-slate-300 text-sm" dangerouslySetInnerHTML={{ __html: t('auth_slogan') }}></p>
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
                        <a href="https://www.linkedin.com/in/maur%C3%ADciosantana?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white transition-colors"><Linkedin size={24} /></a>
                        <a href="https://www.instagram.com/meajuda_intercambio?igsh=aWd6N3g3ZnNyZ2gy" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white transition-colors"><Instagram size={24} /></a>
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
    
    return (
        <div className="w-full min-h-full flex flex-col bg-white">
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
                        <p className="text-slate-600 mt-2 mb-8 text-lg" dangerouslySetInnerHTML={{ __html: t('auth_slogan') }}></p>
                        <div className="w-full p-8 md:p-12 rounded-2xl bg-slate-50 mb-8">
                            <h2 className="text-[#192A56] text-2xl md:text-3xl font-bold text-center" dangerouslySetInnerHTML={{ __html: t('landing_main_title') }}></h2>
                            <p className="text-slate-600 text-center mt-2">{t('landing_main_subtitle')}</p>
                        </div>
                        
                        <div className="flex justify-center items-center gap-4 text-base font-semibold text-[#192A56] mb-4">
                            <button onClick={handleRegisterClick} className="hover:underline">{t('auth_iam_student')}</button>
                            <span className="text-slate-300">|</span>
                            <button onClick={() => setScreen('agency-landing')} className="hover:underline">{t('auth_iam_agency')}</button>
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
            // Using a custom toast/alert instead of window.alert
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
        dreamDestination: 'Malta',
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
            { key: 'status_researching', value: 'pesquisando' },
            { key: 'status_closed', value: 'contrato_assinado' },
            { key: 'status_packing', value: 'de_malas_prontas' },
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
                                {t(option.key)}
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

// --- NEW AGENCY COMPONENTS ---
const AgencyLandingScreen = () => {
    const { t } = useLanguage();
    const { handleAgencyLogin, setScreen } = useApp();

    const PricingCard = ({ title, price, features, popular = false }) => (
        <div className={`relative border rounded-2xl p-6 flex flex-col ${popular ? 'border-purple-600 border-2' : 'border-slate-200'}`}>
            {popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t('most_popular')}</div>}
            <h3 className="text-xl font-bold text-[#192A56]">{title}</h3>
            <p className="text-3xl font-extrabold my-4">{price}<span className="text-base font-normal text-slate-500">/mês</span></p>
            <ul className="space-y-2 text-slate-600 mb-6">
                {features.map(f => <li key={f} className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/>{f}</li>)}
            </ul>
            <button className={`mt-auto font-semibold py-3 px-6 rounded-lg w-full transition-transform hover:scale-105 ${popular ? 'bg-purple-600 text-white' : 'bg-slate-100 text-[#192A56]'}`}>{t('subscribe_button')}</button>
        </div>
    );
    
    const VoucherCard = ({ title, desc, price }) => (
       <div className="border border-slate-200 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-[#192A56]">{title}</h3>
            <p className="text-slate-500">{desc}</p>
            <p className="text-3xl font-extrabold my-4">{price}</p>
            <button className="font-semibold py-3 px-6 rounded-lg w-full transition-transform hover:scale-105 bg-amber-400 text-[#192A56]">{t('buy_button')}</button>
        </div>
    );

    return (
        <div className="w-full min-h-dvh bg-[#111827] text-white overflow-y-auto">
            <button onClick={() => setScreen('auth')} className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 transition-colors z-20">
                <ArrowLeft />
            </button>
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 overflow-hidden">
                     {/* O vídeo do YouTube pode ser bloqueado em alguns iframes. Usando um vídeo de estoque como fallback. */}
                     <video
                         autoPlay
                         loop
                         muted
                         playsInline
                         className="w-full h-full object-cover opacity-20"
                         src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
                     />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/80 to-transparent"></div>
                </div>
                <div className="relative z-10 w-full max-w-3xl">
                     <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4"
                         dangerouslySetInnerHTML={{ __html: t('agency_landing_title') }} />
                     <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                         {t('agency_landing_subtitle')}
                    </p>
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl max-w-sm mx-auto">
                        <h2 className="text-xl font-bold mb-4">{t('agency_login_title')}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleAgencyLogin(); }} className="space-y-4">
                            <input type="text" placeholder={t('agency_name_placeholder')} className="w-full py-3 px-4 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 outline-none" required />
                            <input type="email" placeholder={t('agency_id_placeholder')} className="w-full py-3 px-4 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 outline-none" required />
                            <input type="password" placeholder={t('agency_password_placeholder')} className="w-full py-3 px-4 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 outline-none" required />
                            <button type="submit" className="w-full font-semibold bg-amber-400 text-[#192A56] py-3 rounded-lg hover:bg-amber-300 transition-colors">
                                {t('agency_login_button')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="py-20 px-4 bg-[#FBF9F6] text-[#192A56]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12"
                        dangerouslySetInnerHTML={{ __html: t('agency_pricing_title') }} />

                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-center">{t('subscription_title')}</h3>
                        <p className="text-center text-slate-500 mb-8">{t('subscription_subtitle')}</p>
                        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            <PricingCard title={t('sub_1_title')} price={t('sub_1_price')} features={t('sub_1_features')} />
                            <PricingCard title={t('sub_2_title')} price={t('sub_2_price')} features={t('sub_2_features')} popular={true} />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-bold text-center">{t('voucher_title')}</h3>
                        <p className="text-center text-slate-500 mb-8">{t('voucher_subtitle')}</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <VoucherCard title={t('voucher_1_title')} desc={t('voucher_1_desc')} price={t('voucher_1_price')} />
                            <VoucherCard title={t('voucher_2_title')} desc={t('voucher_2_desc')} price={t('voucher_2_price')} />
                            <VoucherCard title={t('voucher_3_title')} desc={t('voucher_3_desc')} price={t('voucher_3_price')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AgencyDashboard = () => {
    const [activeView, setActiveView] = useState('home'); // home, clients, reports, settings
    const [selectedClient, setSelectedClient] = useState(null);
    const { t } = useLanguage();
    const { logout, agencyNotifications, setAgencyNotifications } = useApp();

    const renderView = () => {
        if(selectedClient) return <AgencyClientProfile client={selectedClient} onBack={() => setSelectedClient(null)} />;
        switch(activeView) {
            case 'clients': return <AgencyClientsList onClientSelect={setSelectedClient} />;
            case 'reports': return <AgencyReports />;
            case 'home':
            default:
                return <AgencyDashboardHome />;
        }
    };

    return (
        <div className="w-full h-dvh flex bg-slate-100">
            {/* Sidebar */}
            <nav className="w-20 lg:w-64 bg-white flex flex-col border-r border-slate-200">
                <div className="p-4 border-b border-slate-200 flex items-center justify-center lg:justify-start gap-2">
                    <Agency size={28} className="text-purple-600 flex-shrink-0" />
                    <span className="hidden lg:block font-bold text-xl text-[#192A56]">OnliPrep</span>
                </div>
                <div className="flex-1 py-4 space-y-2">
                    <NavItem icon={Home} label={t('agency_dashboard_home')} active={activeView === 'home' && !selectedClient} onClick={() => { setActiveView('home'); setSelectedClient(null); }} />
                    <NavItem icon={Users} label={t('agency_dashboard_clients')} active={activeView === 'clients' || !!selectedClient} onClick={() => { setActiveView('clients'); setSelectedClient(null); }} />
                    <NavItem icon={BarChart3} label={t('agency_dashboard_reports')} active={activeView === 'reports'} onClick={() => { setActiveView('reports'); setSelectedClient(null); }} />
                    <NavItem icon={Settings} label={t('agency_dashboard_settings')} active={activeView === 'settings'} onClick={() => { setActiveView('settings'); setSelectedClient(null); }} />
                </div>
                <div className="p-4 border-t border-slate-200">
                    <button onClick={logout} className="w-full flex items-center justify-center lg:justify-start gap-2 p-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600">
                        <LogOut size={20} />
                        <span className="hidden lg:block font-semibold text-sm">Sair</span>
                    </button>
                </div>
            </nav>
            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="bg-white p-4 border-b border-slate-200 flex justify-end items-center gap-4">
                    <button onClick={() => window.open('https://wa.me/5511959868557', '_blank')} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-purple-600">
                        <Headset size={20}/>
                        <span className="hidden sm:inline">{t('agency_dashboard_support_onliprep')}</span>
                    </button>
                    <div className="relative">
                         <button className="p-2 rounded-full hover:bg-slate-100">
                             <Bell size={20} className="text-slate-600"/>
                         </button>
                         {agencyNotifications.length > 0 && <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-6">
                    {renderView()}
                </div>
            </main>
            {/* Notifications */}
            <div className="fixed bottom-5 right-5 z-50 space-y-3 w-80">
                {agencyNotifications.map(notif => (
                    <div key={notif.id} className="bg-white rounded-lg shadow-2xl p-4 flex items-start gap-3 animate-slide-in-left">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                            <notif.icon size={18}/>
                        </div>
                        <p className="text-sm text-slate-700 flex-1">{notif.message}</p>
                        <button onClick={() => setAgencyNotifications(p => p.filter(n => n.id !== notif.id))} className="p-1 text-slate-400 hover:text-slate-600"><X size={16}/></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 lg:px-6 py-3 transition-colors text-sm font-semibold ${active ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-600' : 'text-slate-600 hover:bg-slate-50'}`}>
        <Icon size={20} className="flex-shrink-0" />
        <span className="hidden lg:block">{label}</span>
    </button>
);

const AgencyDashboardHome = () => {
    const { t } = useLanguage();
    const avgNPS = (mockDatabase.npsData.reduce((acc, item) => acc + item.nps, 0) / mockDatabase.npsData.length).toFixed(1);
    const totalReviews = mockDatabase.npsData.reduce((acc, item) => acc + item.reviews, 0);

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-[#192A56] mb-8">Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-lg">{t('agency_dashboard_nps')}</h3>
                            <p className="text-sm text-slate-500">Total de {totalReviews} avaliações</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500">Média NPS</p>
                            <p className="font-bold text-2xl text-green-500">{avgNPS}</p>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 300}}>
                        <ResponsiveContainer>
                            <BarChart data={mockDatabase.npsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" tick={{fill: '#64748b', fontSize: 12}} />
                                <YAxis domain={[8, 10]} tick={{fill: '#64748b', fontSize: 12}} />
                                <Tooltip cursor={{fill: 'rgba(124, 58, 237, 0.1)'}}/>
                                <Bar dataKey="nps" fill="url(#colorNps)" barSize={30} radius={[4, 4, 0, 0]} />
                                <defs>
                                    <linearGradient id="colorNps" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.8}/>
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                     <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                         <h4 className="font-bold text-amber-800">{t('agency_dashboard_churn_strategy')}</h4>
                         <p className="text-sm text-amber-700">{t('agency_dashboard_churn_text')}</p>
                     </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                     <h3 className="font-bold text-lg mb-4">{t('agency_dashboard_recent_activity')}</h3>
                     <p className="text-sm text-slate-500">{t('agency_dashboard_no_activity')}</p>
                </div>
            </div>
        </div>
    );
};

const AgencyClientsList = ({ onClientSelect }) => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('name');
    const [clients, setClients] = useState(mockDatabase.agencyStudents);

    const filteredAndSortedClients = useMemo(() => {
        let filtered = clients;
        if (filter !== 'all') {
            filtered = clients.filter(c => c.status === filter);
        }
        return filtered.sort((a, b) => {
            if (sort === 'name') return a.name.localeCompare(b.name);
            if (sort === 'destination') return a.destination.localeCompare(b.destination);
            if (sort === 'course') return a.course.localeCompare(b.course);
            return 0;
        });
    }, [clients, filter, sort]);

    const funnelStages = [
        { id: 'all', name: 'Todos' },
        { id: 'pesquisando', name: 'Pesquisando' },
        { id: 'contrato_assinado', name: 'Contrato Assinado' },
        { id: 'de_malas_prontas', name: 'De Malas Prontas' }
    ];

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-[#192A56] mb-4">{t('agency_dashboard_clients')}</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 flex flex-wrap gap-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-500">Funil:</span>
                        {funnelStages.map(stage => (
                            <button key={stage.id} onClick={() => setFilter(stage.id)} className={`px-3 py-1 text-sm rounded-full ${filter === stage.id ? 'bg-purple-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                {stage.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-500">Ordenar por:</span>
                        <select value={sort} onChange={e => setSort(e.target.value)} className="bg-slate-100 border-none rounded-full px-3 py-1 text-sm text-slate-600 focus:ring-2 focus:ring-purple-500">
                            <option value="name">Nome</option>
                            <option value="destination">Destino</option>
                            <option value="course">Curso</option>
                        </select>
                    </div>
                </div>
                <div className="divide-y divide-slate-100">
                    {filteredAndSortedClients.map(client => (
                        <button key={client.id} onClick={() => onClientSelect(client)} className="w-full flex items-center justify-between p-4 hover:bg-purple-50 transition-colors text-left">
                            <div className="flex items-center gap-4">
                                <img src={client.photoURL} alt={client.name} className="w-12 h-12 rounded-full object-cover"/>
                                <div>
                                    <p className="font-bold text-[#192A56]">{client.name}</p>
                                    <p className="text-sm text-slate-500">{client.destination}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={16} fill="currentColor"/>
                                    <span className="font-bold">{client.nps || 'N/A'}</span>
                                </div>
                                <ChevronRight size={20} className="text-slate-400"/>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AgencyClientProfile = ({ client, onBack }) => {
    const { t } = useLanguage();
    const { showToast, showAgencyNotification } = useApp();
    const [journeySteps, setJourneySteps] = useState(mockDatabase.journeySteps[client.status] || []);
    
    // Simula a sincronização de notificações com o lado do aluno.
    const handleConfirmReceipt = (stepId, taskName) => {
        showToast(`${taskName}: Recebimento confirmado para ${client.name}!`, CheckSquare);
        // Simula o alerta sonoro e a notificação push para o aluno.
        console.log(`STUDENT_NOTIFICATION: Push para ${client.name} - "${taskName}" confirmado!`);
        console.log("STUDENT_ALERT: play-confirmation-sound.mp3");
        
        showAgencyNotification(`Tarefa "${taskName}" de ${client.name} foi marcada como concluída.`, UserCheck);

        setJourneySteps(prevSteps => prevSteps.map(step => 
            step.id === stepId ? { ...step, completed: true } : step
        ));
    };

    // Gerencia o envio de conteúdo personalizado.
    const handleSendContent = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const message = formData.get('message');
        const whatsapp = formData.get('whatsapp');
        
        const notificationMessage = `Você recebeu um novo conteúdo da sua agência: "${title}"`;
        showToast(notificationMessage, FileText); // Simula a notificação no dashboard do aluno.
        showAgencyNotification(`Conteúdo "${title}" enviado para ${client.name}.`, Send);

        if(whatsapp){
            const whatsappMessage = `Olá ${client.name.split(' ')[0]}! Sua agência enviou um novo conteúdo para você:\n\n*${title}*\n${message}\n\nVeja no seu dashboard OnliPrep!`;
            window.open(`https://wa.me/${client.phone}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        }
        e.target.reset();
    }
    
    return (
       <div className="animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-4 hover:text-purple-600">
                <ArrowLeft size={16}/> {t('back')}
            </button>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    <img src={client.photoURL} alt={client.name} className="w-24 h-24 rounded-full object-cover"/>
                    <div>
                        <h2 className="text-3xl font-bold text-[#192A56]">{client.name}</h2>
                        <div className="flex items-center gap-1 text-amber-500 mt-1">
                            {Array.from({length: 5}).map((_, i) => <Star key={i} size={20} fill={i < client.nps ? 'currentColor' : 'none'}/>)}
                            <span className="text-slate-600 font-semibold ml-2">({client.nps || 'N/A'} / 5.0)</span>
                        </div>
                        <div className="mt-2 text-sm text-slate-600">
                            <p><strong>Curso:</strong> {client.course}, {client.period}</p>
                            <p><strong>Embarque:</strong> {new Date(client.departure + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-slate-600 hover:text-purple-600"><Mail size={16}/>E-mail</a>
                            <a href={`https://wa.me/${client.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-purple-600"><MessageSquare size={16}/>WhatsApp</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-lg mb-4">{t('agency_dashboard_journey_progress')}</h3>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full" style={{width: `${client.journeyStatus}%`}}></div>
                    </div>
                    <div className="space-y-3">
                        {journeySteps.map(step => (
                            <div key={step.id} className={`p-3 rounded-lg flex items-center justify-between ${step.completed ? 'bg-green-50 text-green-800' : 'bg-slate-50'}`}>
                                <div className="flex items-center gap-3">
                                    {step.completed ? <CheckCircle size={20} /> : <Clock size={20} className="text-slate-400"/>}
                                    <span className="font-semibold">{step.name}</span>
                                </div>
                                {!step.completed && <button onClick={() => handleConfirmReceipt(step.id, step.name)} className="text-xs font-bold text-purple-600 hover:underline">{t('agency_dashboard_confirm_receipt')}</button>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <div>
                        <h3 className="font-bold text-lg mb-4">{t('agency_dashboard_send_content')}</h3>
                        <form onSubmit={handleSendContent} className="space-y-3">
                            <input name="title" type="text" placeholder={t('agency_dashboard_content_title')} className="w-full py-2 px-3 bg-slate-100 rounded-lg border-slate-200" required/>
                            <input name="video" type="url" placeholder={t('agency_dashboard_video_link')} className="w-full py-2 px-3 bg-slate-100 rounded-lg border-slate-200"/>
                            <textarea name="message" placeholder={t('agency_dashboard_message')} rows="3" className="w-full py-2 px-3 bg-slate-100 rounded-lg border-slate-200" required></textarea>
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input type="checkbox" name="whatsapp" className="rounded text-purple-600 focus:ring-purple-500" />
                                {t('agency_dashboard_send_whatsapp')}
                            </label>
                            <button type="submit" className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                                <Send size={16}/> {t('agency_dashboard_send_dashboard')}
                            </button>
                        </form>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                         <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
                            <Bot size={16}/> {t('agency_dashboard_talk_to_jei')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AgencyReports = () => {
    const { t } = useLanguage();
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-[#192A56] mb-4">{t('agency_dashboard_reports')}</h2>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <BarChart3 size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">{t('in_construction')}</p>
            </div>
        </div>
    );
};


// --- Dashboard Components (Original Code) ---
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
        { id: 'journey', icon: Milestone, title: t('journey') },
        { id: 'preparatorio', icon: Compass, title: t('preparatorio_title') },
        { id: 'cases', icon: Briefcase, title: t('cases') },
        { id: 'bate_volta', icon: Map, title: t('bate_volta') },
        { id: 'onlipremium', icon: Crown, title: t('onlipremium') },
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
// --- Modals (Original Code) ---
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
const JourneyStepPopup = ({ step, content, onClose, onSave }) => {
    const { t } = useLanguage();
    const Icon = step.icon;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-stone-50 w-full max-w-md rounded-2xl shadow-2xl animate-slide-up flex flex-col relative overflow-hidden border border-stone-200" 
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a8a29e\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Icon size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#192A56]">{content.title}</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-6">{content.content}</p>
                </div>
                <footer className="bg-white/50 backdrop-blur-sm p-4 border-t border-stone-200 flex gap-4">
                        <button onClick={onClose} className="font-semibold text-[#192A56] bg-transparent py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5 w-full">{t('back')}</button>
                    <button 
                        onClick={() => { onSave({type: 'journey', content: `${content.title}: ${content.content}`}); onClose(); }} 
                        className="font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg w-full"
                    >
                        {t('salvar')}
                    </button>
                </footer>
            </div>
        </div>
    );
};
const FolderModal = ({ t, savedItems, setSavedItems }) => {
    const [search, setSearch] = useState('');
    const [customFolders, setCustomFolders] = useState([]);
    const [expandedFolders, setExpandedFolders] = useState({ 'tips': true });
    const pdfRef = useRef(null);
    const secondaryButtonClasses = "font-semibold text-[#192A56] bg-transparent transition-all duration-300 ease-in-out border border-[#192A56] flex items-center justify-center hover:bg-[#192A56]/5 px-3 py-3 rounded-lg";
    const allFolders = useMemo(() => {
        const baseFolders = [
            { id: 'tips', name: t('tip_of_the_day'), icon: Lightbulb, items: savedItems.filter(i => i.type === 'tip') },
            { id: 'journey', name: t('journey'), icon: Milestone, items: savedItems.filter(i => i.type === 'journey') },
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
            // Simula o envio do PDF para o aluno.
            console.log("PDF generated. Simulating send to student via Email, WhatsApp, and Dashboard notification.");
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
            {/* Div oculta para geração de PDF com template personalizável. */}
            <div className="absolute -left-[9999px] top-auto" style={{width: '210mm'}}>
                <div ref={pdfRef} className="p-8 bg-white text-black">
                    {/* O logo da agência seria inserido dinamicamente aqui. */}
                    <img src="https://placehold.co/150x50/cccccc/000000?text=Sua+Logo+Aqui" alt="Agency Logo" className="mb-4" />
                    <h1 className="text-2xl font-bold text-[#192A56] mb-2">OnliPrep</h1>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-4">Seus Itens Salvos</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {savedItems.map(item => <li key={`pdf-${item.id}`}>{item.content}</li>)}
                    </ul>
                    {/* O rodapé da agência seria inserido dinamicamente aqui. */}
                    <div className="border-t mt-8 pt-4 text-xs text-gray-500">
                        <p>Gerado por OnliPrep para [Nome da Agência]</p>
                        <p>[Endereço da Agência] | [Contato da Agência]</p>
                    </div>
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
        'Europe/Malta': 'Malta',
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
        { id: 'help', icon: Siren, title: 'Help!', color: 'bg-red-500', action: () => window.open('https://wa.me/5511959868557', '_blank') },
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
const JourneyTimeline = ({ userStatus, destinationCountry, onStepClick }) => {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(1);
    const steps = mockDatabase.journeySteps[userStatus] || [];
    const progress = (currentStep / steps.length) * 100;

    const handleStepClick = (step) => {
        setCurrentStep(step.id);
        onStepClick(step);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-[#192A56] mb-2">{t('journey')}</h2>
            <p className="text-center text-slate-500 mb-8">Sua esteira de embarque personalizada. Clique em cada etapa para ver os detalhes.</p>
            <div className="relative flex justify-center">
                {/* --- The "Conveyor Belt" --- */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-slate-200 rounded-full">
                        <div className="bg-gradient-to-b from-purple-400 to-indigo-500 w-full rounded-full transition-all duration-700 ease-out" style={{ height: `${progress}%` }}></div>
                </div>

                {/* --- The Steps/Icons --- */}
                <div className="relative flex flex-col items-center gap-10">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative z-10 w-full flex items-center" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                            <div className="flex-1 flex items-center justify-center">
                                <button 
                                    onClick={() => handleStepClick(step)}
                                    className="group flex flex-col items-center text-center w-28"
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.id ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400 border-2 border-slate-300'}`}>
                                        <step.icon size={32} />
                                    </div>
                                    <span className={`mt-2 font-semibold text-sm transition-colors ${currentStep >= step.id ? 'text-[#192A56]' : 'text-slate-500'}`}>{step.name}</span>
                                </button>
                            </div>
                            <div className="w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const CasesSection = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-[#192A56] text-xl mb-4 text-center">{t('cases')}</h3>
            <p className="text-slate-500 text-center mb-6">Inspire-se com as histórias de quem já viveu essa experiência.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockDatabase.cases.map(c => (
                        <div key={c.id} className="bg-slate-50 rounded-lg overflow-hidden shadow-md group transform hover:-translate-y-1 transition-transform duration-300">
                            <img src={c.image} alt={`Foto de ${c.name}`} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h4 className="font-bold text-lg text-[#192A56]">{c.name}</h4>
                                <p className="text-sm text-purple-600 font-semibold mb-2">{c.destination}</p>
                                <p className="text-sm text-slate-600">{c.story}</p>
                            </div>
                        </div>
                ))}
            </div>
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
const OnliPremiumSection = () => {
    const { t } = useLanguage();
    const { showAgencyNotification } = useApp();
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleUnlock = () => {
        setTimeLeft(20 * 60); // 20 minutes
    };

    const sendWhatsAppAlert = (message) => {
        const phoneNumber = "5511959868557";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const ContactAgencyForm = () => {
        const [formState, setFormState] = useState({ agency: '', reason: '', message: '' });
        const [satisfaction, setSatisfaction] = useState(null);
        const [formSubmitted, setFormSubmitted] = useState(false);

        const handleFormChange = (e) => {
            const { name, value } = e.target;
            setFormState(prev => ({ ...prev, [name]: value }));
        };

        const handleFormSubmit = (e) => {
            e.preventDefault();
            console.log("Form submitted:", formState);
            setFormSubmitted(true);
        };
        
        const handleSatisfactionSelect = (level, levelText) => {
             setSatisfaction(levelText);
             const alertMessage = `ALERTA: Cliente com avaliação "${levelText}" (${level} estrelas) para a agência ${formState.agency}. Motivo: ${formState.reason}. Mensagem: ${formState.message}`;
             // sendWhatsAppAlert(alertMessage); // This would open a new tab
             console.log("Simulating WhatsApp Alert:", alertMessage);
             showAgencyNotification(`Nova avaliação de cliente: ${levelText} (${level} estrelas)`);
             alert(`Feedback "${levelText}" enviado! Notificação enviada para a agência.`);
             setTimeout(() => {
                 setFormSubmitted(false);
                 setSatisfaction(null);
                 setFormState({ agency: '', reason: '', message: '' });
             }, 3000);
        }

        if (formSubmitted && !satisfaction) {
            return (
                 <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                      <p className="text-center text-green-600 font-semibold mb-4">{t('premium_contact_sent_success')}</p>
                      <h4 className="font-bold text-lg text-center text-[#192A56] mb-4">{t('premium_eval_title')}</h4>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                         <button onClick={() => handleSatisfactionSelect(5, t('premium_eval_satisfied'))} className="flex-1 p-3 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center justify-center gap-2"><ThumbsUp size={20}/> {t('premium_eval_satisfied')}</button>
                         <button onClick={() => handleSatisfactionSelect(3, t('premium_eval_ok'))} className="flex-1 p-3 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors flex items-center justify-center gap-2"><Hand size={20}/> {t('premium_eval_ok')}</button>
                         <button onClick={() => handleSatisfactionSelect(1, t('premium_eval_unsatisfied'))} className="flex-1 p-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center justify-center gap-2"><ThumbsDown size={20}/> {t('premium_eval_unsatisfied')}</button>
                      </div>
                 </div>
            )
        }
        
        if (satisfaction) {
             return <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in text-center font-semibold text-[#192A56]">{t('premium_eval_thanks')}</div>
        }

        return (
            <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <select name="agency" value={formState.agency} onChange={handleFormChange} className="w-full p-3 rounded-lg border border-slate-300" required>
                    <option value="">{t('premium_agency_select')}</option>
                    {mockDatabase.agencies.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select name="reason" value={formState.reason} onChange={handleFormChange} className="w-full p-3 rounded-lg border border-slate-300" required>
                    <option value="">{t('premium_contact_reason')}</option>
                    <option value="doubt">{t('premium_contact_reason_doubt')}</option>
                    <option value="suggestion">{t('premium_contact_reason_suggestion')}</option>
                    <option value="praise">{t('premium_contact_reason_praise')}</option>
                    <option value="complaint">{t('premium_contact_reason_complaint')}</option>
                    <option value="urgency">{t('premium_contact_reason_urgency')}</option>
                </select>
                <textarea name="message" value={formState.message} onChange={handleFormChange} placeholder={t('premium_contact_message')} className="w-full h-24 p-3 rounded-lg border border-slate-300" required></textarea>
                <button type="submit" className="font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all w-full hover:bg-indigo-800">{t('premium_contact_send')}</button>
            </form>
        );
    };

    return (
        <div className="p-4 md:p-6 bg-gradient-to-br from-purple-50 via-yellow-50 to-orange-50 rounded-lg shadow-sm min-h-full">
            <div className="text-center mb-8">
               <h2 className="text-4xl font-extrabold tracking-tighter relative inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
                    {t('onlipremium')}
                    <Sparkles className="w-8 h-8 ml-2 text-yellow-400" />
                </h2>
                <p className="text-slate-600 mt-2">Conteúdo exclusivo, consultorias e ferramentas para uma experiência inesquecível.</p>
            </div>
            
            <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-300 max-w-2xl mx-auto">
                   <h3 className="text-2xl font-bold text-[#192A56] text-center mb-4">{t('premium_contact_agency_title')}</h3>
                   <ContactAgencyForm />
            </div>
        </div>
    );
};
const DashboardScreen = () => {
    const { t } = useLanguage();
    const { userData, isFirstTimeUser, showToast, saveItem, savedItems, setSavedItems, toast, setToast, agendaItems, addAgendaItem, toggleAgendaItem, updateAgendaItem, showTips, setShowTips, goBack } = useApp();
    const [activeSection, setActiveSection] = useState('journey');
    const [showWelcome, setShowWelcome] = useState(isFirstTimeUser);
    const [showPermission, setShowPermission] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [activeTip, setActiveTip] = useState(null);
    const [jeiQuery, setJeiQuery] = useState(null);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [journeyPopup, setJourneyPopup] = useState(null);
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

    const handleJourneyStepClick = (step) => {
        const content = mockDatabase.journeyContent[userData.destinationCountry]?.[step.id] || mockDatabase.journeyContent['default'][step.id];
        if(content) {
            setJourneyPopup({ step, content });
        } else {
            alert(`Conteúdo para a etapa "${step.name}" ainda não disponível.`);
        }
    };

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
            case 'cases':
                return <CasesSection />;
            case 'journey':
                return <JourneyTimeline userStatus={userData.status} destinationCountry={userData.destinationCountry} onStepClick={handleJourneyStepClick} />;
            case 'onlipremium':
                return <OnliPremiumSection />;
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
            {journeyPopup && <JourneyStepPopup step={journeyPopup.step} content={journeyPopup.content} onClose={() => setJourneyPopup(null)} onSave={saveItem} />}
            <ToastNotification toast={toast} onClose={() => setToast(null)} t={t} />
            
            <div ref={headerRef} className="fixed top-0 left-0 right-0 z-30 bg-slate-100 shadow-md">
                {activeSection !== 'onlipremium' && (
                    <>
                        <DashboardHeader userData={userData} onBack={goBack} showBackButton={true} />
                        <SpecialIconsBar onIconClick={setActiveModal} />
                    </>
                )}
            </div>
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24" style={{ marginTop: activeSection !== 'onlipremium' ? headerHeight : 0 }}>
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
        case 'agency-landing': return <AgencyLandingScreen />;
        case 'agency-dashboard': return <AgencyDashboard />;
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
            'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
            'https://unpkg.com/recharts/umd/Recharts.min.js'
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
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
                body { 
                    font-family: 'Inter', sans-serif; 
                    -webkit-font-smoothing: antialiased; 
                    background-color: #FBF9F6;
                }
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-title-elegant { font-family: 'Inter', sans-serif; font-weight: 300; }
                .shadow-top { box-shadow: 0 -4px 15px -1px rgb(0 0 0 / 0.1), 0 -2px 8px -2px rgb(0 0 0 / 0.1); }
                .custom-scrollbar::-webkit-scrollbar { height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #eab308; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #eab308 transparent; }
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
                @keyframes slide-in-left { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
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
                    {isLoading ? <LoadingScreen text="Carregando OnliPrep..."/> : <Main />}
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
