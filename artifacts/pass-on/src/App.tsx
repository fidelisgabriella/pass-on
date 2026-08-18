import { type FormEvent, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Eye,
  EyeOff,
  FileText,
  Home as HomeIcon,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Pin,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { useLocation, Route, Router as WouterRouter, Switch } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function PassOnMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-pass-on">
      <div className="relative grid size-9 place-items-center rounded-[11px] bg-primary shadow-[0_0_28px_rgba(181,140,255,.22)]">
        <span className="absolute left-[9px] top-[9px] size-[9px] rounded-full bg-background" />
        <span className="absolute bottom-[9px] right-[9px] size-[9px] rounded-full bg-background" />
        <span className="absolute left-[14px] top-[14px] h-[10px] w-[2px] rotate-45 rounded-full bg-background" />
      </div>
      {!compact && (
        <span className="text-[17px] font-extrabold tracking-[-.04em] text-foreground">
          pass<span className="text-primary">on</span>
        </span>
      )}
    </div>
  );
}

function Login() {
  const [, setLocation] = useLocation();
  const [ra, setRa] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRecoverySent(false);
    if (!ra.trim() || !password.trim()) {
      setError('Preencha seu RA e sua senha para continuar.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    window.setTimeout(() => setLocation('/inicio'), 650);
  }

  return (
    <main className="app-noise min-h-[100dvh] overflow-hidden bg-background" data-testid="page-login">
      <div className="grid min-h-[100dvh] lg:grid-cols-[minmax(420px,1.06fr)_minmax(480px,.94fr)]">
        <section className="relative hidden overflow-hidden border-r border-white/[.07] bg-[#120c1f] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <div className="absolute -left-40 -top-48 size-[560px] rounded-full bg-primary/[.09] blur-3xl" />
          <div className="absolute -bottom-48 -right-32 size-[480px] rounded-full bg-accent/[.07] blur-3xl" />
          <div className="relative z-10 animate-rise">
            <PassOnMark />
            <span className="mt-12 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.18em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              espaço do aluno INA
            </span>
            <h1 className="mt-7 max-w-[510px] text-[clamp(3rem,5vw,5.3rem)] font-extrabold leading-[.96] tracking-[-.07em] text-balance text-foreground">
              Seu próximo
              <br />
              <span className="text-primary">passo</span> começa aqui.
            </h1>
            <p className="mt-7 max-w-[395px] text-[15px] leading-7 text-muted-foreground">
              Um lugar para acompanhar suas aulas, suas conquistas e tudo que vem depois delas.
            </p>
          </div>

          <div className="relative z-10 mt-16 h-[290px] overflow-hidden rounded-3xl border border-white/[.08] bg-[#1a112c] p-7 animate-rise delay-2">
            <div className="absolute -right-14 -top-14 size-56 rounded-full border border-primary/20 animate-ring" />
            <div className="absolute -right-2 top-0 size-44 rounded-full border border-primary/10" />
            <div className="absolute bottom-[-90px] left-[-30px] size-48 rounded-full border border-accent/15" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary/70">agora no seu espaço</p>
                  <p className="mt-3 max-w-[215px] text-[23px] font-bold leading-tight tracking-[-.05em]">Acompanhe o que importa.</p>
                </div>
                <Sparkles className="size-5 text-primary" strokeWidth={1.7} />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex -space-x-2">
                  {['L', 'M', 'C'].map((letter, index) => (
                    <span key={letter} className={`grid size-8 place-items-center rounded-full border-2 border-[#1a112c] text-[10px] font-bold ${index === 1 ? 'bg-accent text-background' : 'bg-[#6547a6] text-foreground'}`}>
                      {letter}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">+ sua turma, em um só lugar</span>
              </div>
            </div>
          </div>
          <p className="relative z-10 mt-8 font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground/60">INA · formação que move</p>
        </section>

        <section className="flex min-h-[100dvh] flex-col px-5 py-6 sm:px-10 sm:py-9 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between lg:justify-end">
            <div className="lg:hidden"><PassOnMark /></div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline">Ainda não conhece o INA?</span>
              <button type="button" className="focus-lilac rounded-md px-1 font-semibold text-primary transition-colors hover:text-accent" data-testid="button-discover-ina" onClick={() => setRecoverySent(true)}>
                Conheça o INA
              </button>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[410px] flex-1 flex-col justify-center py-12">
            <div className="animate-rise">
              <p className="font-mono text-[10px] uppercase tracking-[.18em] text-primary">bem-vindo de volta</p>
              <h2 className="mt-4 text-[38px] font-extrabold leading-none tracking-[-.07em] text-foreground sm:text-[44px]">Entrar no Pass On</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Use seus dados de aluno para acessar seu espaço.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5 animate-rise delay-1" noValidate>
              <div className="space-y-2">
                <label htmlFor="ra" className="text-xs font-bold uppercase tracking-[.08em] text-secondary-foreground">RA</label>
                <input
                  id="ra"
                  value={ra}
                  onChange={(event) => { setRa(event.target.value); setError(''); }}
                  placeholder="Digite seu registro acadêmico"
                  autoComplete="username"
                  className="focus-lilac h-14 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all hover:border-primary/40 focus:border-primary focus:bg-secondary/40 focus:outline-none"
                  data-testid="input-ra"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-[.08em] text-secondary-foreground">Senha</label>
                <div className="relative">
                  <input
                    id="password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value); setError(''); }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    className="focus-lilac h-14 w-full rounded-2xl border border-border bg-card px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all hover:border-primary/40 focus:border-primary focus:bg-secondary/40 focus:outline-none"
                    data-testid="input-password"
                  />
                  <button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} className="focus-lilac absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" onClick={() => setShowPassword((value) => !value)} data-testid="button-toggle-password">
                    {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/[.08] px-4 py-3 text-xs leading-5 text-destructive animate-rise" role="alert" data-testid="status-login-error">
                  <CircleHelp className="mt-0.5 size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {recoverySent && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-primary/25 bg-primary/[.08] px-4 py-3 text-xs leading-5 text-primary animate-rise" role="status" data-testid="status-login-recovery">
                  <Check className="mt-0.5 size-4 shrink-0" />
                  <span>Este é um link demonstrativo. Em breve, o suporte do INA poderá ajudar por aqui.</span>
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="focus-lilac group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-sm font-extrabold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_12px_28px_rgba(181,140,255,.2)] active:translate-y-0 disabled:cursor-wait disabled:opacity-70" data-testid="button-login">
                {isSubmitting ? 'Abrindo seu espaço...' : 'Entrar'}
                {!isSubmitting && <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-1" />}
                {isSubmitting && <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />}
              </button>
              <button type="button" className="focus-lilac mx-auto block rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" onClick={() => { setRecoverySent(true); setError(''); }} data-testid="button-forgot-password">
                Esqueci minha senha
              </button>
            </form>

            <div className="mt-12 flex items-center gap-3 border-t border-border/70 pt-5 text-[11px] leading-5 text-muted-foreground animate-rise delay-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><Pin className="size-3.5" /></span>
              <span>Ambiente demonstrativo · seus dados não são enviados para nenhum serviço.</span>
            </div>
          </div>
          <p className="text-center font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground/50 lg:text-left">© 2025 Pass On · INA</p>
        </section>
      </div>
    </main>
  );
}

type NavKey = 'inicio' | 'disciplinas' | 'agenda' | 'materiais';

const navItems: { key: NavKey; label: string; icon: typeof HomeIcon }[] = [
  { key: 'inicio', label: 'Início', icon: HomeIcon },
  { key: 'disciplinas', label: 'Disciplinas', icon: BookOpen },
  { key: 'agenda', label: 'Agenda', icon: CalendarDays },
  { key: 'materiais', label: 'Materiais', icon: FileText },
];

function Dashboard() {
  const [, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState<NavKey>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function signOut() {
    setLocation('/');
  }

  return (
    <main className="app-noise min-h-[100dvh] bg-background" data-testid="page-dashboard">
      <div className="flex min-h-[100dvh]">
        <aside className="hidden w-[248px] shrink-0 flex-col border-r border-border/70 bg-sidebar px-5 py-7 md:flex" data-testid="sidebar-navigation">
          <PassOnMark />
          <div className="mt-14 px-3">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground/60">seu espaço</p>
            <nav className="mt-4 space-y-1" aria-label="Navegação principal">
              {navItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  className={`focus-lilac group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition-all ${activeSection === key ? 'bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(181,140,255,.14)]' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                  data-testid={`button-nav-${key}`}
                >
                  <Icon className="size-[17px]" strokeWidth={activeSection === key ? 2.2 : 1.8} />
                  {label}
                  {key !== 'inicio' && <span className={`ml-auto text-[10px] ${activeSection === key ? 'text-primary-foreground/70' : 'text-muted-foreground/50'}`}>em breve</span>}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-auto">
            <div className="mb-5 rounded-2xl border border-primary/15 bg-primary/[.06] p-4">
              <div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><span className="text-xs font-bold">Dica do dia</span></div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Pequenos passos consistentes também contam.</p>
            </div>
            <div className="flex items-center justify-between border-t border-border/70 pt-5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-extrabold text-background" data-testid="avatar-student">MC</span>
                <div><p className="text-xs font-bold text-foreground" data-testid="text-student-name">Marina Costa</p><p className="font-mono text-[9px] text-muted-foreground">RA 2025.0148</p></div>
              </div>
              <button type="button" aria-label="Sair" className="focus-lilac rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive" onClick={signOut} data-testid="button-logout">
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-border/70 px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 md:hidden">
              <button type="button" aria-label="Abrir menu" className="focus-lilac grid size-9 place-items-center rounded-xl bg-secondary text-foreground" onClick={() => setMobileMenuOpen((open) => !open)} data-testid="button-open-menu">
                {mobileMenuOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
              </button>
              <PassOnMark compact />
            </div>
            <div className="relative hidden w-[240px] sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
              <span className="block rounded-xl border border-border/70 bg-card py-2.5 pl-9 pr-3 text-xs text-muted-foreground/60" data-testid="text-search-placeholder">Buscar no Pass On</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-right sm:block"><span className="block text-xs font-bold text-foreground">Olá, Marina</span><span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">terça, 18 de junho</span></span>
              <button type="button" className="focus-lilac grid size-9 place-items-center rounded-full bg-accent text-xs font-extrabold text-background transition-transform hover:scale-105" onClick={() => setActiveSection('inicio')} data-testid="button-profile">MC</button>
            </div>
          </header>

          {mobileMenuOpen && (
            <div className="border-b border-border/70 bg-sidebar px-5 py-4 md:hidden animate-rise" data-testid="mobile-navigation">
              <nav className="grid grid-cols-2 gap-2" aria-label="Navegação mobile">
                {navItems.map(({ key, label, icon: Icon }) => (
                  <button key={key} type="button" onClick={() => { setActiveSection(key); setMobileMenuOpen(false); }} className={`focus-lilac flex items-center gap-2 rounded-xl px-3 py-3 text-left text-xs font-bold ${activeSection === key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`} data-testid={`button-mobile-nav-${key}`}>
                    <Icon className="size-4" /> {label}
                  </button>
                ))}
              </nav>
              <button type="button" onClick={signOut} className="focus-lilac mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-xs font-bold text-destructive" data-testid="button-mobile-logout"><LogOut className="size-4" /> Sair</button>
            </div>
          )}

          <div className="mx-auto max-w-[1180px] px-5 pb-12 pt-9 sm:px-8 sm:pt-12 lg:px-12">
            {activeSection === 'inicio' ? <HomeContent /> : <ComingSoon section={activeSection} />}
          </div>
        </section>
      </div>
    </main>
  );
}

function HomeContent() {
  return (
    <div>
      <div className="animate-rise">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-primary">terça-feira · 18 jun 2025</p>
            <h1 className="mt-3 text-[clamp(2.3rem,5vw,4.6rem)] font-extrabold leading-[.95] tracking-[-.08em] text-foreground">Bom dia, Marina<span className="text-primary">.</span></h1>
            <p className="mt-4 text-sm text-muted-foreground">Tudo certo por aí? Veja um resumo do seu momento.</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/[.06] px-4 py-3 text-right">
            <p className="font-mono text-[9px] uppercase tracking-[.15em] text-primary">seu período</p>
            <p className="mt-1 text-sm font-bold text-foreground">2º semestre · 2025</p>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.12fr_.88fr_.88fr]">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:col-span-2 xl:col-span-1 animate-rise delay-1">
          <div className="absolute -right-12 -top-16 size-48 rounded-full border border-primary-foreground/20" />
          <div className="absolute -bottom-16 right-12 size-36 rounded-full border border-primary-foreground/10" />
          <div className="relative">
            <div className="flex items-center justify-between"><span className="text-xs font-bold">Presença</span><TrendingUp className="size-4" /></div>
            <p className="mt-8 text-[54px] font-extrabold leading-none tracking-[-.09em]" data-testid="stat-attendance">92,4<span className="text-2xl tracking-[-.04em]">%</span></p>
            <p className="mt-3 max-w-[210px] text-xs leading-5 text-primary-foreground/70">Você está mantendo um ritmo muito bom neste semestre.</p>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-primary-foreground/20"><div className="h-full w-[92%] rounded-full bg-primary-foreground" /></div>
          </div>
        </div>
        <div className="rounded-3xl border border-border/80 bg-card p-6 animate-rise delay-2">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-muted-foreground">Média geral</span><span className="grid size-8 place-items-center rounded-xl bg-secondary text-accent"><TrendingUp className="size-4" /></span></div>
          <p className="mt-8 text-[44px] font-extrabold leading-none tracking-[-.08em] text-foreground" data-testid="stat-average">8,7</p>
          <p className="mt-3 text-xs text-muted-foreground">+0,4 em relação ao semestre anterior</p>
          <div className="mt-7 flex items-end gap-1.5"><div className="h-4 w-2 rounded-full bg-primary/30" /><div className="h-6 w-2 rounded-full bg-primary/45" /><div className="h-8 w-2 rounded-full bg-primary/60" /><div className="h-10 w-2 rounded-full bg-primary/75" /><div className="h-12 w-2 rounded-full bg-primary" /><span className="ml-2 font-mono text-[9px] text-muted-foreground">últimos 5</span></div>
        </div>
        <div className="rounded-3xl border border-border/80 bg-card p-6 animate-rise delay-3">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-muted-foreground">Próxima aula</span><span className="grid size-8 place-items-center rounded-xl bg-secondary text-primary"><Clock3 className="size-4" /></span></div>
          <p className="mt-7 text-xl font-extrabold tracking-[-.05em] text-foreground" data-testid="text-next-class">Projeto Integrador</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="size-3.5 text-primary" /> Hoje, 19:00 · Sala 04</div>
          <button type="button" className="focus-lilac mt-7 flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:text-accent" data-testid="button-view-schedule">Ver agenda <ChevronRight className="size-3.5" /></button>
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-7 animate-rise delay-3">
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">visão rápida</p><h2 className="mt-2 text-xl font-extrabold tracking-[-.05em]">Suas disciplinas</h2></div>
            <button type="button" className="focus-lilac rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Mais opções de disciplinas" data-testid="button-more-disciplines"><MoreHorizontal className="size-5" /></button>
          </div>
          <div className="mt-7 space-y-1">
            {[
              { id: 'design', title: 'Design de Interfaces', meta: 'Prof. Caio Nunes · Seg, 19:00', progress: '78%', color: 'bg-primary' },
              { id: 'projeto', title: 'Projeto Integrador', meta: 'Prof. Lia Martins · Qua, 19:00', progress: '64%', color: 'bg-accent' },
              { id: 'comunicacao', title: 'Comunicação e Cultura', meta: 'Prof. André Luz · Qui, 19:00', progress: '88%', color: 'bg-[#d8c2ff]' },
            ].map((item) => (
              <div key={item.id} className="group flex items-center gap-4 rounded-2xl px-2 py-4 transition-colors hover:bg-secondary/60" data-testid={`row-discipline-${item.id}`}>
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${item.color}/15 text-xs font-extrabold text-primary`}>{item.title.split(' ').map((word) => word[0]).slice(0, 2).join('')}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-foreground">{item.title}</p><p className="mt-1 truncate text-[11px] text-muted-foreground">{item.meta}</p><div className="mt-3 h-1 w-full max-w-[220px] rounded-full bg-secondary"><div className={`h-full rounded-full ${item.color}`} style={{ width: item.progress }} /></div></div>
                <span className="font-mono text-[11px] text-muted-foreground">{item.progress}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-7 animate-rise delay-4">
          <div className="flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">para você</p><h2 className="mt-2 text-xl font-extrabold tracking-[-.05em]">Próximos passos</h2></div><MessageCircle className="size-5 text-accent" /></div>
          <div className="mt-7 space-y-4">
            <div className="rounded-2xl bg-secondary/70 p-4"><div className="flex items-start gap-3"><span className="mt-0.5 grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground"><FileText className="size-3.5" /></span><div><p className="text-xs font-bold text-foreground">Entregar projeto final</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Projeto Integrador · vence em 4 dias</p></div></div></div>
            <div className="rounded-2xl bg-secondary/70 p-4"><div className="flex items-start gap-3"><span className="mt-0.5 grid size-7 place-items-center rounded-lg bg-accent text-background"><BookOpen className="size-3.5" /></span><div><p className="text-xs font-bold text-foreground">Revisar material da aula</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Design de Interfaces · 3 arquivos novos</p></div></div></div>
          </div>
          <button type="button" className="focus-lilac mt-6 flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:text-accent" data-testid="button-view-tasks">Ver todos os passos <ArrowRight className="size-3.5" /></button>
        </div>
      </section>
    </div>
  );
}

function ComingSoon({ section }: { section: NavKey }) {
  const [, setLocation] = useLocation();
  const labels: Record<NavKey, string> = { inicio: 'Início', disciplinas: 'Disciplinas', agenda: 'Agenda', materiais: 'Materiais' };
  const icons: Record<NavKey, typeof BookOpen> = { inicio: HomeIcon, disciplinas: BookOpen, agenda: CalendarDays, materiais: FileText };
  const Icon = icons[section];
  return (
    <div className="flex min-h-[60vh] items-center justify-center animate-rise" data-testid={`empty-state-${section}`}>
      <div className="max-w-[390px] text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-primary/20 bg-primary/[.08] text-primary"><Icon className="size-7" strokeWidth={1.5} /></span>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[.17em] text-primary">em construção</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-[-.07em] text-foreground">{labels[section]} chegando.</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Estamos preparando este espaço para deixar sua rotina acadêmica ainda mais simples.</p>
        <button type="button" className="focus-lilac mx-auto mt-7 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-xs font-bold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground" onClick={() => setLocation('/inicio')} data-testid={`button-back-${section}`}><ArrowRight className="size-4 rotate-180" /> Voltar</button>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/inicio" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;