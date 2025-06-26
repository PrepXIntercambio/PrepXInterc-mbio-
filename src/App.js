import React, { useState, useEffect, createContext, useContext, useCallback, useRef, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Search, Briefcase, Plane, Globe, PlayCircle, ChevronLeft, ChevronRight, Menu, Lightbulb, X, MessageCircle, Bookmark, CalendarClock, PlusCircle, ListChecks, ArrowLeft, Handshake, FileSignature, Newspaper, Stamp, ShieldCheck, Ticket, Siren, FolderKanban, ArrowUp, PartyPopper, Lock, Clock } from 'lucide-react';

// --- Firebase Mock Initialization ---
let app, auth, db;
try {
  const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// --- i18n (Internationalization & Translations) ---
const translations = {
  pt: {
    hey: "Hey,",
    preparatorio: "Preparatório",
    days: "d", hours: "h", minutes: "m", seconds: "s",
    home_tagline: "Seu assistente preparatório de intercâmbio.",
    home_google_login: "Continuar com o Google",
    home_email_register: "Cadastrar com E-mail",
    filter_title: "Quase lá!",
    filter_subtitle: "Personalize sua jornada para uma experiência única.",
    filter_destination_label: "Seu destino dos sonhos",
    filter_destination_placeholder: "Ex: Dublin, Irlanda",
    filter_date_label: "Data de partida",
    register_button: "Salvar e Iniciar Jornada",
    timeline_title: "Linha do Tempo",
    timeline_stage_pesquisando: "Pesquisa",
    timeline_stage_negociacao: "Negociação",
    timeline_stage_intercambio_fechado: "Contrato",
    timeline_stage_visto: "Visto",
    timeline_stage_seguro: "Seguro",
    timeline_stage_aereo: "Passagem Aérea",
    timeline_stage_checkup: "Check-up Médico",
    timeline_stage_documentacao_final: "Documentos Finais",
    timeline_stage_embarque: "Embarque",
    timeline_stage_no_destino: "No Destino",
    task_where_to_start: "Por onde começar?",
    task_planning: "Planejamento Financeiro",
    task_compare_agencies: "Comparar Agências",
    task_request_quotes: "Solicitar Orçamentos",
    task_review_contract: "Revisar Contrato",
    task_make_payment: "Efetuar Pagamento",
    task_gather_visa_docs: "Reunir docs do Visto",
    task_schedule_interview: "Agendar Entrevista",
    task_get_insurance_quotes: "Cotar Seguros",
    task_issue_policy: "Emitir Apólice",
    task_search_flights: "Pesquisar Passagens",
    task_buy_ticket: "Comprar Passagem",
    task_schedule_checkup: "Agendar Consulta",
    task_get_vaccines: "Tomar Vacinas",
    task_notarize_docs: "Autenticar Documentos",
    task_organize_folder: "Organizar Pasta de Viagem",
    task_preboarding_checklist: "Checklist Pré-embarque",
    task_flight_details: "Detalhes do Voo",
    task_docs_pt2: "Documentos no Destino",
    task_accommodation: "Moradia",
    task_job: "Procurar Emprego",
    task_expenses: "Controle de Gastos",
    task_guide: "Guia Local",
    task_help: "Botão de Ajuda",
    video_tutorial_title: "Bem-vindo(a) ao OnPrepX",
    video_tutorial_subtitle: "Um guia rápido para sua jornada.",
    tip_of_the_day: "Dica do Dia",
    save_tip: "Salvar Dica",
    tip_saved: "Dica salva!",
    in_construction: "Em construção...",
    terms_and_conditions: "Termos de Uso e Privacidade",
    copyright: `© ${new Date().getFullYear()} OnPrepX. Todos os direitos reservados.`,
    info_menu_title: "Menu Principal",
    info_menu_desc: "Acesse todas as seções do app, configurações e seu perfil.",
    info_news_title: "Atalho para Notícias",
    info_news_desc: "Clique para rolar a tela diretamente até a seção de notícias do seu destino.",
    info_ana_title: "Ajuda da Ana",
    info_ana_desc: "Converse com nossa assistente virtual para tirar dúvidas rápidas.",
    info_tip_title: "Dica do Dia",
    info_tip_desc: "Receba uma dica valiosa para sua jornada de intercâmbio.",
    info_community_title: "Comunidade",
    info_community_desc: "Conecte-se com outros intercambistas e compartilhe experiências.",
    info_timeline_shortcut_title: "Atalho para Linha do Tempo",
    info_timeline_shortcut_desc: "Clique no ícone principal para rolar a tela diretamente até sua linha do tempo.",
    info_timeline_pesquisa_title: "Fase de Pesquisa",
    info_timeline_pesquisa_desc: "É hora de escolher o destino, a escola e planejar o orçamento. Explore suas opções!",
    info_timeline_negociacao_title: "Fase de Negociação",
    info_timeline_negociacao_desc: "Contato com agências e escolas, análise de propostas e orçamentos.",
    info_timeline_fechado_title: "Fase de Contrato",
    info_timeline_fechado_desc: "Assinatura do contrato e pagamento. Seu intercâmbio está confirmado!",
    info_timeline_visto_title: "Visto de Estudante",
    info_timeline_visto_desc: "Verifique a necessidade e os requisitos do visto para o seu destino e tipo de curso. Comece o processo o quanto antes!",
    info_timeline_seguro_title: "Seguro Saúde/Viagem",
    info_timeline_seguro_desc: "Contratar um bom seguro é obrigatório e essencial para sua segurança. Compare coberturas e preços.",
    info_timeline_aereo_title: "Passagens Aéreas",
    info_timeline_aereo_desc: "Com o curso e visto confirmados, é hora de comprar as passagens. Pesquise por promoções!",
    info_timeline_checkup_title: "Check-up Médico",
    info_timeline_checkup_desc: "Faça um check-up geral e tome as vacinas necessárias. Viajar com a saúde em dia é fundamental.",
    info_timeline_docs_title: "Documentação Final",
    info_timeline_docs_desc: "Organize todos os documentos importantes em uma pasta física e digital: passaporte, visto, carta da escola, seguro, etc.",
    info_timeline_embarque_title: "Fase de Embarque",
    info_timeline_embarque_desc: "Checklist final da mala, despedidas e detalhes do voo. A aventura está quase começando!",
    info_timeline_destino_title: "Fase No Destino",
    info_timeline_destino_desc: "Você chegou! É hora de encontrar moradia, procurar emprego e se adaptar à nova vida.",
    news_title: "OnPrepX InterNews",
    notification_contract_title: "Parabéns!",
    notification_contract_desc: "Você ganhou 50% de desconto na assinatura do nosso App. Assine já e tenha acesso a conteúdos exclusivos!",
    notification_negotiation_title: "Cupom de Desconto!",
    notification_negotiation_desc: "Use o cupom ONPREPX5 em nossas agências parceiras e ganhe 5% de desconto na compra do seu intercâmbio.",
    notification_visa_title: "Cupom para Visto!",
    notification_visa_desc: "Use o cupom ONPREPX5 em nossas agências parceiras e ganhe 5% de desconto na assessoria do seu visto. Válido para vistos solicitados no Brasil.",
    notification_insurance_title: "Cupom para Seguro!",
    notification_insurance_desc: "Use o cupom ONPREPX5 em nossas agências parceiras e ganhe 5% de desconto na compra do seu Seguro Viagem.",
    notification_destination_title: "Bem-vindo(a)!",
    notification_destination_desc: "Você ganhou acesso ao nosso grupo exclusivo com dicas, modelos de CV e descontos nos cursos de nossos parceiros.",
    partners_page: "Ver Parceiros",
    guide_form_title: "Baixe seu Guia Completo!",
    guide_form_desc: "Preencha seus dados para receber o Guia Definitivo do Intercâmbio OnPrepX no seu e-mail.",
    guide_form_consent: "Aceito receber e-mails com promoções e novidades.",
    guide_form_button: "Baixar Guia Agora",
    guide_form_success: "Sucesso! Seu guia foi enviado para o seu e-mail.",
    timezone_title: "Fuso Horário Global",
    timezone_local: "Horário Local",
    timezone_destination: "No seu Destino",
    timezone_search_placeholder: "Digite uma cidade...",
    timezone_search_button: "Buscar",
    timezone_not_found: "Cidade não encontrada.",
    ad_title: "Recompensa desbloqueada!",
    ad_desc: "Assista a um vídeo rápido para liberar sua próxima conquista.",
    ad_skip: "Pular em",
    ad_watch: "Assistir",
    info_countdown_title: "Contagem Regressiva",
    info_countdown_desc: "Fique de olho em quanto tempo falta para a sua grande viagem começar!",
    info_timezone_title: "Relógio Mundial",
    info_timezone_desc: "Verifique o fuso horário do seu destino e planeje suas ligações para a família e amigos."
  },
  en: {
    // English translations would go here
  }
};

const LanguageContext = createContext(null);
const useLanguage = () => useContext(LanguageContext);
const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('pt');
    const t = useCallback((key) => (translations[language]?.[key]) || key, [language]);
    const value = { language, setLanguage, t };
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// --- UI Theme & Styling ---
const theme = {
  '--bg-main': '#F8F7F4',
  '--bg-topbar': '#FFFFFF',
  '--bg-card': '#FFFFFF',
  '--bg-popup': '#F7FAFC',
  '--text-primary': '#1A202C',
  '--text-navy': '#192A56',
  '--text-secondary': '#4A5568',
  '--accent-gradient': 'linear-gradient(135deg, #8e2de2, #4a00e0)',
  '--accent-color': '#8e2de2',
  '--accent-glow': 'rgba(142, 45, 226, 0.4)',
  '--border-color': '#E2E8F0',
};

// --- UI Components ---
const LoadingSpinner = () => (<div className="w-full h-full flex items-center justify-center bg-[var(--bg-main)]"><div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin" style={{borderColor: 'var(--accent-color)'}}></div></div>);

const AppLogo = () => {
    const { t } = useLanguage();
    return (
        <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" className="text-center">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8e2de2" /><stop offset="100%" stopColor="#4a00e0" /></linearGradient>
                <filter id="on-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="var(--accent-glow)" />
                </filter>
            </defs>

            <text 
                x="50%" 
                y="40" 
                dominantBaseline="middle" 
                textAnchor="end"
                fontSize="48" 
                fontWeight="bold" 
                fontFamily="Inter, sans-serif" 
                fill="#F5F5F5" 
                stroke="#4A5568" 
                strokeWidth="0.3" 
                filter="url(#on-glow)"
                style={{ transform: 'translateX(-52px)' }}
            >
                On
            </text>

            <text 
                x="50%" 
                y="40" 
                dominantBaseline="middle" 
                textAnchor="start"
                fontSize="48" 
                fontWeight="300" 
                fontFamily="Inter, sans-serif" 
                fill="url(#logoGradient)" 
                letterSpacing="1"
                style={{ transform: 'translateX(-50px)' }}
            >
                PrepX
            </text>
            
            <text x="50%" y="75" dominantBaseline="middle" textAnchor="middle" fontSize="13" fontWeight="400" fontFamily="Inter, sans-serif" fill="var(--text-secondary)">
                {t('home_tagline')}
            </text>
        </svg>
    );
};

const FemaleIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM8 12C6.66667 12 4 12.8 4 15V19H7L8.5 16L10 19H14L15.5 16L17 19H20V15C20 12.8 17.3333 12 16 12H8Z" fill="currentColor"/></svg>);
const SpinningSiren = () => <Siren size={20} className="spinning-siren" />;

// --- Screens ---
const HomeScreen = ({ onGoogleLogin, onEmailRegister }) => {const { t } = useLanguage();return (<div className="w-full h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in"><main className="flex-grow flex flex-col items-center justify-center"><AppLogo /><div className="flex flex-col gap-4 w-full max-w-xs mt-16"><button onClick={onGoogleLogin} className="home-button flex items-center justify-center gap-3"><svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.776,44,30.338,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>{t('home_google_login')}</button><button onClick={onEmailRegister} className="home-button-secondary">{t('home_email_register')}</button></div></main></div>);};
const FilterScreen = ({ onComplete, onBack, userData }) => {const { t } = useLanguage();const today = new Date().toISOString().split('T')[0];return (<div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[var(--bg-main)] relative"><button onClick={onBack} className="absolute top-5 left-5 p-2 rounded-full hover:bg-black/5"><ArrowLeft size={24} className="text-[var(--text-secondary)]"/></button><div className="w-full max-w-md text-[var(--text-primary)] animate-fade-in"><h2 className="text-4xl font-light text-center mb-3 text-gradient tracking-wider">{t('filter_title')}</h2><p className="text-center mb-10 text-[var(--text-secondary)]">{t('filter_subtitle')}</p><form onSubmit={(e) => { e.preventDefault(); onComplete({ data: { destination: e.target.destination.value, departureDate: e.target.departureDate.value } }); }} className="space-y-6"><div><label htmlFor="destination" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('filter_destination_label')}</label><input name="destination" type="text" id="destination" defaultValue={userData?.destination || ''} placeholder={t('filter_destination_placeholder')} className="input-field" required /></div><div><label htmlFor="departureDate" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('filter_date_label')}</label><input name="departureDate" type="date" id="departureDate" defaultValue={userData?.departureDate || ''} min={today} className="input-field" required /></div><button type="submit" className="button-primary w-full">{t('register_button')}</button></form></div></div>);};

// --- Dashboard Components ---
const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const toggleLanguage = () => setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
    return (<button onClick={toggleLanguage} className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-xs font-bold text-[var(--text-secondary)]">{language === 'pt' ? 'EN' : 'PT'}</button>);
};

const DashboardUserInfo = ({ userData }) => { 
    const { t } = useLanguage(); 
    return (
        <div className="flex justify-between items-center px-4 pt-4">
            <div className="flex items-center gap-3">
                <img src={userData.photoURL} alt="User" className="w-11 h-11 rounded-full object-cover border-2 border-white shadow" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/44x44/E2E8F0/4A5568?text=${userData.name.charAt(0)}`; }} />
                <div>
                    <h2 className="font-bold text-lg text-[var(--text-primary)] leading-tight">{t('hey')} {userData.name.split(' ')[0]}!</h2>
                    <p className="text-sm text-[var(--text-secondary)]">{t('preparatorio')} {userData.destination}</p>
                </div>
            </div>
            <div className="flex items-center flex-shrink-0">
                <LanguageSwitcher />
                <button className="p-2 rounded-full hover:bg-black/5 transition-colors"><Search size={20} className="text-[var(--text-secondary)]" /></button>
            </div>
        </div>
    );
};

const Countdown = ({ targetDate, onInfoClick, onTimezoneClick }) => {
    const { t } = useLanguage();
    const countdownRef = useRef(null);
    const timezoneRef = useRef(null);
    const calculateTimeLeft = useCallback(() => { if (!targetDate) return null; const difference = +new Date(targetDate + "T00:00:00") - +new Date(); if (difference <= 0) return null; return {d: Math.floor(difference / (1000 * 60 * 60 * 24)), h: Math.floor((difference / (1000 * 60 * 60)) % 24), m: Math.floor((difference / 1000 / 60) % 60), s: Math.floor((difference / 1000) % 60)}; }, [targetDate]);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => { const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000); return () => clearTimeout(timer); });
    if (!timeLeft) return null;
    return (
        <div className="px-4 pb-2 pt-3">
            <div className="flex items-center justify-center gap-4 bg-transparent p-2 rounded-xl">
                <div ref={countdownRef} className="relative">
                    <button onClick={() => onInfoClick(countdownRef, 'info_countdown_title', 'info_countdown_desc')} className="info-plus-button-v2"><PlusCircle size={12}/></button>
                    <CalendarClock size={24} className="text-[var(--text-primary)] flex-shrink-0" />
                </div>
                <div className="flex items-center justify-center gap-2 flex-grow">{Object.entries(timeLeft).map(([unit, value]) => (<div key={unit} className="countdown-item"><span>{value}</span>{t(unit+'s')}</div>))}</div>
                <div ref={timezoneRef} className="relative">
                    <button onClick={onTimezoneClick} className="top-nav-button !w-auto !h-auto p-1"><Clock size={24} /></button>
                    <button onClick={() => onInfoClick(timezoneRef, 'info_timezone_title', 'info_timezone_desc')} className="info-plus-button"><PlusCircle size={12}/></button>
                </div>
            </div>
        </div>
    );
};

const VideoPlayer = () => {
    const [videoUrl, setVideoUrl] = useState('');
    useEffect(() => { const vimeoIDs = ['829215888', '76979871', '814421583', '253890245']; const randomId = vimeoIDs[Math.floor(Math.random() * vimeoIDs.length)]; setVideoUrl(`https://player.vimeo.com/video/${randomId}?h=c2f5478436&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0`); }, []);
    if (!videoUrl) return <div className="w-full aspect-video rounded-xl shadow-lg bg-black"></div>;
    return (<div className="w-full aspect-video rounded-xl shadow-lg bg-black overflow-hidden"><iframe src={videoUrl} width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Vimeo Video Player"></iframe></div>);
};

const VerticalTimeline = ({ activeStage, onStageClick, progress, onInfoClick, stages, conquestAnimation, unlockedStages }) => {
    const buttonRefs = useMemo(() => stages.reduce((acc, stage) => {
        acc[stage.id] = React.createRef();
        return acc;
    }, {}), [stages]);
    const heightPercentage = Math.max(0, (progress - 10) / (100 - 10) * 100);
    return (
        <div className="flex flex-col items-center justify-between h-[40rem] relative">
            <div className="absolute top-5 bottom-5 w-1 bg-[var(--border-color)] rounded-full left-1/2 -translate-x-1/2"></div>
            <div className="absolute top-5 w-1 bg-gradient-to-b from-[#8e2de2] to-[#4a00e0] rounded-full left-1/2 -translate-x-1/2" style={{height: `calc(${heightPercentage}%)`, transition: 'height 1s ease-in-out'}}></div>
            {stages.map(stage => {
                const isActive = activeStage === stage.id;
                const isCompleted = progress >= stage.progress;
                const IconComponent = stage.icon;
                const isConquest = conquestAnimation === stage.id;
                const isLocked = (stage.conquest || stage.reward) && !unlockedStages[stage.id];
                
                return (
                    <div key={stage.id} ref={buttonRefs[stage.id]} className="z-10 relative">
                        <button onClick={() => onStageClick(stage.id)} title={stage.label} className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isActive ? 'bg-[var(--accent-color)] text-white border-white/50 scale-110 shadow-lg' : isCompleted && !isLocked ? 'bg-[var(--accent-color)] text-white border-transparent' : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)]'}`} >
                            {isLocked ? <Lock size={20} /> : (isConquest ? <PartyPopper size={24} className="text-white animate-conquest" /> : <IconComponent/>)}
                        </button>
                        {!isLocked && (
                            <button onClick={(e) => { e.stopPropagation(); onInfoClick(buttonRefs[stage.id], stage.info.titleKey, stage.info.descKey); }} className="info-plus-button" aria-label={`info sobre ${stage.label}`}>
                                <PlusCircle size={12} />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const TaskButton = ({ title, onClick, special = false }) => { 
    const { t } = useLanguage(); 
    return (
        <button onClick={onClick} className={`w-full p-4 rounded-xl flex items-center justify-between text-left transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-px ${special ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-gray-50'}`}>
            <span className="font-semibold">{t(title)}</span>
            <ChevronRight size={20} className={`flex-shrink-0 ${special ? 'text-white/70' : 'text-[var(--text-secondary)]'}`} />
        </button>
    );
};

const TopNavBar = ({ onInfoClick, onTimelineClick, onNewsClick }) => {
    const { t } = useLanguage();
    const buttonRefs = useMemo(() => ({
        menu: React.createRef(),
        timeline: React.createRef(),
        news: React.createRef(),
   x     ana: React.createRef(),
        tip: React.createRef()
    }), []);
    const buttons = [
        { id: 'menu', Icon: Menu, title: 'Menu', action: () => alert(t('in_construction')), info: { titleKey: 'info_menu_title', descKey: 'info_menu_desc' } },
        { id: 'timeline', Icon: ListChecks, title: 'Linha do Tempo', action: onTimelineClick, info: { titleKey: 'info_timeline_shortcut_title', descKey: 'info_timeline_shortcut_desc' } },
        { id: 'news', Icon: Newspaper, title: 'Notícias', action: onNewsClick, info: { titleKey: 'info_news_title', descKey: 'info_news_desc' } },
        { id: 'ana', Icon: FemaleIcon, title: 'Ajuda da Ana', action: () => alert(t('in_construction')), info: { titleKey: 'info_ana_title', descKey: 'info_ana_desc' } },
        { id: 'tip', Icon: Lightbulb, title: 'Dica do Dia', action: () => alert(t('in_construction')), info: { titleKey: 'info_tip_title', descKey: 'info_tip_desc' } },
    ];
    return (
        <div className="w-full flex justify-center p-2 bg-[var(--bg-topbar)] border-b border-[var(--border-color)] shadow-sm">
            <div className="flex items-center gap-4 md:gap-5">
                {buttons.map(({ id, Icon, title, action, info }) => (
                    <div key={id} ref={buttonRefs[id]} className="relative group">
                        <button onClick={action} title={title} className="top-nav-button"><Icon size={24} /></button>
                        {info && (
                            <button onClick={(e) => { e.stopPropagation(); onInfoClick(buttonRefs[id], info.titleKey, info.descKey); }} className="info-plus-button" aria-label={`info sobre ${title}`}>
                                <PlusCircle size={12} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const InfoPopup = ({ popupData, onClose }) => {
    const { t } = useLanguage();
    if (!popupData.visible) return null;
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose}>
            <div className="w-full h-full flex items-center justify-center p-4">
                <div 
                    className="relative p-4 rounded-lg shadow-xl w-full max-w-sm animate-slide-down"
                    style={{ backgroundColor: 'var(--bg-popup)', color: 'var(--text-navy)' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10"><X size={16} className="text-[var(--text-navy)] opacity-70" /></button>
                    <h4 className="font-bold text-base mb-1" style={{ color: 'var(--text-navy)' }}>{t(popupData.title)}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-navy)' }}>{t(popupData.content)}</p>
                </div>
            </div>
        </div>
    );
};

const ConquestNotification = ({ notification, onClose }) => {
    const { t } = useLanguage();
    
    useEffect(() => {
        if (notification.visible) {
            const timer = setTimeout(onClose, 6000);
            return () => clearTimeout(timer);
        }
    }, [notification.visible, onClose]);
    if (!notification.visible) return null;
    
    return (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 w-11/12 max-w-md z-50">
            <div className="p-4 rounded-lg shadow-2xl animate-slide-down bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                <div className="flex items-start gap-3">
                    <PartyPopper size={24} className="mt-1 flex-shrink-0"/>
                    <div className="flex-grow">
                        <h4 className="font-bold">{t(notification.title)}</h4>
                        <p className="text-sm text-white/90">{t(notification.content)}</p>
                        {notification.link && (
                            <a href="#" onClick={(e) => {e.preventDefault(); alert(t('in_construction'))}} className="mt-2 inline-block font-semibold text-white underline underline-offset-2">
                                {t('partners_page')}
                            </a>
                        )}
                    </div>
                    <button onClick={onClose} className="p-1 -mt-1 -mr-1 rounded-full hover:bg-white/20"><X size={18} /></button>
                </div>
            </div>
        </div>
    );
}

const NewsSlider = ({ news, newsRef }) => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = () => { setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length); };
    const prevSlide = () => { setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length); };
    
    if(!news || news.length === 0) {
        return <div ref={newsRef} className="text-center p-4 text-gray-500 scroll-mt-24">Nenhuma notícia encontrada.</div>
    }
    return (
        <div ref={newsRef} className="w-full relative scroll-mt-24">
            <div className="border-b border-gray-200 my-4">
                <h3 className="text-center text-sm font-semibold text-gray-500 uppercase pb-2">{t('news_title')}</h3>
            </div>
            <div className="overflow-hidden relative h-48">
                {news.map((item, index) => (
                    <div key={index} className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
                        <div className="p-4 bg-white rounded-lg shadow-sm h-full flex flex-col justify-between">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">{item.source} - {item.date}</p>
                                <h4 className="font-bold text-gray-800 mb-2 leading-tight">{item.title}</h4>
                            </div>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--accent-color)] hover:underline self-start">Leia mais &rarr;</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-4">
                <button onClick={prevSlide} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><ChevronLeft size={20} className="text-gray-600"/></button>
                <div className="flex gap-2 mx-4">{news.map((_, index) => (<div key={index} className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-[var(--accent-color)]' : 'bg-gray-300'}`}></div>))}</div>
                <button onClick={nextSlide} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><ChevronRight size={20} className="text-gray-600"/></button>
            </div>
        </div>
    );
};

const AdSimulationModal = ({ onComplete }) => {
    const { t } = useLanguage();
    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [countdown, onComplete]);
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-lg text-white text-center w-full max-w-sm">
                <h3 className="text-xl font-bold mb-2">{t('ad_title')}</h3>
                <p className="mb-4 text-gray-300">{t('ad_desc')}</p>
                <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${(5 - countdown) / 5 * 100}%` }}></div>
                </div>
                <p className="text-sm">{t('ad_skip')} {countdown}s...</p>
            </div>
        </div>
    );
};

const GuideFormModal = ({ onClose, onSuccess }) => {
    const { t } = useLanguage();
    const handleSubmit = (e) => {
        e.preventDefault();
        onSuccess();
    };
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative p-6 rounded-lg shadow-xl w-full max-w-sm animate-slide-down bg-[var(--bg-popup)]">
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10"><X size={18} className="text-[var(--text-secondary)]" /></button>
                <h3 className="text-lg font-bold text-[var(--text-navy)] mb-2">{t('guide_form_title')}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{t('guide_form_desc')}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Seu nome" className="input-field mb-3 w-full" required />
                    <input type="email" placeholder="Seu melhor e-mail" className="input-field mb-4 w-full" required />
                    <div className="flex items-start mb-4">
                        <input id="consent" type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded mt-1" />
                        <label htmlFor="consent" className="ml-2 block text-sm text-[var(--text-secondary)]">{t('guide_form_consent')}</label>
                    </div>
                    <button type="submit" className="button-primary w-full">{t('guide_form_button')}</button>
                </form>
            </div>
        </div>
    );
};

const TimezoneModal = ({ onClose, destinationCity }) => {
    const { t } = useLanguage();
    const [localTime, setLocalTime] = useState('');
    const [destinationTime, setDestinationTime] = useState('');
    const [searchedTime, setSearchedTime] = useState(null);
    const [error, setError] = useState('');
    const searchInputRef = useRef(null);
    const timezones = {
     'dublin': 'Europe/Dublin', 'london': 'Europe/London', 'paris': 'Europe/Paris', 'madrid': 'Europe/Madrid', 'berlin': 'Europe/Berlin', 'rome': 'Europe/Rome',
     'toronto': 'America/Toronto', 'vancouver': 'America/Vancouver', 'new york': 'America/New_York', 'los angeles': 'America/Los_Angeles',
     'sydney': 'Australia/Sydney', 'melbourne': 'Australia/Melbourne', 'auckland': 'Pacific/Auckland',
     'tokyo': 'Asia/Tokyo', 'seoul': 'Asia/Seoul', 'shanghai': 'Asia/Shanghai'
    };
    const formatTime = (timeZone) => {
        try {
            return new Date().toLocaleTimeString('pt-BR', { timeZone, hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            console.error("Invalid timezone:", timeZone);
            return null;
        }
    };
    
    useEffect(() => {
        const updateTimes = () => {
            setLocalTime(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
            const destinationTzKey = destinationCity?.toLowerCase().split(',')[0].trim();
            const destinationTz = timezones[destinationTzKey];
            if(destinationTz) {
                setDestinationTime(formatTime(destinationTz));
            } else {
                 setDestinationTime('--:--');
            }
        };
        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, [destinationCity]);
    
    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchInputRef.current.value.toLowerCase();
        const tz = timezones[query];
        setError('');
        setSearchedTime(null);
        if(tz) {
            setSearchedTime({ city: query.charAt(0).toUpperCase() + query.slice(1), time: formatTime(tz) });
        } else {
            setError(t('timezone_not_found'));
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div 
                className="relative p-6 rounded-lg shadow-xl w-full max-w-sm animate-slide-down"
                style={{ backgroundColor: 'var(--bg-popup)', color: 'var(--text-navy)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10"><X size={18} className="text-[var(--text-navy)] opacity-70" /></button>
                <h3 className="text-lg font-bold text-[var(--text-navy)] mb-4">{t('timezone_title')}</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
                        <span className="font-semibold">{t('timezone_local')}</span>
                        <span className="text-xl font-mono">{localTime}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
                        <span className="font-semibold">{t('timezone_destination')}</span>
                        <span className="text-xl font-mono">{destinationTime || '--:--'}</span>
                    </div>
                    {searchedTime && (
                        <div className="flex justify-between items-center bg-blue-100 p-3 rounded-lg">
                            <span className="font-semibold capitalize">{searchedTime.city}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-mono">{searchedTime.time}</span>
                                <button onClick={() => setSearchedTime(null)} className="p-1 rounded-full text-red-500 hover:bg-black/10">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSearch} className="mt-6 flex gap-2">
                    <input ref={searchInputRef} type="text" placeholder={t('timezone_search_placeholder')} className="input-field w-full" />
                    <button type="submit" className="button-primary !p-3 !rounded-lg"><Search size={20}/></button>
                </form>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
        </div>
    )
}

const DashboardScreen = ({ userData, navigate }) => {
    const { t } = useLanguage();
    
    const stages = useMemo(() => [ 
        { id: 'pesquisando', icon: Search, label: t('timeline_stage_pesquisando'), progress: 10, info: { titleKey: 'info_timeline_pesquisa_title', descKey: 'info_timeline_pesquisa_desc' }, reward: 'guide' }, 
        { id: 'negociacao', icon: Handshake, label: t('timeline_stage_negociacao'), progress: 20, info: { titleKey: 'info_timeline_negociacao_title', descKey: 'info_timeline_negociacao_desc' }, conquest: {title: 'notification_negotiation_title', content: 'notification_negotiation_desc', link: true} },
        { id: 'intercambio-fechado', icon: FileSignature, label: t('timeline_stage_intercambio_fechado'), progress: 30, info: { titleKey: 'info_timeline_fechado_title', descKey: 'info_timeline_fechado_desc' }, conquest: {title: 'notification_contract_title', content: 'notification_contract_desc', link: false} },
        { id: 'visto', icon: Stamp, label: t('timeline_stage_visto'), progress: 40, info: { titleKey: 'info_timeline_visto_title', descKey: 'info_timeline_visto_desc' } },
        { id: 'seguro', icon: ShieldCheck, label: t('timeline_stage_seguro'), progress: 50, info: { titleKey: 'info_timeline_seguro_title', descKey: 'info_timeline_seguro_desc' } },
        { id: 'aereo', icon: Ticket, label: t('timeline_stage_aereo'), progress: 60, info: { titleKey: 'info_timeline_aereo_title', descKey: 'info_timeline_aereo_desc' }, conquest: true },
        { id: 'checkup', icon: SpinningSiren, label: t('timeline_stage_checkup'), progress: 70, info: { titleKey: 'info_timeline_checkup_title', descKey: 'info_timeline_checkup_desc' } },
        { id: 'documentacao', icon: FolderKanban, label: t('timeline_stage_documentacao_final'), progress: 80, info: { titleKey: 'info_timeline_docs_title', descKey: 'info_timeline_docs_desc' } },
        { id: 'embarque', icon: Plane, label: t('timeline_stage_embarque'), progress: 90, info: { titleKey: 'info_timeline_embarque_title', descKey: 'info_timeline_embarque_desc' }, conquest: true }, 
        { id: 'no-destino', icon: Globe, label: t('timeline_stage_no_destino'), progress: 100, info: { titleKey: 'info_timeline_destino_title', descKey: 'info_timeline_destino_desc' }, conquest: {title: 'notification_destination_title', content: 'notification_destination_desc', link: false} }, 
    ], [t]);
    const stageProgressMap = useMemo(() => stages.reduce((acc, stage) => {
        acc[stage.id] = stage.progress;
        return acc;
    }, {}), [stages]);
    const [activeStage, setActiveStage] = useState('pesquisando');
    const [progress, setProgress] = useState(stageProgressMap.pesquisando);
    const [infoPopup, setInfoPopup] = useState({ visible: false, title: '', content: '' });
    const [showScroll, setShowScroll] = useState(false);
    const [conquestAnimation, setConquestAnimation] = useState('');
    const [conquestNotification, setConquestNotification] = useState({visible: false, title: '', content: '', link: false});
    const [unlockedStages, setUnlockedStages] = useState({});
    const [isAdVisible, setIsAdVisible] = useState(false);
    const [isGuideFormVisible, setIsGuideFormVisible] = useState(false);
    const [isTimezoneModalVisible, setIsTimezoneModalVisible] = useState(false);
    const [stageToUnlock, setStageToUnlock] = useState(null);
    
    const timelineRef = useRef(null);
    const newsRef = useRef(null);
    const scrollableContainerRef = useRef(null);
    
    const activateStage = (stageId) => {
        const stage = stages.find(s => s.id === stageId);
        if (stage?.conquest) {
            setConquestAnimation(stageId);
            if (typeof stage.conquest === 'object') {
                setConquestNotification({ visible: true, ...stage.conquest });
            }
            setTimeout(() => setConquestAnimation(''), 1000); 
        }
        setActiveStage(stageId);
        setProgress(stageProgressMap[stageId]);
    };
    
    const handleStageClick = (stageId) => {
        const stage = stages.find(s => s.id === stageId);
        
        if (stage?.reward === 'guide' && !unlockedStages.guide) {
            setIsGuideFormVisible(true);
            return;
        }
        const isLocked = stage?.conquest && !unlockedStages[stageId];
        
        if (isLocked) {
            setStageToUnlock(stageId);
            setIsAdVisible(true);
        } else {
            activateStage(stageId);
        }
    };
    const handleAdComplete = () => {
        if(stageToUnlock) {
            setUnlockedStages(prev => ({...prev, [stageToUnlock]: true}));
            activateStage(stageToUnlock);
            setStageToUnlock(null);
        }
        setIsAdVisible(false);
    }
    const handleGuideFormSuccess = () => {
        alert(t('guide_form_success'));
        setIsGuideFormVisible(false);
        setUnlockedStages(prev => ({...prev, guide: true}));
        activateStage('pesquisando');
    };
    
    const handleInfoClick = (ref, titleKey, contentKey) => {
        if(infoPopup.visible && infoPopup.title === titleKey) {
            setInfoPopup({ visible: false });
            return;
        }
        setInfoPopup({ visible: true, title: titleKey, content: contentKey });
    };
    
    const handleScrollTo = (ref) => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
    
    const checkScrollTop = () => {
        if (scrollableContainerRef.current) {
            setShowScroll(scrollableContainerRef.current.scrollTop > 300);
        }
    };
    useEffect(() => {
        const scrollDiv = scrollableContainerRef.current;
        scrollDiv?.addEventListener('scroll', checkScrollTop);
        return () => scrollDiv?.removeEventListener('scroll', checkScrollTop);
    }, []);
    const newsForDublin = [
        { title: "Atualizações nas regras de visto para estudantes não-europeus", source: "Irish Immigration Service", date: "15 de Junho de 2025", link: "https://www.irishimmigration.ie/coming-to-study-in-ireland/" },
        { title: "Aumento da capacidade no transporte público de Dublin a partir de Julho", source: "Transport for Ireland", date: "18 de Junho de 2025", link: "https://www.transportforireland.ie/" },
        { title: "Novas acomodações estudantis inauguradas na região de Grand Canal Dock", source: "The Irish Times", date: "20 de Junho de 2025", link: "https://www.irishtimes.com/ireland/" },
        { title: "Governo anuncia revisão do salário mínimo para 2026", source: "Citizens Information", date: "12 de Junho de 2025", link: "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/pay-and-employment/national-minimum-wage/" }
    ];
    
    const renderTasksForStage = useCallback(() => {
        const activeIndex = stages.findIndex(stage => stage.id === activeStage);
        const visibleStages = stages.slice(0, activeIndex + 1);
        const taskComponents = {
            pesquisando: <><TaskButton title={'task_where_to_start'} onClick={() => {}} /><TaskButton title={'task_planning'} onClick={() => {}} /></>,
            negociacao: <><TaskButton title="task_compare_agencies" onClick={() => {}} /><TaskButton title="task_request_quotes" onClick={() => {}} /></>,
            'intercambio-fechado': <><TaskButton title="task_review_contract" onClick={() => {}} /><TaskButton title="task_make_payment" onClick={() => {}} /></>,
            visto: <><TaskButton title="task_gather_visa_docs" onClick={()=>{}} /><TaskButton title="task_schedule_interview" onClick={()=>{}} /></>,
            seguro: <><TaskButton title="task_get_insurance_quotes" onClick={()=>{}} /><TaskButton title="task_issue_policy" onClick={()=>{}} /></>,
            aereo: <><TaskButton title="task_search_flights" onClick={()=>{}} /><TaskButton title="task_buy_ticket" onClick={()=>{}} /></>,
            checkup: <><TaskButton title="task_schedule_checkup" onClick={()=>{}} /><TaskButton title="task_get_vaccines" onClick={()=>{}} /></>,
            documentacao: <><TaskButton title="task_notarize_docs" onClick={()=>{}} /><TaskButton title="task_organize_folder" onClick={()=>{}} /></>,
            embarque: <><TaskButton title={'task_preboarding_checklist'} onClick={() => {}} /><TaskButton title={'task_flight_details'} onClick={() => {}} /></>,
            'no-destino': <div className="space-y-3"><TaskButton title={'task_docs_pt2'} onClick={() => {}} /><TaskButton title={'task_accommodation'} onClick={() => {}} /><TaskButton title={'task_job'} onClick={() => {}} /><TaskButton title={'task_expenses'} onClick={() => {}} /><TaskButton title={'task_guide'} onClick={() => {}} /><TaskButton title={'task_help'} onClick={() => {}} special={true} /></div>
        };
        return visibleStages.map(stage => (
            <div key={stage.id} className="space-y-3 mb-4">
                {taskComponents[stage.id]}
            </div>
        ));
    }, [activeStage, stages]);
    return (
        <div className="w-full h-full flex flex-col bg-[var(--bg-main)] relative">
            <header className="sticky top-0 z-20 bg-[var(--bg-main)]/80 backdrop-blur-sm">
                <TopNavBar onInfoClick={handleInfoClick} onTimelineClick={() => handleScrollTo(timelineRef)} onNewsClick={() => handleScrollTo(newsRef)} />
                <DashboardUserInfo userData={userData} />
                <Countdown targetDate={userData.departureDate} onInfoClick={handleInfoClick} onTimezoneClick={() => setIsTimezoneModalVisible(true)} />
                <div className="h-px bg-[var(--border-color)] mt-2"></div>
            </header>
            <InfoPopup popupData={infoPopup} onClose={() => setInfoPopup({ ...infoPopup, visible: false })} />
            <ConquestNotification notification={conquestNotification} onClose={() => setConquestNotification({ ...conquestNotification, visible: false })} />
            {isAdVisible && <AdSimulationModal onComplete={handleAdComplete} />}
            {isGuideFormVisible && <GuideFormModal onClose={() => setIsGuideFormVisible(false)} onSuccess={handleGuideFormSuccess} />}
            {isTimezoneModalVisible && <TimezoneModal onClose={() => setIsTimezoneModalVisible(false)} destinationCity={userData.destination} />}
            <div ref={scrollableContainerRef} className='flex-grow overflow-y-auto'>
                <main className="flex-grow p-4 space-y-6">
                    <VideoPlayer />
                    <div ref={timelineRef} className="border-b border-gray-200 my-4 scroll-mt-24">
                        <h3 className="text-center text-sm font-semibold text-gray-500 uppercase pb-2">{t('timeline_title')}</h3>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <VerticalTimeline stages={stages} activeStage={activeStage} progress={progress} onStageClick={handleStageClick} onInfoClick={handleInfoClick} conquestAnimation={conquestAnimation} unlockedStages={unlockedStages} />
                        </div>
                        <div className="flex-grow animate-fade-in min-w-0 pt-2">
                            {renderTasksForStage()}
                        </div>
                    </div>
                    <NewsSlider news={newsForDublin} newsRef={newsRef} />
                </main>
            </div>
            {showScroll && (
                <button onClick={() => scrollableContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-16 right-5 bg-[var(--accent-color)] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <ArrowUp size={24} />
                </button>
            )}
            <button onClick={() => alert(t('in_construction'))} className="fixed bottom-3 left-5 bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="Falar com um consultor">
                <MessageCircle size={24} />
            </button>
        </div>
    );
};
// --- Main App Component ---
const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="w-full p-3 text-center border-t border-[var(--border-marble)] bg-[var(--bg-main)]">
            <p className="text-xs text-[var(--text-secondary)]">{t('copyright')}</p>
            <a href="#" onClick={(e) => { e.preventDefault(); alert(t('in_construction')); }} className="text-xs text-[var(--accent-color)] hover:underline">{t('terms_and_conditions')}</a>
        </footer>
    );
};

export default function App() {
    const [page, setPage] = useState('loading'); 
    const [user, setUser] = useState(null); 
    const [userData, setUserData] = useState(null); 
    const [isAuthReady, setIsAuthReady] = useState(false); 
    useEffect(() => { 
        const timer = setTimeout(() => { setIsAuthReady(true); setPage('home'); }, 1500);
        return () => clearTimeout(timer);
    }, []); 
    const navigate = (newPage) => setPage(newPage); 
    
    const handleGoogleLogin = () => { 
        const mockUser = { uid: `mock-user-${Date.now()}` }; 
        const mockUserData = { name: "Maria Silva", photoURL: `https://i.pravatar.cc/80?u=${mockUser.uid}` }; 
        setUser(mockUser); 
        setUserData(mockUserData); 
        navigate('filters'); 
    }; 
    
    const handleFilterComplete = ({ data }) => { if (user) { setUserData(prev => ({ ...prev, ...data })); navigate('dashboard'); } };
    
    const renderPage = () => {
        if (!isAuthReady || page === 'loading') return <LoadingSpinner />;
        switch (page) {
            case 'home': return <HomeScreen onGoogleLogin={handleGoogleLogin} onEmailRegister={() => alert(t('in_construction'))} />;
            case 'filters': return <FilterScreen onComplete={handleFilterComplete} onBack={() => navigate('home')} userData={userData} />;
            case 'dashboard':
                if (userData?.destination && userData?.departureDate) { return <DashboardScreen userData={userData} navigate={navigate} />; }
                navigate('filters'); 
                return <FilterScreen onComplete={handleFilterComplete} onBack={() => navigate('home')} userData={userData} />;
            default: return <HomeScreen onGoogleLogin={handleGoogleLogin} onEmailRegister={() => alert(t('in_construction'))} />;
        }
    };
    return (
        <LanguageProvider>
            <style>{`
                :root { ${Object.entries(theme).map(([k, v]) => `${k}: ${v};`).join(' ')} }
                html { scroll-behavior: smooth; }
                body, #root { background-color: var(--bg-main); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
                .text-gradient { background: var(--accent-gradient); -webkit-background-clip: text; -moz-background-clip: text; -webkit-text-fill-color: transparent; -moz-text-fill-color: transparent; }
                .input-field { width: 100%; padding: 0.85rem 1rem; border-radius: 0.5rem; border: 1px solid var(--border-color); background-color: var(--bg-card); transition: all 0.2s; font-weight: 500; color: var(--text-primary); }
                .input-field:focus { outline: none; border-color: var(--accent-color); box-shadow: 0 0 0 2px rgba(142, 45, 226, 0.2); }
                .button-primary { font-weight: 600; color: white; background: var(--accent-gradient); padding: 0.85rem 1.5rem; border-radius: 0.75rem; transition: all 0.3s ease; border: none; cursor: pointer; }
                .button-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                .home-button { width: 100%; font-weight: 500; padding: 0.85rem 1rem; border-radius: 0.5rem; border: 1px solid var(--border-color); color: var(--text-primary); background-color: var(--bg-card); transition: all 0.2s ease; cursor: pointer; }
                .home-button:hover { transform: translateY(-2px); box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
                .home-button-secondary { font-weight: 500; color: var(--text-secondary); transition: color 0.2s; cursor: pointer; }
                .home-button-secondary:hover { color: var(--text-primary); }
                .countdown-item { display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 40px; height: 40px; border-radius: 0.5rem; background: var(--bg-card); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
                .countdown-item span { font-size: 1rem; font-weight: 700; color: var(--text-primary); line-height: 1; }
                .countdown-item { font-size: 0.6rem; font-weight: 500; color: var(--text-secondary); text-transform: uppercase; }
                .top-nav-button { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; color: var(--text-secondary); }
                .top-nav-button:hover { background: var(--accent-gradient); color: white; }
                .info-plus-button { position: absolute; bottom: -2px; right: -2px; cursor: pointer; padding: 0; background: none; border: none; }
                .info-plus-button-v2 { position: absolute; top: -4px; left: -4px; cursor: pointer; padding: 0; background: none; border: none; z-index: 10; }
                .info-plus-button > svg, .info-plus-button-v2 > svg { color: white; background-color: var(--accent-color); border-radius: 9999px; transition: transform 0.2s ease; filter: drop-shadow(0 0 2px var(--accent-color)); }
                .info-plus-button:hover > svg, .info-plus-button-v2:hover > svg { transform: scale(1.25); filter: drop-shadow(0 0 4px var(--accent-color)); }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spinning-siren { animation: spin 1.5s linear infinite; }
                @keyframes conquest {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.5) rotate(15deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                .animate-conquest { animation: conquest 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.6s ease-in-out; }
                @keyframes slide-down { from { opacity: 0; transform: translateY(-20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .animate-slide-down { animation: slide-down 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
            `}</style>
            <div className="w-full h-dvh font-sans antialiased flex flex-col">
                <main className="relative w-full h-full max-w-lg mx-auto bg-[var(--bg-main)] shadow-2xl flex-grow flex flex-col overflow-hidden">
                    <div className="flex-grow flex flex-col min-h-0">
                        {renderPage()}
                    </div>
                   {(page !== 'loading' && page !=='home') && <Footer />}
                </main>
            </div>
        </LanguageProvider>
    );
}
 
