/* BodyAligner — Tweaks panel (applies live CSS-variable changes to the vanilla page) */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e07a5f",
  "serif": "'Spectral', Georgia, serif",
  "motion": "subtle",
  "heroMotion": true
}/*EDITMODE-END*/;

function applyTweaks(t){
  const r = document.documentElement;
  r.style.setProperty('--clay', t.accent);
  r.style.setProperty('--clay-soft', t.accent);
  r.style.setProperty('--serif', t.serif);
  if(t.motion === 'off'){
    document.body.classList.add('motion-off');
  } else {
    document.body.classList.remove('motion-off');
    r.style.setProperty('--reveal-y', t.motion === 'lively' ? '64px' : '36px');
    r.style.setProperty('--reveal-dur', t.motion === 'lively' ? '1.05s' : '.9s');
  }
  document.body.classList.toggle('glow-off', !t.heroMotion);
}

function TweaksApp(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand accent" />
      <TweakColor label="Accent colour" value={t.accent}
        options={['#e07a5f','#d99a4e','#c9697e','#5a9b8e','#3f7cc9']}
        onChange={(v)=> setTweak('accent', v)} />
      <TweakSection label="Typography" />
      <TweakSelect label="Heading font" value={t.serif}
        options={[
          {label:'Spectral (serif)', value:"'Spectral', Georgia, serif"},
          {label:'Newsreader (serif)', value:"'Newsreader', Georgia, serif"},
          {label:'Bricolage (modern)', value:"'Bricolage Grotesque', system-ui, sans-serif"}
        ]}
        onChange={(v)=> setTweak('serif', v)} />
      <TweakSection label="Motion" />
      <TweakRadio label="Scroll reveal" value={t.motion}
        options={['subtle','lively','off']}
        onChange={(v)=> setTweak('motion', v)} />
      <TweakToggle label="Hero ambient motion" value={t.heroMotion}
        onChange={(v)=> setTweak('heroMotion', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
