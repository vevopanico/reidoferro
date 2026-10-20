import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";

import img1 from "@/assets/rei-do-ferro-1.webp.asset.json";
import img2 from "@/assets/rei-do-ferro-2.webp.asset.json";
import img3 from "@/assets/rei-do-ferro-3.webp.asset.json";
import img4 from "@/assets/rei-do-ferro-4.webp.asset.json";
import img5 from "@/assets/rei-do-ferro-5.webp.asset.json";
import logo from "@/assets/rei-do-ferro-logo.png.asset.json";

const TITLE = "Rei do Ferro | Serralheria em Sinop - MT";
const DESCRIPTION =
  "Rei do Ferro: fabricação e instalação de portões, portas de enrolar, estruturas metálicas e serviços de serralheria em Sinop e região.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:site_name", content: "Rei do Ferro" },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content:
          "Fabricação e instalação de portões, portas de enrolar e estruturas metálicas em Sinop e região.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE = "5566984066283";
const wa = (msg = "Olá! Vim pelo site e gostaria de um orçamento") =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
const d = (v: string) => ({ "--d": v }) as CSSProperties;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Lines({ lines }: { lines: string[] }) {
  return (
    <h2 className="rt">
      {lines.map((l) => (
        <span className="l" key={l}>
          <i>{l}</i>
        </span>
      ))}
    </h2>
  );
}

