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
    ArrowRight, Bot, Folder, ArrowDown, Hand, MessageSquarePlus, AlertCircle, Calculator, Send, Wifi, Utensils, Route, HeartPulse, Bell, User, Building as Agency, ExternalLink, Moon, Sun, Download, Trash2, Edit, CheckSquare, Square, Mail as MailIcon, Plus, Minus, Tv2, GripVertical, FileDown, Cloud, SunDim, HelpCircle, Phone, MessageSquare, ThumbsDown, BarChart3, Settings, FileText, Filter, Crown, Cake, UserPlus, Paperclip, ImagePlus, ChevronsLeft
} from 'lucide-react';

// --- Firebase Mock Initialization ---
try {
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    initializeApp(firebaseConfig);
} catch (error) {
    console.error("Firebase initialization failed. Using mock setup.", error);
}

// --- KNOWLEDGE BASE & MOCK DATA ---
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
        auth_iam_agency: "Sou Agência/Consultor",
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
        // Onboarding Funnel (NEW)
        onboarding_intro_title: "Vamos personalizar sua jornada?",
        onboarding_intro_text: "Suas respostas nos ajudam a criar uma experiência única para você. Prometemos que será rápido!",
        exchange_reason_title: "Qual o principal motivo do seu intercâmbio?",
        life_impact_title: "Qual impacto você espera que essa experiência tenha em sua vida?",
        language_level_title: "Qual seu nível de {language}?",
        dream_destination_title: "Qual o seu destino dos sonhos?",
        status_title: "Em que fase da sua jornada você está?",
        status_researching: "Estou apenas pesquisando",
        status_closed: "Já fechei com uma agência",
        status_packing: "Estou de malas prontas!",
        almost_there_title: "Quase lá!",
        departure_date_label: "Qual sua previsão de embarque?",
        start_journey_button: "Começar minha jornada!",
        creating_your_dashboard: "Criando seu dashboard personalizado...",
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
        premium_contact_send: "Enviar Mensagem",
        premium_contact_sent_success: "Sua mensagem foi enviada com sucesso!",
        premium_agency_select: "Selecione a agência",
        premium_eval_title: "Como você avalia sua experiência geral com a agência?",
        premium_eval_satisfied: "Satisfeito",
        premium_eval_ok: "Satisfeito, com ressalvas",
        premium_eval_unsatisfied: "Muito Insatisfeito",
        premium_eval_thanks: "Obrigado pelo seu feedback!",
        jei_intervention_title: "O Jei pode te ajudar!",
        jei_intervention_text: "Antes de enviar, que tal ver se nosso assistente Jei consegue resolver sua dúvida ou problema agora mesmo?",
        jei_intervention_ask: "Perguntar ao Jei",
        jei_intervention_skip: "Não, quero falar com a agência",
        // Other
        tip_of_the_day: "Dica do Dia",
        teacher_ana: "Teacher Ana",
        // AGENCY LANDING PAGE
        agency_landing_title: "Eleve a <span class='text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500'>experiência</span> do seu intercambista.",
        agency_landing_subtitle: "O OnliPrep é o seu braço direito digital. Automatizamos a jornada do aluno e liberamos seus consultores para focarem no que fazem de melhor: vender sonhos.",
        agency_login_title: "Acesse seu painel",
        consultant_login_title: "Painel do Consultor",
        agency_id_placeholder: "ID da Agência ou E-mail",
        consultant_id_placeholder: "ID do Consultor ou E-mail",
        agency_password_placeholder: "Sua senha",
        agency_login_button: "Entrar",
        login_as_agency: "Acessar como Agência",
        login_as_consultant: "Acessar como Consultor",
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
        agency_dashboard_home: "Dashboard",
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
        agency_dashboard_send_email: "Enviar por E-mail",
        agency_dashboard_send_dashboard: "Enviar para o Dashboard",
        agency_dashboard_support_onliprep: "Suporte OnliPrep",
        agency_dashboard_talk_to_jei: "Falar com Jei",
        agency_dashboard_whatsapp_support: "Suporte via WhatsApp",
        agency_dashboard_churn_strategy: "Estratégia Anti-Churn",
        agency_dashboard_churn_text: "Baseado no NPS deste mês, recomendamos focar em [Ação Sugerida pela IA] para melhorar a satisfação dos clientes em fase de [Estágio do Funil].",
        add_new_client: "Cadastrar Novo Cliente",
        client_name: "Nome do Cliente",
        client_email: "E-mail do Cliente",
        client_whatsapp: "WhatsApp (com DDI)",
        responsible_agency: "Agência Responsável (Nome + Cidade)",
        responsible_consultant: "Consultor Responsável",
        destination: "Destino",
        course_type: "Tipo do Curso",
        departure_forecast: "Previsão de Embarque",
        observations: "Observações",
        register_client: "Cadastrar Cliente",
        most_organized_clients: "Clientes Mais Organizados",
        most_satisfied_clients: "Clientes Mais Satisfeitos (Promotores)",
        least_satisfied_clients: "Clientes Menos Satisfeitos (Detratores)",
        main_complaints: "Principais Reclamações",
        main_praises: "Principais Elogios",
        see_all: "Ver Tudo",
        consultant_content_hub: "Central de Conteúdo",
        consultant_content_subtitle: "Mantenha-se atualizado com as últimas novidades, dicas e treinamentos.",
        latest_updates: "Últimas Atualizações",
        trainings: "Treinamentos e Cursos",
        ebooks_and_materials: "E-books e Materiais",
        useful_tips: "Dicas Úteis",
        messages: "Mensagens",
        no_new_messages: "Nenhuma mensagem nova.",
        filter_by_period: "Filtrar por Período",
        last_7_days: "Últimos 7 dias",
        last_15_days: "Últimos 15 dias",
        last_30_days: "Últimos 30 dias",
        filter_by_keyword: "Filtrar por Palavra-chave",
        generate_report: "Gerar Relatório",
        nps_report: "Relatório de NPS",
        overall_nps_score: "NPS Geral do Período",
        ia_suggestions: "Sugestões da IA OnliPrep",
        date_of_birth: "Data de Nascimento",
        birthdays_today: "Aniversariantes de Hoje",
        no_birthdays_today: "Nenhum aniversariante hoje.",
        send_to_selected: "Enviar para Selecionados",
        generate_pdf: "Gerar PDF",
        upload_image: "Anexar Imagem",
        upload_pdf: "Anexar PDF",
        upload_video: "Anexar Vídeo",
        client_journey_checklist: "Checklist da Jornada do Cliente",
    },
    en: { /* ... */ }
};

