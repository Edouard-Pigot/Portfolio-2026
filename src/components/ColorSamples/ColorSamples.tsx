import './ColorSamples.scss';
import Button from '../Button/Button';
import Dot from '../Dot/Dot';

export default function ColorSamples() {
  let colors = ['white', 'black', 'apricot', 'orange', 'strawberry', 'sky', 'quartz', /*'limestone',*/ 'flint', 'dolomite', /*'granite',*/ 'obsidian'];

  let bgColors = ['quartz', /*'limestone',*/ 'flint', 'dolomite', /*'granite',*/ 'obsidian'];
  let fgColors = ['apricot', 'orange', 'strawberry', 'sky'];

  return (
    <>
    <div style={{ display: 'flex', gap: '20px' }}>
        <div id="color-greys">
          {
            bgColors.map(color => (
              <div key={color} className={`color-square ${color}`}>
                {color.toUpperCase()}
              </div>
            ))
          }
        </div>
        <div id="color-colors">
          {fgColors.map(color => (
            <div key={color} className={`color-square ${color}`}>
              {color.toUpperCase()}
            </div>
          ))}
        </div>
        <div id="dots">
          {colors.map(color => (
            <Dot key={color} backgroundColor="white" color={color}></Dot>
          ))}
        </div>
        <div id="buttons">
          <div className="buttons">
            {colors.map(color => (
              <Button key={color} color={color}>
                {color.toUpperCase()}
              </Button>
            ))}
          </div>
          <div id="buttons-hover" className="buttons">
            {colors.map(color => (
              <button key={color} className={`button hover ${color}`}>
                {color.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div id="text-tests">
        <table>
          {colors.map(bgColor => (
            <tr key={bgColor}>
              {colors.map(elementColor => (
                <td key={elementColor}>
                  <div className={`color-square ${bgColor}`}>
                    <p className={`${elementColor}-text ${['dolomite', 'granite', 'obsidian'].includes(elementColor) ? ' white-text' : ''}`}>
                      Test Text
                    </p>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
      <div id="background-tests">
        <div className="buttons-tests">
          <table>
            {colors.map(bgColor => (
              <tr key={bgColor}>
                {colors.map(elementColor => (
                  <td key={elementColor}>
                    <div className={`color-square ${bgColor}`}>
                      <Button key={elementColor} color={elementColor} className={['dolomite', 'granite', 'obsidian'].includes(elementColor) ? ' white-text' : ''}>
                        PUSH
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </div>
        <div className="dots-tests">
          <table>
            {colors.map(bgColor => (
              <tr key={bgColor}>
                {colors.map(elementColor => (
                  <td key={elementColor}>
                    <div className={`color-square ${bgColor}`}>
                      <Dot key={bgColor} backgroundColor={bgColor} color={elementColor}></Dot>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}