# Studio Balsamo — sito 2026

Sorgenti React/Vite del sito pubblicato su **https://studiobalsamo.com/**.

## Sviluppo e verifica

```sh
npm ci
npm test
npm run dev -- --host 127.0.0.1 --port 4173
npm run build
```

Il filesystem pCloud può impedire l’esecuzione delle dipendenze native: in quel caso usare una copia temporanea del progetto per sviluppo e build, sincronizzando le modifiche nei sorgenti durevoli. Non copiare credenziali o esportazioni locali nella release.

## Pubblicazione

Il dominio usa la configurazione GitHub Pages esistente, ramo `main`, cartella radice. Il file `CNAME` mantiene `studiobalsamo.com`. Il codice sorgente rimane in questa cartella, mentre la radice contiene solo gli output necessari e i documenti di progetto.

Dopo la build:

```sh
node scripts/prepare-github-pages.mjs /percorso/build/dist/client /percorso/repository
```

Lo script include una lista esplicita di file pubblicabili; non copia i materiali di esplorazione, le schermate QA né le fotografie originali di lavorazione. Eseguire commit e push solo dopo la revisione del diff.

## Contatti e dati

Il modulo usa lo stesso endpoint Formspree del sito precedente. Conferma il risultato solo dopo una risposta HTTP positiva; in caso di errore conserva i dati inseriti. Non salva i campi nel browser e non ripete automaticamente le richieste. I test usano risposte simulate e non inviano messaggi reali.

## Design e contenuti

Struttura dell’opzione 3 approvata: apertura tipografica, ritratto centrale, documenti contabili, quattro esigenze dell’impresa, Studio e contatti. Scorrimento nativo senza sezioni bloccate. La sezione Studio usa una fotografia fedele con firma sovrapposta; il movimento viene disattivato con `prefers-reduced-motion`.

L’immagine contabile contiene dati esemplificativi. Il ritratto scontornato di apertura deriva dalla foto autorizzata; la fotografia originale è preservata localmente. Nessun dato di clienti pubblicato.

L’audit dei riferimenti al CCII e al Codice civile è in `../docs/audit-normativo-2026-09-26.md`. Le verifiche di pubblicazione sono in `../docs/release-2026-09-26.md`.

Gli adapter Sites sono conservati per un eventuale uso futuro: non sono il canale di deploy attuale.
