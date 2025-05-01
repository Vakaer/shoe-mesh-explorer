import { ShoeStore, useShoeStore } from "../hooks/use-shoe-store";
import { AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'

export function Customizer() {
  const {colors, color, setIntro, setItemColor, current} = useShoeStore() as ShoeStore;
  return (
    <div className="customizer">
      <div className="color-options">
        {colors.map((color) => (
          <div key={color} className={`circle`} style={{ background: color }} onClick={() => current && setItemColor(current, color)}></div>
        ))}
      </div>
      {/* <div className="decals">
        <div className="decals--container">
          {snap.decals.map((decal) => (
            <div key={decal} className={`decal`} onClick={() => (state.decal = decal)}>
              <img src={decal + '_thumb.png'} alt="brand" />
            </div>
          ))}
        </div>
      </div> */}
      <button
        className="share"
        style={{ background: color }}
        onClick={() => {
          const link = document.createElement('a')
          link.setAttribute('download', 'canvas.png')
          link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
        }}>
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
      <button className="exit" style={{ background: color }} onClick={() => (setIntro(true))}>
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>
    </div>
  )
}