import './ColorSamples.scss';

export default function ColorSamples() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div id="color-greys">
        <div className="color-square quartz">QUARTZ</div>
        <div className="color-square limestone">LIMESTONE</div>
        <div className="color-square flint">FLINT</div>
        <div className="color-square dolomite">DOLOMITE</div>
        <div className="color-square granite">GRANITE</div>
        <div className="color-square obsidian">OBSIDIAN</div>
      </div>
      <div id="color-colors">
        <div className="color-square orange">ORANGE</div>
        <div className="color-square peach">PEACH</div>
        <div className="color-square strawberry">STRAWBERRY</div>
        <div className="color-square sky">SKY</div>
      </div>
      <div id="dots">
        <div className="dot orange"></div>
        <div className="dot peach"></div>
        <div className="dot strawberry"></div>
        <div className="dot sky"></div>
        <div className="dot quartz"></div>
        <div className="dot limestone"></div>
        <div className="dot flint"></div>
        <div className="dot dolomite"></div>
        <div className="dot granite"></div>
        <div className="dot obsidian"></div>
      </div>
      <div id="buttons">
        <div className="buttons">
          <button className="button orange">
            ORANGE
          </button>
          <button className="button peach">
            PEACH
          </button>
          <button className="button strawberry">
            STRAWBERRY
          </button>
          <button className="button sky">
            SKY
          </button>
          <button className="button quartz">
            QUARTZ
          </button>
          <button className="button limestone">
            LIMESTONE
          </button>
          <button className="button flint">
            FLINT
          </button>
          <button className="button dolomite">
            DOLOMITE
          </button>
          <button className="button granite white-text">
            GRANITE
          </button>
          <button className="button obsidian white-text">
            OBSIDIAN
          </button>
        </div>
        <div id="buttons-hover" className="buttons">
          <button className="button hover orange">
            ORANGE
          </button>
          <button className="button hover peach">
            PEACH
          </button>
          <button className="button hover strawberry">
            STRAWBERRY
          </button>
          <button className="button hover sky">
            SKY
          </button>
          <button className="button hover quartz">
            QUARTZ
          </button>
          <button className="button hover limestone">
            LIMESTONE
          </button>
          <button className="button hover flint">
            FLINT
          </button>
          <button className="button hover dolomite">
            DOLOMITE
          </button>
          <button className="button hover granite white-text">
            GRANITE
          </button>
          <button className="button hover obsidian white-text">
            OBSIDIAN
          </button>
        </div>
      </div>
    </div>
  );
}