const mockDatabase = {
    destinations: { "África do Sul": ["Cidade do Cabo", "Joanesburgo"], "Alemanha": ["Berlim", "Munique", "Hamburgo", "Frankfurt"], "Argentina": ["Buenos Aires", "Córdoba"], "Austrália": ["Sydney", "Melbourne", "Brisbane", "Gold Coast", "Adelaide", "Perth"], "Canadá": ["Toronto", "Vancouver", "Montreal", "Calgary"], "Emirados Árabes Unidos": ["Dubai"], "Espanha": ["Madri", "Barcelona"], "Estados Unidos": ["Nova Iorque", "Los Angeles", "Boston", "Miami"], "Inglaterra": ["Londres", "Manchester"], "Irlanda": ["Dublin", "Cork"], "Malta": ["St. Julian's", "Sliema"], "Nova Zelândia": ["Auckland"], },
    languageMap: {
        'Irlanda': 'Inglês', 'Inglaterra': 'Inglês', 'Estados Unidos': 'Inglês', 'Canadá': 'Inglês', 'Austrália': 'Inglês', 'Nova Zelândia': 'Inglês', 'África do Sul': 'Inglês', 'Malta': 'Inglês',
        'Espanha': 'Espanhol', 'Argentina': 'Espanhol',
        'Alemanha': 'Alemão',
    },
    languageLevels: ['Iniciante (A1)', 'Básico (A2)', 'Intermediário (B1)', 'Intermediário Superior (B2)', 'Avançado (C1)', 'Fluente (C2)'],
    exchangeReasons: ['Aprender um novo idioma', 'Experiência profissional', 'Cultura e Viagem', 'Estudos Acadêmicos', 'Desenvolvimento Pessoal'],
    lifeImpacts: ['Impulsionar minha carreira', 'Mudar de vida/país', 'Ter uma experiência transformadora', 'Conectar com novas culturas'],
    agencies: ["WEGO Intercâmbios", "CI Intercâmbio", "Experimento", "STB"],
    weather: { "Dublin, Irlanda": { temp: 14, icon: Cloud }, "Toronto, Canadá": { temp: 22, icon: SunDim }, "Sydney, Austrália": { temp: 18, icon: Sun }, "St. Julian's, Malta": { temp: 28, icon: Sun }, "Nova Iorque, Estados Unidos": { temp: 25, icon: Sun } },
    valueSlides: [{ icon: Compass, titleKey: 'value_prop_1_title', textKey: 'value_prop_1_text' }, { icon: BrainCircuit, titleKey: 'value_prop_2_title', textKey: 'value_prop_2_text' }, { icon: Handshake, titleKey: 'value_prop_3_title', textKey: 'value_prop_3_text' },],
    partners: ["WEGO Intercâmbios", "Itaú", "Wise", "TM"],
    tips: { "Irlanda": ["Sempre tenha um guarda-chuva à mão, o tempo em Dublin muda a cada 5 minutos!", "A melhor pint de Guinness está no Gravity Bar, no topo da Guinness Storehouse.", "Use o Leap Card para economizar no transporte público.", "Os penhascos de Moher são um passeio de um dia imperdível saindo de Dublin."], "Canadá": ["Prepare-se para o frio! Um bom casaco de inverno é essencial.", "Tim Hortons é uma instituição canadense. Experimente um 'Double-Double'.", "A gorjeta (tip) é geralmente de 15-20% em restaurantes.", "Explore os parques nacionais, a natureza do Canadá é deslumbrante."], "Malta": ["Não se esqueça do protetor solar! O sol em Malta é forte o ano todo.", "Explore as praias escondidas como St. Peter's Pool.", "Use o app da Bolt ou Uber para se locomover, é mais prático que o ônibus.", "A vida noturna em Paceville é agitada, mas vá com um grupo de amigos."] },
    journeyTasks: [{ step: 1, task: "Definir destino e tipo de curso", daysBefore: 240 }, { step: 2, task: "Aplicar para o Passaporte", daysBefore: 180 }, { step: 3, task: "Pesquisar e aplicar para o Visto", daysBefore: 120 }, { step: 4, task: "Comprar passagens aéreas", daysBefore: 90 }, { step: 5, task: "Contratar seguro viagem", daysBefore: 60 }, { step: 6, task: "Agendar exame médico", daysBefore: 50 }, { step: 7, task: "Confirmar acomodação inicial", daysBefore: 30 }, { step: 8, task: "Fazer check-in online", daysBefore: 1 },],
    journeySteps: { pesquisando: [{ id: 1, name: "Definir Sonho", icon: Lightbulb }, { id: 2, name: "Análise Financeira", icon: Wallet }, { id: 3, name: "Escolher Destino", icon: MapPin }, { id: 4, name: "Tipo de Visto", icon: Stamp }, { id: 5, name: "Escolher Agência", icon: Handshake }, { id: 6, name: "Assinar Contrato", icon: FileSignature },], contrato_assinado: [{ id: 1, name: "Pagamento Inicial", icon: Coins, completed: true }, { id: 2, name: "Matrícula Escola", icon: GraduationCap, completed: true }, { id: 3, name: "Passaporte", icon: Passport, completed: true }, { id: 4, name: "Aplicação Visto", icon: Stamp, completed: true }, { id: 5, name: "Comprovação Financeira", icon: FolderOpen, completed: false }, { id: 6, name: "Exames Médicos", icon: HeartPulse, completed: false }, { id: 7, name: "Compra Passagem", icon: Plane, completed: false }, { id: 8, name: "Seguro Viagem", icon: ShieldCheck, completed: false }, { id: 9, name: "Acomodação", icon: BedDouble, completed: false }, { id: 10, name: "Moeda Estrangeira", icon: Coins, completed: false }, { id: 11, name: "Reunião Pré-Embarque", icon: Users, completed: false }, { id: 12, name: "Fazer as Malas", icon: Backpack, completed: false },], de_malas_prontas: [{ id: 1, name: "Pagamento Final", icon: CheckCircle }, { id: 2, name: "Documentos Finais", icon: FileSignature }, { id: 3, name: "Passaporte OK", icon: Passport }, { id: 4, name: "Visto Aprovado", icon: Stamp }, { id: 5, name: "Finanças OK", icon: Wallet }, { id: 6, name: "Saúde OK", icon: HeartPulse }, { id: 7, name: "Passagem Comprada", icon: Plane }, { id: 8, name: "Seguro OK", icon: ShieldCheck }, { id: 9, name: "Acomodação OK", icon: BedDouble }, { id: 10, name: "Moeda Comprada", icon: Coins }, { id: 11, name: "Reunião OK", icon: Users }, { id: 12, name: "Malas Prontas", icon: Backpack },] },
    journeyContent: { 'Malta': { '4': { title: 'Visto para Malta', content: 'Para cursos de até 90 dias, brasileiros não precisam de visto. Acima disso, você entra como turista e aplica para a permissão de estudante já em Malta. É crucial levar todos os documentos organizados (carta da escola, comprovação financeira, seguro, etc.) para apresentar na imigração. Nosso time te dará o checklist completo!' }, '9': { title: 'Acomodação em Malta', content: 'Malta tem muitas opções, desde residências estudantis (ótimo para fazer amigos) a apartamentos compartilhados. St. Julian\'s e Sliema são populares, mas podem ser mais caros. Considere áreas como Msida ou Gzira para um melhor custo-benefício. Comece a procurar com pelo menos 2 meses de antecedência!' } }, 'default': { '4': { title: 'Tipo de Visto', content: 'Cada país tem sua regra. Visto de estudante, trabalho, turismo... a escolha certa depende do seu objetivo. Esse é um dos passos mais críticos, e um erro aqui pode custar caro. Vamos analisar seu perfil para definir a melhor estratégia.' }, '9': { title: 'Acomodação Inicial', content: 'Recomendamos fechar as primeiras 2 a 4 semanas de acomodação ainda no Brasil. Isso te dá segurança e tempo para procurar um lugar definitivo com calma quando chegar. Homestay (casa de família) é uma ótima opção para imersão cultural no início.' } } },
    premiumContent: { 'consultancy': Array.from({ length: 8 }, (_, i) => ({ id: `cons-${i}`, title: `Consultoria Exclusiva #${i + 1}`, locked: true })), },
    cases: [{ id: 1, name: "Mariana L.", destination: "Dublin, Irlanda", story: "Realizou o sonho de estudar e trabalhar na Europa, hoje é gerente de projetos.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop" }, { id: 2, name: "João P.", destination: "Toronto, Canadá", story: "Fez um curso de especialização e conseguiu imigrar através do programa de estudos.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" }, { id: 3, name: "Carla S.", destination: "Sydney, Austrália", story: "Aprendeu inglês na prática e viajou por todo o sudeste asiático nas férias.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" },],
    agencyStudents: [
        { id: 1, name: "Mariana L.", destination: "Dublin, Irlanda", status: 'de_malas_prontas', photoURL: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", nps: 9, journeyStatus: 95, email: "mariana.l@example.com", phone: "5511987654321", course: "Inglês Geral", period: "24 semanas", departure: "2025-09-15", consultant: "Ana", accessExpires: "2025-12-15", messages: [{ id: 1, type: 'praise', text: "A Ana foi incrível!", date: new Date().toISOString(), read: true }], dateOfBirth: '1998-07-23' },
        { id: 2, name: "João P.", destination: "Toronto, Canadá", status: 'contrato_assinado', photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", nps: 7, journeyStatus: 40, email: "joao.p@example.com", phone: "5521912345678", course: "Business English", period: "12 semanas", departure: "2025-10-01", consultant: "Carlos", accessExpires: "2026-01-01", messages: [{ id: 2, type: 'doubt', text: "Tenho uma dúvida sobre a acomodação.", date: new Date().toISOString(), read: false }], dateOfBirth: '2000-03-15' },
        { id: 3, name: "Carla S.", destination: "Sydney, Austrália", status: 'de_malas_prontas', photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", nps: 10, journeyStatus: 90, email: "carla.s@example.com", phone: "5531998761234", course: "IELTS Prep", period: "8 semanas", departure: "2025-08-20", consultant: "Ana", accessExpires: "2025-11-20", messages: [], dateOfBirth: '1999-11-02' },
        { id: 4, name: "Pedro G.", destination: "St. Julian's, Malta", status: 'pesquisando', photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", nps: null, journeyStatus: 15, email: "pedro.g@example.com", phone: "5541987654321", course: "Curso de Férias", period: "4 semanas", departure: "2026-01-10", consultant: "Carlos", accessExpires: "2026-04-10", messages: [], dateOfBirth: '2002-05-30' },
        { id: 5, name: "Lucas M.", destination: "Dublin, Irlanda", status: 'contrato_assinado', photoURL: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop", nps: 4, journeyStatus: 55, email: "lucas.m@example.com", phone: "5511911223344", course: "Inglês Geral", period: "16 semanas", departure: "2025-11-05", consultant: "Ana", accessExpires: "2026-02-05", messages: [{ id: 3, type: 'complaint', text: "Estou muito insatisfeito com a demora para receber o contrato.", date: new Date().toISOString(), read: false }], dateOfBirth: '2001-09-10' },
    ],
    npsData: [
        { month: 'Jan', nps: 65 }, { month: 'Fev', nps: 70 }, { month: 'Mar', nps: 72 },
        { month: 'Abr', nps: 68 }, { month: 'Mai', nps: 75 }, { month: 'Jun', nps: 80 },
    ],
    aiSuggestions: {
        acomodacao: "Notamos um aumento nas reclamações sobre 'Acomodação'. Sugerimos criar um guia detalhado em PDF com as melhores práticas para encontrar moradia em Dublin e enviá-lo proativamente para todos os alunos com esse destino.",
        consultor: "O consultor Carlos teve uma queda no NPS. Recomendamos uma sessão de feedback individual para alinhar as expectativas de comunicação e oferecer um treinamento de reciclagem sobre o destino Canadá.",
        geral: "O NPS geral está na zona de 'Aperfeiçoamento'. Uma ação de baixo custo seria enviar um 'Kit de Boas-Vindas' digital com dicas exclusivas uma semana antes do embarque para todos os clientes, aumentando a percepção de valor."
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
    const [agencyUser, setAgencyUser] = useState(null); // {type: 'agency' | 'consultant', name: '...'}
    const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
    const [toast, setToast] = useState(null);
    const [savedItems, setSavedItems] = useState([]);
    const [agendaItems, setAgendaItems] = useState([]);
    const [showTips, setShowTips] = useState(true);
    const [agencyNotifications, setAgencyNotifications] = useState(mockDatabase.agencyStudents.flatMap(s => s.messages.map(m => ({ ...m, studentName: s.name }))));
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activePanel, setActivePanel] = useState(null);
    const [panelData, setPanelData] = useState(null);
    const [agencyStudents, setAgencyStudents] = useState(mockDatabase.agencyStudents);
    
    const showToast = (message, icon = Info, duration = 5000, actions = []) => {
        setToast({ message, icon, id: Date.now(), actions });
        setTimeout(() => setToast(null), duration);
    };
    
    const showAgencyNotification = (message, icon = Bell, type = 'info') => {
        const newNotif = { id: Date.now(), message, icon, read: false, type, date: new Date().toISOString() };
        setAgencyNotifications(prev => [newNotif, ...prev]);
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
            destinationCountry: 'Malta',
            destination: 'St. Julian\'s, Malta',
            departureDate: '2025-12-31',
            status: 'de_malas_prontas',
            isNew: false
        };
        handleLogin(mockUser);
    }
    
    const handleAgencyLogin = (type) => {
        setAgencyUser({ type, name: type === 'agency' ? 'WEGO Intercâmbios' : 'Ana' });
        setScreen(type === 'agency' ? 'agency-dashboard' : 'consultant-dashboard');
        showToast("Login efetuado com sucesso!", CheckCircle);
    };
    
    const completeOnboarding = (onboardingData) => {
        setUserData(prev => ({ ...prev, ...onboardingData }));
        setScreen('dashboard');
    };

    const logout = () => {
        setUserData(null);
        setAgencyUser(null);
        setScreen('auth');
        setAuthFlowStep('registration');
    };
    
    const goBack = () => {
        if (screen === 'dashboard' || screen.includes('agency') || screen.includes('consultant')) {
            setScreen('auth');
        } else if (screen.startsWith('terms-') || screen === 'auth-flow') {
            setScreen('auth');
        }
    }
    
    const saveItem = (item) => {
        setSavedItems(prev => [...prev, { id: Date.now(), ...item, isNew: true }]);
        showToast("Salvo na sua pasta!", CheckCircle, 3000);
    }

    const addAgendaItem = (item) => {
        setAgendaItems(prev => [...prev, { id: `user-${Date.now()}`, ...item, completed: false, completedAt: null, isJourneyTask: false }]);
    }
    
    const updateAgendaItem = (id, updatedData) => {
        setAgendaItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
    }
    
    const toggleAgendaItem = (id) => {
        setAgendaItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed, completedAt: !item.completed ? new Date().toISOString() : null } : item));
    }

    useEffect(() => {
        if (userData?.departureDate && mockDatabase.journeyTasks) {
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
        agencyUser,
        isFirstTimeUser, setIsFirstTimeUser,
        toast, showToast, setToast,
        authFlowStep, setAuthFlowStep,
        savedItems, setSavedItems,
        agendaItems, addAgendaItem, toggleAgendaItem, updateAgendaItem,
        showTips, setShowTips,
        handleLogin, handleGoogleLogin, handleEmailLogin,
        completeOnboarding, logout, goBack, saveItem,
        handleAgencyLogin, agencyNotifications, setAgencyNotifications, showAgencyNotification,
        isSidebarOpen, setSidebarOpen,
        activePanel, setActivePanel,
        panelData, setPanelData,
        agencyStudents, setAgencyStudents
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
                            <p className="text-slate-600 text-center mt-2 mb-8 max-w-2xl mx-auto">{t('landing_main_subtitle')}</p>
                            <div className="grid md:grid-cols-3 gap-8 mt-12">
                                {mockDatabase.valueSlides.map(slide => (
                                    <div key={slide.titleKey} className="text-center p-4">
                                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <slide.icon size={32} />
                                        </div>
                                        <h3 className="font-bold text-lg text-[#192A56]">{t(slide.titleKey)}</h3>
                                        <p className="text-slate-600 text-sm mt-1">{t(slide.textKey)}</p>
                                    </div>
                                ))}
                            </div>
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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const RegistrationScreen = () => {
    const { t } = useLanguage();
    const { handleGoogleLogin, handleLogin, setScreen, showToast } = useApp();
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
            showToast("Por favor, preencha todos os campos corretamente.", AlertTriangle);
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
                        <label className="flex items-center text-sm text-slate-600"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2" required />{t('terms_agree')} <button type="button" onClick={() => setScreen('terms-student')} className="underline ml-1 hover:text-[#192A56]">{t('terms_for_students')}</button></label>
                        <label className="flex items-center text-sm text-slate-600"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2" />{t('terms_marketing')}</label>
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
        exchangeReason: '',
        lifeImpact: '',
        dreamDestination: 'Irlanda',
        languageLevel: '',
        status: '',
        departureDate: '',
    });
    
    const primaryButtonClasses = "font-semibold text-white bg-[#192A56] py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";
    const totalSteps = 6;
    
    const handleNext = useCallback(() => {
        setTimeout(() => setStep(prev => Math.min(prev + 1, totalSteps)), 200);
    }, []);
    
    const handleBack = () => setStep(prev => Math.max(prev - 1, 0));
    
    const handleSelection = (field, value, autoNext = true) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
        const OptionButton = ({ value, field, children }) => (
            <button
                onClick={() => handleSelection(field, value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors text-[#192A56] ${formData[field] === value ? 'bg-purple-100 border-purple-500' : 'bg-white border-slate-300 hover:border-purple-300'}`}
            >
                {children}
            </button>
        );
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
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('exchange_reason_title')}</h3>
                    <div className="space-y-3">
                        {mockDatabase.exchangeReasons.map(reason => <OptionButton key={reason} value={reason} field="exchangeReason">{reason}</OptionButton>)}
                    </div>
                </div>
            );
            case 2: return (
                <div className="w-full animate-fade-in">
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('life_impact_title')}</h3>
                    <div className="space-y-3">
                        {mockDatabase.lifeImpacts.map(impact => <OptionButton key={impact} value={impact} field="lifeImpact">{impact}</OptionButton>)}
                    </div>
                </div>
            );
            case 3: return (
                <div className="w-full animate-fade-in">
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('dream_destination_title')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.keys(mockDatabase.destinations).map(country => <OptionButton key={country} value={country} field="dreamDestination">{country}</OptionButton>)}
                    </div>
                </div>
            );
            case 4:
                const language = mockDatabase.languageMap[formData.dreamDestination] || 'Idioma';
                return (
                    <div className="w-full animate-fade-in">
                        <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('language_level_title', { language })}</h3>
                        <div className="space-y-3">
                            {mockDatabase.languageLevels.map(level => <OptionButton key={level} value={level} field="languageLevel">{level}</OptionButton>)}
                        </div>
                    </div>
                );
            case 5: return (
                <div className="w-full animate-fade-in">
                    <h3 className="font-title-elegant text-3xl text-[#192A56] block mb-6 text-center">{t('status_title')}</h3>
                    <div className="space-y-3">
                        <OptionButton value="pesquisando" field="status">{t('status_researching')}</OptionButton>
                        <OptionButton value="contrato_assinado" field="status">{t('status_closed')}</OptionButton>
                        <OptionButton value="de_malas_prontas" field="status">{t('status_packing')}</OptionButton>
                    </div>
                </div>
            );
            case 6: return (
                <form onSubmit={handleSubmit} className="w-full animate-fade-in">
                    <h2 className="font-title-elegant text-4xl text-[#192A56] mb-4 text-center">{t('almost_there_title')}</h2>
                    <label className="font-semibold text-[#192A56] block mb-2 text-center">{t('departure_date_label')}</label>
                    <input type="date" name="departureDate" value={formData.departureDate} onChange={(e) => setFormData(prev => ({...prev, departureDate: e.target.value}))} className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white" required />
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

// --- AGENCY COMPONENTS ---
const AgencyLoginForm = ({ loginType, onLogin }) => {
    const { t } = useLanguage();
    const title = loginType === 'agency' ? t('agency_login_title') : t('consultant_login_title');
    const placeholder = loginType === 'agency' ? t('agency_id_placeholder') : t('consultant_id_placeholder');
    return (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full">
            <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
            <form onSubmit={(e) => { e.preventDefault(); onLogin(loginType); }} className="space-y-4">
                <input type="email" placeholder={placeholder} className="w-full py-3 px-4 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 outline-none" required />
                <input type="password" placeholder={t('agency_password_placeholder')} className="w-full py-3 px-4 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 outline-none" required />
                <button type="submit" className="w-full font-semibold bg-amber-400 text-[#192A56] py-3 rounded-lg hover:bg-amber-300 transition-colors">
                    {t('agency_login_button')}
                </button>
            </form>
        </div>
    );
};

const AgencyLandingScreen = () => {
    const { t } = useLanguage();
    const { handleAgencyLogin, setScreen } = useApp();
    const [loginAs, setLoginAs] = useState('agency'); // 'agency' or 'consultant'

    const PricingCard = ({ title, price, features, popular = false }) => (
        <div className={`relative border rounded-2xl p-6 flex flex-col ${popular ? 'border-purple-600 border-2' : 'border-slate-200'}`}>
            {popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t('most_popular')}</div>}
            <h3 className="text-xl font-bold text-[#192A56]">{title}</h3>
            <p className="text-3xl font-extrabold my-4">{price}<span className="text-base font-normal text-slate-500">/mês</span></p>
            <ul className="space-y-2 text-slate-600 mb-6">
                {features.map(f => <li key={f} className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" />{f}</li>)}
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
            <div className="relative min-h-screen flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 overflow-hidden">
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
                <div className="relative z-10 w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="bg-black/20 rounded-full p-1 flex items-center gap-1">
                            <button onClick={() => setLoginAs('agency')} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${loginAs === 'agency' ? 'bg-white text-black' : 'text-white'}`}>{t('login_as_agency')}</button>
                            <button onClick={() => setLoginAs('consultant')} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${loginAs === 'consultant' ? 'bg-white text-black' : 'text-white'}`}>{t('login_as_consultant')}</button>
                        </div>
                    </div>
                    <AgencyLoginForm loginType={loginAs} onLogin={handleAgencyLogin} />
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

const AgencyTopNav = ({ onMenuClick, onNotificationClick }) => {
    const { agencyNotifications } = useApp();
    const unreadCount = agencyNotifications.filter(n => !n.read).length;
    return (
        <header className="bg-white p-4 border-b border-slate-200 flex justify-between items-center gap-4 sticky top-0 z-40">
            <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                <Menu className="text-slate-600" />
            </button>
            <div className="flex items-center gap-4">
                <button onClick={onNotificationClick} className="p-2 rounded-full hover:bg-slate-100 relative">
                    <Bell className="text-slate-600" />
                    {unreadCount > 0 && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>}
                </button>
                <button onClick={() => window.open('https://wa.me/5511959868557', '_blank')} className="p-2 rounded-full hover:bg-slate-100">
                    <Headset className="text-slate-600" />
                </button>
            </div>
        </header>
    );
};

const AgencySidebar = ({ isOpen, onClose, onNavigate, activeView }) => {
    const { t } = useLanguage();
    const { logout } = useApp();
    const navItems = [
        { id: 'home', icon: Home, label: t('agency_dashboard_home') },
        { id: 'clients', icon: Users, label: t('agency_dashboard_clients') },
        { id: 'reports', icon: BarChart3, label: t('agency_dashboard_reports') },
    ];
    return (
        <>
            <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 transform transition-transform shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b border-slate-200 flex items-center gap-2">
                    <Agency size={28} className="text-purple-600" />
                    <span className="font-bold text-xl text-[#192A56]">OnliPrep</span>
                </div>
                <div className="flex-1 py-4 space-y-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { onNavigate(item.id); onClose(); }}
                            className={`w-full flex items-center gap-3 px-6 py-3 font-semibold transition-colors ${activeView === item.id ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
                    <button onClick={logout} className="w-full flex items-center gap-2 p-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600">
                        <LogOut size={20} />
                        <span className="font-semibold text-sm">Sair</span>
                    </button>
                </div>
            </div>
        </>
    );
};

const AgencyDashboardHome = ({ clients, setActiveView, setClientFilter }) => {
    const { t } = useLanguage();
    const DashboardWidget = ({ title, children, filterType }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-[#192A56] mb-4">{title}</h3>
            <div className="space-y-3">{children}</div>
            <button onClick={() => { setActiveView('clients'); setClientFilter(filterType); }} className="text-sm font-semibold text-purple-600 mt-4 hover:underline">{t('see_all')}</button>
        </div>
    );
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-[#192A56] mb-8">{t('agency_dashboard_home')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <DashboardWidget title={t('most_satisfied_clients')} filterType="promoters">
                    {clients.filter(c => c.nps >= 9).slice(0, 3).map(c => <p key={c.id} className="text-sm text-slate-600">{c.name}</p>)}
                </DashboardWidget>
                <DashboardWidget title={t('least_satisfied_clients')} filterType="detractors">
                    {clients.filter(c => c.nps && c.nps <= 6).slice(0, 3).map(c => <p key={c.id} className="text-sm text-slate-600">{c.name}</p>)}
                </DashboardWidget>
                <DashboardWidget title={t('most_organized_clients')} filterType="organized">
                    {clients.sort((a, b) => b.journeyStatus - a.journeyStatus).slice(0, 3).map(c => <p key={c.id} className="text-sm text-slate-600">{c.name}</p>)}
                </DashboardWidget>
            </div>
        </div>
    );
};

const AgencyClientsList = ({ clients, onClientSelect, onAddClient, canAddClient = true, clientFilter, setClientFilter }) => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = useMemo(() => {
        let list = [...clients];
        if (clientFilter === 'promoters') list = list.filter(c => c.nps >= 9);
        if (clientFilter === 'detractors') list = list.filter(c => c.nps && c.nps <= 6);
        if (clientFilter === 'organized') list = list.sort((a, b) => b.journeyStatus - a.journeyStatus);
        if (searchTerm) {
            list = list.filter(client =>
                client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.destination.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return list;
    }, [clients, searchTerm, clientFilter]);
    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-[#192A56]">{t('agency_dashboard_clients')}</h2>
                {canAddClient && <button onClick={onAddClient} className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700"><UserPlus size={16} /> {t('add_new_client')}</button>}
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 flex gap-4">
                    <input type="search" placeholder="Buscar cliente por nome, e-mail, destino..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full py-2 px-4 bg-slate-50 rounded-lg border border-slate-200 focus:ring-purple-500 focus:border-purple-500" />
                    <button onClick={() => setClientFilter('all')} className="flex items-center gap-2 py-2 px-4 bg-slate-100 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200"><Filter size={16} /> Limpar</button>
                </div>
                <div className="divide-y divide-slate-100">
                    {filteredClients.map(client => (
                        <button key={client.id} onClick={() => onClientSelect(client)} className="w-full flex items-center justify-between p-4 hover:bg-purple-50 transition-colors text-left">
                            <div className="flex items-center gap-4">
                                <img src={client.photoURL} alt={client.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-bold text-[#192A56]">{client.name}</p>
                                    <p className="text-sm text-slate-500">{client.destination}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-24">
                                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                                        <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${client.journeyStatus}%` }}></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="font-bold">{client.nps || 'N/A'}</span>
                                </div>
                                <ChevronRight size={20} className="text-slate-400" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AgencyReports = () => {
    const { t } = useLanguage();
    const [period, setPeriod] = useState('last_30_days');
    const [keyword, setKeyword] = useState('');
    const npsScore = 75; // Mock score
    const npsColor = npsScore >= 75 ? 'text-green-500' : npsScore >= 50 ? 'text-amber-500' : 'text-red-500';
    const npsZone = npsScore >= 75 ? 'Excelente' : npsScore >= 50 ? 'Aperfeiçoamento' : 'Crítica';
    return (
        <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold text-[#192A56]">{t('agency_dashboard_reports')}</h2>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg text-[#192A56] mb-4">{t('filter_by_period')}</h3>
                <div className="flex gap-4">
                    <select value={period} onChange={e => setPeriod(e.target.value)} className="w-full p-2 border rounded-md">
                        <option value="last_7_days">{t('last_7_days')}</option>
                        <option value="last_15_days">{t('last_15_days')}</option>
                        <option value="last_30_days">{t('last_30_days')}</option>
                    </select>
                    <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder={`${t('filter_by_keyword')} (Ex: Acomodação)`} className="w-full p-2 border rounded-md" />
                    <button className="py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg">{t('generate_report')}</button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-[#192A56] mb-4">{t('nps_report')}</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockDatabase.npsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="nps" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <h3 className="font-bold text-lg text-[#192A56]">{t('overall_nps_score')}</h3>
                        <p className={`text-6xl font-bold my-2 ${npsColor}`}>{npsScore}</p>
                        <p className={`font-semibold ${npsColor}`}>{npsZone}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg text-[#192A56] mb-2">{t('ia_suggestions')}</h3>
                        <div className="flex items-start gap-3">
                            <Lightbulb size={24} className="text-amber-400 mt-1" />
                            <p className="text-sm text-slate-600">{mockDatabase.aiSuggestions.geral}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConsultantDashboard = () => {
    const { isSidebarOpen, setSidebarOpen, agencyUser, setActivePanel, setPanelData, agencyStudents, agencyNotifications } = useApp();
    const [activeView, setActiveView] = useState('home');
    const [clientFilter, setClientFilter] = useState('all');

    const consultantClients = useMemo(() =>
        agencyStudents.filter(c => c.consultant === agencyUser.name),
        [agencyUser.name, agencyStudents]
    );
    const handleClientSelect = (client) => {
        setPanelData(client);
        setActivePanel('clientDetail');
    };
    const renderView = () => {
        switch (activeView) {
            case 'clients': return <AgencyClientsList clients={consultantClients} onClientSelect={handleClientSelect} canAddClient={false} clientFilter={clientFilter} setClientFilter={setClientFilter} />;
            case 'content': return <ConsultantContentHub />;
            case 'home':
            default: return <AgencyDashboardHome clients={consultantClients} setActiveView={setActiveView} setClientFilter={setClientFilter} />;
        }
    };
    return (
        <div className="w-full h-dvh flex flex-col bg-slate-100">
            <AgencyTopNav onMenuClick={() => setSidebarOpen(true)} onNotificationClick={() => setActivePanel('notifications')} />
            <AgencySidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={setActiveView} activeView={activeView} />

            <main className="flex-1 overflow-y-auto p-6">
                {renderView()}
            </main>
            <button onClick={() => setActivePanel('notifications')} className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full shadow-lg text-white flex items-center justify-center transform hover:scale-110 transition-transform">
                <MessageCircle size={32} />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-indigo-700 text-xs flex items-center justify-center">
                    {agencyNotifications.filter(n => !n.read).length}
                </div>
            </button>
            <AgencySlidingPanels />
        </div>
    );
};

const AgencyDashboard = () => {
    const { isSidebarOpen, setSidebarOpen, setActivePanel, setPanelData, agencyStudents, setAgencyStudents, agencyNotifications } = useApp();
    const [activeView, setActiveView] = useState('home');
    const [clientFilter, setClientFilter] = useState('all');

    const handleClientSelect = (client) => {
        setPanelData(client);
        setActivePanel('clientDetail');
    };
    const handleAddNewClient = (newClientData) => {
        const newClient = {
            id: Date.now(),
            ...newClientData,
            nps: null,
            journeyStatus: 5,
            status: 'contrato_assinado',
            messages: []
        };
        setAgencyStudents(prev => [newClient, ...prev]);
        setActivePanel(null);
    };
    const renderView = () => {
        switch (activeView) {
            case 'clients': return <AgencyClientsList clients={agencyStudents} onClientSelect={handleClientSelect} onAddClient={() => setActivePanel('addClient')} clientFilter={clientFilter} setClientFilter={setClientFilter} />;
            case 'reports': return <AgencyReports />;
            case 'home':
            default: return <AgencyDashboardHome clients={agencyStudents} setActiveView={setActiveView} setClientFilter={setClientFilter} />;
        }
    };
    return (
        <div className="w-full h-dvh flex flex-col bg-slate-100">
            <AgencyTopNav onMenuClick={() => setSidebarOpen(true)} onNotificationClick={() => setActivePanel('notifications')} />
            <AgencySidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={setActiveView} activeView={activeView} />

            <main className="flex-1 overflow-y-auto p-6">
                {renderView()}
            </main>
            <button onClick={() => setActivePanel('notifications')} className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full shadow-lg text-white flex items-center justify-center transform hover:scale-110 transition-transform">
                <MessageCircle size={32} />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-indigo-700 text-xs flex items-center justify-center">
                    {agencyNotifications.filter(n => !n.read).length}
                </div>
            </button>
            <AgencySlidingPanels onAddNewClient={handleAddNewClient} />
        </div>
    );
};

const ConsultantContentHub = () => {
    const { t } = useLanguage();
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-[#192A56] mb-2">{t('consultant_content_hub')}</h2>
            <p className="text-slate-600 mb-8">{t('consultant_content_subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg mb-4">{t('latest_updates')}</h3>
                    <p className="text-sm text-slate-500">{t('in_construction')}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg mb-4">{t('trainings')}</h3>
                    <p className="text-sm text-slate-500">{t('in_construction')}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg mb-4">{t('useful_tips')}</h3>
                    <p className="text-sm text-slate-500">{t('in_construction')}</p>
                </div>
            </div>
        </div>
    );
};

const AddClientPanel = ({ t, onAddNewClient, onClose }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', responsible_agency: '',
        consultant: '', destination: '', course: '',
        departure: '', observations: '', dateOfBirth: ''
    });
    const [photoPreview, setPhotoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setFormData(prev => ({ ...prev, photoURL: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddNewClient(formData);
    };
    const inputClass = "w-full p-2 border border-slate-300 rounded-md focus:ring-purple-500 focus:border-purple-500";
    return (
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-[#192A56]">{t('add_new_client')}</h2>
                <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X /></button>
            </header>
            <main className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="flex flex-col items-center gap-4">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                        <img 
                            src={photoPreview || `https://placehold.co/100x100/E2E8F0/4A5568?text=Foto`} 
                            alt="Client" 
                            className="w-24 h-24 rounded-full object-cover border-2 border-slate-300"
                        />
                    </label>
                    <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>
                <div><label className="text-sm font-semibold">{t('client_name')}</label><input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} required /></div>
                <div><label className="text-sm font-semibold">{t('client_email')}</label><input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} required /></div>
                <div><label className="text-sm font-semibold">{t('date_of_birth')}</label><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} /></div>
                <div><label className="text-sm font-semibold">{t('client_whatsapp')}</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} /></div>
                <div><label className="text-sm font-semibold">{t('responsible_agency')}</label><input type="text" name="responsible_agency" value={formData.responsible_agency} onChange={handleChange} className={inputClass} /></div>
                <div><label className="text-sm font-semibold">{t('responsible_consultant')}</label><input type="text" name="consultant" value={formData.consultant} onChange={handleChange} className={inputClass} /></div>
                <div><label className="text-sm font-semibold">{t('destination')}</label><input type="text" name="destination" value={formData.destination} onChange={handleChange} className={inputClass} /></div>
                <div><label className="text-sm font-semibold">{t('course_type')}</label><input type="text" name="course" value={formData.course} onChange={handleChange} className={inputClass} /></div>
                <div><label className="text-sm font-semibold">{t('departure_forecast')}</label><input type="date" name="departure" value={formData.departure} onChange={handleChange} className={inputClass} /></div>
                <div><label className="text-sm font-semibold">{t('observations')}</label><textarea name="observations" value={formData.observations} onChange={handleChange} className={inputClass} rows="3"></textarea></div>
            </main>
            <footer className="p-4 border-t sticky bottom-0 bg-white">
                <button type="submit" className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">{t('register_client')}</button>
            </footer>
        </form>
    );
};

const NotificationsPanel = ({ t, onClose }) => {
    const { agencyNotifications, setAgencyNotifications } = useApp();
    const markAllAsRead = () => {
        setAgencyNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const statusIcons = {
        praise: { icon: ThumbsUp, color: 'text-green-500' },
        doubt: { icon: HelpCircle, color: 'text-blue-500' },
        complaint: { icon: ThumbsDown, color: 'text-red-500' },
        urgency: { icon: Siren, color: 'text-amber-500' },
        suggestion: { icon: Lightbulb, color: 'text-purple-500' },
    }
    return (
        <div className="h-full flex flex-col bg-slate-50">
            <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-[#192A56]">{t('messages')}</h2>
                <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X /></button>
            </header>
            <main className="flex-1 overflow-y-auto">
                {agencyNotifications.length === 0 ? (
                    <div className="text-center p-8 text-slate-500">{t('no_new_messages')}</div>
                ) : (
                    <div className="divide-y divide-slate-200">
                        {agencyNotifications.map(n => {
                            const StatusIcon = statusIcons[n.type]?.icon || Info;
                            const statusColor = statusIcons[n.type]?.color || 'text-slate-500';
                            return (
                                <div key={n.id} className={`p-4 flex gap-4 ${!n.read ? 'bg-purple-50' : 'bg-white'}`}>
                                    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white border-2 ${statusColor.replace('text-', 'border-')} ${statusColor}`}>
                                        <StatusIcon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-800"><span className="font-bold">{n.studentName}:</span> {n.text}</p>
                                        <p className="text-xs text-slate-400 mt-1">{new Date(n.date).toLocaleString()}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
            {agencyNotifications.some(n => !n.read) && (
                <footer className="p-4 border-t sticky bottom-0 bg-white">
                    <button onClick={markAllAsRead} className="w-full py-2 px-4 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300">Marcar todas como lidas</button>
                </footer>
            )}
        </div>
    );
};

const ClientDetailPanel = ({ t, client, onClose }) => {
    if (!client) return null;
    return (
        <div className="h-full flex flex-col bg-slate-50">
            <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-[#192A56]">{t('agency_dashboard_client_profile')}</h2>
                <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X /></button>
            </header>
            <main className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                    <img src={client.photoURL} alt={client.name} className="w-20 h-20 rounded-full object-cover" />
                    <div>
                        <h3 className="text-2xl font-bold text-[#192A56]">{client.name}</h3>
                        <p className="text-slate-500">{client.destination}</p>
                        <div className="flex gap-4 mt-2">
                            <a href={`mailto:${client.email}`} className="text-slate-500 hover:text-purple-600"><Mail size={18} /></a>
                            <a href={`https://wa.me/${client.phone}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-600"><MessageSquare size={18} /></a>
                        </div>
                    </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-slate-500">{t('agency_dashboard_satisfaction')}</p>
                        <div className="flex items-center gap-2 text-amber-500 mt-1">
                            <Star size={20} fill="currentColor" />
                            <span className="text-2xl font-bold text-[#192A56]">{client.nps || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-slate-500">{t('agency_dashboard_journey_progress')}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${client.journeyStatus}%` }}></div>
                            </div>
                            <span className="text-lg font-bold text-[#192A56]">{client.journeyStatus}%</span>
                        </div>
                    </div>
                </div>
                {/* Send Content */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-lg text-[#192A56] mb-4">{t('agency_dashboard_send_content')}</h4>
                    <form className="space-y-4">
                        <input type="text" placeholder={t('agency_dashboard_content_title')} className="w-full p-2 border border-slate-300 rounded-md" />
                        <textarea placeholder={t('agency_dashboard_message')} rows="4" className="w-full p-2 border border-slate-300 rounded-md"></textarea>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button type="button" className="p-2 border rounded-md hover:bg-slate-100"><ImagePlus size={18} /></button>
                                <button type="button" className="p-2 border rounded-md hover:bg-slate-100"><Paperclip size={18} /></button>
                                <input type="url" placeholder={t('agency_dashboard_video_link')} className="p-2 border border-slate-300 rounded-md text-sm" />
                            </div>
                            <button type="submit" className="py-2 px-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">{t('agency_dashboard_send_dashboard')}</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

const AgencySlidingPanels = ({ onAddNewClient }) => {
    const { t } = useLanguage();
    const { activePanel, setActivePanel, panelData, setPanelData } = useApp();
    const handleClose = () => {
        setActivePanel(null);
        setPanelData(null);
    };
    const renderPanelContent = () => {
        switch (activePanel) {
            case 'addClient':
                return <AddClientPanel t={t} onAddNewClient={onAddNewClient} onClose={handleClose} />;
            case 'notifications':
                return <NotificationsPanel t={t} onClose={handleClose} />;
            case 'clientDetail':
                return <ClientDetailPanel t={t} client={panelData} onClose={handleClose} />;
            default:
                return null;
        }
    };
    const panelWidthClass = {
        addClient: 'max-w-md',
        notifications: 'max-w-md',
        clientDetail: 'max-w-2xl'
    }[activePanel] || 'max-w-md';
    return (
        <div className={`fixed inset-0 z-50 ${activePanel ? '' : 'pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity ${activePanel ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleClose}
            ></div>
            {/* Panel Container */}
            <div className={`absolute top-0 right-0 h-full w-full ${panelWidthClass} bg-white shadow-2xl transform transition-transform duration-300 ${activePanel ? 'translate-x-0' : 'translate-x-full'}`}>
                {renderPanelContent()}
            </div>
        </div>
    );
};

// --- DASHBOARD COMPONENTS (NEW AND FUNCTIONAL) ---

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
    const { t } = useLanguage();
    return (
        <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                {showBackButton && (
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200/50 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </button>
                )}
                <img src={userData.photoURL} alt={userData.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" />
                <div>
                    <p className="text-sm text-slate-500">{t('hey')}</p>
                    <h2 className="font-bold text-lg text-[#192A56] leading-tight">{userData.name}</h2>
                </div>
            </div>
        </div>
    );
};

const CountdownBar = ({ userData }) => {
    const { t } = useLanguage();
    const calculateTimeLeft = useCallback(() => {
        if (!userData.departureDate) return null;
        const difference = +new Date(userData.departureDate + 'T00:00:00') - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }, [userData.departureDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    if (!timeLeft || Object.keys(timeLeft).length === 0) {
        return <div className="p-2 text-center bg-green-100 text-green-700 font-semibold">{t('in_construction')}</div>;
    }

    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center p-2">
            <p className="text-xs font-light mb-1">{t('countdown_title')}</p>
            <div className="flex justify-center items-center gap-4 font-bold text-lg">
                <div>{timeLeft.days}<span className="text-xs font-normal">{t('days')}</span></div>
                <div>{timeLeft.hours}<span className="text-xs font-normal">{t('hours')}</span></div>
                <div>{timeLeft.minutes}<span className="text-xs font-normal">{t('minutes')}</span></div>
                <div>{timeLeft.seconds}<span className="text-xs font-normal">{t('seconds')}</span></div>
            </div>
        </div>
    );
};

const SpecialIconsBar = ({ onIconClick }) => {
    const { t } = useLanguage();
    const icons = [
        { key: 'folder', icon: Folder, label: t('folder') },
        { key: 'currency', icon: Coins, label: t('currency') },
        { key: 'calculator', icon: Calculator, label: t('calculator') },
        { key: 'timezone', icon: Clock, label: t('timezone') },
        { key: 'agenda', icon: CalendarClock, label: t('agenda') },
    ];
    return (
        <div className="bg-white/80 backdrop-blur-sm shadow-inner p-2 flex justify-around">
            {icons.map(({ key, icon: Icon, label }) => (
                <button key={key} onClick={() => onIconClick(key)} className="flex flex-col items-center text-[#192A56] hover:text-purple-600 transition-colors">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                       <Icon size={24} />
                    </div>
                    <span className="text-xs font-semibold mt-1">{label}</span>
                </button>
            ))}
        </div>
    );
};

const JourneyTimeline = ({ userStatus, onStepClick }) => {
    const steps = mockDatabase.journeySteps[userStatus] || [];
    return (
        <div className="relative p-4">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            {steps.map((step, index) => (
                <div key={step.id} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-2/5 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <button onClick={() => onStepClick(step)} className="hover:underline">
                          <p className="font-bold text-base text-[#192A56]">{step.name}</p>
                        </button>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${step.completed ? 'bg-green-500 border-white' : 'bg-purple-600 border-white'}`}>
                            {step.completed ? <Check size={24} className="text-white" /> : <step.icon size={24} className="text-white" />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const DashboardBottomNav = ({ onNavigate, activeSection }) => {
    const { t } = useLanguage();
    const navItems = [
        { key: 'cases', icon: Users, label: t('cases') },
        { key: 'journey', icon: Milestone, label: t('journey') },
        { key: 'onlipremium', icon: Crown, label: t('onlipremium') },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-top flex justify-around items-center z-40">
            {navItems.map(({ key, icon: Icon, label }) => (
                <button
                    key={key}
                    onClick={() => onNavigate(key)}
                    className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeSection === key ? 'text-purple-600' : 'text-slate-500'}`}
                >
                    <Icon size={28} />
                    <span className="text-xs font-bold mt-1">{label}</span>
                </button>
            ))}
        </div>
    );
};

const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-fast">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col animate-slide-up">
            <header className="p-4 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#192A56]">{title}</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X /></button>
            </header>
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    </div>
);

const WelcomePopup = ({ userData, onClose, t }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in-fast">
        <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-2xl shadow-xl text-center p-8 max-w-sm mx-auto animate-slide-up relative">
            <PartyPopper size={48} className="mx-auto mb-4 text-amber-300" />
            <h2 className="text-2xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: t('welcome_title_dynamic', {name: userData.name.split(' ')[0]}) }}></h2>
            <p className="opacity-80 mb-6">{t('welcome_subtitle')}</p>
            <button onClick={onClose} className="bg-white/90 text-indigo-700 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105">
                {t('welcome_button')}
            </button>
        </div>
    </div>
);

const NotificationPermissionModal = ({ onClose, t }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in-fast">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm animate-slide-up p-6 text-center">
            <Bell size={40} className="mx-auto mb-4 text-purple-500" />
            <h3 className="text-xl font-bold text-[#192A56] mb-2">{t('notificacoes_titulo')}</h3>
            <p className="text-slate-600 mb-6">{t('notificacoes_texto')}</p>
            <div className="flex gap-4">
                <button onClick={() => onClose(false)} className="flex-1 py-2 px-4 rounded-lg bg-slate-200 text-slate-700 font-semibold">{t('agora_nao')}</button>
                <button onClick={() => onClose(true)} className="flex-1 py-2 px-4 rounded-lg bg-purple-600 text-white font-semibold">{t('permitir')}</button>
            </div>
        </div>
    </div>
);

const TipOfTheDayModal = ({ tip, onClose, onSave, t }) => (
    <Modal title={t('tip_of_the_day')} onClose={onClose}>
        <div className="text-center">
            <Lightbulb size={40} className="mx-auto mb-4 text-amber-400"/>
            <p className="text-lg text-slate-700 mb-6">{tip}</p>
            <div className="flex gap-4 justify-center">
                <button onClick={() => { onSave({ type: 'tip', content: tip }); onClose(); }} className="py-2 px-6 bg-purple-100 text-purple-700 font-semibold rounded-lg">{t('salvar')}</button>
                <button onClick={onClose} className="py-2 px-6 bg-slate-200 text-slate-700 font-semibold rounded-lg">{t('ok')}</button>
            </div>
        </div>
    </Modal>
);

const JourneyStepPopup = ({ step, content, onClose, onSave }) => {
    const { t } = useLanguage();
    return (
        <Modal title={content.title} onClose={onClose}>
            <div>
                <p className="text-slate-600 whitespace-pre-wrap mb-6">{content.content}</p>
                <div className="flex justify-end gap-4">
                     <button onClick={() => { onSave({ type: 'journey_content', ...content }); onClose(); }} className="py-2 px-4 bg-purple-100 text-purple-700 font-semibold rounded-lg flex items-center gap-2">
                        <Bookmark size={16}/> Salvar na Pasta
                    </button>
                    <button onClick={onClose} className="py-2 px-6 bg-purple-600 text-white font-semibold rounded-lg">{t('ok')}</button>
                </div>
            </div>
        </Modal>
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
                    { label: t('salvar'), onClick: () => saveItem({ type: 'tip', content: randomTip }) },
                    { label: t('nao_mostrar_novamente'), onClick: () => setShowTips(false) }
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
        if (content) {
            setJourneyPopup({ step, content });
        } else {
            showToast(`Conteúdo para a etapa "${step.name}" ainda não disponível.`, Info)
        }
    };

    const renderModalContent = () => {
        switch (activeModal) {
            case 'folder': return <div>{t('in_construction')}</div>; // Placeholder
            case 'calculator': return <div>{t('in_construction')}</div>; // Placeholder
            case 'currency': return <div>{t('in_construction')}</div>; // Placeholder
            case 'timezone': return <div>{t('in_construction')}</div>; // Placeholder
            case 'agenda': return <div>{t('in_construction')}</div>; // Placeholder
            default: return null;
        }
    }

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'cases':
                return <div>{t('in_construction')}</div>;
            case 'journey':
                return <JourneyTimeline userStatus={userData.status} destinationCountry={userData.destinationCountry} onStepClick={handleJourneyStepClick} />;
            case 'onlipremium':
                return <div>{t('in_construction')}</div>;
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
            {journeyPopup && <JourneyStepPopup step={journeyPopup.step} content={journeyPopup.content} onClose={() => setJourneyPopup(null)} onSave={saveItem} />}

            <div ref={headerRef} className="fixed top-0 left-0 right-0 z-30 bg-slate-100 shadow-md">
                {activeSection !== 'onlipremium' && (
                    <>
                        <DashboardHeader userData={userData} onBack={goBack} showBackButton={true} />
                        <CountdownBar userData={userData} />
                        <SpecialIconsBar onIconClick={setActiveModal} />
                    </>
                )}
            </div>

            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24" style={{ marginTop: activeSection !== 'onlipremium' ? headerHeight : 0 }}>
                <div className="max-w-7xl mx-auto space-y-6">
                    {renderActiveSection()}
                </div>
            </main>
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
        case 'consultant-dashboard': return <ConsultantDashboard />;
        case 'terms-student': return <TermsScreen type="student" />;
        case 'terms-agency': return <TermsScreen type="agency" />;
        default: return <AuthScreen />;
    }
}

function AppContent() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const scripts = [
            { id: 'tailwind-cdn', src: 'https://cdn.tailwindcss.com' },
            { id: 'jspdf-cdn', src: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js' },
            { id: 'html2canvas-cdn', src: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js' },
            { id: 'recharts-cdn', src: 'https://unpkg.com/recharts/umd/Recharts.min.js' }
        ];
        scripts.forEach(scriptInfo => {
            if (!document.getElementById(scriptInfo.id)) {
                const script = document.createElement('script');
                script.id = scriptInfo.id;
                script.src = scriptInfo.src;
                script.async = true;
                if (scriptInfo.id === 'tailwind-cdn') {
                    document.head.appendChild(script);
                } else {
                    document.body.appendChild(script);
                }
            }
        });
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
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
                @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
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
                
                @keyframes scroll-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .animate-scroll-up {
                    animation: scroll-up 20s linear infinite;
                }
            `}</style>
            <div className="w-full h-dvh antialiased flex flex-col">
                <div className="relative w-full flex-grow flex flex-col bg-[#FBF9F6]">
                    {isLoading ? <LoadingScreen text="Carregando OnliPrep..." /> : <Main />}
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
