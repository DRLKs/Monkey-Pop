

const CirculoRango = ({ x, y, rango, children }) => {

    const radio = rango / 2;

    return (
    <div className="circuloRango" style={{
        width: `${rango}px`,
        height: `${rango}px`,
        transform: `translate(${x - radio}px, ${y - radio}px)`
      }}>
        {children}
      </div>
    )
}

export default CirculoRango;