<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OnliPrep - Sua Jornada Inteligente</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'marble-fosco': '#FBF9F6',
                        'navy-dark': '#192A56',
                        'mustard-yellow': '#eab308',
                        'brand-purple': '#8A2BE2',
                        'brand-violet': '#4169E1',
                        'brand-roxo': '#4B0082',
                    }
                }
            }
        }
    </script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-presets="react,stage-2">
        // --- DEPENDENCIES (LOADED FROM CDN) ---
        // React and ReactDOM are loaded in <head>
        // Lucide Icons (via umpkg)
        const { default: lucide } = await import('https://unpkg.com/lucide-react@0.378.0/dist/esm/lucide-react.js');
        const {
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
            ArrowRight, Bot, Folder, ArrowDown, Hand, MessageSquarePlus, AlertCircle, Calculator, Send, Wifi,
            Utensils, Route, HeartPulse, Bell, User, Building as Agency, ExternalLink, Moon, Sun, Download,
            Trash2, Edit, CheckSquare, Square, Mail as MailIcon, Plus, Minus, Tv2, GripVertical, FileDown,
            Cloud, SunDim, HelpCircle, Phone, MessageSquare, ThumbsDown, BarChart3, Settings, FileText, Filter,
            Crown, Cake, UserPlus, Paperclip, ImagePlus, ChevronsLeft, Luggage
        } = lucide;
        // Recharts (via CDN - assigned to window)
        // Firebase (mocked)
        // html2canvas & jsPDF (via CDN)

        // --- Firebase Mock Initialization ---
        try {
            // This setup allows for future real Firebase integration without code changes.
            const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : { apiKey: "mock", authDomain: "mock.firebaseapp.com", projectId: "mock" };
            // initializeApp(firebaseConfig); // Mocked, no real initialization needed
        } catch (error) {
            console.error("Firebase initialization failed. Using mock setup.", error);
        }

        // --- KNOWLEDGE BASE & MOCK DATA ---
        const KNOWLEDGE_BASE = `O OnliPrep é um assistente de bolso para intercâmbio. Ele usa IA e experiências reais para criar uma jornada cronológica e organizada para o estudante, desde o planejamento até a vida no destino. O objetivo é ser um suporte confiável quando o consultor ou a agência não estão disponíveis, oferecendo informações de fontes oficiais e dicas práticas para evitar perrengues. Ele não substitui o trabalho humano, mas o complementa, garantindo que o intercambista esteja sempre preparado e bem informado.`;
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
                flight_info: "Informações do seu voo",
                
                // Auth & Landing Page
                auth_login: "Login",
                auth_register: "Cadastro",
                auth_slogan: "Sua jornada de intercâmbio, <span class='font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-violet'>inteligente</span> e <span class='font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-violet'>conectada</span>.",
                auth_iam_student: "Sou Intercambista",
                auth_iam_agency: "Sou Agência/Consultor",
                login_with_google: "Continuar com o Google",
                landing_main_title: "Seu intercâmbio, do <span class='text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-violet'>sonho</span> ao <span class='text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-violet'>embarque</span>, sem imprevistos.",
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
                apelido: "Como prefere ser chamado?",
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
                welcome_subtitle: "O menu no rodapé te levará pra onde você quiser. Explore!",
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
                teacher_ana_modal_title: "Teacher Ana - Prática de Idioma",
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
                currency_coupon_code: "ONLIPREP2CAMBIO",
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
                agency_pricing_title: "Planos pensados para o <span class='text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-violet'>sucesso</span> da sua agência",
                voucher_title: "Vouchers Individuais",
                voucher_subtitle: "Ideal para começar ou para demandas pontuais.",
                voucher_1_title: "Pacote Bronze", voucher_1_desc: "5 clientes", voucher_1_price: "R$ 50,00",
                voucher_2_title: "Pacote Prata", voucher_2_desc: "10 clientes", voucher_2_price: "R$ 70,00",
                voucher_3_title: "Pacote Ouro", voucher_3_desc: "20 clientes", voucher_3_price: "R$ 100,00",
                subscription_title: "Assinaturas Mensais",
                subscription_subtitle: "A melhor opção para crescimento e escala.",
                sub_1_title: "Plano Essencial", sub_1_price: "R$ 99,90",
                sub_1_features: ["Até 30 clientes/mês", "90 dias de OnliPremium", "Suporte via Chat"],
                sub_2_title: "Plano Performance", sub_2_price: "R$ 149,90",
                sub_2_features: ["Até 50 clientes/mês", "OnliPremium Vitalício", "Painel para Consultores", "Relatórios NPS"],
                most_popular: "Mais Popular", buy_button: "Comprar", subscribe_button: "Assinar",
                
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
                last_7_days: "Últimos 7 dias", last_15_days: "Últimos 15 dias", last_30_days: "Últimos 30 dias",
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
            en: { /* ... English translations would go here ... */ }
        };
        const mockDatabase = {
            destinations: { "África do Sul": ["Cidade do Cabo", "Joanesburgo"], "Alemanha": ["Berlim", "Munique"], "Austrália": ["Sydney", "Melbourne", "Brisbane", "Gold Coast"], "Argentina": ["Buenos Aires", "Córdoba"], "Canadá": ["Toronto", "Vancouver", "Montreal", "Calgary"], "Emirados Árabes Unidos": ["Dubai"], "Espanha": ["Madri", "Barcelona", "Valência"], "Irlanda": ["Dublin", "Cork", "Galway", "Limerick", "Bray", "Drogheda"], "Inglaterra": ["Londres", "Manchester"], "Malta": ["St. Julian's", "Sliema"], "Nova Zelândia": ["Auckland", "Queenstown"], },
            languageMap: {
                'Irlanda': 'Inglês', 'Inglaterra': 'Inglês', 'Canadá': 'Inglês', 'Austrália': 'Inglês', 'Nova Zelândia': 'Inglês', 'África do Sul': 'Inglês', 'Malta': 'Inglês',
                'Espanha': 'Espanhol', 'Argentina': 'Espanhol',
                'Alemanha': 'Alemão',
            },
            languageLevels: ['Iniciante (A1)', 'Básico (A2)', 'Intermediário (B1)', 'Intermediário Superior (B2)', 'Avançado (C1)', 'Fluente (C2)'],
            exchangeReasons: ['Aprender um novo idioma', 'Experiência profissional', 'Cultura e Viagem', 'Estudos Acadêmicos', 'Desenvolvimento Pessoal'],
            lifeImpacts: ['Impulsionar minha carreira', 'Mudar de vida/país', 'Ter uma experiência transformadora', 'Conectar com novas culturas'],
            agencies: ["WEGO Intercâmbios", "CI Intercâmbio", "Experimento", "STB"],
            weather: { "Dublin, Irlanda": { temp: 14, icon: Cloud }, "Toronto, Canadá": { temp: 22, icon: SunDim }, "Sydney, Austrália": { temp: 18, icon: Sun }, "St. Julian's, Malta": { temp: 28, icon: Sun } },
            valueSlides: [{ icon: Compass, titleKey: 'value_prop_1_title', textKey: 'value_prop_1_text' }, { icon: BrainCircuit, titleKey: 'value_prop_2_title', textKey: 'value_prop_2_text' }, { icon: Handshake, titleKey: 'value_prop_3_title', textKey: 'value_prop_3_text' },],
            partners: ["WEGO Intercâmbios", "Itaú", "Wise", "TM"],
            tips: { "Irlanda": ["Sempre tenha um guarda-chuva à mão, o tempo em Dublin muda a cada 5 minutos!", "A melhor pint de Guinness está no Gravity Bar, no topo da Guinness Storehouse.", "Use o Leap Card para economizar no transporte público."], "Canadá": ["Prepare-se para o frio! Um bom casaco de inverno é essencial.", "Tim Hortons é uma instituição canadense. Experimente um 'Double-Double'."], "Malta": ["Não se esqueça do protetor solar! O sol em Malta é forte o ano todo.", "Use o app da Bolt ou Uber para se locomover, é mais prático que o ônibus."] },
            journeyTasks: [{ step: 1, task: "Definir destino e tipo de curso", daysBefore: 240 }, { step: 2, task: "Aplicar para o Passaporte", daysBefore: 180 }, { step: 3, task: "Pesquisar e aplicar para o Visto", daysBefore: 120 }, { step: 4, task: "Comprar passagens aéreas", daysBefore: 90 }, { step: 5, task: "Contratar seguro viagem", daysBefore: 60 }, { step: 6, task: "Agendar exame médico", daysBefore: 50 }, { step: 7, task: "Confirmar acomodação inicial", daysBefore: 30 }, { step: 8, task: "Fazer check-in online", daysBefore: 1 },],
            journeySteps: { pesquisando: [{ id: 1, name: "Definir Sonho", icon: Lightbulb }, { id: 2, name: "Análise Financeira", icon: Wallet }, { id: 3, name: "Escolher Destino", icon: MapPin }, { id: 4, name: "Tipo de Visto", icon: Stamp }, { id: 5, name: "Escolher Agência", icon: Handshake }, { id: 6, name: "Assinar Contrato", icon: FileSignature },], contrato_assinado: [{ id: 1, name: "Pagamento Inicial", icon: Coins, completed: true }, { id: 2, name: "Matrícula Escola", icon: GraduationCap, completed: true }, { id: 3, name: "Passaporte", icon: Passport, completed: true }, { id: 4, name: "Aplicação Visto", icon: Stamp, completed: true }, { id: 5, name: "Comprovação Financeira", icon: FolderOpen, completed: false }, { id: 6, name: "Exames Médicos", icon: HeartPulse, completed: false }, { id: 7, name: "Compra Passagem", icon: Plane, completed: false }, { id: 8, name: "Seguro Viagem", icon: ShieldCheck, completed: false }, { id: 9, name: "Acomodação", icon: BedDouble, completed: false }, { id: 10, name: "Moeda Estrangeira", icon: Coins, completed: false }, { id: 11, name: "Reunião Pré-Embarque", icon: Users, completed: false }, { id: 12, name: "Fazer as Malas", icon: Backpack, completed: false },], de_malas_prontas: [{ id: 1, name: "Pagamento Final", icon: CheckCircle }, { id: 2, name: "Documentos Finais", icon: FileSignature }, { id: 3, name: "Passaporte OK", icon: Passport }, { id: 4, name: "Visto Aprovado", icon: Stamp }, { id: 5, name: "Finanças OK", icon: Wallet }, { id: 6, name: "Saúde OK", icon: HeartPulse }, { id: 7, name: "Passagem Comprada", icon: Plane }, { id: 8, name: "Seguro OK", icon: ShieldCheck }, { id: 9, name: "Acomodação OK", icon: BedDouble }, { id: 10, name: "Moeda Comprada", icon: Coins }, { id: 11, name: "Reunião OK", icon: Users }, { id: 12, name: "Malas Prontas", icon: Backpack },] },
            journeyContent: { 'Malta': { '4': { title: 'Visto para Malta', content: 'Para cursos de até 90 dias, brasileiros não precisam de visto. Acima disso, você entra como turista e aplica para a permissão de estudante já em Malta. É crucial levar todos os documentos organizados (carta da escola, comprovação financeira, seguro, etc.) para apresentar na imigração.' }, '9': { title: 'Acomodação em Malta', content: 'Malta tem muitas opções, desde residências estudantis a apartamentos compartilhados. St. Julian\'s e Sliema são populares, mas podem ser mais caros. Considere áreas como Msida ou Gzira para um melhor custo-benefício.' } }, 'default': { '4': { title: 'Tipo de Visto', content: 'Cada país tem sua regra. Visto de estudante, trabalho, turismo... a escolha certa depende do seu objetivo. Esse é um dos passos mais críticos, e um erro aqui pode custar caro.' }, '9': { title: 'Acomodação Inicial', content: 'Recomendamos fechar as primeiras 2 a 4 semanas de acomodação ainda no Brasil. Isso te dá segurança e tempo para procurar um lugar definitivo com calma quando chegar. Homestay (casa de família) é uma ótima opção para imersão cultural no início.' } } },
            premiumContent: { 'consultancy': Array.from({ length: 8 }, (_, i) => ({ id: `cons-${i}`, title: `Consultoria Exclusiva #${i + 1}`, locked: true })), },
            cases: [{ id: 1, name: "Mariana L.", destination: "Dublin, Irlanda", story: "Realizou o sonho de estudar e trabalhar na Europa, hoje é gerente de projetos.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop" }, { id: 2, name: "João P.", destination: "Toronto, Canadá", story: "Fez um curso de especialização e conseguiu imigrar através do programa de estudos.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" }, { id: 3, name: "Carla S.", destination: "Sydney, Austrália", story: "Aprendeu inglês na prática e viajou por todo o sudeste asiático nas férias.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" },],
            agencyStudents: [
                { id: 1, name: "Mariana L.", destination: "Dublin, Irlanda", status: 'de_malas_prontas', photoURL: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", nps: 9, journeyStatus: 95, email: "mariana.l@example.com", phone: "5511987654321", course: "Inglês Geral", period: "24 semanas", departure: "2025-09-15", consultant: "Ana", accessExpires: "2025-12-15", messages: [{ id: 1, type: 'praise', text: "A Ana foi incrível!", date: new Date().toISOString(), read: true }], dateOfBirth: '1998-07-23' },
                { id: 2, name: "João P.", destination: "Toronto, Canadá", status: 'contrato_assinado', photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", nps: 7, journeyStatus: 40, email: "joao.p@example.com", phone: "5521912345678", course: "Business English", period: "12 semanas", departure: "2025-10-01", consultant: "Carlos", accessExpires: "2026-01-01", messages: [{ id: 2, type: 'doubt', text: "Tenho uma dúvida sobre a acomodação.", date: new Date().toISOString(), read: false }], dateOfBirth: '2000-03-15' },
                { id: 3, name: "Carla S.", destination: "Sydney, Austrália", status: 'de_malas_prontas', photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", nps: 10, journeyStatus: 90, email: "carla.s@example.com", phone: "5531998761234", course: "IELTS Prep", period: "8 semanas", departure: "2025-08-20", consultant: "Ana", accessExpires: "2025-11-20", messages: [], dateOfBirth: '1999-11-02' },
                { id: 4, name: "Pedro G.", destination: "St. Julian's, Malta", status: 'pesquisando', photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", nps: null, journeyStatus: 15, email: "pedro.g@example.com", phone: "5541987654321", course: "Curso de Férias", period: "4 semanas", departure: "2026-01-10", consultant: "Carlos", accessExpires: "2026-04-10", messages: [], dateOfBirth: '2002-05-30' },
                { id: 5, name: "Lucas M.", destination: "Dublin, Irlanda", status: 'contrato_assinado', photoURL: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop", nps: 4, journeyStatus: 55, email: "lucas.m@example.com", phone: "5511911223344", course: "Inglês Geral", period: "16 semanas", departure: "2025-11-05", consultant: "Ana", accessExpires: "2026-02-05", messages: [{ id: 3, type: 'complaint', text: "Estou muito insatisfeito com a demora para receber o contrato.", date: new Date().toISOString(), read: false }], dateOfBirth: '2001-09-10' },
            ],
            npsData: [ { month: 'Jan', nps: 65 }, { month: 'Fev', nps: 70 }, { month: 'Mar', nps: 72 }, { month: 'Abr', nps: 68 }, { month: 'Mai', nps: 75 }, { month: 'Jun', nps: 80 }, ],
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
            const [agencyUser, setAgencyUser] = useState(null);
            const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
            const [toast, setToast] = useState(null);
            const [savedItems, setSavedItems] = useState([]);
            const [agendaItems, setAgendaItems] = useState([]);
            const [showTips, setShowTips] = useState(true);
            const [agencyNotifications, setAgencyNotifications] = useState(mockDatabase.agencyStudents.flatMap(s => s.messages.map(m => ({ ...m, studentName: s.name }))));
            const [agencyStudents, setAgencyStudents] = useState(mockDatabase.agencyStudents);

            const showToast = (message, icon = Info, duration = 5000, actions = []) => {
                const id = Date.now();
                setToast({ message, icon, id, actions });
                setTimeout(() => {
                    setToast(prev => (prev?.id === id ? null : prev));
                }, duration);
            };

            const showAgencyNotification = (message, icon = Bell, type = 'info') => {
                const newNotif = { id: Date.now(), text: message, studentName: 'Sistema', type, icon, read: false, date: new Date().toISOString() };
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
                    displayName: "Usuário Teste", email: "teste@google.com",
                    photoURL: `https://i.pravatar.cc/80?u=google-test`, uid: '12345', isNew: true
                };
                handleLogin(mockUser);
            };

            const handleEmailLogin = (e) => {
                e.preventDefault();
                const mockUser = {
                    name: "Usuário Antigo", email: e.target.elements.email.value,
                    photoURL: `https://i.pravatar.cc/80?u=old-user`, uid: '67890',
                    destinationCountry: 'Malta', destination: 'St. Julian\'s, Malta',
                    departureDate: '2025-12-31', status: 'de_malas_prontas', isNew: false
                };
                handleLogin(mockUser);
            };

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
            };
            
            const saveItem = (item) => {
                setSavedItems(prev => [...prev, {id: Date.now(), ...item, isNew: true}]);
                showToast("Salvo na sua pasta!", CheckCircle, 3000);
            };

            const addAgendaItem = (item) => {
                setAgendaItems(prev => [...prev, {id: `user-${Date.now()}`, ...item, completed: false, completedAt: null, isJourneyTask: false}]);
            };

            const updateAgendaItem = (id, updatedData) => {
                setAgendaItems(prev => prev.map(item => item.id === id ? {...item, ...updatedData} : item));
            };

            const toggleAgendaItem = (id) => {
                setAgendaItems(prev => prev.map(item => item.id === id ? {...item, completed: !item.completed, completedAt: !item.completed ? new Date().toISOString() : null} : item));
            };

            useEffect(() => {
                if(userData?.departureDate && mockDatabase.journeyTasks) {
                    const journeyRelatedTasks = mockDatabase.journeyTasks.map(task => {
                        const taskDate = new Date(userData.departureDate + "T00:00:00");
                        taskDate.setDate(taskDate.getDate() - task.daysBefore);
                        return {
                            id: `journey-${task.step}`, name: task.task,
                            date: taskDate.toISOString().split('T')[0],
                            completed: false, completedAt: null, isJourneyTask: true
                        }
                    });
                    const departureTask = {
                        id: 'journey-departure', name: "Dia do Embarque!", date: userData.departureDate,
                        completed: false, completedAt: null, isJourneyTask: true, icon: Plane
                    };
                    const userTasks = agendaItems.filter(item => !item.isJourneyTask);
                    setAgendaItems([...journeyRelatedTasks, departureTask, ...userTasks]);
                }
            }, [userData?.departureDate]);

            const value = {
                screen, setScreen, userData, setUserData, agencyUser, isFirstTimeUser, setIsFirstTimeUser,
                toast, showToast, setToast, authFlowStep, setAuthFlowStep, savedItems, setSavedItems,
                agendaItems, addAgendaItem, toggleAgendaItem, updateAgendaItem, showTips, setShowTips,
                handleLogin, handleGoogleLogin, handleEmailLogin, completeOnboarding, logout, goBack, saveItem,
                handleAgencyLogin, agencyNotifications, setAgencyNotifications, showAgencyNotification,
                agencyStudents, setAgencyStudents
            };
            return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
        };

        // --- UI Components ---
        const LoadingScreen = ({ text }) => (
            <div className="w-full h-full flex flex-col items-center justify-center bg-marble-fosco animate-fade-in">
                <div className="w-64 space-y-4">
                    <div className="relative w-full h-12 overflow-hidden">
                         <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent animate-conveyor-shine"></div>
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-suitcase">
                             <Luggage size={40} className="text-navy-dark" />
                         </div>
                    </div>
                    <div className="relative w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full animate-loading-bar-full"></div>
                    </div>
                    {text && <p className="text-center text-navy-dark font-semibold animate-pulse">{text}</p>}
                </div>
            </div>
        );

        const AppLogo = ({ className, isMinimal=false }) => (
            <div className={`text-center ${className} flex items-center justify-center gap-2`}>
                <BrainCircuit size={isMinimal ? 32 : 48} className="text-brand-purple" />
                <h1 className={`${isMinimal ? 'text-4xl' : 'text-5xl md:text-6xl'} font-extrabold tracking-tighter relative inline-flex items-center font-serif`}>
                    <span className="text-navy-dark font-light">Onli</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-brand-violet to-brand-roxo">Prep</span>
                </h1>
            </div>
        );

        const Footer = () => {
            const { t } = useLanguage();
            const { setScreen } = useApp();
            return (
                <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-navy-dark text-white p-8 mt-16">
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

        // --- Auth & Onboarding Screens (from Prototype 2, refined) ---
        const AuthScreen = () => {
            const { t } = useLanguage();
            const { setScreen, setAuthFlowStep, handleEmailLogin, handleGoogleLogin } = useApp();
            
            const handleRegisterClick = () => {
                setAuthFlowStep('registration');
                setScreen('auth-flow');
            };

            return (
                <div className="w-full min-h-full flex flex-col bg-marble-fosco app-background">
                    <div className="flex-grow overflow-y-auto px-4 pt-4">
                        <header className="w-full max-w-lg mx-auto flex items-center justify-center gap-4">
                            <button onClick={handleRegisterClick} className="font-semibold text-navy-dark/80 hover:text-navy-dark transition-colors">{t('auth_iam_student')}</button>
                            <span className="text-slate-300">|</span>
                            <button onClick={() => setScreen('agency-landing')} className="font-semibold text-navy-dark/80 hover:text-navy-dark transition-colors">{t('auth_iam_agency')}</button>
                        </header>
                        
                        <div className="flex flex-col items-center justify-center pt-16 md:pt-24 relative animate-fade-slide-up">
                            <div className="w-full max-w-4xl z-10 flex flex-col items-center text-center">
                                <AppLogo />
                                <p className="text-slate-600 mt-2 mb-10 text-lg" dangerouslySetInnerHTML={{ __html: t('auth_slogan') }}></p>
                                
                                <div className="w-full max-w-sm space-y-4">
                                    <form onSubmit={handleEmailLogin} className="flex items-center gap-2">
                                        <input name="email" type="email" placeholder={t('email')} className="w-full text-sm py-3 px-4 rounded-lg border border-gray-300 bg-white/80 transition-all duration-200 font-medium text-navy-dark focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 flex-1" required />
                                        <input name="password" type="password" placeholder={t('sua_senha')} className="w-full text-sm py-3 px-4 rounded-lg border border-gray-300 bg-white/80 transition-all duration-200 font-medium text-navy-dark focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 flex-1" required />
                                        <button type="submit" className="font-semibold text-white bg-navy-dark rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-brand-roxo text-sm p-3">
                                            <ArrowRight />
                                        </button>
                                    </form>
                                    <button type="button" onClick={handleGoogleLogin} className="w-full inline-flex items-center justify-center font-semibold text-gray-700 bg-white py-3 px-6 rounded-lg transition-all duration-300 ease-in-out border border-gray-300 hover:bg-gray-50 shadow-sm">
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.861 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                                        {t('login_with_google')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        };

        const RegistrationScreen = ({ onNext }) => {
            // This component logic is now part of a larger funnel
            return <div />;
        };

        const OnboardingFunnel = () => {
             const { t } = useLanguage();
             const { completeOnboarding } = useApp();
             const [step, setStep] = useState(0);
             const [isSubmitting, setIsSubmitting] = useState(false);
             const [formData, setFormData] = useState({
                 fullName: '', apelido: '', exchangeReason: '', lifeImpact: '',
                 dreamDestination: 'Irlanda', languageLevel: '', status: '',
                 departureDate: ''
             });

             const primaryButtonClasses = "font-semibold text-white bg-navy-dark py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-brand-roxo hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";
             const totalSteps = 7;

             const handleNext = useCallback(() => {
                 setTimeout(() => setStep(prev => Math.min(prev + 1, totalSteps)), 200);
             }, []);

             const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

             const handleChange = (e) => {
                 const { name, value } = e.target;
                 setFormData(prev => ({ ...prev, [name]: value }));
             };

             const handleSelection = (field, value, autoNext = true) => {
                 setFormData(prev => ({ ...prev, [field]: value }));
                 if (autoNext) handleNext();
             }

             const handleSubmit = async (e) => {
                 e.preventDefault();
                 setIsSubmitting(true);
                 await new Promise(res => setTimeout(res, 2500));
                 completeOnboarding({
                     displayName: formData.apelido || formData.fullName,
                     ...formData
                 });
                 setIsSubmitting(false);
             };

             const progress = (step / totalSteps) * 100;
             if (isSubmitting) return <LoadingScreen text={t('creating_your_dashboard')} />;

             const renderStep = () => {
                const OptionButton = ({ value, field, children, ...props }) => (
                    <button type="button" onClick={() => handleSelection(field, value)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors text-navy-dark ${formData[field] === value ? 'bg-purple-100 border-brand-purple' : 'bg-white border-slate-300 hover:border-brand-purple/50'}`} {...props}>
                        {children}
                    </button>
                );

                 switch (step) {
                     case 0: return (
                         <div className="text-center animate-fade-in">
                             <h2 className="font-title-elegant text-4xl text-navy-dark mb-4">{t('onboarding_intro_title')}</h2>
                             <p className="text-slate-600 mb-8">{t('onboarding_intro_text')}</p>
                             <button onClick={handleNext} className={`${primaryButtonClasses} px-8`}>{t('avancar')}</button>
                         </div>
                     );
                    case 1: return (
                        <div className="w-full animate-fade-in">
                            <h3 className="font-title-elegant text-3xl text-navy-dark block mb-6 text-center">{t('full_name')}</h3>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 border rounded-lg text-center" autoFocus onBlur={handleNext} />
                        </div>
                    );
                    case 2: return (
                        <div className="w-full animate-fade-in">
                            <h3 className="font-title-elegant text-3xl text-navy-dark block mb-6 text-center">{t('apelido')}</h3>
                            <input type="text" name="apelido" value={formData.apelido} onChange={handleChange} className="w-full p-3 border rounded-lg text-center" autoFocus onBlur={handleNext} />
                        </div>
                    );
                     case 3: return (
                         <div className="w-full animate-fade-in">
                             <h3 className="font-title-elegant text-3xl text-navy-dark block mb-6 text-center">{t('exchange_reason_title')}</h3>
                             <div className="space-y-3">
                                 {mockDatabase.exchangeReasons.map(reason => <OptionButton key={reason} value={reason} field="exchangeReason">{reason}</OptionButton>)}
                             </div>
                         </div>
                     );
                     case 4: return (
                         <div className="w-full animate-fade-in">
                             <h3 className="font-title-elegant text-3xl text-navy-dark block mb-6 text-center">{t('dream_destination_title')}</h3>
                             <div className="grid grid-cols-2 gap-3">
                                 {Object.keys(mockDatabase.destinations).map(country => <OptionButton key={country} value={country} field="dreamDestination">{country}</OptionButton>)}
                             </div>
                         </div>
                     );
                     case 5:
                         const language = mockDatabase.languageMap[formData.dreamDestination] || 'Idioma';
                         return (
                             <div className="w-full animate-fade-in">
                                 <h3 className="font-title-elegant text-3xl text-navy-dark block mb-6 text-center">{t('language_level_title', { language })}</h3>
                                 <div className="space-y-3">
                                     {mockDatabase.languageLevels.map(level => <OptionButton key={level} value={level} field="languageLevel">{level}</OptionButton>)}
                                 </div>
                             </div>
                         );
                     case 6: return (
                         <div className="w-full animate-fade-in">
                             <h3 className="font-title-elegant text-3xl text-navy-dark block mb-6 text-center">{t('status_title')}</h3>
                             <div className="space-y-3">
                                 <OptionButton value="pesquisando" field="status">{t('status_researching')}</OptionButton>
                                 <OptionButton value="contrato_assinado" field="status">{t('status_closed')}</OptionButton>
                                 <OptionButton value="de_malas_prontas" field="status">{t('status_packing')}</OptionButton>
                             </div>
                         </div>
                     );
                     case 7: return (
                         <form onSubmit={handleSubmit} className="w-full animate-fade-in">
                             <h2 className="font-title-elegant text-4xl text-navy-dark mb-4 text-center">{t('almost_there_title')}</h2>
                             <label className="font-semibold text-navy-dark block mb-2 text-center">{t('departure_date_label')}</label>
                             <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
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
                             <div className="bg-gradient-to-r from-brand-purple to-brand-violet h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                         </div>
                     </div>
                 </div>
             );
        };
        
        const AuthFlowScreen = () => {
             const { authFlowStep, goBack } = useApp();
             return (
                 <div className="w-full h-full bg-marble-fosco flex flex-col relative overflow-y-auto app-background">
                     <button onClick={goBack} className="absolute top-4 left-4 p-3 rounded-full hover:bg-slate-200/50 transition-colors z-20">
                         <ArrowLeft className="w-6 h-6 text-slate-600" />
                     </button>
                     <div className="flex-1 w-full flex items-center justify-center transition-transform duration-500 ease-in-out">
                         {authFlowStep === 'onboarding-funnel' ? <OnboardingFunnel /> : <div/>}
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
            };
            const currentContent = content[`${type}_pt`];
            return (
                <div className="w-full h-full bg-marble-fosco flex flex-col relative overflow-y-auto">
                    <header className="p-4 flex items-center border-b border-slate-200">
                        <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200/50 transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-600" />
                        </button>
                        <h1 className="text-xl font-bold text-navy-dark mx-auto">{title}</h1>
                    </header>
                    <main className="flex-1 p-8 prose max-w-4xl mx-auto">
                        <h2>{title}</h2>
                        <p>{currentContent}</p>
                    </main>
                </div>
            );
        };
        
        // --- DASHBOARD (FROM PROTOTYPE 1, REFINED & INTEGRATED) ---
        
        const DashboardScreen = () => {
             const {t} = useLanguage();
             const { userData, isFirstTimeUser, showToast, saveItem, savedItems, setSavedItems, toast, setToast, agendaItems, addAgendaItem, toggleAgendaItem, updateAgendaItem, showTips, setShowTips, goBack } = useApp();
             const [activeSection, setActiveSection] = useState('journey');
             const [showWelcome, setShowWelcome] = useState(isFirstTimeUser);
             const [showPermission, setShowPermission] = useState(false);
             const [activeModal, setActiveModal] = useState(null);
             const [showFlightInfo, setShowFlightInfo] = useState(false);
             const [activeTip, setActiveTip] = useState(null);
             const [jeiQuery, setJeiQuery] = useState(null);
             const [showSearchModal, setShowSearchModal] = useState(false);
             const [journeyPopup, setJourneyPopup] = useState(null);
             const headerRef = useRef(null);
             const [headerHeight, setHeaderHeight] = useState(0);

             useEffect(() => {
                 if (headerRef.current) { setHeaderHeight(headerRef.current.offsetHeight); }
             }, [activeSection, userData]);

             useEffect(() => {
                 if (isFirstTimeUser) { setTimeout(() => setShowPermission(true), 3000); }
             }, [isFirstTimeUser]);

             useEffect(() => {
                 if (!showTips || !userData?.destinationCountry) return;
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
                 }, 600000); 
                 return () => clearInterval(interval);
             }, [userData, saveItem, showToast, t, showTips, setShowTips]);

             if (!userData) return <LoadingScreen text="Carregando seus dados..."/>;

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
                     showToast(`Conteúdo para a etapa "${step.name}" ainda não disponível.`, Info)
                 }
             };

            const renderModalContent = () => {
                switch(activeModal) {
                    case 'folder': return <FolderModal t={t} savedItems={savedItems} setSavedItems={setSavedItems} />;
                    case 'calculator': return <CalculatorModal t={t} onSave={saveItem} />;
                    case 'currency': return <CurrencyModal t={t} />;
                    case 'timezone': return <TimezoneModal t={t} userData={userData} />;
                    case 'agenda': return <AgendaModal t={t} agendaItems={agendaItems} onToggle={toggleAgendaItem} onAddTask={addAgendaItem} onUpdateTask={updateAgendaItem} />;
                    case 'teacher_ana': return <TeacherAnaModal t={t} />;
                    default: return null;
                }
            };
            
            const renderActiveSection = () => {
                switch(activeSection) {
                    case 'cases': return <CasesSection />;
                    case 'journey': return <JourneyTimeline userStatus={userData.status} onStepClick={handleJourneyStepClick} />;
                    case 'onlipremium': return <OnliPremiumSection />;
                    case 'preparatorio': return <PreparatorioSection />;
                    default: return <div className="bg-white p-8 rounded-lg shadow-sm"><p className="text-center text-slate-500">{t('in_construction')}</p></div>;
                }
            };

             return (
                 <div className="w-full h-dvh flex flex-col bg-slate-100 app-background">
                     {showWelcome && <WelcomePopup userData={userData} onClose={() => setShowWelcome(false)} t={t} />}
                     {showPermission && <NotificationPermissionModal t={t} onClose={(allowed) => { console.log("Notifications allowed:", allowed); setShowPermission(false); }} />}
                     {activeModal && <Modal title={t(`${activeModal}_modal_title`)} onClose={() => setActiveModal(null)}>{renderModalContent()}</Modal>}
                     {showFlightInfo && <FlightInfoModal onClose={() => setShowFlightInfo(false)} t={t} />}
                     {activeTip && <TipOfTheDayModal tip={activeTip} onClose={() => setActiveTip(null)} onSave={saveItem} t={t} />}
                     {jeiQuery && <JeiResponseModal query={jeiQuery} onClose={() => setJeiQuery(null)} onSave={saveItem} t={t} />}
                     {showSearchModal && <JeiSearchModal onSearch={handleJeiSearch} onClose={() => setShowSearchModal(false)} t={t} />}
                     {journeyPopup && <JourneyStepPopup step={journeyPopup.step} content={journeyPopup.content} onClose={() => setJourneyPopup(null)} onSave={saveItem} />}
                     <ToastNotification toast={toast} onClose={() => setToast(null)} t={t} />

                     <div ref={headerRef} className="fixed top-0 left-0 right-0 z-30 shadow-md">
                         {activeSection !== 'onlipremium' && (
                             <>
                                 <DashboardHeader userData={userData} onBack={goBack} showBackButton={true} />
                                 <CountdownBar userData={userData} onFlightClick={() => setShowFlightInfo(true)} />
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
                    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
                    'https://unpkg.com/recharts/umd/Recharts.min.js'
                ];
                scripts.forEach(src => {
                    const scriptId = src.split('/').pop();
                    if (!document.getElementById(scriptId)) {
                        const script = document.createElement('script');
                        script.id = scriptId;
                        script.src = src;
                        script.async = true;
                        document.body.appendChild(script);
                    }
                });
                const timer = setTimeout(() => setIsLoading(false), 2500);
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
                        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { background: #eab308; border-radius: 10px; }
                        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #eab308 transparent; }

                        .app-background {
                            background-color: #FBF9F6;
                            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23192A56' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                        }

                        @keyframes loading-bar-full { from { width: 0%; } to { width: 100%; } }
                        .animate-loading-bar-full { animation: loading-bar-full 2.5s ease-in-out forwards; }
                        
                        @keyframes suitcase-move { 
                          0% { transform: translateX(-100%) translateY(-50%); } 
                          100% { transform: translateX(calc(100vw + 100%)) translateY(-50%); } 
                        }
                        .animate-suitcase { animation: suitcase-move 2.5s ease-in-out forwards; }
                        
                        @keyframes conveyor-shine {
                           0% { transform: translateX(-100%); }
                           100% { transform: translateX(100%); }
                        }
                        .animate-conveyor-shine { animation: conveyor-shine 1.5s ease-in-out infinite; }
                        
                        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                        .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
                        
                        @keyframes fade-slide-up {
                            0% { opacity: 0; transform: translateY(20px); }
                            100% { opacity: 1; transform: translateY(0); }
                        }
                        .animate-fade-slide-up { animation: fade-slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                        
                        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
                        .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-in-out forwards; }
                        
                        @keyframes slide-up { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

                        @keyframes slide-in-left { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
                        .animate-slide-in-left { animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                        
                        .prose { color: #374151; line-height: 1.7; }
                        .prose h2 { color: #192A56; }
                    `}</style>
                    <div className="w-full h-dvh antialiased flex flex-col">
                        <div className="relative w-full flex-grow flex flex-col bg-marble-fosco">
                            {isLoading ? <LoadingScreen text="Preparando sua jornada..."/> : <Main />}
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

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App />);

    </script>
</body>
</html>