function QuoteBtn({ msg }: { msg: string }) {
  return (
    <a className="btn wl" href={wa(msg)} {...ext}>
      Solicitar orçamento <span>→</span>
    </a>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Staggered line reveals
    document
      .querySelectorAll<HTMLElement>(".rt .l")
      .forEach((el, i) => el.style.setProperty("--d", `${(i % 4) * 0.12}s`));

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".r,.m,.rt,.pr").forEach((el) => io.observe(el));

    // Form: return to this page after sending, and show thank-you message
    const form = document.getElementById("f") as HTMLFormElement | null;
    const next = form?.querySelector<HTMLInputElement>('input[name="_next"]');
    if (next) {
      next.value = `${window.location.origin}${window.location.pathname}?orcamento=enviado#contato`;
    }
    if (new URLSearchParams(window.location.search).get("orcamento") === "enviado") {
      const status = document.getElementById("email-status");
      if (status) {
        status.textContent =
          "Obrigado! Seu pedido foi encaminhado. Entraremos em contato em breve.";
      }
      form?.reset();
    }

    // Custom cursor
    const cu = document.getElementById("cu");
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const move = (e: MouseEvent) => {
      if (cu) cu.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    const hoverEls = Array.from(document.querySelectorAll("a,button,.pt,.cd,.m"));
    const enter = () => cu?.classList.add("h");
    const leave = () => cu?.classList.remove("h");
    if (fine) {
      window.addEventListener("mousemove", move);
      hoverEls.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    } else if (cu) {
      cu.style.display = "none";
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      window.removeEventListener("mousemove", move);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header id="h" className={scrolled ? "on" : undefined}>
        <div className="w">
          <a href="#inicio" className="logo">
            <img src={logo.url} alt="Rei do Ferro" style={{ height: 60, width: "auto" }} />
          </a>
          <nav>
            <a href="#inicio">INÍCIO</a>
            <a href="#empresa">A EMPRESA</a>
            <a href="#servicos">SERVIÇOS</a>
            <a href="#projetos">PROJETOS</a>
            <a href="#diferenciais">DIFERENCIAIS</a>
            <a href="#contato">CONTATO</a>
          </nav>
          <a href="#contato" className="btn">
            Solicitar orçamento
          </a>
          <button
            className="hb"
            id="hb"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : undefined }} />
            <i style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : undefined }} />
          </button>
        </div>
      </header>

      <div className={menuOpen ? "mm on" : "mm"} id="mm">
        {[
          ["#inicio", "Início"],
          ["#empresa", "A empresa"],
          ["#servicos", "Serviços"],
          ["#projetos", "Projetos"],
          ["#diferenciais", "Diferenciais"],
          ["#portoes", "Portões"],
          ["#portas-de-enrolar", "Portas de enrolar"],
          ["#estruturas-metalicas", "Estruturas metálicas"],
          ["#serralheria-em-geral", "Serralheria"],
          ["#contato", "Contato"],
        ].map(([href, label]) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </div>

      <section className="hero" id="inicio">
        <img src={img4.url} alt="Portão de ferro e madeira, serralheria em Sinop" />
        <div className="w">
          <span className="k a" style={d(".3s")}>
            SERRALHERIA • SINOP E REGIÃO
          </span>
          <h1>
            <span className="l a" style={d(".5s")}>
              Força, precisão
            </span>
            <span className="l a" style={d(".65s")}>
              e acabamento
            </span>
            <span className="l a" style={d(".8s")}>
              em cada projeto.
            </span>
          </h1>
          <p className="a" style={d("1s")}>
            Fabricação e instalação de portões, portas de enrolar, estruturas metálicas e soluções
            em serralheria sob medida para Sinop e toda a região.
          </p>
          <div className="bt a" style={d("1.2s")}>
            <a className="btn" href="#contato">
              Solicitar orçamento <span>→</span>
            </a>
            <a className="btn o" href="#servicos">
              Ver nossos serviços
            </a>
            <a className="btn o wl" href={wa()} {...ext}>
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
        <div className="hf a" style={d("1.5s")}>
          <div className="w">
            <span>SINOP • MT</span>
            <span>ATENDIMENTO REGIONAL</span>
          </div>
        </div>
      </section>

      <section id="empresa">
        <div className="w g2">
          <div>
            <div className="gl r" />
            <Lines lines={["Metal que", "protege.", "Projetos que", "valorizam."]} />
            <p className="s r">
              O Rei do Ferro fabrica e instala portões, portas de enrolar, estruturas metálicas e
              peças de serralheria em Sinop e toda a região, com ferro e aço de primeira linha,
              pintura eletrostática e garantia de 12 meses.
            </p>
            <p className="s r">
              Do portão residencial às estruturas metálicas e portas de enrolar, cada projeto é
              desenvolvido pensando em resistência, funcionalidade e acabamento.
            </p>
          </div>
          <div className="m ab">
            <img src={img3.url} loading="lazy" alt="Grade e portão em ferro trabalhado" />
          </div>
        </div>
      </section>

      <section id="servicos" style={{ background: "var(--b2)" }}>
        <div className="w">
          <div className="sh">
            <span className="k">Serviços</span>
            <Lines lines={["Nossas", "soluções"]} />
            <p className="s r">
              Soluções em ferro e aço para projetos residenciais, comerciais e industriais.
            </p>
          </div>
          <div className="sg">
            <a href="#portoes" className="cd r">
              <img src={img1.url} loading="lazy" alt="Portão basculante" />
              <div>
                <em>01</em>
                <h3>Portões</h3>
                <p>Fabricação e instalação de portões sob medida.</p>
                <small>Correr · Basculantes · Social embutido</small>
                <span className="ar">→</span>
              </div>
            </a>
            <a href="#portas-de-enrolar" className="cd r" style={d(".1s")}>
              <img src={img5.url} loading="lazy" alt="Fachada em serralheria" />
              <div>
                <em>02</em>
                <h3>Portas de enrolar</h3>
                <p>Soluções manuais e automáticas para diferentes necessidades.</p>
                <small>Manuais · Automáticas</small>
                <span className="ar">→</span>
              </div>
            </a>
            <a href="#estruturas-metalicas" className="cd r" style={d(".2s")}>
              <img src={img3.url} loading="lazy" alt="Estrutura metálica" />
              <div>
                <em>03</em>
                <h3>Estruturas metálicas</h3>
                <p>Fabricação de estruturas metálicas desenvolvidas para cada projeto.</p>
                <span className="ar">→</span>
              </div>
            </a>
            <a href="#serralheria-em-geral" className="cd r" style={d(".3s")}>
              <img src={img2.url} loading="lazy" alt="Guarda-corpo em ferro" />
              <div>
                <em>04</em>
                <h3>Serralheria em geral</h3>
                <p>Soluções personalizadas em serralheria para diferentes aplicações.</p>
                <span className="ar">→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="portoes" className="gt">
        <div className="w">
          <span className="k">Portões em Sinop</span>
          <Lines lines={["Seu portão.", "Do seu jeito."]} />
          <p className="s r">
            Fabricamos portões sob medida para diferentes necessidades, combinando segurança,
            funcionalidade e acabamento.
          </p>
          <div className="gr">
            <div className="gp">
              <div className="m">
                <img src={img4.url} loading="lazy" alt="Portão de correr" />
              </div>
              <h3 className="r">Portão de correr</h3>
              <p className="r">Praticidade no dia a dia, feito sob medida para o seu espaço.</p>
              <QuoteBtn msg="Olá! Gostaria de um orçamento de portão de correr." />
            </div>
            <div className="gp">
              <div className="m">
                <img src={img1.url} loading="lazy" alt="Portão basculante" />
              </div>
              <h3 className="r">Portão basculante</h3>
              <p className="r">Segurança e acabamento para garagens residenciais e comerciais.</p>
              <QuoteBtn msg="Olá! Gostaria de um orçamento de portão basculante." />
            </div>
            <div className="gp">
              <div className="m">
                <img
                  src={img1.url}
                  loading="lazy"
                  alt="Basculante com social embutido"
                  style={{ objectPosition: "right" }}
                />
              </div>
              <h3 className="r">Basculante com social embutido</h3>
              <p className="r">Portão da garagem e acesso social integrados em um só projeto.</p>
              <QuoteBtn msg="Olá! Gostaria de um orçamento de basculante com social embutido." />
            </div>
          </div>
        </div>
      </section>

      <section id="portas-de-enrolar" className="gt" style={{ background: "var(--b2)" }}>
        <div className="w">
          <span className="k">Portas de enrolar em Sinop</span>
          <Lines lines={["Portas de enrolar", "em Sinop"]} />
          <p className="s r">
            Fabricação, instalação e manutenção de portas de enrolar para comércios, galpões,
            garagens e indústrias.
          </p>
          <div className="gr g2c">
            <div className="gp">
              <div className="m">
                <img src={img5.url} loading="lazy" alt="Porta de enrolar manual" />
              </div>
              <h3 className="r">Porta de enrolar manual</h3>
              <p className="r">Simples, resistente e econômica.</p>
              <QuoteBtn msg="Olá! Gostaria de um orçamento de porta de enrolar manual." />
            </div>
            <div className="gp">
              <div className="m">
                <img
                  src={img5.url}
                  loading="lazy"
                  alt="Porta de enrolar automática"
                  style={{ objectPosition: "right" }}
                />
              </div>
              <h3 className="r">Porta de enrolar automática</h3>
              <p className="r">Com motor, acionada por controle remoto.</p>
              <QuoteBtn msg="Olá! Gostaria de um orçamento de porta de enrolar automática." />
            </div>
          </div>
        </div>
      </section>

      <section id="estruturas-metalicas">
        <div className="w g2">
          <div>
            <span className="k">Estruturas metálicas em Sinop</span>
            <Lines lines={["Estruturas metálicas", "sob medida em Sinop"]} />
            <p className="s r">
              Coberturas, galpões, mezaninos, escadas e estruturas para uso residencial, comercial e
              industrial.
            </p>
            <h3 className="r ls-t">Aplicações</h3>
            <ul className="ls r">
              <li>Coberturas e garagens</li>
              <li>Galpões e barracões</li>
              <li>Mezaninos</li>
              <li>Escadas metálicas</li>
              <li>Suportes e estruturas especiais</li>
            </ul>
            <QuoteBtn msg="Olá! Gostaria de um orçamento de estrutura metálica." />
          </div>
          <div className="m ab">
            <img src={img3.url} loading="lazy" alt="Estrutura metálica sob medida" />
          </div>
        </div>
      </section>

      <section id="serralheria-em-geral" style={{ background: "var(--b2)" }}>
        <div className="w g2">
          <div>
            <span className="k">Serralheria em Sinop</span>
            <Lines lines={["Serralheria em geral", "em Sinop"]} />
            <p className="s r">
              Guarda-corpos, gradis, grades de proteção, fachadas com brises, corrimãos e peças
              personalizadas.
            </p>
            <h3 className="r ls-t">O que fazemos</h3>
            <ul className="ls r">
              <li>Guarda-corpo</li>
              <li>Gradil ornamental</li>
              <li>Grades de janela e proteção</li>
              <li>Fachada com brises</li>
              <li>Corrimãos e escadas</li>
            </ul>
            <QuoteBtn msg="Olá! Gostaria de um orçamento de serralheria." />
          </div>
          <div className="sx">
            <div className="m">
              <img src={img2.url} loading="lazy" alt="Guarda-corpo em ferro" />
            </div>
            <div className="m">
              <img src={img5.url} loading="lazy" alt="Fachada com brises metálicos" />
            </div>
          </div>
        </div>
      </section>

      <section id="projetos">
        <div className="w">
          <span className="k">Galeria</span>
          <Lines lines={["Projetos", "realizados"]} />
          <p className="s r">Conheça alguns dos trabalhos realizados pelo Rei do Ferro.</p>
          <div className="pg">
            {[
              { src: img4.url, alt: "Portão de correr", cat: "PORTÕES", t: "Portão de correr", dl: "0s" },
              { src: img2.url, alt: "Guarda-corpo", cat: "SERRALHERIA", t: "Guarda-corpo", dl: ".1s" },
              { src: img1.url, alt: "Portão basculante", cat: "PORTÕES", t: "Basculante", dl: ".2s" },
              { src: img3.url, alt: "Gradil ornamental", cat: "ESTRUTURAS", t: "Gradil ornamental", dl: ".1s" },
              { src: img5.url, alt: "Fachada metálica", cat: "SERRALHERIA", t: "Fachada com brises", dl: ".2s" },
            ].map((p) => (
              <div className="pt r" style={d(p.dl)} key={p.t}>
                <img src={p.src} loading="lazy" alt={p.alt} />
                <div>
                  <em>{p.cat}</em>
                  <h3>{p.t}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="diferenciais" style={{ background: "var(--b2)" }}>
        <div className="w">
          <Lines lines={["Por que escolher", "o Rei do Ferro?"]} />
          <div className="fg f6">
            {[
              ["Material de qualidade e pintura durável", "Ferro e aço de primeira linha, com tratamento anticorrosivo e pintura eletrostática.", "0s"],
              ["Garantia", "12 meses em fabricação e instalação.", ".1s"],
              ["Prazo de entrega", "A partir de 7 dias úteis, conforme o projeto.", ".2s"],
              ["Automação e motorização", "Instalação de motores e controle remoto para portões e portas de enrolar.", "0s"],
              ["Visita técnica gratuita", "Vamos até o local, medimos e orientamos a melhor solução.", ".1s"],
              ["Orçamento rápido", "Resposta em até 24 horas pelo WhatsApp.", ".2s"],
            ].map(([t, p, dl]) => (
              <div className="r" style={d(dl)} key={t}>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w">
          <Lines lines={["Do primeiro contato", "à instalação."]} />
          <div className="pr r">
            {[
              ["01", "Contato", "Você apresenta sua necessidade."],
              ["02", "Avaliação", "Entendemos o espaço e o projeto."],
              ["03", "Orçamento", "Apresentamos a solução adequada."],
              ["04", "Fabricação", "O projeto entra em produção."],
              ["05", "Instalação", "Realizamos a instalação e finalização."],
            ].map(([n, t, p]) => (
              <div key={n}>
                <b>{n}</b>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ca">
        <div className="w g2">
          <div>
            <span className="k">Área de atendimento</span>
            <Lines lines={["De Sinop para", "toda a região."]} />
            <p className="s r">Atendemos clientes em Sinop - MT e região.</p>
          </div>
          <div className="r">
            <div className="ad">
              <strong>SINOP — MT</strong>
              Rua dos Manacás, 2743B
              <br />
              Setor Industrial Sul
              <br />
              Sinop - MT · CEP 78557-452
            </div>
            <a
              className="btn"
              {...ext}
              href="https://www.google.com/maps/search/?api=1&query=Rua+dos+Manac%C3%A1s+2743B+Setor+Industrial+Sul+Sinop+MT"
            >
              Como chegar <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="cta">
        <img src={img3.url} loading="lazy" alt="Projetos em serralheria" />
        <div className="w">
          <Lines lines={["Seu projeto", "começa aqui."]} />
          <p className="s r" style={{ margin: "24px auto" }}>
            Fale com o Rei do Ferro e solicite seu orçamento.
          </p>
          <div className="bt">
            <a className="btn" href="#contato">
              Solicitar orçamento <span>→</span>
            </a>
            <a className="btn o wl" href={wa()} {...ext}>
              WhatsApp (66) 98406-6283
            </a>
          </div>
        </div>
      </section>

      <section id="contato" className="ct">
        <div className="w g2">
          <div>
            <span className="k">Contato</span>
            <Lines lines={["Vamos falar", "sobre seu", "projeto?"]} />
            <div className="ci">
              <div>
                <b>WHATSAPP</b>
                <a className="wl" href={wa()} {...ext}>
                  (66) 98406-6283
                </a>
              </div>
              <div>
                <b>ENDEREÇO</b>
                Rua dos Manacás, 2743B
                <br />
                Setor Industrial Sul · Sinop - MT
              </div>
              <div>
                <b>ATENDIMENTO</b>
                Sinop e região
              </div>
            </div>
          </div>

          <form id="f" action="https://formsubmit.co/reidoferro.mkt@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="Novo pedido de orçamento - Rei do Ferro" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_next"
              defaultValue="https://serralheriareidoferro.com.br/?orcamento=enviado#contato"
            />
            <input
              type="text"
              name="_honey"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />
            <input type="text" name="Nome" placeholder="NOME" autoComplete="name" required />
            <input
              type="tel"
              name="WhatsApp"
              placeholder="WHATSAPP"
              autoComplete="tel"
              inputMode="tel"
              required
            />
            <select name="Serviço" required defaultValue="">
              <option value="" disabled>
                SELECIONE O SERVIÇO
              </option>
              <option>Portão de correr</option>
              <option>Portão basculante</option>
              <option>Basculante com social embutido</option>
              <option>Porta de enrolar manual</option>
              <option>Porta de enrolar automática</option>
              <option>Estrutura metálica</option>
              <option>Serralheria em geral</option>
              <option>Outro</option>
            </select>
            <input type="text" name="Cidade" placeholder="CIDADE" autoComplete="address-level2" />
            <textarea name="Mensagem" rows={4} placeholder="MENSAGEM" />
            <button className="btn" type="submit">
              Solicitar orçamento <span>→</span>
            </button>
            <p id="email-status" role="status" aria-live="polite" />
          </form>
        </div>
      </section>

      <footer>
        <div className="w">
          <div>
            <div>
              <a href="#inicio" className="logo">
                <img src={logo.url} alt="Rei do Ferro" style={{ height: 96, width: "auto" }} />
              </a>
              <p style={{ maxWidth: 320, marginTop: 14 }}>
                Soluções em serralheria, portões, portas de enrolar e estruturas metálicas para
                Sinop e região.
              </p>
              <p style={{ marginTop: 14 }}>
                Rua dos Manacás, 2743B · Setor Industrial Sul
                <br />
                Sinop - MT · CEP 78557-452
              </p>
            </div>
            <nav>
              <a href="#inicio">Início</a>
              <a href="#empresa">Empresa</a>
              <a href="#servicos">Serviços</a>
              <a href="#portoes">Portões</a>
              <a href="#portas-de-enrolar">Portas de enrolar</a>
              <a href="#estruturas-metalicas">Estruturas metálicas</a>
              <a href="#serralheria-em-geral">Serralheria</a>
              <a href="#projetos">Projetos</a>
              <a href="#contato">Contato</a>
            </nav>
            <nav>
              <a {...ext} href="https://www.instagram.com/reidoferrosinop/">
                Instagram
              </a>
              <a {...ext} href="https://www.facebook.com/reidoferrosinop/?locale=pt_BR">
                Facebook
              </a>
              <a className="wl" href={wa()} {...ext}>
                WhatsApp
              </a>
            </nav>
          </div>
          <div className="cp">© 2026 REI DO FERRO. TODOS OS DIREITOS RESERVADOS.</div>
        </div>
      </footer>

      <a className="wl wa" href={wa()} {...ext} aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
        </svg>
        <span>FALE CONOSCO</span>
      </a>

      <div className="cu" id="cu" />
    </>
  );
}
